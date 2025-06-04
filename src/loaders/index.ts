import { loadApiRoutes } from "@medusajs/utils"

export default async function (container, config, app) {
  await loadApiRoutes({
    app,
    rootDirectory: __dirname + "/..", // путь до src
    container,
    config,
  })
}
