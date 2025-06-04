import { PriceRule } from "./models/price-rule"
import { LessThanOrEqual, MoreThanOrEqual } from "typeorm"

class PriceRuleService {
  manager

  constructor({ manager }) {
    this.manager = manager
  }

  async getModifierForGroupAndCategory(customerGroup: string, categoryHandle: string): Promise<number> {
    const now = new Date()

    const repo = this.manager.getRepository(PriceRule)

    const rule = await repo.findOne({
      where: {
        customer_group: customerGroup,
        category_handle: categoryHandle,
        valid_from: LessThanOrEqual(now),
        valid_to: MoreThanOrEqual(now),
      },
      order: { priority: "DESC" },
    })

    return rule?.percentage_modifier ?? 0
  }
}

export default PriceRuleService
