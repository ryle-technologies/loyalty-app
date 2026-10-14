# {{marca}} — Tarjeta de sellos en Wallet para cafés (Uruguay)

> Product name is **TBD** (`{{marca}}` placeholder everywhere).

## What it is
A no-app digital stamp card for cafés. The café puts a QR at the till; the customer scans it, fills a short form (name, WhatsApp, email + 2 consents) and adds the café's card to **Apple Wallet or Google Wallet**. Only café staff add stamps and redeem rewards, from a simple web panel. Each café configures one program (3–15 stamps + its reward).

Business model: subscription per café — **199 UYU/month for the first 6 months, then 399 UYU/month**, VAT included, paid by bank transfer from day one, no minimum term.

## Status (2026-10-14)
| Area | State |
|---|---|
| Product (brief, PRD v3) | Written, decisions from Martin applied; review pending |
| UX (DESIGN / EXPERIENCE specs) | Written on PRD v3; some gaps listed in OPEN-QUESTIONS |
| Copy | Landing **v6** (growth angle) + messaging kit v6 + product text inventory (155 strings) |
| Legal | Short placeholders only (privacy policy, consents) — needs lawyer review |
| Tech | Wallet research done; architecture not started. Apple + Google approvals are the critical path |
| Prototype | Clickable single-file HTML (`prototype/index.html`), UX-focused, not visual design |
| Landing (pre-launch) | Deployable Next.js app in `web/` — copy v6, interest-registration form, lead storage + CSV export. See [Landing](#landing-web) |
| Launch blockers | Name, WhatsApp number, legal texts, Google publishing access, Apple enrollment |

## Repo layout
```
README.md            this file
DECISIONS.md         Martin's confirmed decisions (source of truth when docs disagree)
OPEN-QUESTIONS.md    merged, de-duplicated open questions + contradictions between docs
web/                 merchant landing (Next.js, App Router, TypeScript) — see "Landing" below
docs/
  product/  brief.md, prd.md (PRD v3), addendum.md, montevideo-pilot-sizing.md
  ux/       design-spec.md (ex DESIGN.md), experience-spec.md (ex EXPERIENCE.md)
  copy/     landing-copy.md (v6), messaging-kit.md (v6), copy-inventory.md, landing-v5-review.md
  tech/     wallet-technical-research.md (latest), apple-wallet-research.md, google-wallet-research.md
  legal/    privacy-policy.md, consents.md (placeholders)
prototype/  index.html (open in a browser; top "Prototipo" bar to navigate) + screenshots/
archive/    superseded versions, kept for history (never edited)
```

## Conventions
- Only the latest version of each doc lives under `docs/`; older versions go to `archive/` with the version in the filename.
- Filenames are kebab-case. Docs are in Spanish (voseo) or English as originally written.
- Edits made while consolidating are tagged inline `*[repo: actualizado …]*`.
- Owners: Mary (analysis/brief), John (PRD), Sally (UX), Lucía (copy), Winston (architecture), Amelia (dev), Martin (decisions).
- Rule: no invented numbers, testimonials or citations; undefined things are marked `[PENDIENTE]`.

## Decisions log (summary)
See `DECISIONS.md`. Headline: cafés only, Uruguay first, growth positioning («Sumá clientes nuevos. Hacé que los de siempre vuelvan.»), 199→399 UYU, cancel anytime from the panel (effective end of paid month).

## Not included (on purpose)
- `leads/` (Montevideo leads CSV — contains business contact data; source of truth is a Google Sheet).
- Raw market-research downloads (IMM/INE CSV/XLS/HTML/zip) behind `montevideo-pilot-sizing.md`.

---

## Landing (`web/`)

Real, deployable merchant landing for the **pre-launch lead campaign**: café owners read the pitch and register interest; the team reaches out manually by WhatsApp. Built from `docs/copy/landing-copy.md` (v6, verbatim), `docs/ux/design-spec.md` + `experience-spec.md` (S1 only) and `prototype/index.html` (landing view). The customer flow, Wallet pass and barista panel are **not** built.

Stack: Next.js 16 (App Router, TypeScript), Tailwind 4, shadcn/ui primitives, Zod. Static landing (prerendered) + two Route Handlers. Mobile-first, `lang="es-UY"`, 48 px touch targets, visible labels, error summary with focus management, `prefers-reduced-motion` respected.

### What is in it

| Path | What |
|---|---|
| `web/src/config/site.ts` | **The only file to touch to publish**: `{{marca}}`, WhatsApp number, razón social, contact email, privacy/terms links. Each value can also come from a `NEXT_PUBLIC_*` env var |
| `web/src/content/landing.ts` | All copy (v6) as constants. Every deviation from v6 is marked `// CAMBIO vs v6:` or `// NUEVO` |
| `web/src/app/page.tsx` + `components/landing/*` | Sections 1–12 of copy v6: header, hero (with the **visible image placeholder** — animation to be designed later), «Del primer café al cliente de siempre», «Cómo funciona», «Más motivos para que te elijan», «Antes de que lo preguntes», precio, formulario, bloque WhatsApp, FAQ, CTA final, footer |
| `web/src/components/landing/registration-form.tsx` | «Registro de interés»: nombre del café, tu nombre, número (prefijo +598 editable, guardado en E.164), barrio, email (opcional), Instagram (opcional). Rubro oculto fijo `café`. Validación al salir del campo y al enviar, resumen de errores con foco, botón «Anotando…», error de red conservando datos, éxito que reemplaza el formulario |
| `web/src/app/api/registro/route.ts` | `POST` — valida (Zod), honeypot, rate limit, guarda en el `LeadStore` |
| `web/src/app/api/admin/leads.csv/route.ts` | `GET` — exporta CSV (UTF-8 con BOM) protegido por `ADMIN_EXPORT_TOKEN` |
| `web/src/lib/leads/` | `LeadStore` interface + implementations: `redis` (Upstash), `file` (local JSONL), `webhook` (Google Sheet / Make / Slack…), `memory` |
| `web/src/lib/rate-limit.ts` | 5 envíos / 10 min por IP (Redis si está configurado; si no, memoria por instancia) |
| `web/src/app/privacidad/page.tsx` | Placeholder of the privacy policy (`docs/legal/privacy-policy.md`), flagged as draft |

### Run locally

```bash
cd web
pnpm install
cp .env.example .env.local      # optional; everything has a local default
pnpm dev                        # http://localhost:3000
```

Without any env var, submissions are appended to `web/.data/leads.jsonl` (git-ignored). To try the CSV export locally set `ADMIN_EXPORT_TOKEN` (≥16 chars) in `.env.local` and open `http://localhost:3000/api/admin/leads.csv?token=<token>`.

Checks: `pnpm lint`, `pnpm build`.

### How submissions are stored

`getLeadStore()` (`web/src/lib/leads/index.ts`) picks the implementation from the environment:

1. `LEADS_STORE=redis|file|webhook|memory` forces one.
2. Upstash Redis configured → **`redis`** (list `leads:v1`, `LPUSH`/`LRANGE`). If `LEADS_WEBHOOK_URL` is also set, each lead is additionally POSTed there as an **internal notification** (FR-L03); a webhook failure never loses the lead.
3. Only `LEADS_WEBHOOK_URL` → **`webhook`**: each lead is POSTed as JSON `{ "type": "lead.created", "secret": "...", "lead": {...} }`. Stores nothing locally, so `/api/admin/leads.csv` answers `501` (the sheet is the export).
4. Not on Vercel (local dev) → **`file`** (`.data/leads.jsonl`).
5. On Vercel with nothing configured → the API answers `503` and logs a clear error. Leads are never dropped silently.

Recommended on Vercel without paid services: **Upstash Redis** from the Vercel Marketplace (free tier, no card). Installing it injects `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` automatically (legacy `KV_REST_API_URL` / `KV_REST_API_TOKEN` also work). The same Redis backs the global rate limit.

Google Sheet option (webhook): create a Sheet → Extensions → Apps Script → paste, deploy as *Web app* (execute as you, access: anyone), and put the `/exec` URL in `LEADS_WEBHOOK_URL`:

```js
const SECRET = "same value as LEADS_WEBHOOK_SECRET";
function doPost(e) {
  const body = JSON.parse(e.postData.contents);
  if (SECRET && body.secret !== SECRET) return ContentService.createTextOutput("forbidden");
  const l = body.lead, u = l.utm || {};
  SpreadsheetApp.getActiveSheet().appendRow([
    l.createdAt, l.businessName, l.contactName, l.phone, l.email || "", l.instagram || "",
    l.barrio, l.businessType, u.source || "", u.medium || "", u.campaign || "", l.id,
  ]);
  return ContentService.createTextOutput("ok");
}
```

Lead record: `id`, `createdAt` (ISO), `businessName`, `contactName`, `phone` (E.164, e.g. `+59899123456`), `email?`, `instagram?` (handle without `@`), `barrio`, `businessType` (`café`), `utm?` (`source/medium/campaign`, captured from the landing URL).

### Env vars

All optional for local dev; see `web/.env.example`.

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_BRAND_NAME` | Product name (B1). Default `{{marca}}`, rendered as a visible placeholder |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Consultation number, international without `+` (B2/OQ-4). Default `598XXXXXXXX`; while it is the placeholder the landing shows a «NÚMERO A DEFINIR» notice |
| `NEXT_PUBLIC_SITE_URL` | Public URL (B6), for metadata / Open Graph |
| `NEXT_PUBLIC_LEGAL_NAME`, `NEXT_PUBLIC_CONTACT_EMAIL` | Footer / privacy page (B3) |
| `NEXT_PUBLIC_PRIVACY_URL`, `NEXT_PUBLIC_TERMS_URL` | Legal links (B3). Defaults: `/privacidad` placeholder page; terms shown as `[PENDIENTE]` without link |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Lead storage + global rate limit (injected by the Upstash integration) |
| `LEADS_WEBHOOK_URL`, `LEADS_WEBHOOK_SECRET` | Webhook storage / notification (Apps Script, Make, Slack…) |
| `LEADS_STORE` | Force `redis` / `file` / `webhook` / `memory` |
| `ADMIN_EXPORT_TOKEN` | **Required for the CSV export** (≥16 chars). `GET /api/admin/leads.csv` with `Authorization: Bearer <token>` or `?token=<token>` |
| `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_SEC` | Anti-spam (default 5 per 600 s per IP) |

### Deploy on Vercel (repo on Origin)

1. **Vercel → Add New → Project → Import Git Repository.** If Origin is listed among the Git providers, pick this repo and continue. If not (Vercel's native integrations are GitHub, GitLab, Bitbucket and Azure DevOps), either:
   - deploy from the CLI: `cd web && npx vercel link && npx vercel --prod` (and re-run `vercel --prod` after each push to `main`), or
   - mirror `main` to a GitHub repo that Vercel imports (`git remote add github … && git push github main`).
2. Project settings: **Root Directory = `web`**, Framework = Next.js (auto), Install = `pnpm install`, Build = `pnpm build`. No `vercel.json` needed.
3. **Storage:** Vercel → Storage / Marketplace → **Upstash Redis** → connect to the project (this sets the `UPSTASH_*` vars). Or set `LEADS_WEBHOOK_URL` instead.
4. **Env vars (Production):** `ADMIN_EXPORT_TOKEN` (generate: `openssl rand -hex 24`), and the `NEXT_PUBLIC_*` values as they get decided (`NEXT_PUBLIC_WHATSAPP_NUMBER` first). `NEXT_PUBLIC_*` values are baked in at build time: redeploy after changing them.
5. Deploy. Smoke test: open `/`, submit the form, then download `/api/admin/leads.csv?token=…`.
6. Point the domain (B6) at the project and set `NEXT_PUBLIC_SITE_URL`.

### Copy changes vs. landing v6 (flagged)

The campaign is pre-launch, so the form had to read as *registering interest*. Everything else is v6 word for word.

| Where | v6 | Landing | Why |
|---|---|---|---|
| CTA button (hero, precio, formulario, CTA final) | «Registrar mi café» | **«Anotar mi café»** | «Registrar» reads as signing up for the live service |
| Button loading state | «Registrando…» | **«Anotando…»** | Follows the CTA |
| Form support text | «Son dos datos. Después te escribimos nosotros.» | **«Son pocos datos. Todavía no lanzamos: anotate y te escribimos nosotros.»** | More than two fields; states pre-launch |
| Success message | «…Alguien del equipo te va a escribir por WhatsApp para ponerte en marcha.» | «…Alguien del equipo te va a escribir por WhatsApp **para contarte cuándo arrancamos y** ponerte en marcha.» | Sets the expectation that launch comes first |
| New field labels (not in v6) | — | «Tu nombre (obligatorio)», «Barrio de tu café (obligatorio)», «Email (opcional)», «Instagram de tu café (opcional)» + their errors | Fields requested for the lead campaign |
| Rate-limit error (not in v6) | — | «Hiciste demasiados envíos seguidos. Probá de nuevo en unos minutos.» | Anti-spam response |

Kept unchanged on purpose: offer line («Registrate ahora y pagá 199 UYU…»), «Sumá tu café», «Qué pasa después», network error, header/WhatsApp copy, all sections and FAQ.

### What is needed to go live

- [ ] **WhatsApp number** (B2/OQ-4) → `NEXT_PUBLIC_WHATSAPP_NUMBER` or `site.ts`. Hard blocker: the landing shows a visible «NÚMERO A DEFINIR» notice until then.
- [ ] **Product name** (B1) → `NEXT_PUBLIC_BRAND_NAME`. Until then `{{marca}}` is rendered as a visible placeholder.
- [ ] **Legal**: razón social, contact email, lawyer-reviewed privacy policy, offer T&C (B3) → `NEXT_PUBLIC_LEGAL_NAME`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_PRIVACY_URL`, `NEXT_PUBLIC_TERMS_URL`.
- [ ] **Storage on Vercel**: connect Upstash Redis (or set the webhook) and set `ADMIN_EXPORT_TOKEN`.
- [ ] **Domain** (B6) + `NEXT_PUBLIC_SITE_URL`.
- [ ] Sign-off on the flagged copy changes (Lucía / Martin).
- [ ] Hero image / animation (U9) — placeholder stays visible until designed.
- [ ] Optional: internal alert channel per lead (P13) via `LEADS_WEBHOOK_URL`; analytics (visits, registrations, WhatsApp clicks — EXPERIENCE §6) not included.
