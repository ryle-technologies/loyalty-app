# Google Wallet loyalty / store card (stamp card) — research note

**Date researched:** 2026-09-16 (Europe/Madrid)  
**Product context:** SaaS loyalty stamp card (buy X get 1 free); no native customer app; QR signup → add pass to Google Wallet; show stamps/progress + barcode/QR for till scan; remote stamp updates on earn/redeem. First market: Montevideo, Uruguay. Also supports Apple Wallet (companion note: `docs/tech/apple-wallet-research.md`).

**Rule for this note:** Every shipping requirement is tied to an official Google URL (`developers.google.com/wallet` or related Google Help fetched for locale context), or explicitly marked **unknown** / **third-party (no endorsement)**. Pricing, approval timelines, and Uruguay device penetration are **not invented**.

---

## 1. Summary for a non-engineer founder

Google Wallet can host a **digital loyalty card** without a customer Android app. Your backend creates a shared **Loyalty Class** (program template: branding, program name) and a per-customer **Loyalty Object** (stamps/points, barcode, account id). Customers add the card from mobile web via an **“Add to Google Wallet”** button or link that carries a **signed JWT**. Merchants scan a **QR/barcode** on the pass at the till. Your servers remain the source of truth for stamp counts; Google Wallet shows a synced copy.

To change stamps after the pass is saved, you call Google’s REST API (`PATCH`/`PUT` on the loyalty object)—especially `loyaltyPoints.balance`. Google pushes the change to the user’s Wallet; you do **not** host an Apple-style device registration web service or send your own APNs pushes for stamp updates.

You need:

1. A **Google Wallet API Issuer account** (Google Pay & Wallet console)  
2. A **Google Cloud** project with the **Google Wallet API** enabled and a **service account** (JSON key) authorized as Developer on the Issuer account  
3. **Publishing access** (accounts start in **Demo Mode**; only testers can save until Google approves publishing)

Spanish (Latin America) **Add to Google Wallet** button assets exist. Uruguay is **not** in Google’s localized product-name table for “Google Wallet,” so brand copy should stay **“Google Wallet”** in English unless a listed market applies. Whether every Montevideo Android phone can save loyalty passes day-to-day is **not documented** in the Wallet API pages fetched—treat as a product/ops unknown (validate on devices).

**NFC Smart Tap** is optional and heavier (certified terminals). For a stamp card at till, **static QR barcode is enough**.

---

## 2. What’s needed — checklist

### A. Accounts, Cloud, auth (required to ship)

| Item | Why | Official source |
|------|-----|-----------------|
| **Google Wallet API Issuer account** | Create/issue passes; access Google Wallet API Dashboard in Pay & Wallet console | [Issuer onboarding (loyalty)](https://developers.google.com/wallet/retail/loyalty-cards/getting-started/issuer-onboarding); [Loyalty overview — Requirements](https://developers.google.com/wallet/retail/loyalty-cards) |
| **Public business name + accept ToS** | Signup flow requires business name and agreement to Google Wallet API Additional Terms + privacy policy | Same issuer onboarding page |
| **Demo Mode by default** | New issuers can create passes but may issue only to Admin/Developer roles or **test accounts** until publishing access is granted; passes show **`[TEST ONLY]`** | [Issuer onboarding](https://developers.google.com/wallet/retail/loyalty-cards/getting-started/issuer-onboarding); [Request publishing access](https://developers.google.com/wallet/retail/loyalty-cards/getting-started/request-publishing-access); [Issue for web](https://developers.google.com/wallet/retail/loyalty-cards/web) |
| **Publishing access (production)** | Required to issue to any Google Wallet user; Google Wallet team reviews request | [Request publishing access](https://developers.google.com/wallet/retail/loyalty-cards/getting-started/request-publishing-access); [Launch checklist](https://developers.google.com/wallet/retail/loyalty-cards/test-and-go-live/launch-checklist) |
| **Business Profile (+ payments profile)** | Prerequisite before requesting publishing access—identifies a real business/org/individual | [Request publishing access — Prerequisites](https://developers.google.com/wallet/retail/loyalty-cards/getting-started/request-publishing-access) |
| **≥1 Passes Class created** | Prerequisite for publishing access | Same |
| **Google Cloud account + project** | Non-Android / REST path: required to enable API and create service account | [Loyalty overview — Requirements](https://developers.google.com/wallet/retail/loyalty-cards); [Auth credentials](https://developers.google.com/wallet/retail/loyalty-cards/getting-started/auth/rest) |
| **Enable Google Wallet API** in Cloud Marketplace | Activates REST API for the project | [Auth credentials](https://developers.google.com/wallet/retail/loyalty-cards/getting-started/auth/rest) |
| **Service account + JSON key** | Signs JWTs for “Add to Wallet”; authenticates `insert`/`patch`/`update`/etc. | Same |
| **Invite service account as Issuer “Developer”** | Service account email must be invited in Pay & Wallet console Users | Same |
| **OAuth scope** | `https://www.googleapis.com/auth/wallet_object.issuer` | [loyaltyclass.insert](https://developers.google.com/wallet/reference/rest/v1/loyaltyclass/insert); [loyaltyobject.insert](https://developers.google.com/wallet/reference/rest/v1/loyaltyobject/insert) |
| **Issuer API pricing / annual fee** | **Unknown** from docs fetched—no issuer fee stated on loyalty onboarding/auth pages (Google Cloud usage may still apply separately—not documented here) | Marked unknown |

**Approval timeline:** Google states the team will review and notify you when approved; **no SLA/timeline** is published on the pages fetched → **unknown**.

### B. Loyalty Class + Object (required to create each customer’s card)

| Item | Notes | Official source |
|------|-------|-----------------|
| **LoyaltyClass** (template) | Shared program: `id` = `ISSUER_ID.CLASS_SUFFIX`, `issuerName`, `programName`, `programLogo`, `reviewStatus` | [Create classes/objects](https://developers.google.com/wallet/retail/loyalty-cards/use-cases/create); [LoyaltyClass resource](https://developers.google.com/wallet/reference/rest/v1/loyaltyclass) |
| **Required class fields (API)** | Docs mark **Required:** `id`, `issuerName`, `programName`, `programLogo`, `reviewStatus` | [LoyaltyClass](https://developers.google.com/wallet/reference/rest/v1/loyaltyclass) |
| **`reviewStatus`** | Use `draft` while developing (`draft` **cannot** create objects); set `underReview` when ready—platform auto-sets `approved`. When updating an approved class, keep setting `underReview` | Same |
| **Create class via** | REST `POST …/loyaltyClass`, Business Console UI, or embed in JWT | [Create](https://developers.google.com/wallet/retail/loyalty-cards/use-cases/create); [Development flow](https://developers.google.com/wallet/retail/loyalty-cards/overview/add-to-google-wallet-flow) |
| **LoyaltyObject** (per customer) | `id` = `ISSUER_ID.OBJECT_SUFFIX`, `classId`, `state` (e.g. `ACTIVE`); typically `accountId`, `accountName`, `loyaltyPoints`, `barcode` | [Create](https://developers.google.com/wallet/retail/loyalty-cards/use-cases/create); [LoyaltyObject](https://developers.google.com/wallet/reference/rest/v1/loyaltyobject) |
| **Required object fields (API)** | Docs mark **Required:** `id`, `classId`, `state` | [LoyaltyObject](https://developers.google.com/wallet/reference/rest/v1/loyaltyobject) |
| **Stamp progress mapping** | Use `loyaltyPoints` (label + balance as `int`/`string`/etc.) and/or `textModulesData` for “3 / 8” style copy; optional `secondaryLoyaltyPoints` | [LoyaltyObject — LoyaltyPoints](https://developers.google.com/wallet/reference/rest/v1/loyaltyobject); [Loyalty template defaults](https://developers.google.com/wallet/retail/loyalty-cards/resources/template) |
| **Object exists before “save” ≠ linked to user** | After `insert`, object is on Google’s servers but not linked to a user until JWT save | [Create — end note](https://developers.google.com/wallet/retail/loyalty-cards/use-cases/create); [Classes & objects overview](https://developers.google.com/wallet/retail/loyalty-cards/overview/how-classes-objects-work) |

### C. Distribution (how customers add the pass — no app)

| Channel | Notes | Official source |
|---------|-------|-----------------|
| **Signed JWT** | Claims: `iss` (service account email), `aud: "google"`, `typ: "savetowallet"`, `origins`, `payload.loyaltyObjects` (and optionally `loyaltyClasses`) | [JWT](https://developers.google.com/wallet/retail/loyalty-cards/use-cases/jwt); [JWT reference](https://developers.google.com/wallet/reference/rest/v1/Jwt); [Development flow](https://developers.google.com/wallet/retail/loyalty-cards/overview/add-to-google-wallet-flow) |
| **Save link** | `https://pay.google.com/gp/v/save/<signed_jwt>` — embed in websites, email, SMS, chat | [Issue for web/email/SMS](https://developers.google.com/wallet/retail/loyalty-cards/web); [Development flow](https://developers.google.com/wallet/retail/loyalty-cards/overview/add-to-google-wallet-flow) |
| **Add to Google Wallet button** | Recommended; download official assets; JS web button `g:savetoandroidpay` available | [Web issue](https://developers.google.com/wallet/retail/loyalty-cards/web); [JS web button](https://developers.google.com/wallet/retail/loyalty-cards/web/javascript-button); [Brand guidelines](https://developers.google.com/wallet/retail/loyalty-cards/resources/brand-guidelines) |
| **Logged-in Google identity** | Save via link “can only be initiated in the context of a logged-in Google identity” | [Web issue](https://developers.google.com/wallet/retail/loyalty-cards/web) |
| **JWT length** | Safe length ~**1800** characters; longer JWTs may truncate in browsers—prefer pre-created objects + JWT referencing IDs | [Web issue](https://developers.google.com/wallet/retail/loyalty-cards/web) |
| **Sign JWTs server-side only** | Protect service account credentials | [Development flow](https://developers.google.com/wallet/retail/loyalty-cards/overview/add-to-google-wallet-flow) |
| **No companion app required** | REST + web/email/SMS path is the documented approach for non-Android-app issuers | [Loyalty overview](https://developers.google.com/wallet/retail/loyalty-cards) |
| **Duplicate saves** | Re-clicking Add links to existing object; remove delinks but does not delete object—can re-add | [Classes & objects overview](https://developers.google.com/wallet/retail/loyalty-cards/overview/how-classes-objects-work) |

### D. Remote updates (stamp earn / redeem) — required for your product

| Item | Notes | Official source |
|------|-------|-----------------|
| **Update class** | Affects **all** holders of that class; `PUT`/`PATCH …/loyaltyclass/{resourceId}` | [Updates](https://developers.google.com/wallet/retail/loyalty-cards/use-cases/updates) |
| **Update object** | Affects **one** customer; `PUT`/`PATCH …/loyaltyobject/{resourceId}` — use for stamp balance | Same |
| **`update` vs `patch`** | `update` replaces entire resource (omit fields → cleared); `patch` updates provided fields. Prefer `GET` then update carefully | Same |
| **Stamp field** | Patch `loyaltyPoints.balance` (and label as needed) | [LoyaltyObject](https://developers.google.com/wallet/reference/rest/v1/loyaltyobject); [Push notifications — allowlisted fields](https://developers.google.com/wallet/retail/loyalty-cards/use-cases/trigger-push-notifications) |
| **Optional lock-screen notify on point change** | Set ephemeral `notifyPreference: notifyOnUpdate` on PATCH/UPDATE when changing allowlisted fields including `loyaltyPoints.balance`; **max 3** notify-triggering updates per pass per 24h | [Trigger push notifications](https://developers.google.com/wallet/retail/loyalty-cards/use-cases/trigger-push-notifications) |
| **Optional message + notify** | `loyaltyobject.addmessage` with `message_type` / `TEXT_AND_NOTIFY`; also **max 3** notify messages / 24h | Same; [addmessage](https://developers.google.com/wallet/reference/rest/v1/loyaltyobject/addmessage) |
| **User must enable Wallet notifications** | Otherwise no push | [Trigger push notifications](https://developers.google.com/wallet/retail/loyalty-cards/use-cases/trigger-push-notifications) |
| **No issuer-hosted pass download web service** | Unlike Apple PassKit update protocol—Google hosts object state | Implied by updates docs vs Apple companion research |

### E. Merchant / till scanning & design assets

| Item | Notes | Official source |
|------|-------|-----------------|
| **Static barcode** | `object.barcode` with `type` + `value` (e.g. `QR_CODE`) | [Redemption methods](https://developers.google.com/wallet/retail/loyalty-cards/use-cases/redemption-methods); [Barcode](https://developers.google.com/wallet/reference/rest/v1/Barcode); [BarcodeType](https://developers.google.com/wallet/reference/rest/v1/BarcodeType) |
| **Supported types (examples)** | `QR_CODE`, `PDF_417`, `AZTEC`, `CODE_128`, `CODE_39`, `EAN_13`, `DATA_MATRIX`, etc. Rotating barcodes: **`QR_CODE`** and **`PDF_417`** only | [BarcodeType](https://developers.google.com/wallet/reference/rest/v1/BarcodeType) |
| **Rotating barcode / security animation** | Optional anti-screenshot measures | [Redemption methods](https://developers.google.com/wallet/retail/loyalty-cards/use-cases/redemption-methods) |
| **NFC Smart Tap** | Optional; separate signup/certified terminals | Same |
| **Logo** | Circular mask; PNG; min **660×660**; 1:1; 15% margin safe area | [Brand guidelines](https://developers.google.com/wallet/retail/loyalty-cards/resources/brand-guidelines) |
| **Hero image** | Optional; preferred PNG; recommended **1032×812** (~5:4) | Same |
| **Wide program logo** | Optional; transparent PNG; recommended **1280×400**; 16:5 | Same |
| **Background** | `hexBackgroundColor`; avoid neon/high-saturation; recommended palette listed | Same |
| **Module limits (brand guidance)** | e.g. prefer limited `textModulesData` / `linksModuleData` counts for clean UI | Same |
| **Template layout** | Default shows points, account name/id, barcode; customizable via `classTemplateInfo` | [Loyalty template](https://developers.google.com/wallet/retail/loyalty-cards/resources/template) |

---

## 3. Technical outline (PRD / architect level)

### 3.1 Pass type & stamp-card mapping

- Use **Loyalty** vertical (`LoyaltyClass` / `LoyaltyObject`), not Generic, for loyalty stamp programs.  
  Sources: [Loyalty overview](https://developers.google.com/wallet/retail/loyalty-cards); [Create](https://developers.google.com/wallet/retail/loyalty-cards/use-cases/create).
- Suggested stamp-card mapping (“buy X get 1 free”):
  - **Class:** `programName` / `localizedProgramName` (Spanish), `programLogo`, `hexBackgroundColor`, `issuerName`, optional `homepageUri` / links, `countryCode` (e.g. consider `UY`—field exists for display/locale fallback; validate UX)
  - **Object:** `accountId` = your customer ID (also barcode payload), `accountName`, `loyaltyPoints.label` = `"Sellos"` / `"Stamps"`, `loyaltyPoints.balance.int` = current stamps (or `string` like `"3/8"` if you prefer—only one balance subtype), optional `textModulesData` for status (“Listo para canjear”), `barcode.type` = `QR_CODE`, `barcode.value` = customer ID
  - On redeem: reset or decrement balance via PATCH; optionally `addmessage` with notify

### 3.2 End-to-end issue flow (web / no app)

1. Issuer onboarding → Demo Mode → create service account → enable API → invite SA as Developer.  
2. Create **LoyaltyClass**(es)—one per merchant tenant or shared SaaS class strategy (**product decision**). Set `reviewStatus` appropriately.  
3. On QR signup: create customer in your DB → `loyaltyobject.insert` with stamps=0 + barcode.  
4. Server builds JWT with `payload.loyaltyObjects: [{ id, classId }]` (prefer short JWT) → sign RS256 with SA private key.  
5. Mobile web shows official **Add to Google Wallet** button / link `https://pay.google.com/gp/v/save/<jwt>` with `origins` matching your domains.  
6. User must be signed into a Google account to save.  
7. Till scans QR → your API earn/redeem → `PATCH loyaltyobject` with new `loyaltyPoints` (+ optional `notifyPreference: notifyOnUpdate`).

Sources: [Development flow](https://developers.google.com/wallet/retail/loyalty-cards/overview/add-to-google-wallet-flow); [Web](https://developers.google.com/wallet/retail/loyalty-cards/web); [Updates](https://developers.google.com/wallet/retail/loyalty-cards/use-cases/updates); [JWT](https://developers.google.com/wallet/retail/loyalty-cards/use-cases/jwt).

### 3.3 Auth sketch

```
Google Cloud service account JSON
  → OAuth access token (scope wallet_object.issuer) for REST
  → Same private key signs savetowallet JWTs (iss = client_email)
```

Source: [Auth credentials](https://developers.google.com/wallet/retail/loyalty-cards/getting-started/auth/rest).

### 3.4 Go-live

1. Complete onboarding + auth.  
2. Build ≥1 class + ≥1 object.  
3. Pre-launch testing (test users, Add flows, scanners/POS).  
4. Complete Business Profile; request publishing access.  
5. After approval: `[TEST ONLY]` removed; issue to all users.

Sources: [Launch checklist](https://developers.google.com/wallet/retail/loyalty-cards/test-and-go-live/launch-checklist); [Request publishing access](https://developers.google.com/wallet/retail/loyalty-cards/getting-started/request-publishing-access).

### 3.5 Suggested system components

- **Wallet issuer service** (SA keys isolated; JWT signing; REST client)  
- **LoyaltyClass registry** (per merchant branding)  
- **LoyaltyObject id ↔ customer id** mapping  
- **Stamp ledger** (source of truth; Wallet is projection)  
- **Merchant scan API** (idempotent earn/redeem → PATCH object)  
- **Shared mobile-web signup** that branches to Apple `.pkpass` vs Google JWT based on UA / choice  
- Optional: message/notify quota tracker (3/24h)

Multi-tenant note (**unknown / product decision**): one Issuer account with many classes vs multiple issuers—not prescribed by Google in pages fetched.

---

## 4. Limitations (Wallet vs native app)

| Limitation | Implication for stamp-card SaaS |
|------------|----------------------------------|
| Pass is a **structured Wallet card**, not a custom app UI | No interactive stamp grid, forms, or in-pass checkout; stamps = points/text/images |
| **Google account required** to save via Add link | Friction vs Apple `.pkpass` download; users without Google account cannot complete save as documented |
| **Demo Mode → publishing approval** gate | Cannot freely onboard public users until Google grants publishing access; timeline **unknown** |
| **Notification caps** (3 update notifies + 3 message notifies / 24h) | High-frequency stamp taps should update silently most of the time; notify sparingly (e.g. redeem-ready) |
| Notify only on **allowlisted** fields for update pushes | `loyaltyPoints.balance` is allowlisted; arbitrary text fields may update without lock-screen notify |
| Layout/module **caps** and brand character guidance | Keep labels short; don’t rely on long Spanish legal text on the face of the card |
| **Smart Tap NFC** needs extra setup / certified readers | Barcode MVP first |
| Class updates affect **all** objects of that class | Be careful patching shared branding live |
| `update` can **wipe** omitted fields | Prefer PATCH or GET-merge-PUT discipline |
| Removing pass **delinks** but object remains | Re-add possible; design idempotent issue |

Sources: limitations derived from docs cited in §§2–3 (web issue, updates, notifications, brand guidelines, redemption).

---

## 5. Uruguay / Spanish locale caveats

| Topic | Finding | Confidence |
|-------|---------|------------|
| **Spanish UI strings on pass** | `LocalizedString` / `TranslatedString` use **BCP 47** tags (examples include `en-US`; `es` / `es-419` are valid BCP 47 patterns—test on device). Use `localizedProgramName`, `localizedIssuerName`, `loyaltyPoints.localizedLabel`, etc. | High for mechanism; test `es` / `es-UY` |
| **Add to Google Wallet button localization** | Brand guidelines list **Spanish (Latin America)** and **Spanish (Spain)** among provided button languages—**use Google’s assets**, don’t invent buttons | High |
| **Product name “Google Wallet”** | Localized names table includes Chile, Brazil, US-Spanish, etc. **Uruguay is not listed** → use English **“Google Wallet”** per guidelines | High (for branding copy rule) |
| **Loyalty/pass geo availability in Uruguay** | Wallet API loyalty docs fetched do **not** publish a country allowlist for saving loyalty passes. Separate Google Help pages discuss Google Wallet **payments** by country—that is **not** the same as pass-issuance eligibility. | **Unknown** for passes—validate on Montevideo Android devices |
| **RU “Save to phone” exception** | Brand guidelines: if developing for users in **RU**, use “Save to phone” buttons (Wallet not live there). Uruguay is **not** that case in the same sentence. | N/A to UY |
| **`countryCode` on class** | Field exists to help display country / localized content fallback | Medium—set `UY` if useful; confirm rendering |
| **Approval / Business Profile from Uruguay entity** | Docs don’t call out Uruguay-specific blocks; Business Profile + payments profile required for publishing. Outcome for a Uruguay-registered business is **unknown** until attempted. | Unknown |

Sources: [LocalizedString](https://developers.google.com/wallet/reference/rest/v1/LocalizedString); [Brand guidelines](https://developers.google.com/wallet/retail/loyalty-cards/resources/brand-guidelines); [LoyaltyClass.countryCode](https://developers.google.com/wallet/reference/rest/v1/loyaltyclass).

---

## 6. Apple Wallet vs Google Wallet (same SaaS)

Facts drawn from this note + `docs/tech/apple-wallet-research.md`.

| Topic | Apple Wallet (from Apple research) | Google Wallet (this research) |
|-------|------------------------------------|-------------------------------|
| **Pass model** | Signed `.pkpass` package (`storeCard` style) | `LoyaltyClass` + `LoyaltyObject` JSON in Google’s API |
| **Customer app** | Not required | Not required (REST + web JWT) |
| **Add from mobile web** | HTTPS download `application/vnd.apple.pkpass` + badge | Signed JWT → `https://pay.google.com/gp/v/save/...` + official button |
| **Account gate** | Apple ID / device Wallet (per Apple product behavior; see Apple note) | Documented: save needs **logged-in Google identity** |
| **Remote stamp update** | Your HTTPS web service + empty **APNs** push; device pulls new `.pkpass` | Your backend **PATCH/PUT** Google REST; Google syncs to device |
| **Auth to platform** | Pass Type ID cert + WWDR; Apple Developer Program | Cloud **service account** + Issuer Developer role; OAuth scope `wallet_object.issuer` |
| **Production gate** | Developer Program membership + signing certs | **Demo Mode** → request **publishing access** (Business Profile, ≥1 class, Google review) |
| **Membership fee** | Apple documents **99 USD/year** | **Unknown** / not stated on Wallet API pages fetched |
| **Barcode** | `barcodes[]` (QR, PDF417, Aztec, Code128, …) | `barcode.type` / `value` (`QR_CODE`, etc.) |
| **Stamp display** | Pass fields + optional strip image | `loyaltyPoints` (+ text modules / template) |
| **Update notifications** | Optional `changeMessage`; APNs delivery not guaranteed | Optional `notifyPreference` / `TEXT_AND_NOTIFY`; **3/24h** caps |
| **NFC loyalty** | Apple Pay VAS (heavy) | Smart Tap (heavy) |
| **Spanish** | `.lproj` / `pass.strings` | `LocalizedString` BCP 47 + ES-LATAM button assets |
| **Shared signup UX** | Detect iOS → `.pkpass`; Android → Google JWT; same QR landing | Same |

---

## 7. Third-party pass providers (names only — no endorsement)

Not official Google requirements. Market vendors that advertise Google and/or Apple Wallet pass APIs (verify current Google support yourselves):

- PassKit  
- PassNinja  
- PassSlot  
- Passcreator / PassEntry / others also appear on Apple’s provider list (see Apple research)—Google coverage varies by vendor  

Do **not** treat these as substitutes for reading Google’s docs or obtaining Issuer publishing access if you issue under your own brand via Google’s API.

---

## 8. Sources (URLs actually fetched)

### Loyalty product & flow

- https://developers.google.com/wallet/retail/loyalty-cards  
- https://developers.google.com/wallet/retail/loyalty-cards/overview/add-to-google-wallet-flow  
- https://developers.google.com/wallet/retail/loyalty-cards/overview/how-classes-objects-work  
- https://developers.google.com/wallet/retail/loyalty-cards/use-cases/create  
- https://developers.google.com/wallet/retail/loyalty-cards/use-cases/updates  
- https://developers.google.com/wallet/retail/loyalty-cards/use-cases/jwt  
- https://developers.google.com/wallet/retail/loyalty-cards/use-cases/redemption-methods  
- https://developers.google.com/wallet/retail/loyalty-cards/use-cases/trigger-push-notifications  
- https://developers.google.com/wallet/retail/loyalty-cards/web  
- https://developers.google.com/wallet/retail/loyalty-cards/web/javascript-button  

### Onboarding, auth, launch

- https://developers.google.com/wallet/retail/loyalty-cards/getting-started/issuer-onboarding  
- https://developers.google.com/wallet/retail/loyalty-cards/getting-started/request-publishing-access  
- https://developers.google.com/wallet/retail/loyalty-cards/getting-started/auth/rest  
- https://developers.google.com/wallet/retail/loyalty-cards/test-and-go-live/launch-checklist  

### Design / template / brand

- https://developers.google.com/wallet/retail/loyalty-cards/resources/template  
- https://developers.google.com/wallet/retail/loyalty-cards/resources/brand-guidelines  

### REST reference

- https://developers.google.com/wallet/reference/rest/v1/loyaltyclass  
- https://developers.google.com/wallet/reference/rest/v1/loyaltyobject  
- https://developers.google.com/wallet/reference/rest/v1/loyaltyclass/insert  
- https://developers.google.com/wallet/reference/rest/v1/loyaltyobject/insert  
- https://developers.google.com/wallet/reference/rest/v1/loyaltyobject/patch  
- https://developers.google.com/wallet/reference/rest/v1/Barcode  
- https://developers.google.com/wallet/reference/rest/v1/BarcodeType  
- https://developers.google.com/wallet/reference/rest/v1/LocalizedString  
- https://developers.google.com/wallet/reference/rest/v1/Jwt  

Companion (comparison only, not a Google source): `docs/tech/apple-wallet-research.md`

---

## 9. Unknowns / open questions

1. **Publishing-access review duration** and rejection criteria details beyond listed prerequisites.  
2. **Whether a Uruguay-based Business / payments profile** is accepted without friction.  
3. **Loyalty-pass save availability** and Google Wallet app behavior on typical Montevideo Android devices/OS versions (not listed in API docs).  
4. **Issuer / API pricing** (if any) beyond possible Google Cloud costs—not stated on fetched Wallet pages.  
5. **Multi-tenant class strategy** (one class per merchant vs parameterized objects)—product decision.  
6. **Exact Spanish locale tag** rendering preference (`es` vs `es-419` vs `es-UY`) on devices in Uruguay.  
7. **Smart Tap / NFC** acquirer & terminal availability in Montevideo—out of barcode MVP.  
8. **CallbackOptions** (save/delete callbacks) usefulness for analytics—documented on class but not deeply explored here.  
9. Whether **Generic** pass would ever be preferable for a highly custom stamp-grid image UX vs Loyalty points—Loyalty is the documented loyalty path.

---

## 10. Practical MVP recommendation (Android + shared signup with Apple)

1. **One mobile-web signup** after merchant QR: create customer in your ledger; issue **both** platforms from the confirmation page:
   - iOS / Safari → Apple `.pkpass` (see Apple research)  
   - Android / Chrome → Google **Add to Google Wallet** JWT link (this note)  
   - Optional: let user pick if UA ambiguous  
2. **Google path:** Issuer account → Cloud SA → create **LoyaltyClass** per merchant (or per program) → `insert` **LoyaltyObject** with `QR_CODE` = customer id, `loyaltyPoints.balance.int` = stamps → short JWT referencing object id.  
3. **Updates:** On earn/redeem, update your DB first, then `PATCH` `loyaltyPoints`; use `notifyOnUpdate` only for meaningful milestones (e.g. “listo para canjear”) to respect **3/24h** quota.  
4. **Stay in Demo Mode** with test accounts until flows + scanner tests pass; complete Business Profile; **request publishing access** before public Montevideo launch.  
5. **Skip Smart Tap / rotating barcodes** for MVP.  
6. **Spanish:** default `LocalizedString` to Latin American Spanish; use official **Spanish (Latin America)** button assets; keep product name **“Google Wallet”**.  
7. **Do not block** Android launch on unknown Uruguay pass-penetration—**pilot with real devices** in Montevideo during Demo Mode / early publishing.

This gives feature parity with Apple for the SaaS story: QR signup, scannable ID, remote stamp updates, no customer app—while respecting each platform’s issuance and update mechanics.

