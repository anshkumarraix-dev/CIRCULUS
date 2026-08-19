# 📘 CIRCULUS User & Technical Manual

Welcome to the **CIRCULUS** Industrial Material Intelligence & Circular Economy Platform user manual.

---

## 🏭 1. Quick Overview

CIRCULUS is an AI-powered industrial circular-economy platform designed for Indian manufacturing clusters (e.g. Sanand, Peenya, Bhiwandi, Jamshedpur, Chakan, Kalinganagar). It enables scrap generators to certify waste streams with tamper-proof "Digital Aadhaar" material passports, discover verified regional recycling plants, track carbon offsets, and ensure SPCB/CPCB compliance.

---

## 🚀 2. Getting Started & User Roles

### Roles Available:
1. **Scrap Seller (🏢 Supplier / Factory Officer)**:
   - Lists industrial scrap, off-cuts, and byproduct batches.
   - Runs AI photo scans to determine purity, grade, and fair market value.
   - Issues Digital Aadhaar QR passports for bales and trucks.
2. **Scrap Buyer (🏭 Recycler / Smelter / Foundry)**:
   - Discovers verified secondary materials within logistics clusters.
   - Evaluates material purity, contamination risks, and green savings.
   - Submits commercial purchase offers with custom pricing and delivery terms.
3. **Green Inspector (📋 Auditor / SPCB / CPCB Official)**:
   - Reviews compliance records, Consent to Operate (CTO) permits, and HSN invoices.
   - Verifies SEBI BRSR Core carbon emissions avoidance certificates.

---

## 🔍 3. Core Modules & Step-by-Step Instructions

### A. Photo Scanner (`/scanner`)
1. Upload or select a photo of scrap material (Aluminium 6063, Steel HMS, rPET flakes, etc.).
2. Click **Run AI Material Test**.
3. View Gemini multimodal analysis: grade, purity score, contamination risk, and processing steps.
4. Click **Issue Digital Aadhaar & Material Passport** to mint a certified record.

### B. Marketplace (`/marketplace`)
1. View live benchmark spot rates for Indian industrial scrap.
2. Use the **Value & Carbon Calculator** to simulate revenue and CO₂ smoke avoided.
3. Use **1-Click Fast Launchers** to immediately broadcast sample industrial lots.
4. Filter by material category, state, and active verified buyer counts.

### C. Digital Aadhaar Passports (`/passports`)
1. View the complete specifications and SHA-256 cryptographic hash of every batch.
2. Display the on-screen non-redirecting QR code for factory truck inspection.
3. Review circular reuse recommendations (e.g., solar panel rails, EV chassis, rPSF textile yarn).

### D. Find Buyers (`/matches`)
1. Review AI-recommended buyer plants ranked by proximity (km) and compatibility score.
2. Click **Make Purchase Offer** to send a commercial bid directly to the seller.

### E. Green Impact & BRSR Hub (`/impact`)
1. Track total metric tonnes of waste diverted from landfills.
2. Calculate net CO₂e emissions avoided and tree-planting equivalents.
3. Export verified audit summaries for SEBI BRSR Core filings.

### F. CirculAI Assistant (AI Helper)
1. Click the floating **Ask AI Helper** button in the bottom right corner or in the top bar.
2. Ask any question about scrap recycling, SPCB permits, carbon savings, or metallurgy in simple terms.

---

## 🔒 4. Security & Environment Configuration

- The platform uses a server-side proxy architecture (`server.ts`) where all AI operations are processed on the backend.
- API keys (`GEMINI_API_KEY`) are kept strictly confidential and are never exposed to the client bundle.
- In case of offline operation or missing keys, the built-in domain engine provides reliable industrial fallback data.
