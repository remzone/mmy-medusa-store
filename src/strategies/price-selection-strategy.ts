import { PriceSelectionContext } from "@medusajs/types"
import PriceRuleService from "../modules/price-rules/service"

class CustomPriceSelectionStrategy {
  constructor(container) {
    this.container = container
  }

  async calculateVariantPrice(variantId, context: PriceSelectionContext) {
    const productVariantService = this.container.resolve("productVariantService")
    const priceRuleService = this.container.resolve("price_rules")

    const variant = await productVariantService.retrieve(variantId, {
      relations: ["product", "prices", "product.categories"],
    })

    const basePrice = variant.prices?.[0]?.amount ?? 0

    const customerGroup = context.customer?.groups?.[0]?.name || "guest"
    const productCategory = variant.product?.categories?.[0]?.handle || "uncategorized"

    const modifier = await priceRuleService.getModifierForGroupAndCategory(
      customerGroup,
      productCategory
    )

    const finalPrice = Math.round(basePrice * (1 + modifier))

    return {
      original_price: basePrice,
      calculated_price: finalPrice,
    }
  }
}

export default CustomPriceSelectionStrategy
