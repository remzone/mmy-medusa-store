import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChatBubbleLeftRight } from "@medusajs/icons"
import { Heading, Button, Table, Input, Select } from "@medusajs/ui"
import { useEffect, useState } from "react"
import axios from "axios"

const CustomPage = () => {
  const [rules, setRules] = useState([])

  // Списки для выбора
  const [customerGroups, setCustomerGroups] = useState([])
  const [categories, setCategories] = useState([])

  const [form, setForm] = useState({
    customer_group: "",
    category_handle: "",
    percentage_modifier: "",
  })

  // Загрузка правил
  const fetchRules = async () => {
    const res = await axios.get("/admin/price-rules")
    setRules(res.data)
  }

  // Загрузка customer groups
  const fetchCustomerGroups = async () => {
    const res = await axios.get("/admin/customer-groups")
    setCustomerGroups(res.data.customer_groups || [])
  }

  // Загрузка категорий
  const fetchCategories = async () => {
    const res = await axios.get("/admin/product-categories") // Или /admin/categories
    setCategories(res.data.product_categories || [])
  }

  // Первичная загрузка
  useEffect(() => {
    fetchRules()
    fetchCustomerGroups()
    fetchCategories()
  }, [])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddRule = async () => {
    try {
      if (
        !form.customer_group ||
        !form.category_handle ||
        isNaN(parseFloat(form.percentage_modifier))
      ) {
        alert("Заполните все поля корректно!")
        return
      }

      await axios.post("/admin/price-rules", {
        customer_group: form.customer_group,
        category_handle: form.category_handle,
        percentage_modifier: parseFloat(form.percentage_modifier),
      })

      setForm({
        customer_group: "",
        category_handle: "",
        percentage_modifier: "",
      })

      fetchRules()
    } catch (error) {
      console.error("Ошибка при добавлении правила:", error)
      alert("Ошибка при добавлении правила! Смотрите консоль.")
    }
  }

  const handleDeleteRule = async (id: number) => {
    await axios.delete(`/admin/price-rules/${id}`)
    fetchRules()
  }

  const handleUpdateModifier = async (id: number, newModifier: number) => {
    await axios.patch(`/admin/price-rules/${id}`, {
      percentage_modifier: newModifier,
    })
    fetchRules()
  }

  return (
    <div className="flex flex-col gap-y-6 px-8 py-6">
      <div className="flex items-center justify-between">
        <Heading level="h2">Dynamic Prices Rules</Heading>
      </div>

      {/* Форма */}
      <div className="flex flex-col gap-y-4">
        {/* Селект customer group */}
        <Select
          name="customer_group"
          value={form.customer_group}
          onValueChange={(value) =>
            setForm({ ...form, customer_group: value })
          }
        >
          <Select.Trigger>
            <Select.Value placeholder="Выберите группу клиента" />
          </Select.Trigger>
          <Select.Content>
            {customerGroups.map((group) => (
              <Select.Item key={group.id} value={group.id}>
                {group.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>

        {/* Селект категории */}
        <Select
          name="category_handle"
          value={form.category_handle}
          onValueChange={(value) =>
            setForm({ ...form, category_handle: value })
          }
        >
          <Select.Trigger>
            <Select.Value placeholder="Выберите категорию" />
          </Select.Trigger>
          <Select.Content>
            {categories.map((category) => (
              <Select.Item key={category.id} value={category.handle}>
                {category.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>

        {/* Modifier */}
        <Input
          name="percentage_modifier"
          type="number"
          step="0.01"
          placeholder="Modifier (e.g. 1.4)"
          value={form.percentage_modifier}
          onChange={handleChange}
        />

        <Button onClick={handleAddRule}>Add Rule</Button>
      </div>

      {/* Таблица */}
      <div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Customer Group</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Modifier</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {rules.map((rule) => (
              <Table.Row key={rule.id}>
                <Table.Cell>{rule.id}</Table.Cell>
                <Table.Cell>{rule.customer_group}</Table.Cell>
                <Table.Cell>{rule.category_handle}</Table.Cell>
                <Table.Cell>
                  <Input
                    type="number"
                    step="0.01"
                    value={rule.percentage_modifier}
                    onChange={(e) =>
                      handleUpdateModifier(
                        rule.id,
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button
                    size="small"
                    variant="danger"
                    onClick={() => handleDeleteRule(rule.id)}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export const config = defineRouteConfig({
  label: "Odyssey DPR",
  icon: ChatBubbleLeftRight,
})
у
export default CustomPage
