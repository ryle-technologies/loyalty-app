import type { Lead } from "../schema";
import { StoreCannotListError, type LeadStore } from "../store";

export interface WebhookOptions {
  url: string;
  /** Si está, se manda como `Authorization: Bearer …` y en el body (`secret`). */
  secret?: string;
  timeoutMs?: number;
}

/**
 * Manda cada registro por POST (JSON) a una URL: un Google Apps Script que
 * escribe en una Sheet, Make/Zapier, un webhook de Slack, etc.
 * No puede listar: para exportar CSV hace falta Redis como almacenamiento principal.
 */
export class WebhookLeadStore implements LeadStore {
  readonly name = "webhook";
  readonly canList = false;

  constructor(private readonly options: WebhookOptions) {}

  async save(lead: Lead): Promise<void> {
    const { url, secret, timeoutMs = 8000 } = this.options;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(secret ? { authorization: `Bearer ${secret}` } : {}),
        },
        body: JSON.stringify({ type: "lead.created", secret, lead }),
        signal: controller.signal,
        // Apps Script responde con 302 a googleusercontent; hay que seguirlo.
        redirect: "follow",
      });
      if (!res.ok) {
        throw new Error(`Webhook respondió ${res.status}`);
      }
    } finally {
      clearTimeout(timer);
    }
  }

  async list(): Promise<Lead[]> {
    throw new StoreCannotListError(this.name);
  }
}

/**
 * Decorador: guarda en el store principal y, además, avisa por webhook
 * (FR-L03, aviso interno). Si el webhook falla, el registro ya quedó guardado:
 * se loguea y no se le muestra error al usuario.
 */
export function withWebhookNotification(
  primary: LeadStore,
  webhook: WebhookLeadStore,
): LeadStore {
  return {
    name: `${primary.name}+webhook`,
    canList: primary.canList,
    async save(lead) {
      await primary.save(lead);
      try {
        await webhook.save(lead);
      } catch (err) {
        console.error("[leads] webhook de aviso falló (registro ya guardado):", err);
      }
    },
    list: () => primary.list(),
  };
}
