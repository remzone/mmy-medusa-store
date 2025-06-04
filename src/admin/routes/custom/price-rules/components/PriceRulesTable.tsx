import React from "react"
import { Table, Button } from "@medusajs/ui"

const PriceRulesTable = ({ rules, onDeleteRule }) => {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.HeaderCell>Группа клиента</Table.HeaderCell>
          <Table.HeaderCell>Категория</Table.HeaderCell>
          <Table.HeaderCell>Модификатор</Table.HeaderCell>
          <Table.HeaderCell>Действия</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rules.map((rule) => (
          <Table.Row key={rule.id}>
            <Table.Cell>{rule.id}</Table.Cell>
            <Table.Cell>{rule.customer_group}</Table.Cell>
            <Table.Cell>{rule.category_handle}</Table.Cell>
            <Table.Cell>{rule.percentage_modifier}</Table.Cell>
            <Table.Cell>
              <Button
                size="small"
                variant="danger"
                onClick={() => onDeleteRule(rule.id)}
              >
                Удалить
              </Button>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default PriceRulesTable
