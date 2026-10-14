# Open questions (merged, de-duplicated)

Sources: PRD §9 (OQ-n), EXPERIENCE §7 (OQ-S n), wallet-technical-research §10 (D-A…D-G), copy inventory §10–11 (J-n, S-n), landing v6 / kit v6 pending lists, earlier Apple/Google notes. Original IDs kept in brackets. Resolved items are listed at the bottom.

## 🚫 Launch blockers
| ID | Question | Owner | Source |
|---|---|---|---|
| B1 | Product name / logo / brand (`{{marca}}`) | Martin | brief, landing, legal |
| B2 | WhatsApp number for landing consultations | Martin | [OQ-4], DESIGN S1, E23 |
| B3 | Final legal texts: privacy policy, consents (a)/(b), text versioning, offer T&C; contact email `{{email}}`; URCDP registration | Martin / lawyer | [OQ-S11], legal/, landing §footer |
| B4 | Google Wallet publishing access (issuer starts in demo mode; no published review time) | Martin / Winston | wallet-tech §2.2 |
| B5 | Apple Developer enrollment (individual vs company, D-U-N-S, domain email, live website) | Martin | wallet-tech §2.1, D6 |
| B6 | Landing URL / domain (`{{link_landing}}`) | Martin | kit v6 |

## Martin — tech decisions (Winston's list)
| ID | Question | Owner |
|---|---|---|
| T1 | Apple/Google accounts under Martin (individual; his name shows as seller) or a Uruguayan company? [D-A] | Martin |
| T2 | Start both enrollments this week in parallel with the build? (Winston: yes) [D-B] | Martin |
| T3 | Issuer name: product brand as issuer, café as program name? [D-C] — tied to Pass Type ID tenancy [OQ-S14] | Martin / Winston |
| T4 | If Google is late: iPhone-only soft launch, or wait? [D-D] | Martin |
| T5 | Accept Google-controlled lock-screen text («Te falta 1» only as in-Wallet message on Android; 3 notifying updates/24h)? [D-E] | Martin |
| T6 | Confirm no fallback for non-Wallet customers (D3), or measure after café #1? [D-F] | Martin |
| T7 | Build signing/push in-house (recommended) or pay a pass platform? [D-G] | Martin |
| T8 | Paying Apple USD 99/yr with a Uruguayan card — unverified | Martin |
| T9 | Real-device test in Montevideo (iPhone + Android) before café #1; also validate Wallet char limits | Winston / Lucía |
| T10 | Apple pass cert expiry alert + renewal runbook | Winston |
| T11 | Recovery code values: 6 digits, 10-min TTL, 5 attempts, 3 codes/hour (proposal) [OQ-9] | Winston / John / Martin |
| T12 | Transactional email provider for the OTP (pricing unverified) | Winston |

## Product (PRD)
| ID | Question | Owner |
|---|---|---|
| P1 | What triggers future WhatsApp reactivation of customers? [OQ-7] | Martin |
| P2 | What customers see on the pass after a café cancels; notify them; data retention [OQ-12] | Martin / John |
| P3 | Can the owner undo a cancellation before it takes effect? (proposal: yes) [OQ-13] | Martin |
| P4 | «Mes pagado» = calendar month or month from registration date? [OQ-14] | Martin |
| P5 | What happens if a café doesn't pay (panel cut off?); does the panel show plan/dates/bank details? [J-5, S-2] | Martin / John |
| P6 | Owner created the program with a mistake (rules locked): manual support? [OQ-S4] | John / Martin |
| P7 | Same email with different phone: allowed? which membership gets the code? [OQ-S5] | John / Winston |
| P8 | Customer lost email access: manual support in pilot? [OQ-S6] | John |
| P9 | Stamp with balance ≥ N (accumulate)? Redeem subtracts N and keeps the rest? [OQ-S7] | John |
| P10 | Search by the pass short code (altText) too? [OQ-S8] | John |
| P11 | Duplicate café registration: detect, or filtered in manual onboarding? [OQ-S9] | Martin |
| P12 | Does «¡Ya podés canjear…!» trigger a notification? [OQ-S10] | John |
| P13 | Internal alert channel for a new café registration [OQ-S12] | Martin |
| P14 | How many staff users per café and who creates them; login / forgot-password flow [OQ-S15, S-6] | Martin / Sally |
| P15 | Customer opt-out: deletes stamps or only deactivates? Re-join behavior? Last pass update «Te diste de baja» [J-6, J-7] | John |
| P16 | Who sends messages under consent (b): `{{café}}` or `{{marca}}` (controller)? [J-4] | Martin / lawyer |
| P17 | Growth promises need product: printable QR poster with the reward, shareable sign-up link (Instagram/Maps/WhatsApp). Add to PRD? | Martin / John |
| P18 | Owner will ask «how many customers joined?» — no dashboard; does the team share that number? | Martin |
| P19 | Help with program setup: «Te ayudamos a crear tu programa» — do we, or does the café do it alone in the panel? | Martin |

## UX / copy
| ID | Question | Owner |
|---|---|---|
| U1 | Visual identity: palette, logo, can the café pick pass colors? [OQ-S13] | Martin / Sally |
| U2 | Owner «Cuenta» area in the panel (cancel, undo, plan info, help) [S-1] | Sally |
| U3 | Recovery step 2 must stay neutral (don't reveal masked email) [S-3] | Sally |
| U4 | Pass-issuance failure screen after valid sign-up [S-8]; network error copy | Sally / Lucía |
| U5 | Printable till-QR poster and pass back-of-card text [S-9] | Sally / Lucía |
| U6 | Header CTA «Registrar mi café» or only hero anchor? Offer repeated 3× on mobile? | Sally |
| U7 | Consent notice «solo para tu tarjeta» vs WhatsApp kept for future reactivation [J-3] | Lucía / lawyer |
| U8 | Use the official localized Google «Agregar a Google Wallet» badge [J-9] | Sally |
| U9 | Hero stamp image + animation (placeholder only today) | Sally (later) |
| U10 | Apple `changeMessage` would fire on every status change, not only N−1 [S-5] | Winston / Sally |
| U11 | `wa.note` copy next to the mandatory WhatsApp field — confirm acceptable [C4] | John |

## ⚠️ Contradictions between docs
| ID | Contradiction | Resolution in this repo |
|---|---|---|
| X1 | Offer «50% bonificado» (brief, PRD FR-L01/FR-B01, DESIGN, EXPERIENCE) vs 199 UYU (≠ 199,50) and landing v6 | Martin chose 199 and no «50%». Offer string fixed in DESIGN/EXPERIENCE/PRD FR-L01/brief (tagged). PRD FR-B01 note «(50 % bonificado)», brief «6 meses bonificados», PRD §9 «6 meses al 50 %» and addendum «trial 6 meses al 50 %» left as-is → **John to clean up** |
| X2 | «Martin te va a contactar» (PRD FR-L02, DESIGN S1, EXPERIENCE F1/`merchant.registered`) vs «alguien del equipo» | Fixed (tagged). Brief D9 / PRD OQ-3 still say onboarding is «a cargo de Martin» — internal fact, left |
| X3 | Success message says «por WhatsApp», but Lucía [J-1] warns the merchant contact number may not be WhatsApp | **Martin/Lucía** |
| X4 | Visible «Rubro» field (DESIGN S1, EXPERIENCE F1) vs PRD hidden fixed `café` [S-7, OQ-S3] | Fixed in UX specs (tagged); OQ-S3 resolved |
| X5 | Daily caps 2/1 called a «supuesto» to confirm (PRD §9, EXPERIENCE OQ-S16) | Martin: keep in product, not on landing. **John to mark as decided** |
| X6 | EXPERIENCE OQ-S1 / brief: «PRD pending OK from Júlia (and Martin)» — Júlia not otherwise referenced | John: confirm who signs off |
| X7 | DESIGN S6 «perdés los sellos» on customer opt-out vs PRD FR-W06 (only deactivates) [J-7] | John |
| X8 | `montevideo-pilot-sizing.md` assumes multi-vertical shops and USD 9–14/month; current scope is cafés only at 199→399 UYU | Kept as historical research; scenarios are stale |
| X9 | `google-wallet-research.md` §5 says Uruguay availability «Unknown»; `wallet-technical-research.md` §11 says Google lists Uruguay | Latest (wallet-technical-research) wins |
| X10 | EXPERIENCE §4 landing copy «base» differs from landing v6 (headline, sections) | Landing v6 wins; Sally to sync spec |
| X11 | Landing «Te falta 1» promise vs Android: Google writes the lock-screen text itself | Copy already says «puede avisar»; see T5 |

## Resolved (for traceability)
OQ-1, OQ-2, OQ-3, OQ-5, OQ-6, OQ-8, OQ-10, OQ-11 (PRD §9) · OQ-S2 (offer → 199, no %) · OQ-S3 (cafés only, hidden rubro) · OQ-S16 (caps stay in product) · cancellation path & timing (PRD FR-X01–X02) · pilot success metric (D10) · VAT, transfer, no permanence, charged day one.
