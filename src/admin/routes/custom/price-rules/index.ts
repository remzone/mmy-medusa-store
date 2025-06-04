import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Tags } from "@medusajs/icons"
import PriceRulesPage from "./pages/price-rules"

export const config = defineRouteConfig({
  path: "/price-rules",         // путь в админке
  label: "Ценовые правила",     // пункт в меню
  icon: Tags,                   // иконка
  component: PriceRulesPage,    // страница
})

export default PriceRulesPage
