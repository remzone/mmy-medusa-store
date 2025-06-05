import { asClass } from "awilix";
// Временно, пока не определим тип:
type MedusaContainer = any;

import PriceRuleService from "./services/price-rule";
import { PriceRule } from "./models/price-rule";

const PriceRulesPlugin = {
  run: async (container: MedusaContainer, options: any) => {
    console.log("[price-rules] run() completed");
    const manager = container.resolve("manager");

    manager.connection?.entityMetadatas.push(PriceRule);

    container.register({
      priceRuleService: asClass(PriceRuleService).singleton(),
    });

   
  },

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
};

export default PriceRulesPlugin;
