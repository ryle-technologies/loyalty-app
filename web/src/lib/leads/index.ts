import { getRedis } from "@/lib/redis";
import { StoreNotConfiguredError, type LeadStore } from "./store";
import { FileLeadStore } from "./stores/file";
import { MemoryLeadStore } from "./stores/memory";
import { RedisLeadStore } from "./stores/redis";
import { WebhookLeadStore, withWebhookNotification } from "./stores/webhook";

export type { Lead } from "./schema";
export type { LeadStore } from "./store";
export { StoreCannotListError, StoreNotConfiguredError } from "./store";

type StoreKind = "redis" | "file" | "webhook" | "memory";

/**
 * Elige el almacenamiento según el entorno:
 *
 *  1. `LEADS_STORE` fuerza una implementación (`redis` | `file` | `webhook` | `memory`).
 *  2. Si hay Upstash Redis configurado → `redis` (+ aviso por webhook si hay `LEADS_WEBHOOK_URL`).
 *  3. Si solo hay `LEADS_WEBHOOK_URL` → `webhook` (guarda; no exporta CSV).
 *  4. Fuera de Vercel (desarrollo local) → `file` en `.data/leads.jsonl`.
 *  5. En Vercel sin nada configurado → error claro al guardar (503), nunca pérdida silenciosa.
 */
function buildStore(): LeadStore {
  const forced = process.env.LEADS_STORE?.trim().toLowerCase() as
    | StoreKind
    | undefined;
  const webhookUrl = process.env.LEADS_WEBHOOK_URL?.trim();
  const webhook = webhookUrl
    ? new WebhookLeadStore({
        url: webhookUrl,
        secret: process.env.LEADS_WEBHOOK_SECRET?.trim() || undefined,
      })
    : null;
  const redis = getRedis();

  const pick = (kind: StoreKind): LeadStore => {
    switch (kind) {
      case "redis": {
        if (!redis) throw new StoreNotConfiguredError();
        const primary = new RedisLeadStore(redis);
        return webhook ? withWebhookNotification(primary, webhook) : primary;
      }
      case "webhook": {
        if (!webhook) throw new StoreNotConfiguredError();
        return webhook;
      }
      case "file": {
        const primary = new FileLeadStore();
        return webhook ? withWebhookNotification(primary, webhook) : primary;
      }
      case "memory":
        return new MemoryLeadStore();
    }
  };

  if (forced) return pick(forced);
  if (redis) return pick("redis");
  if (webhook) return pick("webhook");
  if (!process.env.VERCEL) return pick("file");
  throw new StoreNotConfiguredError();
}

const globalForStore = globalThis as unknown as { __leadStore?: LeadStore };

/** Singleton por proceso (sobrevive al hot reload en desarrollo). */
export function getLeadStore(): LeadStore {
  if (!globalForStore.__leadStore) {
    globalForStore.__leadStore = buildStore();
    console.info(`[leads] almacenamiento: ${globalForStore.__leadStore.name}`);
  }
  return globalForStore.__leadStore;
}
