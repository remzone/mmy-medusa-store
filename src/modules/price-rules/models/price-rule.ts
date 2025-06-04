import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Price } from "@medusajs/medusa"

@Entity()
export class PriceRule {
  @PrimaryColumn()
  id: string

  @Column()
  customer_group: string

  @Column()
  category_handle: string

  @Column("float")
  percentage_modifier: number

  @Column({ type: "timestamp", nullable: true })
  valid_from?: Date

  @Column({ type: "timestamp", nullable: true })
  valid_to?: Date

  @Column({ nullable: true })
  priority?: number

  @Column({ nullable: true })
  price_id?: string

  @ManyToOne(() => Price, { nullable: true })
  @JoinColumn({ name: "price_id" })
  price?: Price
}

// ВАЖНО! Экспортим оба варианта:
export { PriceRule }
export default PriceRule
