import { Router } from "express"
import { PriceRule } from "../../models/price-rule";


export default (app, container) => {
  console.log("[price-rules] Admin routes mounted");

  const route = Router()

  const manager = container.resolve("manager")
  const repo = manager.getRepository(PriceRule)

  // GET /admin/price-rules
  route.get("/", async (req, res) => {
    const rules = await repo.find()
    res.json(rules)
  })

  // POST /admin/price-rules
  route.post("/", async (req, res) => {
    const { customer_group, category_handle, percentage_modifier } = req.body

    const newRule = repo.create({
      id: `prule_${Math.random().toString(36).substring(2, 8)}`,
      customer_group,
      category_handle,
      percentage_modifier,
    })

    await repo.save(newRule)
    res.json(newRule)
  })

  // PATCH /admin/price-rules/:id
  route.patch("/:id", async (req, res) => {
    const { id } = req.params
    const { percentage_modifier } = req.body

    const rule = await repo.findOneBy({ id })

    if (!rule) {
      res.status(404).json({ message: "Rule not found" })
      return
    }

    rule.percentage_modifier = percentage_modifier

    await repo.save(rule)
    res.json(rule)
  })

  // DELETE /admin/price-rules/:id
  route.delete("/:id", async (req, res) => {
    const { id } = req.params

    const rule = await repo.findOneBy({ id })

    if (!rule) {
      res.status(404).json({ message: "Rule not found" })
      return
    }

    await repo.remove(rule)
    res.json({ deleted: true })
  })

  // ⬇️ ВАЖНО: вот что ты пишешь сюда:
 app.use(route);



  return app
}
