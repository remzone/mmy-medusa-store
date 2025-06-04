import React, { useState } from "react"
import { Button, Input } from "@medusajs/ui"
import axios from "axios"

const AddRuleForm = ({ onRuleAdded }) => {
  const [form, setForm] = useState({
    customer_group: "",
    category_handle: "",
    percentage_modifier: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    await axios.post("/admin/price-rules", {
      ...form,
      percentage_modifier: parseFloat(form.percentage_modifier),
    })
    setForm({
      customer_group: "",
      category_handle: "",
      percentage_modifier: "",
    })
    onRuleAdded()
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Input
        name="customer_group"
        placeholder="Группа клиента (например, vip)"
        value={form.customer_group}
        onChange={handleChange}
      />
      <Input
        name="category_handle"
        placeholder="Категория (например, tshorts)"
        value={form.category_handle}
        onChange={handleChange}
      />
      <Input
        name="percentage_modifier"
        type="number"
        step="0.01"
        placeholder="Модификатор (например, 1.4)"
        value={form.percentage_modifier}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit}>Добавить правило</Button>
    </div>
  )
}

export default AddRuleForm
