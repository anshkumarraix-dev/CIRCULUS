# ♻️ CIRCULUS — AI-Powered Industrial Material Intelligence & Circular Economy Network (India)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/Frontend-React%2019%20%2B%20TypeScript-61dafb.svg)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Styling-Tailwind%20CSS%20v4-38bdf8.svg)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/AI%20Engine-Gemini%203.7%20%2F%202.5%20Flash-4285f4.svg)](https://ai.google.dev/)
[![Express](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-000000.svg)](https://expressjs.com/)

> **Empowering Indian manufacturing clusters, scrap generators, recyclers, and environmental auditors with verifiable "Digital Aadhaar" material passports, AI scrap scanning, dynamic buyer matching, and SEBI BRSR Core carbon reporting.**

---

## 📌 Executive Summary & Problem Statement

India generates over **62+ million metric tonnes** of industrial waste and scrap annually across heavy manufacturing corridors (Sanand, Peenya, Bhiwandi, Jamshedpur, Chakan, Kalinganagar). However, the secondary material ecosystem faces critical bottlenecks:

1. **Information Asymmetry & Quality Disputes**: Scrap is traded informally without standardized quality grading, leading to predatory middleman pricing and high contamination risks.
2. **Zero End-to-End Traceability**: Recycled materials lack verifiable chain-of-custody, making it difficult for green manufacturers to prove recycled content.
3. **Complex Regulatory Overhead**: MSMEs struggle to navigate State Pollution Control Board (SPCB) rules, CPCB Extended Producer Responsibility (EPR) portals, and Form 10 hazardous manifests.
4. **Uncredited Carbon Avoidance**: Secondary remelting saves up to **95% of electricity** compared to mining virgin bauxite or iron ore, yet factories cannot easily quantify these emissions savings for SEBI BRSR sustainability filings.

**CIRCULUS** solves this by establishing a verifiable digital platform that turns industrial scrap into certified, high-value circular assets.

---

## ✨ Key Features & Capabilities

### 🔍 1. AI Material Photo Scanner & Grade Classifier
- **Powered by Gemini Multimodal AI**: Analyzes photos of factory scrap piles, metal off-cuts, polymer flakes, or slag in seconds.
- **Conservative Technical Assessment**: Accurately estimates material grade (e.g. *Aluminium 6063 T6*, *IS 2549 Heavy Melting Steel*, *Food-Grade rPET Flakes*), surface contamination risk, and reusability percentage.
- **Visual Evidence Breakdown**: Highlights clean shear lines, passivation layers, and absence of toxic coatings or closed containers.
- **Actionable Processing Directives**: Outlines immediate steps needed (e.g., magnetic tramp-iron separation, optical sorting, solid-state polycondensation).

### 🪪 2. Digital Aadhaar for Scrap (Material Passport)
- **Standardized Product ID Card**: Generates a tamper-proof digital passport with an immutable SHA-256 record hash for every certified scrap lot.
- **Self-Contained QR Verification**: Displays a scannable on-screen QR code containing raw batch specs, owner GSTIN, SPCB jurisdiction, and purity metrics (does not redirect to third-party ad sites).
- **Secondary Life Directives**: Suggests certified Indian manufacturing applications (e.g. EV battery trays, solar panel frames, rPSF recycled polyester textile yarn).

### 🛒 3. Interactive Industrial Marketplace & Live Spot Benchmarks
- **Live Indian Scrap Benchmarks**: Ticker bar tracking spot rates (₹/kg) across Aluminium 6063, Copper Armature Wire, rPET Flakes, HMS 1/2 Steel, and Dry Fly Ash.
- **Real-Time Value & Nature Gain Calculator**: Dynamic tonnage slider (5 MT to 100 MT) calculating live factory revenue in Rupees (`₹`), CO₂ smoke prevented, and tree-planting equivalents.
- **1-Click Fast Scrap Launchers**: Mint sample industrial batches instantly for immediate live feed testing.
- **Dynamic Buyer Gauges**: Displays active buyer counts mapped directly to regional industrial clusters.

### 🤝 4. Intelligent Buyer-Seller Matching Engine
- **Proximity-First Logistics Routing**: Prioritizes verified recycler plants within a 50–100 km radius to keep transport fuel emissions below 2%.
- **Direct Purchase Offer Workflow**: Buyers can dispatch commercial purchase offers with custom delivery destinations and unit price bids.

### 📜 5. Immutable Chain-of-Custody & Audit Ledger
- **Verifiable Event Timeline**: Records every lifecycle transition: Genesis Minting ➔ Lab Quality Inspection ➔ Logistics Dispatch ➔ Recycler Remelting.
- **Cryptographic Evidence Tracking**: Associates batch events with transaction hashes and verifiable evidence statuses (`lab_verified`, `third_party_verified`).

### 🌿 6. Carbon Savings & SEBI BRSR Core Analytics
- **Standardized LCA Factors**: Employs GHG Protocol Scope 3 circular avoidance formulas (e.g., 8.2 kg CO₂e saved per kg of secondary aluminium; 1.7 kg CO₂e per kg of rPET).
- **BRSR Sustainability Exports**: Automatically computes landfill volume diverted (MT), avoided coal electricity (kWh), and green audit compliance certificates.

### 📋 7. India Compliance & Regulatory Hub
- **SPCB Consent to Operate (CTO/CTE) Guidelines**: Plain-English breakdowns of State Pollution Control Board requirements.
- **CPCB EPR Framework**: Category-wise guidance for Plastic (Cat I–IV), E-Waste, Battery Waste, and Used Oil Management Rules.
- **HSN & GST Invoicing Guide**: Standardized tax codes (e.g. HSN 7602 for Aluminium, 7204 for Steel, 3915 for Plastic).

### 🤖 8. CirculAI Assistant (AI Helper)
- **10th-Grade English Simplicity**: Translates complex metallurgy, polymer chemistry, and legal norms into friendly, plain explanations.
- **Context-Aware Recommendations**: Answers inquiries specifically tied to the currently inspected material batch or general recycling economics.
- **Persistent Floating Quick Launcher**: Accessible with 1 click from any screen across the application.

---

## 🛠️ Technology Stack & Architecture

### **Frontend**
- **Framework**: React 19 with Vite & TypeScript
- **Styling**: Tailwind CSS v4 (responsive, accessible, high-contrast industrial theme)
- **Icons**: Lucide React
- **Animations**: Motion (`motion/react`)
- **QR Engine**: `qrcode` (browser-rendered SVG/Canvas)

### **Backend & APIs**
- **Runtime**: Node.js with Express & TypeScript (`tsx` in dev, `esbuild` bundled CJS for production)
- **AI Multimodal Model**: `@google/genai` (Google Gen AI SDK with Gemini 3.7 Flash & 2.5 Flash)
- **Security**: Server-Side API Proxy architecture with automatic API key redaction in error traces

### **Architecture Diagram**
```text
┌─────────────────────────────────────────────────────────────┐
│                    CIRCULUS Client (SPA)                    │
│   (React 19 + TypeScript + Tailwind CSS + Lucide Icons)     │
└──────────────┬───────────────────────────────▲──────────────┘
               │                               │
       REST API Requests                JSON Responses
     (/api/materials/analyze)           (Analysis, Pricing,
        (/api/copilot)                  Carbon, Compliance)
               │                               │
┌──────────────▼───────────────────────────────┴──────────────┐
│                CIRCULUS Secure Backend Server               │
│                  (Node.js + Express + TS)                   │
├─────────────────────────────────────────────────────────────┤
│  • Server-Side Gemini API Client Isolation                  │
│  • Error Sanitization & Key Redaction Filter                │
│  • Domain-Specific Industrial Knowledge Fallback Engine     │
│  • Carbon Avoidance & Dynamic Valuation Formulas            │
└──────────────────────────────┬──────────────────────────────┘
                               │
                      Google GenAI SDK
                 (process.env.GEMINI_API_KEY)
                               │
┌──────────────────────────────▼──────────────────────────────┐
│               Google Gemini 3.7 / 2.5 Flash                 │
│              (Multimodal Vision & Reasoning)                │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔒 Security & Privacy Features

- **Strict Server-Side Key Isolation**: `GEMINI_API_KEY` is loaded exclusively inside `server.ts` via server environment variables. It is **never** sent to the client browser or prefixed with `VITE_`.
- **Sensitive Token Sanitization**: Added an error interceptor (`sanitizeErrorMessage`) that strips all raw API keys, bearer tokens, or query secrets and masks them with `[REDACTED_API_KEY]` before logging or responding.
- **No Client Credential Storage**: All AI operations and data processing flow through protected `/api/*` endpoints.

---

## 🚀 Quickstart & Local Setup Instructions

Follow these steps to run CIRCULUS locally from a fresh clone:

### 1. Prerequisites
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 9.0.0 or higher
- **Gemini API Key**: (Optional but recommended) Get a free key at [Google AI Studio](https://aistudio.google.com/)

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/circulus.git
cd circulus
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy the example configuration file:
```bash
cp .env.example .env
```
Open `.env` and configure your keys (optional; the app includes realistic offline fallback engines if no key is provided):
```env
GEMINI_API_KEY="your_actual_gemini_api_key_here"
```

### 5. Launch the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```text
http://localhost:3000
```

### 6. Build for Production
To test the production build:
```bash
npm run build
npm run start
```

### 7. Run Code Quality Checks
```bash
npm run lint
```

---

## 🧭 3-Minute Quick Judge Demo Flow

To experience the full capability of the CIRCULUS platform in under 3 minutes:

1. **Log in or Explore as Guest**:
   - Access the login gateway. Enter any 10-digit mobile number for instant OTP verification or log in with GSTIN credentials.
2. **Explore the Live Marketplace**:
   - Observe the live Indian Scrap Benchmark ticker at the top.
   - Use the **Scrap Value & Nature Gain Calculator** to simulate revenue and CO₂ avoidance for a 25 MT batch.
   - Click any **1-Click Fast Launcher** to mint a sample industrial batch directly into the live feed.
3. **Scan Scrap in the AI Photo Scanner**:
   - Switch to the **Photo Scanner** tab (`/scanner`).
   - Select a sample scrap photo (e.g. *Aluminium Extrusion Scrap 6063*) or upload your own scrap image.
   - Click **Run AI Material Test** to observe Gemini's technical breakdown, purity estimate, and visual evidence.
   - Click **Issue Digital Aadhaar & Material Passport** to mint the certified passport.
4. **Inspect the Digital Aadhaar**:
   - View the newly minted passport with its unique ID, on-chain record hash, and scannable QR verification code.
5. **Review Smart Buyer Matches**:
   - Navigate to **Find Buyers** (`/matches`) to see matched regional plants and send a commercial purchase offer.
6. **Ask the CirculAI Assistant**:
   - Click the floating **Ask AI Helper** button in the bottom right corner and ask questions like *"How much smoke is saved by recycling aluminium scrap?"* or *"What are SPCB rules for scrap?"*.

---

## 📂 Repository File Structure

```text
├── index.html                   # Primary HTML entry point
├── metadata.json                # AI Studio application configuration
├── package.json                 # Dependencies and build scripts
├── server.ts                    # Full-stack Express backend & Gemini API proxy
├── vite.config.ts               # Vite configuration with Tailwind CSS plugin
├── .env.example                 # Template for environment variables
├── src/
│   ├── main.tsx                 # React application entry point
│   ├── App.tsx                  # Root application view & state manager
│   ├── index.css                # Global styling with Tailwind CSS v4
│   ├── types.ts                 # TypeScript type definitions & interfaces
│   ├── lib/
│   │   ├── carbon-engine.ts     # Scope 3 LCA carbon calculation models
│   │   ├── valuation-engine.ts  # Indian industrial scrap valuation formulas
│   │   ├── matching-engine.ts   # Smart buyer-seller proximity matcher
│   │   ├── ledger-adapter.ts    # SHA-256 cryptographic hash & event generator
│   │   └── demo-data.ts         # High-fidelity Indian industrial demo batches
│   └── components/
│       ├── auth/                # Real-time GSTIN & Mobile OTP login flows
│       ├── common/              # Real-time scrap entry modal & reusable cards
│       ├── compliance/          # Indian SPCB, CPCB EPR, and HSN compliance hub
│       ├── copilot/             # CirculAI interactive AI recycling helper
│       ├── demo/                # Interactive step-by-step judge tour guide
│       ├── impact/              # BRSR sustainability & carbon savings dashboard
│       ├── layout/              # App header, role switcher, and footer
│       ├── ledger/              # Chain-of-custody audit timeline
│       ├── marketplace/         # Live benchmark ticker, fast launchers, & grid
│       ├── matches/             # Proximity buyer recommendations
│       ├── passport/            # Digital Aadhaar passport & QR generator
│       └── scanner/             # Gemini multimodal photo scanner
```

---

## 📜 Compliance, Standards & India-Specific Norms

- **CPCB / MoEFCC Guidelines**: Aligned with the Plastic Waste Management Rules (2016/2022 amendments), E-Waste Management Rules (2022), and Hazardous Waste Rules (2016).
- **SEBI BRSR Core**: Emission avoidance metrics match GHG Protocol Scope 3 circular economy reporting standards.
- **GST & HSN Standardization**: Built-in support for HSN 7602 (Aluminium), HSN 7204 (Steel/Ferrous), HSN 7404 (Copper), and HSN 3915 (Polymers).

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.
