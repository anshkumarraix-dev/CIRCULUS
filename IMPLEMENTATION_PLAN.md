# CIRCULUS Implementation Plan (India Edition)

## 1. Feature Status & Architecture Overview
- **Project Name:** CIRCULUS (SD-04 · Circular Economy Marketplace)
- **Target Market:** India Industrial & Recycling Ecosystem
- **Default Standards:**
  - Currency: INR (₹)
  - Unit of Mass: Metric Tonnes (MT)
  - Distance: Kilometres (km)
  - Identity Standards: GSTIN, PAN, Udyam MSME, SPCB / CPCB identifiers
  - Regulatory Context: Plastic/E-Waste/C&D EPR, IS 3812 Class F Fly Ash, C&D Rules 2025, BRSR reporting

## 2. Core Workflow Implementation
`UPLOAD → AI ANALYZE → MATERIAL PASSPORT → MATCH → VERIFY OWNERSHIP → IMPACT`

1. **Scanner & Gemini Multimodal Classification:**
   - Server-side `@google/genai` with model `gemini-3.7-flash` and strict JSON schema.
   - Comprehensive fallback with India-specific industrial material fixtures.
   - Animated deterministic progress feedback.
2. **Material Passport System (Flagship Certificate UI):**
   - High-fidelity industrial digital passport with QR Code generator for bale tags/e-way bills.
   - Circular lifecycle stages: Input → Waste → Recovery → Reuse → Impact.
   - Transparent evidence status flags (`AI-estimated`, `User-provided`, `Demo data`, `Verified on-chain`).
3. **B2B Industrial Marketplace & Valuation Engine:**
   - Indian industrial cluster listings with dynamic pricing formula (Base Index + Grade Purity + Demand - Freight).
   - Multi-parameter filtering by material stream, state/SPCB, grade, and EPR status.
4. **Explainable AI Matching Engine:**
   - "Why this match?" algorithm showing compatibility %, logistics radius (km), freight estimate (₹), and carbon avoidance.
5. **Carbon Impact Engine & BRSR Analytics:**
   - Math-backed avoided emissions (Landfill avoided + Virgin replacement offset).
   - India CCTS carbon price benchmark (₹2,000/tCO2e) with editable parameter.
   - Exportable BRSR (Business Responsibility & Sustainability Reporting) audit summary.
6. **Ownership Ledger (Hybrid Trust Layer):**
   - Mock verifiable ledger with SHA-256 hash generation + Polygon Amoy testnet adapter.
   - Full chain-of-custody timeline.
7. **CirculAI Reuse Copilot:**
   - Context-grounded server-side Gemini conversational assistant.

## 3. Verification Checklist
- [x] Full-stack Express + Vite server configured
- [x] Gemini API key kept strictly server-side
- [x] Resilient offline fallback fixtures
- [x] Clean dark forest-black & mint aesthetic matching circular economy standards
- [x] Full mobile responsive layout and accessible touch targets
- [x] Zero build or lint errors
