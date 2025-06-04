import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button } from "@medusajs/ui"
import axios from "axios"
import { useState } from "react"

const AddRuleWidget = () => {
  const [loading, setLoading] = useState(false)

  const handleAddRule = async () => {
    setLoading(true)
    await axios.post("/admin/price-rules", {
      customer_group: "vip",
      category_handle: "tshirts",
      percentage_modifier: 1.4,
    })
    setLoading(false)
    // Можно добавить рефреш таблицы
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Add VIP Rule</Heading>
        <Button onClick={handleAddRule} loading={loading}>
          Add Rule
        </Button>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "price-rules.beforeTable",
})

export default AddRuleWidget
