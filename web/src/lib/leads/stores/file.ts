import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { Lead } from "../schema";
import type { LeadStore } from "../store";

/**
 * JSONL en disco (`.data/leads.jsonl`, ignorado por git). Solo desarrollo local:
 * en Vercel el sistema de archivos no persiste entre invocaciones.
 */
export class FileLeadStore implements LeadStore {
  readonly name = "file";
  readonly canList = true;
  private readonly file: string;

  constructor(file = path.join(process.cwd(), ".data", "leads.jsonl")) {
    this.file = file;
  }

  async save(lead: Lead): Promise<void> {
    await mkdir(path.dirname(this.file), { recursive: true });
    await appendFile(this.file, `${JSON.stringify(lead)}\n`, "utf8");
  }

  async list(): Promise<Lead[]> {
    let raw = "";
    try {
      raw = await readFile(this.file, "utf8");
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
      throw err;
    }
    return raw
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => JSON.parse(line) as Lead)
      .reverse();
  }
}
