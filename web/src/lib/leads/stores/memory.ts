import type { Lead } from "../schema";
import type { LeadStore } from "../store";

/** Solo para tests y previews sin nada configurado: se pierde al reiniciar. */
export class MemoryLeadStore implements LeadStore {
  readonly name = "memory";
  readonly canList = true;
  private readonly rows: Lead[] = [];

  async save(lead: Lead): Promise<void> {
    this.rows.unshift(lead);
  }

  async list(): Promise<Lead[]> {
    return [...this.rows];
  }
}
