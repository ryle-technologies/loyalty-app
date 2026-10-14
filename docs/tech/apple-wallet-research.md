# Apple Wallet loyalty / store card (stamp card) — research note

**Date researched:** 2026-09-16 (Europe/Madrid)  
**Product context:** SaaS loyalty stamp card (buy X get 1 free); no native customer app; QR signup → add pass to Apple Wallet; show stamps/progress + barcode/QR for till scan; remote stamp updates on earn/redeem. First market: Montevideo, Uruguay.

**Rule for this note:** Every shipping requirement is tied to an official Apple URL, or explicitly marked **unknown** / **third-party (no endorsement)**. Pricing and policy are quoted only where Apple states them; nothing is invented.

---

## 1. Summary for a non-engineer founder

Apple Wallet can host a **digital loyalty / store card** without a customer app. Customers get a signed file (`.pkpass`), add it to Wallet (from a website, email, SMS link, or QR), and merchants scan a barcode/QR on the pass at the till. Your backend owns the “truth” (stamp counts); Wallet only shows a copy.

For a stamp-card UX, Apple’s recommended pass **style** is **`storeCard`** (loyalty, points, gift cards). You put stamp progress in pass fields (e.g. “3 / 8 stamps”) and put a customer ID in a **barcode or QR** so the till can look up the account on your servers.

To change stamps after the pass is already on the phone, you must:

1. Host a small **HTTPS web service** that Wallet calls, and  
2. Send an **empty Apple Push Notification (APNs)** when data changes so the device fetches a new `.pkpass` with the same identity (`passTypeIdentifier` + `serialNumber`).

You need an **Apple Developer Program** membership, a **Pass Type ID** + signing certificate, and Apple’s **WWDR G4** intermediate certificate in the signature chain. You do **not** need a native iOS app for customers to add or update passes.

**Montevideo / Uruguay:** Apple’s public Wallet/PassKit docs do **not** call out Uruguay-specific Wallet restrictions. Developer Program enrollment is broadly available (Apple states **99 USD/year**, local currency where available; enrollment may be unsupported in some regions for sanctions/restrictions). Whether every customer device in Uruguay has Wallet usable day-to-day is **not documented** in the pages we fetched—treat device/OS penetration as a product/ops unknown. Spanish copy is supported via pass localization (`.lproj` / `pass.strings`).

**NFC one-tap loyalty** (Apple Pay VAS) is a separate, heavier path (extra NFC certificate, certified terminals/POS). For a barcode stamp card at till, **barcode/QR is enough**.

---

## 2. What’s needed — checklist

### A. Apple account & certificates (required to ship signed passes)

| Item | Why | Official source |
|------|-----|-----------------|
| **Apple Developer Program membership** | Needed to request/download signing certificates used for Wallet | [Certificates support](https://developer.apple.com/support/certificates/); [Program enrollment](https://developer.apple.com/help/account/membership/program-enrollment/); [Enroll](https://developer.apple.com/programs/enroll/) |
| **Annual fee** | Apple states **99 USD** per membership year (local currency where available; prices may vary by region) | Same enrollment pages above |
| **Pass Type ID** (identifier, reverse-DNS, typically `pass.…`) | Identifies the *class* of pass; must match signing cert | [Create Wallet identifiers and certificates](https://developer.apple.com/help/account/capabilities/create-wallet-identifiers-and-certificates/); [Creating a store card pass](https://developer.apple.com/documentation/walletpasses/creating-a-store-card-pass); [Building a Pass](https://developer.apple.com/documentation/walletpasses/building-a-pass) |
| **Pass Type ID certificate** (+ private key from CSR) | Signs `.pkpass` and is used to send pass-update pushes | [Create Wallet identifiers…](https://developer.apple.com/help/account/capabilities/create-wallet-identifiers-and-certificates/); [Building a Pass](https://developer.apple.com/documentation/walletpasses/building-a-pass); [Certificates overview / Pass Type ID](https://developer.apple.com/support/certificates/) |
| **Team ID** in `pass.json` (`teamIdentifier`) | Must match the Apple Developer Team ID of the signing certificate | [Building a Pass — Common Problems](https://developer.apple.com/documentation/walletpasses/building-a-pass); [Pass Design and Creation](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Creating.html) |
| **WWDR intermediate certificate (G4 for Pass Type ID / APNs)** | Must be included in the PKCS #7 signature; omitting it is a common failure | [WWDR intermediate certificates](https://developer.apple.com/help/account/certificates/wwdr-intermediate-certificates/); [Apple PKI / Certificate Authority](https://www.apple.com/certificateauthority/); [Creating a store card pass — Debug](https://developer.apple.com/documentation/walletpasses/creating-a-store-card-pass) |
| **Certificate lifecycle awareness** | If Pass Type ID cert **expires**: installed passes keep working, but you **cannot sign new passes or send updates**. If **revoked**: passes no longer function properly | [Getting started with Apple Wallet](https://developer.apple.com/wallet/get-started/); [Certificates support](https://developer.apple.com/support/certificates/) |

### B. Pass package (required to create each customer’s card)

| Item | Notes | Official source |
|------|-------|-----------------|
| **`pass.json`** | Defines identity, style (`storeCard`), fields, colors, barcodes, optional `webServiceURL` / `authenticationToken` | [Creating the Source for a Pass](https://developer.apple.com/documentation/walletpasses/creating-the-source-for-a-pass); [Creating a store card pass](https://developer.apple.com/documentation/walletpasses/creating-a-store-card-pass); [Pass](https://developer.apple.com/documentation/walletpasses/pass) |
| **Images** | Store card supports **logo, icon, strip**. **Icon is required** for notifications / email attachment appearance | [Pass Design and Creation](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Creating.html); [Creating the Source for a Pass](https://developer.apple.com/documentation/walletpasses/creating-the-source-for-a-pass) |
| **`manifest.json` + PKCS #7 `signature` + ZIP → `.pkpass`** | SHA-1 hashes of files; detach-sign manifest with Pass Type ID key + WWDR; zip and rename extension | [Building a Pass](https://developer.apple.com/documentation/walletpasses/building-a-pass); [Pass Design and Creation — signing](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Creating.html) |
| **Per-customer `serialNumber`** | Unique within the Pass Type ID; together with `passTypeIdentifier` identifies the pass for updates | [Creating a store card pass](https://developer.apple.com/documentation/walletpasses/creating-a-store-card-pass) |
| **Barcode / QR** | Top-level `barcodes` (array). Formats include QR, PDF417, Aztec, Code128, and others listed in current store-card docs | [Creating a store card pass — Provide scannable codes](https://developer.apple.com/documentation/walletpasses/creating-a-store-card-pass); [Pass Design and Creation — Barcodes](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Creating.html) |
| **Back-of-pass contact info** | Apple says include contact info for the organization that signed the pass | [Creating a store card pass](https://developer.apple.com/documentation/walletpasses/creating-a-store-card-pass) (points to App Store Review Guidelines) |

### C. Distribution (how customers add the pass)

| Channel | Notes | Official source |
|---------|-------|-----------------|
| **Web download** | Host `.pkpass`; use **MIME type `application/vnd.apple.pkpass`**; optional Add to Apple Wallet badge | [Distributing Passes (archive)](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/DistributingPasses.html); [Distributing and updating a pass](https://developer.apple.com/documentation/walletpasses/distributing-and-updating-a-pass); [Add to Apple Wallet guidelines](https://developer.apple.com/wallet/add-to-apple-wallet-guidelines/) |
| **Email attachment** | Mail supports passes; badge near the attachment | Same as above + [Get started](https://developer.apple.com/wallet/get-started/) |
| **SMS** | Apple’s loyalty overview lists **SMS** as a distribution channel (typically a HTTPS link to the `.pkpass` / landing page—exact SMS payload format not specified in that overview) | [Loyalty and membership passes](https://developer.apple.com/wallet/loyalty-passes/) |
| **QR code (print / in-store)** | Loyalty overview lists QR codes as a distribution channel; Add to Wallet guidelines cover print + QR for the badge | [Loyalty and membership passes](https://developer.apple.com/wallet/loyalty-passes/); [Add to Apple Wallet guidelines](https://developer.apple.com/wallet/add-to-apple-wallet-guidelines/) |
| **No companion app required** | Explicit: users do not need your app installed to add passes; passes should not require a companion app | [Distributing Passes (archive)](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/DistributingPasses.html); [Get started](https://developer.apple.com/wallet/get-started/) |

### D. Remote updates (stamp earn / redeem) — required for your product

| Item | Notes | Official source |
|------|-------|-----------------|
| **`webServiceURL` + `authenticationToken` in pass** | Enables device registration for updates; production must be **HTTPS** | [Adding a Web Service to Update Passes](https://developer.apple.com/documentation/walletpasses/adding-a-web-service-to-update-passes); [Updating a Pass (archive)](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Updating.html) |
| **Device registration storage** | Devices, passes, registrations (many-to-many); store push tokens | Same |
| **APNs push with empty `{}` payload** | Same Pass Type ID cert/key used to sign passes; production only for pass update pushes | [Adding a Web Service…](https://developer.apple.com/documentation/walletpasses/adding-a-web-service-to-update-passes) |
| **Serve new `.pkpass` with same `passTypeIdentifier` + `serialNumber`** | Anything can change **except** `authenticationToken` and `serialNumber` | Same |
| **Optional `changeMessage` on fields** | Device may show a notification when a field value changes | [Updating a Pass (archive)](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Updating.html) |
| **Pull-to-refresh** | Users can also pull to refresh on the back of the pass | [Get started](https://developer.apple.com/wallet/get-started/) |

### E. Merchant / till scanning

| Item | Notes | Official source |
|------|-------|-----------------|
| **Optical barcode scanner** | Laser scanners often fail on LCD screens; use optical scanners; test real hardware | [Pass Design and Creation — Barcodes](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Creating.html); [Get started — Barcodes](https://developer.apple.com/wallet/get-started/); [Add to Apple Wallet guidelines](https://developer.apple.com/wallet/add-to-apple-wallet-guidelines/) |
| **Barcode payload = your customer ID** | Pass is a snapshot; server is source of truth for stamps/redemption | [Pass Design and Creation — Barcodes](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Creating.html) |
| **NFC / VAS (optional, advanced)** | Contactless loyalty needs NFC-capable passes, VAS-certified terminals, POS support; not required for QR stamp cards | [Loyalty and membership passes](https://developer.apple.com/wallet/loyalty-passes/) |

---

## 3. Technical outline (PRD / architect level)

### 3.1 Pass style & stamp-card mapping

- Use top-level key **`storeCard`** (not `coupon` / `generic`) for loyalty / points / gift-style cards.  
  Source: [Creating a store card pass](https://developer.apple.com/documentation/walletpasses/creating-a-store-card-pass); [Pass Design and Creation](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Creating.html).
- Suggested field mapping for “buy X get 1 free”:
  - **Primary or header:** program name or “Stamp card”
  - **Secondary/auxiliary:** `Stamps: 3 / 8`, status (`Ready to redeem` / `In progress`)
  - **Back fields:** terms, merchant contact, support URL/phone
  - Optional **strip image** for branding (not shown on Apple Watch)
- Layout limits (store card): logo + strip + barcode; up to **four** secondary+auxiliary fields combined on one row when applicable; text length can hide fields.  
  Sources: store-card article + [PassFields.SecondaryFields](https://developer.apple.com/documentation/walletpasses/passfields/secondaryfields-data.dictionary).

### 3.2 Required / important `pass.json` keys

**Identity / required (from design guide + build docs):**

- `formatVersion` → `1`
- `passTypeIdentifier` → registered Pass Type ID (begins with `pass.`, reverse-DNS)
- `serialNumber` → unique per customer card under that type
- `teamIdentifier` → Team ID
- `organizationName`
- `description` (VoiceOver / accessibility; keep short and distinguishable)
- Style object: `storeCard: { primaryFields, secondaryFields, auxiliaryFields, backFields, … }`

**Updates:**

- `webServiceURL` — HTTPS base URL (protocol required; optional port)
- `authenticationToken` — shared secret (≥ documented guidance in older guide: treat as secret; **do not change on update**)

**Appearance:**

- `logoText`, `foregroundColor`, `backgroundColor`, `labelColor` (RGB strings like `rgb(24, 44, 82)`)
- `barcodes`: array of `{ format, message, messageEncoding, altText? }`  
  Prefer **`PKBarcodeFormatQR`** for till cameras / Watch-friendly square codes (archive guide recommends square codes for Watch).

**Relevance (optional):**

- Store cards: **relevant date not supported**; if you provide relevance, **locations are required** (small radius). Up to 10 locations / beacons.  
  Source: [Pass Design and Creation — Table 4-2](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Creating.html).

Illustrative structure (adapted from Apple’s store-card example; validate against current schema before shipping):

```json
{
  "formatVersion": 1,
  "passTypeIdentifier": "pass.com.example.loyalty-card",
  "serialNumber": "cust_abc123",
  "teamIdentifier": "ABCD1234",
  "organizationName": "Example Café",
  "description": "Loyalty stamp card",
  "logoText": "Example Café",
  "backgroundColor": "rgb(24, 44, 82)",
  "foregroundColor": "rgb(255, 255, 255)",
  "labelColor": "rgb(222, 173, 40)",
  "webServiceURL": "https://api.example.com/passes/",
  "authenticationToken": "<per-pass-secret>",
  "barcodes": [
    {
      "format": "PKBarcodeFormatQR",
      "message": "cust_abc123",
      "messageEncoding": "iso-8859-1",
      "altText": "cust_abc123"
    }
  ],
  "storeCard": {
    "headerFields": [],
    "primaryFields": [
      { "key": "progress", "label": "Stamps", "value": "3 / 8",
        "changeMessage": "Your stamps are now %@" }
    ],
    "auxiliaryFields": [
      { "key": "status", "label": "Status", "value": "In progress" }
    ],
    "backFields": [
      { "key": "terms", "label": "Terms", "value": "…" },
      { "key": "support", "label": "Support", "value": "…" }
    ]
  }
}
```

### 3.3 Design assets (sizes from archive PassKit guide)

All sizes in **points**; provide `@1x`, `@2x`, `@3x` PNGs as needed.

| Asset | Store card | Allotted space (points) | Notes |
|-------|------------|-------------------------|--------|
| `icon.png` | **Required** | 29 × 29 | Lock screen / Mail |
| `logo.png` | Supported | ~160 × 50 | Top-left; usually narrower |
| `strip.png` | Supported | ~375 × 123 (newer phones; older sizes documented) | Behind primary fields; **not on Watch** |

Colors: override via `backgroundColor`, `foregroundColor`, `labelColor`.  
Source: [Pass Design and Creation — Images / Colors](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Creating.html).  
Also see HIG: [Wallet — Store cards](https://developer.apple.com/design/human-interface-guidelines/wallet#Store-cards).

**Localization (Spanish for Uruguay):** use `es.lproj` / `es-UY.lproj` (if needed) with `pass.strings` (UTF-16 for non-ASCII) and optional localized logos. Dates/currency formatters follow device locale even without string localizations.  
Source: [Creating the Source for a Pass](https://developer.apple.com/documentation/walletpasses/creating-the-source-for-a-pass); [Pass Design and Creation — Localization](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Creating.html).

### 3.4 Build & sign pipeline

1. Assemble `Something.pass/` directory (`pass.json` + images + optional `.lproj`).  
2. Compute SHA-1 of each file → `manifest.json`.  
3. PKCS #7 detached signature of manifest with Pass Type ID private key; **include WWDR G4** intermediate; write `signature`.  
4. ZIP contents → rename to `.pkpass`.  
5. Test by dragging onto Simulator; production update testing requires a **real device** (Simulator does not register for push).  

Sources: [Building a Pass](https://developer.apple.com/documentation/walletpasses/building-a-pass); [Updating a Pass](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Updating.html).

### 3.5 Update web service (cooperative protocol)

High-level flow ([Adding a Web Service…](https://developer.apple.com/documentation/walletpasses/adding-a-web-service-to-update-passes)):

1. User installs pass with `webServiceURL` + `authenticationToken`.  
2. Device **registers** (device library ID + push token).  
3. Your SaaS changes stamp count → rebuild `.pkpass` → **APNs empty push** to registered devices.  
4. Device asks for changed **serial numbers**, then downloads latest pass.  

Conceptual endpoints (from archive update guide + modern article; implement exactly as documented in current WalletPasses web-service symbols):

- Register / unregister device ↔ pass  
- List updatable serial numbers for a device (`lastUpdated` / `serialNumbers` JSON)  
- Get latest `.pkpass` for `passTypeIdentifier` + `serialNumber` (support `If-Modified-Since` / 304)

Auth: `authenticationToken` for register/unregister/get-pass; device library ID for list-serials.  
**Do not change `authenticationToken` or `serialNumber` in updates.**

### 3.6 Distribution for “QR signup, no app”

Recommended SaaS flow:

1. Customer scans merchant QR → mobile web signup.  
2. Backend creates customer + `serialNumber` + `authenticationToken`, builds signed `.pkpass`.  
3. Landing page shows **Add to Apple Wallet** badge linking to HTTPS URL that returns `Content-Type: application/vnd.apple.pkpass`.  
4. Optionally email/SMS the same link.  
5. On earn/redeem at till: POS/app scans barcode → your API increments/redeems → push update.

Sources: [Distributing and updating a pass](https://developer.apple.com/documentation/walletpasses/distributing-and-updating-a-pass); [Distributing Passes](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/DistributingPasses.html); [Loyalty passes — Distribution](https://developer.apple.com/wallet/loyalty-passes/).

### 3.7 Suggested system components (architecture)

- **Pass signing service** (isolate private keys; Apple recommends not keeping private keys on the public web server — [Updating a Pass best practices](https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Updating.html))  
- **Pass update API** (Wallet web service endpoints)  
- **APNs client** (Pass Type ID cert)  
- **Customer / stamp ledger** (source of truth)  
- **Merchant scan API** (idempotent earn/redeem)  
- **Pass template assets** (branding per merchant tenant for multi-tenant SaaS)

Multi-tenant SaaS note (**unknown / product decision**): one Pass Type ID for all merchants vs one per merchant affects branding, cert ops, and push fan-out. Apple allows multiple Pass Type IDs per account; docs do not prescribe a SaaS tenancy model.

---

## 4. Limitations (Wallet vs native app)

Documented or clearly implied by Apple docs:

| Limitation | Implication for stamp-card SaaS |
|------------|----------------------------------|
| Pass is a **signed snapshot**, not a live UI | Cannot draw custom stamp grids beyond fields/images; “stamps” are text/images you regenerate on update |
| **No interactive UI** in Wallet (no buttons, forms, in-pass checkout) | Signup/account management stays on web; Wallet is presentation + scan + notifications |
| Field / layout **caps** (few front fields; strip/logo constraints) | Rich progress UI may need strip artwork regenerated per state |
| **Watch** hides strip, thumbnail, and **back** of pass | Critical terms only on back won’t appear on Watch |
| Updates need **your web service + APNs**; pushes coalesce; delivery not guaranteed | Design for eventual consistency; pull-to-refresh as backup |
| Cannot change **`serialNumber` / `authenticationToken`** via update | Plan token lifecycle carefully |
| **No companion app required**—and entitlements only matter if *you* ship an app that reads passes | Fits your “no customer app” model |
| Relevance for store cards is **location-based only** (no relevant date) | Lock Screen surfacing near store needs `locations` / beacons |
| NFC VAS loyalty is **not** the same as barcode passes | Extra certs, certified hardware, partners |
| Pass Type ID cert **expiry** blocks new signs/updates; **revocation** breaks passes | Ops: renew before expiry; protect private keys |

Sources: Creating / Updating / Distributing guides and [Get started](https://developer.apple.com/wallet/get-started/) cited above.

---

## 5. Uruguay / Latin America / Spanish locale

| Topic | Finding | Confidence |
|-------|---------|------------|
| **Developer Program in Uruguay** | Enrollment docs: fee **99 USD/year**, local currency where available; enrollment available broadly with footnote that it **may not be supported in certain regions** (e.g. sanctions). Uruguay is **not** called out as excluded in the pages fetched. Uruguay **does** appear in App Store Connect **financial report regions** list (implies App Store commercial relationship exists for that market—not a Wallet-specific guarantee). | Medium — confirm at enrollment time |
| **Wallet / PassKit geo availability** | PassKit docs fetched do **not** list country availability for Wallet passes. | **Unknown** — validate on target devices in Montevideo |
| **Spanish locale** | Pass localization via `.lproj` + `pass.strings` is officially supported; developer docs offer `es-419` / Latin America locales for documentation. Add to Apple Wallet badge available in many locales (Apple states **45 locales** for badge files). | High for *how* to localize; still test `es` / `es-UY` on devices |
| **SMS / email delivery in UY** | Apple lists SMS/email as channels; local carrier/deliverability and `.pkpass` link behavior on Android (non-Apple) users are out of Apple Wallet scope. | Partial — Apple channel OK; local ops **unknown** |
| **NFC VAS terminals in Montevideo** | Not documented in Apple pages fetched. | **Unknown** — barcode path recommended first |

Sources: [Program enrollment](https://developer.apple.com/help/account/membership/program-enrollment/); [Financial report regions](https://developer.apple.com/help/app-store-connect/reference/financial-report-regions-and-currencies/); localization docs above; [Add to Apple Wallet guidelines](https://developer.apple.com/wallet/add-to-apple-wallet-guidelines/).

---

## 6. Third-party pass providers (names only — no endorsement)

Apple’s own loyalty page lists certified pass / loyalty-related providers and states the list is **not exhaustive** and providers have **no affiliation with Apple**:

- Airship  
- Lava  
- Passcreator  
- PassEntry  
- PassKit  
- Paytronix  
- Pronto CX  
- Punchh  
- Stell  
- Vibes  

Source: [Loyalty and membership passes — Pass providers](https://developer.apple.com/wallet/loyalty-passes/).

Other market vendors exist (e.g. PassSlot)—treat as **third-party / unverified here**; not used as requirement sources.

---

## 7. Sources (URLs actually used)

### Modern Apple documentation (developer.apple.com)

- https://developer.apple.com/documentation/walletpasses/creating-a-store-card-pass  
- https://developer.apple.com/documentation/walletpasses/creating-the-source-for-a-pass  
- https://developer.apple.com/documentation/walletpasses/building-a-pass  
- https://developer.apple.com/documentation/walletpasses/adding-a-web-service-to-update-passes  
- https://developer.apple.com/documentation/walletpasses/distributing-and-updating-a-pass  
- https://developer.apple.com/documentation/walletpasses/pass  
- https://developer.apple.com/documentation/walletpasses/passfields/secondaryfields-data.dictionary  
- https://developer.apple.com/help/account/capabilities/create-wallet-identifiers-and-certificates/  
- https://developer.apple.com/help/account/certificates/wwdr-intermediate-certificates/  
- https://developer.apple.com/help/account/membership/program-enrollment/  
- https://developer.apple.com/help/app-store-connect/reference/financial-report-regions-and-currencies/  
- https://developer.apple.com/programs/enroll/  
- https://developer.apple.com/support/certificates/  
- https://developer.apple.com/wallet/get-started/  
- https://developer.apple.com/wallet/loyalty-passes/  
- https://developer.apple.com/wallet/add-to-apple-wallet-guidelines/  
- https://developer.apple.com/design/human-interface-guidelines/wallet  

### Archive / reference

- https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Creating.html  
- https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/Updating.html  
- https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/PassKit_PG/DistributingPasses.html  
- https://developer.apple.com/library/archive/technotes/tn2302/_index.html  

### Certificates / PKI

- https://www.apple.com/certificateauthority/  

---

## 8. Unknowns / open questions

1. **Wallet feature availability & iOS version mix** among Montevideo target customers (not specified in PassKit docs).  
2. **Exact Pass Type ID string convention** for multi-tenant SaaS (one ID vs many)—product/security tradeoff, not prescribed by Apple.  
3. **Whether SMS should carry raw `.pkpass` vs HTTPS landing page**—Apple lists SMS as a channel but does not detail carrier MIME handling in the loyalty overview.  
4. **NFC / Apple Pay VAS** feasibility for Uruguay merchants (terminals, acquirers, certification)—separate from barcode MVP.  
5. **Personalization / rewards pass APIs** (`Personalize` object on Pass schema) — may matter for advanced loyalty enrollment; not required for a simple stamp card; details not fully expanded in this note.  
6. **Current leaf certificate expiry / renewal cadence** for the team’s future Pass Type ID cert—must be monitored operationally.  
7. **Android / Google Wallet** parity for the same SaaS—out of scope for this Apple-only research.  
8. **Legal/privacy** (loyalty data, barcode IDs, push registration storage) under Uruguayan law—**unknown** / legal review needed; not covered by Apple engineering docs.

---

## 9. Practical MVP recommendation (non-binding)

1. Enroll in Apple Developer Program → create Pass Type ID + certificate → install WWDR G4.  
2. Implement `storeCard` template with QR barcode = customer ID; fields show `n / X` stamps.  
3. Host HTTPS pass download after QR web signup; MIME `application/vnd.apple.pkpass`.  
4. Implement update web service + APNs empty pushes on earn/redeem.  
5. Pilot with optical scanners at Montevideo tills; defer NFC VAS.  
6. Localize strings to Spanish; test on physical iPhones (not only Simulator).

