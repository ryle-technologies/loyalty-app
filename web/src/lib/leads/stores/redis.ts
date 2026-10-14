import type { Redis } from "@upstash/redis";
import type { Lead } from "../schema";
import type { LeadStore } from "../store";

const KEY = "leads:v1";

/** Lista de Redis: `LPUSH` al guardar, `LRANGE` para exportar (más recientes primero). */
export class RedisLeadStore implements LeadStore {
  readonly name = "redis";
  readonly canList = true;

  constructor(private readonly redis: Redis) {}

  async save(lead: Lead): Promise<void> {
    await this.redis.lpush(KEY, JSON.stringify(lead));
  }

  async list(): Promise<Lead[]> {
    const rows = await this.redis.lrange<Lead | string>(KEY, 0, -1);
    return rows.map((row) =>
      typeof row === "string" ? (JSON.parse(row) as Lead) : row,
    );
  }
}
