import React from "react"
import { Card, Heading, Text } from "@medusajs/ui"

export const MyWidget = ({ rules }) => {
  return (
    <Card>
      <Heading level="h2">Price Rules Overview</Heading>
      <Text>Всего правил: {rules.length}</Text>
    </Card>
  )
}
