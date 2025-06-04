const { loadEnv } = require("@medusajs/framework/utils")

loadEnv(process.env.NODE_ENV || "development", process.cwd())

const { PriceRule } = require("./src/modules/price-rules/models/price-rule")
const { Price } = require("@medusajs/medusa")

module.exports = {
  projectConfig: {
    database_url: process.env.DATABASE_URL || "postgres://user:password@localhost/medusa",
    store_cors: process.env.STORE_CORS || "",
    admin_cors: process.env.ADMIN_CORS || "",
    auth_cors: process.env.AUTH_CORS || "",
    jwt_secret: process.env.JWT_SECRET || "supersecret",
    cookie_secret: process.env.COOKIE_SECRET || "supersecret",
  },

  plugins: [
    {
      resolve: "@medusajs/pricing",
      options: {
        strategy: "./src/services/custom-price-selection-strategy",
      },
    },
  ],

  // кастомные сущности
 projectConfig: {
  database_url: "...",
  entities: [
    require("./src/modules/price-rules/models/price-rule").PriceRule,
    require("@medusajs/medusa").Price,
  ],
},

}
