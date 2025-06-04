import { Module } from "@medusajs/framework"
import { PriceRule } from "./models/price-rule"
import { Price } from "@medusajs/medusa"
import PriceRuleService from "./service"

// ОБЯЗАТЕЛЬНО экспортим entity как default + named:
export { PriceRule }
export default Module({
  id: "price_rules",
  service: PriceRuleService,
  models: [PriceRule, Price],
})
