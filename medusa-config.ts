import { loadEnv, defineConfig } from '@medusajs/framework/utils'

import { PriceRule } from './src/modules/price-rules/models/price-rule'
import { Price } from '@medusajs/medusa'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL || "postgres://user:password@localhost/medusa",
    http: {
      storeCors: process.env.STORE_CORS || "",
      adminCors: process.env.ADMIN_CORS || "",
      authCors: process.env.AUTH_CORS || "",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },

    entities: [
      PriceRule,
      Price,
    ],
  },

plugins: [
  {
    resolve: "./src/api/admin/price-rules",
    options: {},
  },
  {
    resolve: "@medusajs/pricing",
    options: {
      strategy: "./src/strategies/custom-price-selection-strategy",
    },
  },
],


})

