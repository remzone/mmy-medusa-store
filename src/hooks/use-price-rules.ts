import { useState, useCallback } from "react"
import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "/",
  withCredentials: true, // ОБЯЗАТЕЛЬНО для session auth !!!
})

export const usePriceRules = () => {
  const [rules, setRules] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchRules = useCallback(async () => {
    setLoading(true)
    try {
      const res = await api.get("/admin/price-rules")
      console.log("Fetched rules:", res.data)
      setRules(res.data || [])
    } catch (err) {
      console.error("Ошибка при fetchRules:", err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const addRule = useCallback(async (ruleData) => {
    try {
      await api.post("/admin/price-rules", {
        customer_group: ruleData.customer_group,
        category_handle: ruleData.category_handle,
        percentage_modifier: ruleData.percentage_modifier,
      })
      await fetchRules()
    } catch (err) {
      console.error("Ошибка при addRule:", err)
      throw err
    }
  }, [fetchRules])

  const deleteRule = useCallback(async (id) => {
    try {
      await api.delete(`/admin/price-rules/${id}`)
      await fetchRules()
    } catch (err) {
      console.error("Ошибка при deleteRule:", err)
      throw err
    }
  }, [fetchRules])

  const updateModifier = useCallback(async (id, newModifier) => {
    try {
      await api.patch(`/admin/price-rules/${id}`, {
        percentage_modifier: newModifier,
      })
      await fetchRules()
    } catch (err) {
      console.error("Ошибка при updateModifier:", err)
      throw err
    }
  }, [fetchRules])

  return {
    rules,
    loading,
    error,
    fetchRules,
    addRule,
    deleteRule,
    updateModifier,
  }
}
