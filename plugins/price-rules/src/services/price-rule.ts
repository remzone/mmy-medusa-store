// plugins/price-rules/src/services/price-rule.ts

import { PriceRule } from "../models/price-rule";
import { EntityManager } from "@mikro-orm/postgresql";

export default class PriceRuleService {
  manager: EntityManager;
  repo: any;

  constructor({ manager }: { manager: EntityManager }) {
    this.manager = manager;
    this.repo = this.manager.getRepository(PriceRule);
  }

  async list(): Promise<PriceRule[]> {
    return this.repo.findAll();
  }

  async retrieve(id: string): Promise<PriceRule | null> {
    return this.repo.findOne({ id });
  }

  async create(data: Partial<PriceRule>): Promise<PriceRule> {
    const rule = this.repo.create(data);
    await this.repo.persistAndFlush(rule);
    return rule;
  }

  async update(id: string, data: Partial<PriceRule>): Promise<PriceRule | null> {
    const rule = await this.retrieve(id);
    if (!rule) {
      return null;
    }

    Object.assign(rule, data);
    await this.repo.persistAndFlush(rule);
    return rule;
  }

  async delete(id: string): Promise<boolean> {
    const rule = await this.retrieve(id);
    if (!rule) {
      return false;
    }

    await this.repo.removeAndFlush(rule);
    return true;
  }
}
