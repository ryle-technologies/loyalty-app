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
| Launch blockers | Name, WhatsApp number, legal texts, Google publishing access, Apple enrollment |

## Repo layout
```
README.md            this file
DECISIONS.md         Martin's confirmed decisions (source of truth when docs disagree)
OPEN-QUESTIONS.md    merged, de-duplicated open questions + contradictions between docs
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
