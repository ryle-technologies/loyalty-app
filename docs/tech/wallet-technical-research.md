# Wallet technical research: Apple Wallet + Google Wallet for the stamp card (Uruguay café pilot)

| Field | Value |
|---|---|
| Author | Winston (Architect) |
| Date | 2026-10-14 (Europe/Madrid) |
| Inputs | `docs/product/prd.md` v3, `docs/product/brief.md` (D1–D9), `docs/product/addendum.md`, `docs/tech/apple-wallet-research.md` (2026-09-16), `docs/tech/google-wallet-research.md` (2026-09-16) |
| Status | Research for Martin's decisions. Not the architecture doc yet. |

**Rule:** every cost, limit, timeline and country claim below has an official Apple or Google URL next to it, fetched or re-checked on 2026-10-14. Anything I couldn't verify is marked **UNVERIFIED**. The two earlier notes still hold. This doc only adds to them, and §11 lists every place where it changes or tightens them.

---

## 0. TL;DR

- **Apple:** `storeCard` pass (.pkpass) signed with a Pass Type ID certificate plus WWDR G4. Updates go through our own HTTPS web service plus an empty APNs push. Cost: **USD 99/year** ([Apple enroll](https://developer.apple.com/programs/enroll/)). Enrolling as an **organization** needs a legal entity and a **D-U-N-S number**. Apple says the number takes up to 5 business days from D&B, then up to 2 more business days to reach Apple ([Apple D-U-N-S help](https://developer.apple.com/help/account/membership/D-U-N-S/)).
- **Google:** `LoyaltyClass` (one per program) plus `LoyaltyObject` (one per membership). Customers add the card through a JWT save link signed by a service account. Updates are a REST `PATCH`. New issuer accounts start in **Demo Mode** (testers only, "[TEST ONLY]" on the pass). Google has to **approve publishing access**, and **it publishes no timeline for that review** ([request publishing access](https://developers.google.com/wallet/retail/loyalty-cards/getting-started/request-publishing-access)). I found no Wallet API fee on the official pages (see §2.2).
- **Uruguay:** Google lists Uruguay as supported for Google Wallet ([Google Wallet supported countries](https://support.google.com/wallet/answer/12060037?hl=en)). Apple lists Uruguay for Apple Pay ([Apple Pay countries](https://support.apple.com/en-us/102775)). Apple does not publish a country list for **Wallet passes** specifically, so treat pass support as likely but **UNVERIFIED** until we test on a real iPhone in Montevideo.
- **Critical path:** the Google publishing approval (no SLA) and the Apple organization enrollment (legal entity + D-U-N-S). Start both **now**, in parallel with the build.

---

## 1. Pass types, identity, signing

### 1.1 Apple: `storeCard`
- Use the `storeCard` style for loyalty ([Creating a store card pass](https://developer.apple.com/documentation/walletpasses/creating-a-store-card-pass)).
- Pass identity is `passTypeIdentifier` + `serialNumber`. Neither `serialNumber` nor `authenticationToken` can change in an update (`docs/tech/apple-wallet-research.md` §3.5, [Adding a web service](https://developer.apple.com/documentation/walletpasses/adding-a-web-service-to-update-passes)).
- Signing: `manifest.json` (SHA-1 of every file), then a detached PKCS#7 signature with the Pass Type ID key, **including the WWDR G4 intermediate** ([WWDR intermediates](https://developer.apple.com/help/account/certificates/wwdr-intermediate-certificates/), [Building a pass](https://developer.apple.com/documentation/walletpasses/building-a-pass)).
- **Tenancy (proposal):** one Pass Type ID for the whole platform (`pass.<ourdomain>.stamps`). Each café's branding is set per pass through `organizationName`, `logoText`, colors and images. Apple allows several Pass Type IDs but doesn't prescribe a SaaS model (`docs/tech/apple-wallet-research.md` §3.7). With one ID we have one certificate to renew and one APNs topic.
- **Certificate lifecycle:** if the certificate expires, installed passes keep working but **we can't sign new passes or push updates**. If it's revoked, passes stop working properly ([Wallet get started](https://developer.apple.com/wallet/get-started/)). **UNVERIFIED:** how long the Pass Type ID certificate is valid. I didn't find it on an official page I could read today. Read the expiry date from the certificate when it's issued and alert 30 days before.

### 1.2 Google: `LoyaltyClass` / `LoyaltyObject`
- **Class = program** (FR-P07a): `id = ISSUER_ID.program_<uuid>`, plus the required `issuerName`, `programName`, `programLogo` and `reviewStatus` ([LoyaltyClass](https://developers.google.com/wallet/reference/rest/v1/loyaltyclass)). A class in `draft` can't have objects. Set it to `underReview` and it becomes approved.
- **Object = membership:** `id`, `classId` and `state` are required ([LoyaltyObject](https://developers.google.com/wallet/reference/rest/v1/loyaltyobject)). The stamps go in `loyaltyPoints.balance`.
- **Auth:** a Google Cloud project with the Wallet API enabled, plus a service account with a JSON key. That service account is invited as a **Developer** on the issuer. OAuth scope: `wallet_object.issuer` ([Auth](https://developers.google.com/wallet/retail/loyalty-cards/getting-started/auth/rest)).
- **Save link:** `https://pay.google.com/gp/v/save/<signed_jwt>`. The JWT is RS256-signed with the service account key. The safe JWT length is **1800 characters**, so create the object first with `insert` and have the JWT reference only its id. Saving needs a user **logged into a Google account** ([Issue for web](https://developers.google.com/wallet/retail/loyalty-cards/web), checked today).

---

## 2. Developer accounts, approvals, timelines, costs

### 2.1 Apple Developer Program
| Item | Fact | Source |
|---|---|---|
| Fee | **USD 99 per membership year**. "Prices may vary by region and are listed in local currency during enrollment." | [enroll](https://developer.apple.com/programs/enroll/) |
| Individual | Legal name, an Apple Account with 2FA, and the legal age of majority. **Your personal name is shown as the seller.** | same |
| Organization | Legal entity. **No DBAs or trade names.** D-U-N-S number, binding authority, an email on the company's domain, and a functional public website. | same |
| D-U-N-S | Free (Apple: "free in most jurisdictions"). Up to 5 business days from D&B, then up to 2 business days for Apple to receive it. Email D&B after 2 weeks. | [D-U-N-S help](https://developer.apple.com/help/account/membership/D-U-N-S/), [enrollment](https://developer.apple.com/help/account/membership/program-enrollment/) |
| Enrollment review time | **Not published by Apple → UNVERIFIED** | — |
| Payment | You pay by card during the purchase step. **UNVERIFIED:** whether Uruguayan-issued cards are accepted, or what the local-currency price is in UY. | [enroll](https://developer.apple.com/programs/enroll/) |

### 2.2 Google Wallet API issuer
| Item | Fact | Source |
|---|---|---|
| Sign-up | Pay & Wallet Console: public business name plus acceptance of the ToS and privacy policy | [issuer onboarding](https://developers.google.com/wallet/retail/loyalty-cards/getting-started/issuer-onboarding) |
| Demo Mode | Only Admin/Developer users or added test accounts can save the pass. It shows "[TEST ONLY]". | [publishing access](https://developers.google.com/wallet/retail/loyalty-cards/getting-started/request-publishing-access) |
| Publishing prerequisites | A complete **Business Profile** (including a **payments profile**) and ≥1 Passes Class. Screenshots are "no longer a requirement". | same |
| Review time | "The Google Wallet team will review … and notify you". **No duration published → UNVERIFIED.** | same |
| Fee | **No fee is stated** on the official onboarding, publishing or web-issuance pages I fetched. I found no explicit "free" statement either, so **UNVERIFIED**. Google Cloud project billing for this API is also **UNVERIFIED**. | pages above |

### 2.3 Realistic sequence (not a commitment)
1. Day 0: request the D-U-N-S (if we go the organization route), create the Google issuer account and the Cloud project, and start the build in Demo Mode.
2. About 1 week (Apple's own D&B upper bounds): enroll with Apple. The review time after that is unknown.
3. After the first class exists and the Business Profile is complete: request Google publishing access. The duration is unknown, so **don't promise cafés a launch date until it's approved.**

---

## 3. Issuing a pass from the web form (FR-C01..C05, FR-W01)

```
QR in the shop (program_id) → /alta/{program} → form (name, WhatsApp E.164, email, 2 checkboxes)
  → POST /memberships  (person upsert by phone; membership per program; consent rows; idempotent)
  → confirmation page: UA detection → show the right button(s)
     iOS:     GET /wallet/apple/{membership}.pkpass   (signed on the fly; Content-Type application/vnd.apple.pkpass)
     Android: Google `loyaltyobject.insert` (if not yet) → short JWT → https://pay.google.com/gp/v/save/<jwt>
     Desktop/unknown: show both + "abrilo en tu celular" QR
```
- **QR payload:** an opaque, random `membership_token` (≥128-bit, base32), never the phone number (PRD NFR security). The same value goes in Apple `barcodes[].message` and Google `barcode.value`. Use `PKBarcodeFormatQR` / `QR_CODE`.
- **Download links:** short-lived and signed (e.g. 15 min), so the `.pkpass` and the JWT can't be scraped by guessing ids.
- **MIME type:** `application/vnd.apple.pkpass` ([Distributing passes](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/DistributingPasses.html)).
- **Buttons:** use the official badges only: [Add to Apple Wallet guidelines](https://developer.apple.com/wallet/add-to-apple-wallet-guidelines/) and the Google brand guidelines with the Spanish (Latin America) assets ([brand guidelines](https://developers.google.com/wallet/retail/loyalty-cards/resources/brand-guidelines)).
- **"Added" metric (PRD §7):** Apple gives no save callback. A device **registration** on our web service is the proxy for "installed". Google offers `callbackOptions` on the class for save/delete callbacks (`docs/tech/google-wallet-research.md` §9.8, not tested yet).

---

## 4. Updating stamps and push (FR-W02..W04)

**Principle:** the ledger commits first. A wallet sync is an async job (outbox) that retries, and it never blocks the barista's tap.

### 4.1 Apple
- In the pass: `webServiceURL` (HTTPS) and a per-pass `authenticationToken` ([Adding a web service](https://developer.apple.com/documentation/walletpasses/adding-a-web-service-to-update-passes)).
- Endpoints we implement (Apple's PassKit web service protocol):
  - `POST /v1/devices/{deviceLibraryIdentifier}/registrations/{passTypeIdentifier}/{serialNumber}` (register a push token)
  - `DELETE` on the same path (unregister)
  - `GET /v1/devices/{deviceLibraryIdentifier}/registrations/{passTypeIdentifier}?passesUpdatedSince=` (serials that changed)
  - `GET /v1/passes/{passTypeIdentifier}/{serialNumber}` (latest .pkpass, honours `If-Modified-Since` / 304)
  - `POST /v1/log`
  - The paths are standard protocol, but Apple's modern doc page didn't render through my fetch today. **Check them against the current Apple doc before coding.**
- On a balance change: send an **empty-payload APNs push** to every registered push token, authenticated with the **Pass Type ID certificate** (production APNs). Apple says pushes can be coalesced and delivery isn't guaranteed. Pull-to-refresh is the fallback (`docs/tech/apple-wallet-research.md` §3.5, §4).
- "Te falta 1" / "¡Ya podés canjear!": set `changeMessage` on the progress field, e.g. `"Te falta 1 para %@"`. A device can show it when the value changes ([Updating a pass](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Updating.html)). To honour FR-W03, the normal +1 should update a field **without** a `changeMessage`. Put the notifying text in a separate `status` field that has a `changeMessage` and only changes when `faltan = 1` or `saldo ≥ N`. **I found no published Apple rate limit for pass pushes, so UNVERIFIED.**

### 4.2 Google
- `PATCH loyaltyobject/{id}` with `loyaltyPoints.balance` ([Updates](https://developers.google.com/wallet/retail/loyalty-cards/use-cases/updates)). Use PATCH, not PUT, because `update` clears any fields you leave out.
- Notifications ([Trigger push notifications](https://developers.google.com/wallet/retail/loyalty-cards/use-cases/trigger-push-notifications), checked today):
  - `notifyPreference: "notifyOnUpdate"` triggers a lock-screen notification only for allowlisted fields. On LoyaltyObject those are `loyaltyPoints.balance` and `secondaryLoyaltyPoints.balance`.
  - `addMessage` with `TEXT_AND_NOTIFY` adds a message to the back of the pass and sends a notification.
  - **Max 3 notifying updates and max 3 notifying messages per pass per 24h.** Going over returns `QuotaExceededException`, and Google may throttle "spammy" issuers.
  - **Google controls the lock-screen text.** We can't make the notification itself say "Te falta 1 para …" with an update notify. To show our text we need `addMessage` (`TEXT_AND_NOTIFY`), and the user sees it after opening the pass.
  - The user has to have Wallet notifications turned on.
- **FR-W03 mapping:** a normal +1 is a PATCH without notify. When `faltan = 1`, do a PATCH plus `addMessage(TEXT_AND_NOTIFY, "Te falta 1 para {{recompensa}}")`. When `saldo ≥ N`, use `addMessage` with "¡Ya podés canjear …!". The PRD caps (2 sumar + 1 canje per day) keep us under 3 notifies/day per pass.
- Optional: Google "Nearby" notifications through `merchantLocations` (up to 10 per class/object; Google controls the text and the trigger; same source). That's out of scope under the PRD's "no messages", so **leave it unset**.

---

## 5. Barista QR scanning flow (FR-P02..P06)
- The panel is a PWA on the café's phone or tablet. It uses the camera through `getUserMedia` plus a JS decoder (e.g. `@zxing/browser`, or the native `BarcodeDetector` where available). No dedicated scanner is needed. Apple warns that laser scanners often fail on screens, so if a café wants hardware, use an optical/imager scanner (`docs/tech/apple-wallet-research.md` §2E).
- Flow: scan → `GET /scan/{membership_token}` (scoped to the staff member's café, 404 otherwise) → card with name, masked phone and `actual/N` → "Sumar sello" with an `idempotency_key` generated client-side when the screen loads → ledger insert (unique on the key, daily caps checked in the café's timezone) → enqueue wallet sync. That's 3 taps: open scanner, scan, Sumar.
- Fallback when there's no pass: search by phone or name (FR-P03).
- Anti-fraud: a static QR can be screenshotted. The daily caps (FR-P06) and staff-only mutations limit the damage. Google's rotating barcode only supports `QR_CODE`/`PDF_417` and Apple has nothing equivalent ([Redemption methods](https://developers.google.com/wallet/retail/loyalty-cards/use-cases/redemption-methods)), so **don't** do this in the MVP.

---

## 6. Recovery and reissue (FR-W05)
- The pass identity stays stable: one membership → one Apple `serialNumber` and one Google object id, for life.
- **Apple:** after OTP verification, serve the **same** serial and token as a fresh .pkpass. Adding it on a new iPhone registers a new device. Old device registrations go stale, and Apple tells us to unregister failed tokens. The balance is correct because the pass is built from the ledger.
- **Google:** issue a new save JWT for the **same object id**. Google says re-adding links the existing object, and removing it only delinks without deleting (`docs/tech/google-wallet-research.md` §2C, [How classes/objects work](https://developers.google.com/wallet/retail/loyalty-cards/overview/how-classes-objects-work)).
- OTP (answers PRD OQ-9, as a proposal): 6 digits, **10 min TTL**, **5 attempts** per code, **3 codes/hour** per membership and per IP. Always answer "si existe, te mandamos un código" so the endpoint doesn't confirm whether an email or phone is registered. Hash the codes at rest.
- **Token compromise:** if a QR leaks, we can't rotate it on Apple (the barcode can change through an update, but the serial and auth token can't). **Proposal:** the barcode carries a rotatable `membership_token` separate from the Apple `serialNumber`, so we can rotate the scan value with a normal update.
- Transactional email for the OTP needs a provider (Postmark, SES, Resend…). **Pricing UNVERIFIED and out of scope here.**

---

## 7. Customers without Wallet
- The PRD (FR-C06, D3) says there's **no fallback** and the customer sees an explanation. The architecture follows that.
- Gaps the PRD should know about:
  - iPhone users can always use Apple Wallet (it's built into iOS). On Android, saving to Google Wallet needs a Google account login ([Issue for web](https://developers.google.com/wallet/retail/loyalty-cards/web)), plus a phone and country that support the Wallet app ([supported countries](https://support.google.com/wallet/answer/12060037?hl=en)). Google says "Some passes or cards … are only available in certain countries, on certain devices". **Device and OS minimums: UNVERIFIED.**
  - Huawei or other Android phones without Google services can't use Google Wallet (inferred from the Google-account requirement; **UNVERIFIED** by an explicit doc).
- Cheap insurance without breaking FR-C06: the membership exists before the wallet save, so staff can still find the person by phone (FR-P03) and the stamps aren't lost. A web card would mean reopening D3, which is Martin's call.

---

## 8. Recommended stack and libraries
| Concern | Pick | Notes |
|---|---|---|
| Runtime | Node.js (TypeScript), single service + Postgres | Every wallet library below is first-class in Node |
| Apple pass build/sign | `passkit-generator` 3.6.1, MIT (npm registry, checked 2026-10-14) | Builds the .pkpass and handles WWDR. [repo](https://github.com/alexandercerutti/passkit-generator) |
| APNs (pass pushes) | `@parse/node-apn` 8.1.0, MIT (npm) | Certificate-based HTTP/2 APNs. Pass updates use the Pass Type ID cert. |
| Google auth/JWT | `google-auth-library` 11.3.0, Apache-2.0 | Access tokens and RS256 JWT signing from the service account key. `jsonwebtoken` 9.0.3 works as an alternative. |
| Google REST | `@googleapis/walletobjects` 18.0.1, Apache-2.0, or plain `fetch` | The REST surface is small (insert/patch/addmessage) |
| Jobs | Postgres outbox + worker (e.g. `pg-boss`) | Retries wallet syncs. Rate-limits Google notifications to 3/24h. |
| Secrets | Pass Type ID `.p12`/key and the GCP service-account JSON in a secret manager. Never in the repo or on the public web tier. | Apple recommends keeping private keys off the public server (`docs/tech/apple-wallet-research.md` §3.7) |
| Python alternative | `google-auth` 2.62.0 (PyPI) + `wallet-py3k` or custom signing | Only if the team prefers Python |

Third-party pass platforms (PassKit, Passcreator, PassEntry…) can shorten the build but add a monthly cost and still need **our** Apple and Google accounts for our own brand. **Their pricing isn't verified here.**

---

## 9. Risks and blockers (Uruguay café pilot)
| # | Risk | Severity | Mitigation |
|---|---|---|---|
| R1 | **Google publishing access has no published SLA.** Until approval, only listed test accounts can save, so real customers can't. | High (blocks Android launch) | Request it the day the first class exists. Test in Demo Mode with the team's Google accounts. Launch iOS first if needed. |
| R2 | **Apple organization enrollment needs a legal entity + D-U-N-S + a domain email + a working website.** We don't yet know if Martin has a Uruguayan legal entity (SAS, SRL…). | High | Decide individual vs organization (D-A). The individual route shows Martin's **personal name** as the seller ([enroll](https://developer.apple.com/programs/enroll/)). For passes, `organizationName` in pass.json is what customers see, but the certificate is tied to the account. |
| R3 | Paying the USD 99 from Uruguay (card acceptance, local-currency price) | Medium, **UNVERIFIED** | Use an international credit card. Check during enrollment. |
| R4 | Wallet pass support in UY: Google lists UY as supported. Apple publishes **no** pass-specific country list. | Medium | Test on a real iPhone and Android phone in Montevideo before the first café. |
| R5 | Android customers without a Google account, or on devices without Google services, can't save, and the PRD has no fallback | Medium | Measure in the funnel (PRD §7). Revisit D3 if it's material. |
| R6 | Notification semantics differ: Google controls the lock-screen text and caps notifies at 3/24h. Apple delivery isn't guaranteed. | Medium (FR-W03 copy fidelity) | Use the mapping in §4. Accept that "Te falta 1" shows exactly on Apple but appears as a message in Google. |
| R7 | Pass Type ID certificate expires → no new passes and no updates | High if missed | Alert on the expiry date, write a renewal runbook, keep two admins on the Apple team |
| R8 | Brand/ToS: both platforms require official badges. Google's Acceptable Use Policy bans unrelated links in messages. | Low | Follow the guidelines. Keep the baja link and terms on the back of the pass. |
| R9 | The issuer's business name is public on both platforms. If it's Martin's company, every café's pass shows us as the issuer. | Low/Med | The product name decision (D-C) |
| R10 | Data protection (Ley 18.331): push tokens and device IDs are personal-adjacent data | Low/Med | Add them to the URCDP registration scope (D1). Delete registrations when someone unsubscribes. |

---

## 10. Decisions Martin needs to make
- **D-A. Who holds the Apple account:** Martin as an individual (faster, shows his personal name as seller) or a Uruguayan legal entity (needs D-U-N-S, a domain email and a website)? The same entity should hold the Google issuer's Business/payments profile.
- **D-B. Start dates:** start the Apple enrollment and the Google issuer + publishing request **this week**, before the build is finished? (Recommended, because both reviews are open-ended.)
- **D-C. Issuer/brand name** shown on the passes and in the Google issuer profile (the product brand vs each café's name in pass fields). Proposal: product as issuer, café as the program name.
- **D-D. Launch rule if Google approval is late:** iOS-only soft launch, or wait for both?
- **D-E. Accept the Google notification constraint:** "Te falta 1" arrives as a Wallet message (the lock screen shows Google's generic text). Yes or no?
- **D-F. Confirm "no fallback" (D3)** knowing Android users without a Google account or on unsupported devices are excluded. Or approve tracking that number and revisiting after café #1.
- **D-G. Build vs buy:** our own signing/push service (recommended; small surface) or a paid third-party pass platform?

---

## 11. Deltas vs earlier notes
- `docs/tech/google-wallet-research.md` §5 said loyalty-pass availability in UY was "Unknown". Google's official supported-countries page **lists Uruguay** today ([link](https://support.google.com/wallet/answer/12060037?hl=en)). Device and pass-level caveats still apply.
- The Google notification limits are reconfirmed (3 + 3 per 24h). **New:** Google controls the lock-screen text, the page also says a notification fires only if an "event or flight" starts within 3 hours; my reading is that this applies to event/flight passes and not loyalty (inference, so test it in Demo Mode), and the publishing-access screenshots are no longer required.
- Apple: added the D-U-N-S timelines and the organization requirements (no DBAs, domain email, website), which the Apple note didn't have.
- Apple Pay lists Uruguay ([link](https://support.apple.com/en-us/102775)). That's evidence for the Apple ecosystem in UY, **not** an official statement on Wallet passes.
