# ♻️ CIRCULUS

## AI-Powered Circular Economy Marketplace

> Turning industrial waste into valuable resources through AI-driven material intelligence and smart supply chain matchmaking.

[![Live Demo](https://img.shields.io/badge/Live_Demo-circulus--rust.vercel.app-blue?style=for-the-badge&logo=vercel)](https://circulus-rust.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/anshkumarraix-dev/CIRCULUS)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](#license)

---

## 🎯 The Problem

Industrial manufacturing generates massive amounts of high-value scrap (metals, plastics, e-waste). However, due to fragmented supply chains, opaque pricing, and lack of verifiable quality tracking, a significant portion of this material is downcycled or sent to landfills.

This inefficiency not only costs the industry billions but also drives unnecessary virgin material extraction, contributing heavily to global industrial carbon emissions.

## 💡 The Solution

CIRCULUS is a secure enterprise portal designed to close the loop on industrial waste. By leveraging multimodal AI (Google Gemini), CIRCULUS instantly classifies, values, and tracks industrial scrap, connecting manufacturers directly with verified recyclers through an intelligent marketplace.

---

## ✨ Key Features

- **Multimodal AI Material Scanner:** Instantly classify scrap types, purity, and standard compliance from a single photograph using Gemini 2.5 Flash.
- **Material Intelligence Passport:** Auto-generate a "Digital Aadhaar" for materials containing compliance data, environmental impact, and a scannable QR code.
- **Smart Buyer Matching:** Proximity-based recommendation engine connecting scrap generators with appropriate regional remelting facilities.
- **Chain of Custody Ledger:** Immutable audit timeline tracking material movement from origin mint to final remelt certificate.
- **Live Industrial Marketplace:** Real-time Indian Scrap Benchmark ticker, 1-click listings, and discovery grid.
- **CirculAI Assistant:** Context-aware interactive copilot answering industrial recycling and compliance (SPCB/CPCB) queries.
- **BRSR Sustainability Impact Dashboard:** Real-time tracking of CO₂ avoidance and circularity metrics.

---

## 🧠 How CIRCULUS Works

```text
Industrial Waste 
      ↓
📸 AI Material Scanner (Gemini)
      ↓
🛂 Material Passport Generated (Classification & Grade)
      ↓
🌐 Live Marketplace Listing
      ↓
🤝 Smart Buyer/Seller Match (Proximity & Need)
      ↓
🚚 Secure Handover (Chain of Custody Ledger)
      ↓
♻️ Final Remelt & Circular Economy Impact
```

## 🤖 AI Intelligence

CIRCULUS heavily integrates **Google Gemini 2.5 Flash (Multimodal Vision & Reasoning)** for core operations.

- **Where it is used:** The AI is used in the `Scanner` module to analyze uploaded images of industrial scrap, and in the `Copilot` for interactive compliance Q&A.
- **Input:** Photographic evidence of industrial material, along with contextual meta-data.
- **Output:** Structured JSON containing precise material categorization (e.g., Aluminium 6063), estimated purity score, contaminant flags, and recommended next steps.
- **Security:** All AI processing is strictly handled on the Express backend (`server.ts`). The `GEMINI_API_KEY` is completely isolated from the client-side browser, ensuring enterprise-grade credential security and data sanitization.

---

## 📸 Product Showcase

- **AI Scanner:** Upload a photo and let Gemini deduce material properties.
- **Material Passport:** View the generated digital record.
- **Ledger & History:** Track the transparent lifecycle of materials.
- **Marketplace:** Explore current listings and benchmark prices.

---

## 🎥 3-Minute Judge Demo

1. **Access the Portal:** Open the [Live Demo](https://circulus-rust.vercel.app/).
2. **Login Gateway:** Explore as a guest or simulate login.
3. **AI Scanner:** Navigate to the Scanner, upload a sample scrap photo (e.g., Aluminium Extrusion), and run the AI Material Test to see Gemini's technical breakdown.
4. **Material Passport:** View the resulting Digital Aadhaar with its scannable QR code.
5. **Marketplace & Ledger:** Observe the live ticker, browse the marketplace, and track a material's history in the Safe Ledger.
6. **CirculAI Copilot:** Ask the assistant a question about SPCB recycling rules.

*(Note: Certain data points such as live market prices, cryptographically generated hashes, and specific buyer profiles in the demo are illustrative for prototype demonstration purposes.)*

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher
- Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anshkumarraix-dev/CIRCULUS.git
   cd CIRCULUS
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   ```bash
   cp .env.example .env
   ```
   Open `.env` and add your Gemini API Key:
   ```env
   GEMINI_API_KEY="your_api_key_here"
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   *The application will be available at `http://localhost:3000`.*

### Production Build

```bash
npm run build
npm run start
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
