import { IPriceSelectionStrategy, PriceSelectionContext } from "@medusajs/types"

class CustomPriceSelectionStrategy implements IPriceSelectionStrategy {
  container
  manager

  constructor({ container, manager }) {
    this.container = container
    this.manager = manager
  }

  async calculateVariantPrice(variantId, context: PriceSelectionContext) {
    const pricingService = this.container.resolve("pricingService")
    const productVariantService = this.container.resolve("productVariantService")
    const priceRuleService = this.container.resolve("price_rules") // id модуля

    // 1️⃣ Получаем базовую цену
    const { prices } = await pricingService.getProductVariantPricingById(variantId, {
      context: {
        currency_code: context.currency_code,
        region_id: context.region_id,
        customer_id: context.customer?.id,
      },
    })

    const basePrice = prices?.calculated_price ?? 0

    if (basePrice === 0) {
      throw new Error(`No base price found for variant ${variantId}`)
    }

    // 2️⃣ Получаем категорию товара
    const variant = await productVariantService.retrieve(variantId, {
      relations: ["product", "product.categories"],
    })

    const customerGroup = context.customer?.groups?.[0]?.name || "guest"
    const productCategory = variant.product?.categories?.[0]?.handle || "uncategorized"

    // 3️⃣ Получаем модификатор
    const modifier = await priceRuleService.getModifierForGroupAndCategory(
      customerGroup,
      productCategory
    )

    // 4️⃣ Финальная цена
    const finalPrice = Math.round(basePrice * (1 + modifier))

    return {
      original_price: basePrice,
      calculated_price: finalPrice,
    }
  }

  withTransaction(manager) {
    return new CustomPriceSelectionStrategy({
      container: this.container,
      manager,
    })
  }
}

export default CustomPriceSelectionStrategy
