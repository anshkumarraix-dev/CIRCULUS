# ♻️ CIRCULUS

## AI-Powered Circular Economy Marketplace

> Turning industrial waste into valuable resources.

[![Live Demo](https://img.shields.io/badge/Live_Demo-circulus--rust.vercel.app-blue?style=for-the-badge&logo=vercel)](https://circulus-rust.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/anshkumarraix-dev/CIRCULUS)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](#license)

---

## 🎯 1. Problem
Industrial manufacturing generates massive amounts of high-value scrap (metals, plastics, e-waste). However, due to fragmented supply chains, opaque pricing, and lack of verifiable quality tracking, a significant portion of this material is downcycled or sent to landfills. This inefficiency drives unnecessary virgin material extraction, contributing heavily to global industrial carbon emissions.

## 💡 2. Solution
CIRCULUS is a secure enterprise portal designed to close the loop on industrial waste. By leveraging multimodal AI (Google Gemini), CIRCULUS instantly classifies, values, and tracks industrial scrap, connecting manufacturers directly with verified recyclers through an intelligent marketplace.

## ✨ 3. Key Features
- **AI-Powered Material Scanner:** Instantly classify scrap types and purity from a photograph using Gemini 2.5 Flash.
- **Material Intelligence Passport:** Auto-generate a "Digital Aadhaar" for materials containing compliance data.
- **Smart Buyer Matching:** Proximity-based recommendation engine connecting scrap generators with regional remelting facilities.
- **Chain of Custody Ledger (Simulated):** A prototype audit timeline tracking material movement from origin to remelt.
- **Live Industrial Marketplace (Demo Data):** An illustrative marketplace grid and benchmark ticker for material discovery.
- **CirculAI Assistant:** Context-aware interactive copilot answering industrial recycling queries.

## 🧠 4. AI Intelligence
CIRCULUS integrates **Google Gemini 2.5 Flash (Multimodal Vision & Reasoning)** for core operations.

- **Where it is used:** The AI is used in the `Scanner` module to analyze uploaded images of industrial scrap, and in the `Copilot` for interactive Q&A.
- **Workflow:** `Photograph / Description` → `Express Backend Proxy` → `Gemini AI` → `Material Classification (Purity / Category)` → `Marketplace Ready Data`.
- **Security:** All AI processing is strictly handled on the Node.js backend. The `GEMINI_API_KEY` is completely isolated from the client-side browser, ensuring credential security.

## 🏛️ 5. Architecture

### Real / Implemented
* **AI classification:** Image-based analysis using Gemini Multimodal APIs.
* **Persistent Records:** Node.js backend acting as the primary source of truth for passports and listings (via in-memory Hackathon DB).
* **SHA-256 Hashing:** Deterministic content hashing for material passports to establish a tamper-evident baseline.
* **Custody State Machine:** Backend-enforced transitions for ownership transfer.
* **Authorization:** Server-side JWT/session validation preventing guest privilege escalation.
* **Evidence Management:** File and metadata tracking for verification records.

### Demo / Simulated
* **CIRCULUS Demo Ledger:** Event hashing and chaining is simulated in an internal ledger without connecting to a public blockchain.
* **Demo Market Activity:** Pricing metrics and buyers are generated from realistic seed data to demonstrate marketplace logic without relying on external real-time trading APIs.
* **Government/GSTIN Checks:** Currently limited to regex format checks, labeled as `GSTIN_FORMAT_CHECKED`.
* **Lab Verification:** Simulated lab statuses default to `LAB_VERIFICATION_PENDING` unless seeded evidence is present.

### Production Roadmap
* **Polygon Testnet/Mainnet Smart Contract:** Migrate the Demo Ledger to an actual Polygon adapter.
* **Government Verification:** Integrate with GSTN/SPCB APIs for real-time compliance validation.
* **Lab Integrations:** API partnerships with certified material testing laboratories.
* **Logistics APIs:** E-way bill and GPS tracking integration.
* **Production Identity:** OAuth/Enterprise SSO and HSM-backed digital signatures.

## 🛠️ 6. Tech Stack & Architecture
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Motion (motion/react), Lucide Icons
- **Backend:** Node.js, Express (with bundled `esbuild` server production pipeline)
- **AI Integration:** Google Gemini API (`@google/genai` with `gemini-3.7-flash` & `gemini-3.1-flash-lite`)
- **Serverless Deployments:** Vercel serverless API routes (`/api/*`) and SPA fallback routing

## 📁 7. Project Structure

```text
CIRCULUS/
├── docs/                   # Architecture, development guides, and contributing docs
├── public/                 # Static assets (logo, industrial backgrounds)
├── src/                    # Primary application source code
│   ├── components/
│   │   ├── auth/           # OTP & GSTIN Authentication & Registration
│   │   ├── common/         # Activity Ticker, Entry Modals, AIChatWidget, Google Maps
│   │   ├── compliance/     # India Compliance Hub (CPCB / SPCB EPR)
│   │   ├── impact/         # Impact Analytics & BRSR / Scope 3 Carbon Reports
│   │   ├── layout/         # Header, Sidebar, Drawer, and Footer navigation
│   │   ├── ledger/         # Tamper-evident Ownership Ledger & Custody Trails
│   │   ├── marketplace/    # Live Scrap Marketplace & Listing Modals
│   │   ├── matches/        # Proximity-based AI Buyer Matching
│   │   ├── passport/       # Digital Product Passport (DPP) & SHA-256 Hashes
│   │   ├── scanner/        # Multimodal AI Material Photo & Stream Scanner
│   │   └── ui/             # Reusable UI primitives (Badges, Chips)
│   ├── lib/                # Valuation, Carbon LCA, Matching & Ledger Adapters
│   ├── utils/              # AI Copilot engine & helper engines
│   ├── types.ts            # Core TypeScript interfaces & enum models
│   ├── App.tsx             # Main application component & routing state
│   ├── main.tsx            # React root mount
│   └── index.css           # Tailwind CSS v4 styles and custom scrollbar
├── .env.example            # Environment variable declarations
├── index.html              # HTML entry point
├── metadata.json           # Platform application metadata
├── package.json            # NPM dependencies and build scripts
├── server.ts               # Express backend proxy for secure Gemini & Maps calls
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build and plugin configurations
```

## 👩‍💻 8. Development & Workflow Guidelines

- **Direct Source Edits:** All changes are made directly within `src/` and `server.ts`. Ad-hoc root patch scripts are prohibited.
- **Type Safety:** Maintain strict TypeScript types without `any` regressions.
- **Secure Key Handling:** Gemini API keys must remain strictly server-side (`process.env.GEMINI_API_KEY`) via Express/Vercel proxies and never be exposed in client code.
- **Native Scrolling:** The application uses native CSS smooth scrolling (`class="scroll-smooth"`). Do not introduce virtual scroll interceptors.

## 🚀 8. Installation

```bash
git clone https://github.com/anshkumarraix-dev/CIRCULUS.git
cd CIRCULUS
npm install
```

## 🔐 9. Environment Variables
Copy the template file:
```bash
cp .env.example .env
```
Add your required keys to `.env` (Never commit this file):
```env
GEMINI_API_KEY="your_api_key_here"
```

## 🎥 10. Demo Flow (3-Minute Judge Guide)
1. **Access Portal:** Open the Live Demo.
2. **AI Scanner:** Navigate to the Scanner, upload a sample scrap photo.
3. **Classification:** Run the AI Material Test to see Gemini's technical breakdown.
4. **Passport:** View the generated Material Passport.
5. **Marketplace:** Browse the marketplace discovery grid.
6. **Copilot:** Ask the CirculAI assistant a question about recycling.

## 🌍 11. Impact
*(Estimated / Prototype Metrics)*
By connecting buyers and sellers directly and accurately classifying materials, CIRCULUS aims to increase the recovery rate of high-value industrial scrap, directly reducing Scope 3 emissions associated with virgin material mining.

## 🔭 12. Future Scope
- Integration with live national compliance databases.
- Real-time verified logistics tracking.
- IoT integration for automated weight and purity sensing.

## 👥 13. Team
- Built by the CIRCULUS Hackathon Team.

## 📄 14. License
This project is licensed under the [MIT License](LICENSE).

---

## ⚠️ Security Notice & Git History Warning
**Important:** If you are migrating this repository or cloning it from an older version where a `GEMINI_API_KEY` or any other credential might have been hardcoded for testing, **that secret is still visible in the Git commit history.**
If you have ever committed a real secret to this repository, you must **rotate/revoke that key immediately** in the Google AI Studio console or your respective provider dashboard. Never rely on deleting a file in a new commit to hide a compromised secret.
