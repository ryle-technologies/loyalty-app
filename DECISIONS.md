# Decisions (Martin, 2026-10-14)

Source of truth when a doc disagrees. IDs D1–D14 refer to `docs/product/brief.md`.

## Pricing & billing
| # | Decision | Where |
|---|---|---|
| P1 | 199 UYU/month for the first 6 months (from café registration), then 399 UYU/month. Offer is stated with the price, **not** as «50% bonificado» (199 ≠ 199,50) | D4, PRD FR-B01, landing v6 |
| P2 | Charged from day one; no free pilot period | PRD FR-B02 |
| P3 | Prices include IVA | D4 |
| P4 | Payment by bank transfer; logged manually in a spreadsheet | PRD FR-B03 |
| P5 | No minimum term, no penalty | PRD FR-B04 |
| P6 | Café cancels from the panel; effective at the end of the paid month | D14, PRD FR-X01–X02 |
| P7 | We don't touch how cafés charge their own customers | — |

## Scope & product
| # | Decision | Where |
|---|---|---|
| S1 | Cafés only for now (merchant category hidden, fixed `café`; no visible «rubro» field). Other businesses = future | D8, PRD FR-L02 |
| S2 | Uruguay first, voseo copy. Name must eventually work across LatAm and for a future wallet-of-cards | D5 |
| S3 | Daily caps per customer (2 stamps / 1 redemption) stay in the product (FR-P06) and the staff-only error; **never** mentioned on the landing or to the customer | PRD FR-P06 |
| S4 | Pilot success = ≥1 real redemption **and** café still active and pays month 2 | D10 |
| S5 | Each café configures stamps (3–15) and reward; 1 program per café; rules locked after creation | D11–D13 |
| S6 | No web fallback: customers without Wallet are out of the pilot (D3) — under review, see OPEN-QUESTIONS T6 | D3 |

## Copy & UX
| # | Decision |
|---|---|
| C1 | Positioning: growth — attract new customers and bring regulars back. Headline: **«Sumá clientes nuevos. Hacé que los de siempre vuelvan.»** («Sumá», not «Atraé», until the product has a real acquisition feature) |
| C2 | Merchant-facing contact is «alguien del equipo», never «Martin». Success message: «¡Listo! Recibimos tu registro. Alguien del equipo te va a escribir por WhatsApp para ponerte en marcha.» |
| C3 | Lucía's v5 review applied → landing v6 / kit v6 |
| C4 | Hero: placeholder for a stamp image with a «cool» animation — shown as a placeholder only, not built yet |
| C5 | Prototype focuses on UX (copy, layout, flow), not visual design |

## Legal
| # | Decision |
|---|---|
| L1 | Privacy policy and consents stay as **short placeholders** for now; lawyer review before publishing |
| L2 | The app is the data controller and registers the database with URCDP (D1) |

## Deferred / TBD
- Product name / logo — **TBD** (several rounds rejected).
- WhatsApp number for the landing — **TBD** (blocks publishing).
