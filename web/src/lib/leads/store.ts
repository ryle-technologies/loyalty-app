import type { Lead } from "./schema";

/**
 * Interfaz de almacenamiento de registros de interés.
 *
 * Implementaciones (ver `./stores/*`):
 *  - `redis`   Upstash Redis (Vercel Marketplace, plan gratuito). Guarda y lista.
 *  - `file`    JSONL local en `.data/leads.jsonl`. Solo para desarrollo.
 *  - `webhook` POST a una URL (Google Apps Script → Sheet, Make, Slack…). Solo guarda.
 *  - `memory`  En memoria. Para tests / previews sin nada configurado.
 *
 * La elección sale de `getLeadStore()` (`./index.ts`) según variables de entorno.
 */
export interface LeadStore {
  readonly name: string;
  /** `false` cuando la implementación no puede leer lo guardado (ej. webhook). */
  readonly canList: boolean;
  save(lead: Lead): Promise<void>;
  /** Todos los registros, más recientes primero. Lanza `StoreCannotListError` si `canList` es `false`. */
  list(): Promise<Lead[]>;
}

export class StoreCannotListError extends Error {
  constructor(storeName: string) {
    super(`El almacenamiento «${storeName}» no permite listar registros.`);
    this.name = "StoreCannotListError";
  }
}

export class StoreNotConfiguredError extends Error {
  constructor() {
    super(
      "No hay almacenamiento de registros configurado. Definí UPSTASH_REDIS_REST_URL/TOKEN o LEADS_WEBHOOK_URL.",
    );
    this.name = "StoreNotConfiguredError";
  }
}
