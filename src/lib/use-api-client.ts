import axios from "axios"
import { useMemo } from "react"

export const useApiClient = () => {
  return useMemo(() => {
    const client = axios.create({
      baseURL: `/app/admin`, // ВАЖНО! /app/admin
      withCredentials: true,
    })

    return client
  }, [])
}
