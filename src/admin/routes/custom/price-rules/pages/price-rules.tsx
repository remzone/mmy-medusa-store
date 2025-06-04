import React, { useEffect, useState } from "react"
import { Container, Heading, Button } from "@medusajs/ui"
import axios from "axios"
import PriceRulesTable from "../components/PriceRulesTable"
import AddRuleForm from "../components/AddRuleForm"

const PriceRulesPage = () => {
  const [rules, setRules] = useState([])

  const fetchRules = async () => {
    const res = await axios.get("/admin/price-rules")
    setRules(res.data)
  }

  useEffect(() => {
    fetchRules()
  }, [])

  const handleRuleAdded = () => {
    fetchRules()
  }

  const handleDeleteRule = async (id: number) => {
    await axios.delete(`/admin/price-rules/${id}`)
    fetchRules()
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Управление ценовыми правилами</Heading>
      </div>

      <div className="p-6">
        <AddRuleForm onRuleAdded={handleRuleAdded} />
      </div>

      <div className="p-6">
        <PriceRulesTable rules={rules} onDeleteRule={handleDeleteRule} />
      </div>
    </Container>
  )
}

export default PriceRulesPage
