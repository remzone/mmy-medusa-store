import PriceRuleService from "./services/price-rule"

const PriceRulesPlugin = {
  service: PriceRuleService,

  api: {
    admin: {
      routes: [
        {
          path: "/price-rules",
          route: require("./api/admin/price-rules").default,
        },
      ],
    },
  },
}

export default PriceRulesPlugin
