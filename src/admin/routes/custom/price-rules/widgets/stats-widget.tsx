import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text } from "@medusajs/ui"
import { useEffect, useState } from "react"
import axios from "axios"

const StatsWidget = () => {
  const [ruleCount, setRuleCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/admin/price-rules")
      setRuleCount(res.data.length)
    }

    fetchData()
  }, [])

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Price Rules Stats</Heading>
        <Text>Total Rules: {ruleCount}</Text>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "price-rules.afterTable",
})

export default StatsWidget
