import React, { useEffect, useState } from "react"
import { Button, Input, Table, Heading } from "@medusajs/ui"
import axios from "axios"
import { MyWidget } from "../widgets/my-widget"  // <--- вот тут импорт виджета

const PriceRulesPage = () => {
  const [rules, setRules] = useState([])

  const fetchRules = async () => {
    const res = await axios.get("/admin/price-rules")
    setRules(res.data)
  }

  useEffect(() => {
    fetchRules()
  }, [])

  return (
    <div className="flex flex-col gap-y-6 px-8 py-6">
      <Heading>Price Rules</Heading>

      {/* ВСТРАИВАЕМ ВИДЖЕТ */}
      <MyWidget rules={rules} />

      {/* Таблица */}
      <div className="mt-8">
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Customer Group</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Modifier</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rules.map((rule: any) => (
              <Table.Row key={rule.id}>
                <Table.Cell>{rule.id}</Table.Cell>
                <Table.Cell>{rule.customer_group}</Table.Cell>
                <Table.Cell>{rule.category_handle}</Table.Cell>
                <Table.Cell>{rule.percentage_modifier}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default PriceRulesPage
