# Montevideo loyalty SaaS pilot — market sizing research

**Date:** 2026-09-16 (Europe/Madrid)  
**Product:** no-app digital stamp card (“buy X, get 1 free”) for in-person shops (cafés, salons/barbers, boutiques, similar)  
**Monetization direction:** subscription per location (price **not** set by product owner yet)  
**Method rule:** every statistic below was taken from a source URL actually fetched for this memo, or is an explicitly labeled **scenario calculation** from stated assumptions. Gaps are marked.

---

## 1. Executive summary (founder-friendly)

Montevideo has a **real, countable base of in-person food venues** that fit stamp-card use. From Intendencia de Montevideo open data (downloaded 2026-09-16):

- **7,794** food-related locales currently marked **Habilitado**.
- **~610** of those have the giro **“Cafetería”** (exact giro match among habilitados).
- A **stamp-friendly food-service proxy** (cafetería / restaurante / pizzería / bar / minutas / comidas al paso / parrillada / heladería / cantina / bocatas) is about **2,036** habilitados.
- A broader food+bakery/rotisserie proxy is about **3,130** habilitados.

National Uruguay (INE Directorio 2024, total país — **Montevideo share not published in these tables**):

- **7,568** private legal entities in CIIU **56** (Servicio de alimento y bebida).
- **55,026** in CIIU **47** (comercio minorista, broad).
- **14,261** in CIIU **96** (“Otras actividades de servicios” — **includes** hair/beauty among other personal services; **no 9602 split published** in the file we fetched).
- Mipymes were **99.58%** of firms and **67.72%** of formal private ICS employment in **2023** (INE).

BPS (comercio section G, Jan–Aug 2023 average): **22,470** comercio firms in **Montevideo** out of **58,680** national (**38.3%**). That is a **Montevideo share for comercio only**, not for cafés or salons.

**Beauty salons / boutiques:** no Montevideo-specific official count found for peluquerías/barberías or apparel boutiques alone. Treat as **gap**.

**Digital context (national, EUTIC 2024):** **98%** of households have a cellphone; **92%** of people 14+ use internet; among online shoppers, **~60%** use debit/online transfer and **~49%** credit. Supports a wallet/QR “no app” pitch, but does **not** measure wallet-pass adoption.

**Pricing comps (public pages; not “our” price):** local LatAm entry often **~USD 25–49/location/month**; mid **~USD 69–99**; upper SMB loyalty **~USD 95–167**. Uruguay competitor **Fielza** publishes **USD 29** and **USD 99**/month.

**Pilot revenue scenarios (not forecasts):** at **10 / 30 / 50** paying shops × assumed ARPU **USD 25 / 45 / 75** per month → annual run-rate roughly **USD 3k–45k**. See §5.

**Honest pilot ask:** aim for **~10–30 paying locations in 6–12 months** (founder-led SMB sales), not “capturing” the 2k+ food proxy. Total addressable in Montevideo is **thousands of candidate doors** across food + (unknown) beauty/retail; **pilot success is conversion and retention, not TAM**.

---

## 2. Sourced establishment counts / proxies

### 2.1 Montevideo — locales alimentarios (Intendencia)

**Source dataset:** Intendencia de Montevideo / Catálogo de Datos Abiertos — “Habilitación – Registro de locales y empresas alimentarias”  
- Catalog: https://catalogodatos.gub.uy/dataset/habilitacion-registro-de-locales-y-empresas-alimentarias  
- CSV packages fetched:  
  - https://datos-abiertos.montevideo.gub.uy/datos_locales_real.zip  
  - https://datos-abiertos.montevideo.gub.uy/datos_locales_giros_real.zip  
- Related: https://catalogodatos.gub.uy/dataset/empresas-alimentarias  

**What we counted (primary analysis of the CSVs on 2026-09-16):**

| Metric | Count | Notes |
| --- | ---: | --- |
| Rows in `datos_locales_real.csv` | 10,338 | All registered food locales in dump |
| Estado **Habilitado** | **7,794** | Primary “open/authorized” proxy |
| Estado Vencido | 2,516 | Not treated as active |
| Estado En trámite | 28 | |
| Unique habilitados with exact giro **Cafetería** | **610** | From giros table ∩ habilitados |
| Unique habilitados, class **Preparación y Servicio de Alimentos** | **2,964** | Class-level proxy for food service |
| Stamp-friendly food-service union (see definition*) | **2,036** | Overlapping giros collapsed to unique locales |
| Broader union + panadería / confitería / rotisería | **3,130** | Wider SMB stamp candidates in food |

\*Stamp-friendly union keywords on `DESCRIPCION_GIRO`: cafetería, restaurante, pizzería, bar, minutas, comidas al paso, parrillada, heladería, cantina, bocatas (case-insensitive). Locales can have multiple giros; counts are **unique `RALOCA_ID` among Habilitado**.

**Illustrative giro hits among habilitados (not additive):** Cafetería 610; Restaurante 425; Pizzería 416; Bar 361; Minutas 584; Panadería 486; Confitería 722; Rotisería 1,133; Parrillada 143; Heladería 69; Cantina 205.

**Caveats:**  
- Dataset is **food/bromatología only** — **excludes** beauty salons and most non-food retail.  
- “Habilitado” ≠ “would buy SaaS.” Includes many formats (rotiserías, cantinas, etc.) that may or may not fit stamp cards.  
- Montevideo-only; good geographic fit for a city pilot.

### 2.2 Uruguay national — INE Directorio de Empresas y Establecimientos

**Source page:** https://www.gub.uy/instituto-nacional-estadistica/datos-y-estadisticas/estadisticas/directorio-empresas-establecimientos  

**Files fetched:**  
- 2024: `DE_4_1_1_24.xls` (Entidades jurídicas, sector privado, CIIU Rev. 4, total país)  
- 2023: `DE_4_1_1_23.xls`  

Direct links (from INE page):  
- https://www5.ine.gub.uy/documents/Estadísticaseconómicas/SERIES%20Y%20OTROS/Directorio%20de%20empresas%20y%20establecimientos/Entidades%20Jurídicas%20-%20Total%20País/DE_4_1_1_24.xls  
- https://www5.ine.gub.uy/documents/Estadísticaseconómicas/SERIES%20Y%20OTROS/Directorio%20de%20empresas%20y%20establecimientos/Entidades%20Jurídicas%20-%20Total%20País/DE_4_1_1_23.xls  

| Geography | Year | Series | Count | Source |
| --- | --- | --- | ---: | --- |
| **Uruguay (national)** | 2024 | Total private legal entities | **230,449** | INE DE_4_1_1_24 |
| Uruguay | 2024 | CIIU **56** Servicio de alimento y bebida | **7,568** | same |
| Uruguay | 2024 | Sección **I** Alojamiento y servicios de comida | **8,789** | same (55+56) |
| Uruguay | 2024 | CIIU **47** Comercio al por menor (ex. vehicles) | **55,026** | same |
| Uruguay | 2024 | Sección **G** Comercio (45+46+47) | **73,940** | same |
| Uruguay | 2024 | CIIU **96** Otras actividades de servicios | **14,261** | same — **not** beauty-only |
| Uruguay | 2023 | CIIU 56 | **7,057** | INE DE_4_1_1_23 |
| Uruguay | 2023 | CIIU 47 | **51,997** | same |
| Uruguay | 2023 | CIIU 96 | **12,868** | same |

**Montevideo share:** **not published** in these national division tables. Do **not** apply BPS comercio’s 38.3% to food or beauty without a sourced bridge.

**Anuario HTML cross-check (older years on web):** https://www.gub.uy/instituto-nacional-estadistica/comunicacion/publicaciones/anuario-estadistico-nacional-2023-volumen-n-100/41-caracteristicas — shows CIIU 56 = 7,539 and CIIU 47 = 51,072 for **2022** (consistent order of magnitude with XLS above).

### 2.3 Uruguay / Montevideo — MIPYMES & comercio (BPS)

| Metric | Value | Geography | Source |
| --- | --- | --- | --- |
| Mipymes share of firms (2023) | **99.58%** | Uruguay | https://www.gub.uy/instituto-nacional-estadistica/comunicacion/publicaciones/empresas-mpymes-uruguay |
| Mipymes share of formal private ICS employment (2023) | **67.72%** | Uruguay | same |
| Comercio firms (sección G), Jan–Aug 2023 avg | **58,680** | Uruguay | BPS PDF https://www.bps.gub.uy/bps/file/21412/1/107.-analisis-de-las-empresas-con-actividades-relativas-al-comercio-por-mayor-y-menor-en-uruguay.-ec.-m.-naranja.pdf |
| Comercio firms in **Montevideo** (same period) | **22,470** (**38.3%**) | Montevideo | same BPS PDF |
| Comercio firms Canelones | 8,646 (14.7%) | Canelones | same |

**Use:** Montevideo is clearly the densest comercio market. Still **not** a café/salon census.

### 2.4 Beauty salons / barbers / boutiques

| Need | Status |
| --- | --- |
| Montevideo peluquerías / barberías / salones | **GAP** — not in food locales dataset; no departmental count found in INE tables fetched |
| National CIIU **9602** (hairdressing & beauty) | **GAP** — INE file gives only división **96** aggregate (14,261 in 2024) |
| Apparel / boutique retail | **GAP** — only broad CIIU **47** (55,026 national) |

---

## 3. Gaps / unknowns

1. **Montevideo share** of INE CIIU 56 / 47 / 96 — unknown from fetched tables.  
2. **Beauty / barber / salon** counts for Montevideo — unknown.  
3. **Boutique / specialty retail** suitable for stamp cards — unknown beyond broad retail.  
4. **Willingness to pay** / current loyalty tool penetration among Montevideo SMBs — no survey found.  
5. **Apple/Google Wallet pass adoption** among Uruguay consumers — not in EUTIC extract we fetched.  
6. Food dataset includes many non-café formats; **fit rate** for stamp cards is a product/sales judgment, not a statistic.  
7. Competitor **ARPU in Uruguay** beyond published list prices (discounts, churn) — unknown.

---

## 4. Optional digital context (Uruguay only, sourced)

**EUTIC 2024** (INE + Agesic), report PDF fetched:  
https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/2025-11/_Informe_EUTIC_2025.pdf  

| Indicator | Figure | Scope |
| --- | --- | --- |
| Households with ≥1 cellphone | **98%** | Uruguay |
| Households with internet | **94%** | Uruguay |
| Internet users (14+, last 3 months) | **92%** | Uruguay |
| Daily internet users | **84%** | Uruguay |
| Online shoppers (last 3 months) | **~48%** of people | Uruguay |
| Among online shoppers: debit or online bank transfer | **60%** | Uruguay (multi-select) |
| Among online shoppers: credit card online | **49%** | Uruguay (multi-select) |
| Montevideo vs interior online shopping | **57%** vs **42%** | Regional split in EUTIC |

**Interpretation for product:** high phone/internet penetration supports QR + Wallet flows. **Does not** prove merchants will pay for loyalty SaaS.

---

## 5. Pricing comps (public pages — comps only, not “our price”)

Fetched / verified pricing pages:

| Product | Geography (page) | Published price | URL |
| --- | --- | --- | --- |
| **Loopy Loyalty** (wallet stamp cards, closest feature peer) | Global | Starter **USD 25**/mo; Growth **USD 69**/mo; Ultimate **USD 95**/mo (annual also listed) | https://loopyloyalty.com/pricing/ |
| **Square Loyalty** | AU public page | **USD 49 / 99 / 149** per location / month by loyalty-visit tier | https://squareup.com/au/en/software/loyalty |
| **Loyalzoo** | Global | Grow **USD 77**/mo; Smart **USD 167**/mo; Multi custom | https://loyalzoo.com/pricing/ |
| **Fielza** (Uruguay, no-app QR/Wallet stamps) | Uruguay | Inicio **USD 29**/mo; Crecimiento **USD 99**/mo; Enterprise custom | https://fielza.com/ |
| **ElevateLoyalty** | Chile | Freemium **CLP 0** (≤20 clients); Ilimitado **CLP 47,000**/mo (IVA incluido) | https://elevateloyalty.cl/ |

**Implied ARPU bands for scenario math (labeled ASSUMPTION, informed by comps):**

| Band | Assumed monthly ARPU (USD / location) | Rationale (comps, not our price) |
| --- | ---: | --- |
| Low | **25** | Near Loopy Starter / Fielza entry |
| Mid | **45** | Near Square entry / between Fielza tiers |
| High | **75** | Near Loopy Ultimate / Loyalzoo Grow |

Currency note: ElevateLoyalty kept in **CLP** (no FX conversion invented here).

---

## 6. Pilot revenue SCENARIOS (not forecasts)

**Assumptions (explicit):**  
- Paying shops = locations on a monthly subscription.  
- ARPU bands = **ASSUMPTION** table above (comps-informed).  
- Annual run-rate = `shops × ARPU × 12` (no churn, taxes, or discounts modeled).  
- These are **illustrative scenarios**, not market forecasts or commitments.

### Scenario A — 10 paying shops

| ARPU band | Monthly | Annual run-rate |
| --- | ---: | ---: |
| Low $25 | $250 | **$3,000** |
| Mid $45 | $450 | **$5,400** |
| High $75 | $750 | **$9,000** |

### Scenario B — 30 paying shops

| ARPU band | Monthly | Annual run-rate |
| --- | ---: | ---: |
| Low $25 | $750 | **$9,000** |
| Mid $45 | $1,350 | **$16,200** |
| High $75 | $2,250 | **$27,000** |

### Scenario C — 50 paying shops

| ARPU band | Monthly | Annual run-rate |
| --- | ---: | ---: |
| Low $25 | $1,250 | **$15,000** |
| Mid $45 | $2,250 | **$27,000** |
| High $75 | $3,750 | **$45,000** |

**Fielza-anchored alternate (if pricing like local comp):** 30 shops × $29 = **$10,440**/yr; 30 × $99 = **$35,640**/yr — still scenarios, not forecasts.

---

## 7. Qualitative: “potential number” for a pilot vs addressable

| Lens | Honest reading |
| --- | --- |
| **Door-level addressable (Montevideo food)** | On the order of **~2,000** stamp-friendly food habilitados (proxy), up to **~3,000+** if bakeries/rotiserías included; plus **unknown** beauty/retail. |
| **National food entities (INE 56)** | **~7,600** — Uruguay-wide, not Montevideo. |
| **Realistic pilot (6–12 months)** | For a new B2B SMB tool sold founder-led in one city: **~10–30 paying shops** is a credible working target; **50** is an aggressive stretch unless channels/partners exist. |
| **What “potential” should mean** | Validation of activation, retention, and willingness-to-pay — **not** “we can get X% of 7,794.” |
| **Competition** | At least one Uruguay entrant (**Fielza**) already prices no-app wallet stamps at **$29–$99**. Pilot should assume merchants can compare. |

---

## 8. Recommendation — pilot shop targets (not revenue promises)

1. **Primary beachhead:** cafés + small food-service (use Intendencia “Cafetería” ~**610** habilitados and the ~**2,000** stamp-friendly food proxy as **outreach universe**, not sales forecast).  
2. **Pilot KPI (6–12 months):** **10–30 paying locations** (start with a free/paid pilot cohort of ~15–40 logos to land ~10–30 paying).  
3. **Stretch:** **50 paying** only if a channel (POS reseller, chamber, coffee supplier) is signed.  
4. **Pricing:** leave unset; use comps to **test** bands near **USD 25–49** entry and **USD 70–99** with notifications/features — validate against Fielza.  
5. **Do not** pitch national INE totals or BPS comercio as Montevideo café TAM.  
6. **Next research (if needed):** scrape/classify non-food directories or request INE 4-digit 9602 / departmental cuts; walk Montevideo barrios for salon/boutique density.

---

## 9. Source checklist (fetched for this memo)

| Source | URL |
| --- | --- |
| IMM locales alimentarios catalog | https://catalogodatos.gub.uy/dataset/habilitacion-registro-de-locales-y-empresas-alimentarias |
| IMM locales CSV zip | https://datos-abiertos.montevideo.gub.uy/datos_locales_real.zip |
| IMM giros CSV zip | https://datos-abiertos.montevideo.gub.uy/datos_locales_giros_real.zip |
| IMM empresas alimentarias | https://catalogodatos.gub.uy/dataset/empresas-alimentarias |
| INE Directorio page | https://www.gub.uy/instituto-nacional-estadistica/datos-y-estadisticas/estadisticas/directorio-empresas-establecimientos |
| INE DE_4_1_1_24.xls / 23.xls | via www5.ine.gub.uy links on Directorio page |
| INE Anuario 4.1.1 (2022 figures on HTML) | https://www.gub.uy/instituto-nacional-estadistica/comunicacion/publicaciones/anuario-estadistico-nacional-2023-volumen-n-100/41-caracteristicas |
| INE Mipymes | https://www.gub.uy/instituto-nacional-estadistica/comunicacion/publicaciones/empresas-mpymes-uruguay |
| BPS comercio analysis PDF | https://www.bps.gub.uy/bps/file/21412/1/107.-analisis-de-las-empresas-con-actividades-relativas-al-comercio-por-mayor-y-menor-en-uruguay.-ec.-m.-naranja.pdf |
| EUTIC 2024 PDF | https://www.gub.uy/agencia-gobierno-electronico-sociedad-informacion-conocimiento/sites/agencia-gobierno-electronico-sociedad-informacion-conocimiento/files/2025-11/_Informe_EUTIC_2025.pdf |
| Loopy Loyalty pricing | https://loopyloyalty.com/pricing/ |
| Square Loyalty pricing (AU) | https://squareup.com/au/en/software/loyalty |
| Loyalzoo pricing | https://loyalzoo.com/pricing/ |
| Fielza | https://fielza.com/ |
| ElevateLoyalty Chile | https://elevateloyalty.cl/ |

---

*End of memo. All scenario revenue figures are arithmetic from stated assumptions only.*


---

## Pricing update (Martin, 2026-09-16)

Working monthly price band: **USD 9–14 per location** (product-owner direction; not buyer-validated).

### Pilot revenue scenarios at $9 / $14 ARPU (not forecasts)

Annual run-rate = shops × monthly ARPU × 12.

| Paying shops | @ $9/mo | @ $14/mo |
| --- | ---: | ---: |
| 10 | $1,080 | $1,680 |
| 30 | $3,240 | $5,040 |
| 50 | $5,400 | $7,200 |
| 100 | $10,800 | $16,800 |

At this band, a **10–30 shop pilot** is roughly **USD 1k–5k / year** of ARR — useful for learning, not for covering full SaaS build alone. Comps in this memo (Fielza $29/$99, Loopy $25+, Square Loyalty $45+) sit **above** this range; the wedge is price + simplicity, with a later upsell path (messaging v2, multi-location) as an open product/pricing question.
