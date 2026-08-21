/**
 * CIRCULUS Industrial Copilot AI Intelligence Engine
 * Provides comprehensive circular economy domain expertise, Indian regulatory compliance (CPCB/SPCB),
 * carbon lifecycle analytics, Digital Product Passport (DPP) guidance, and marketplace intelligence.
 */

export interface CopilotResponse {
  text: string;
  suggestedFollowUps?: string[];
  category?: string;
  source: "gemini_live" | "circulus_knowledge_base";
}

export function generateLocalCopilotResponse(query: string, history: Array<{ role: string; text: string }> = []): string {
  const q = query.toLowerCase().trim();

  // 1. EPR Regulations & CPCB Compliance
  if (
    q.includes("epr") ||
    q.includes("cpcb") ||
    q.includes("spcb") ||
    q.includes("plastic waste") ||
    q.includes("category 1") ||
    q.includes("category i") ||
    q.includes("pwm") ||
    q.includes("compliance") ||
    q.includes("certificate")
  ) {
    return `### 📋 CPCB Extended Producer Responsibility (EPR) Intelligence

Under the **Plastic Waste Management (PWM) Rules 2022 & 2024 Amendments** by MoEFCC & CPCB:

1. **Categorization of Packaging Streams:**
   - **Category I (Rigid Plastics):** Bottles, drums, crates (e.g., HDPE, PP, PET). Minimum recycled content target: **30% (2025-26)** scaling to **60% by 2028-29**.
   - **Category II (Flexible Single-layer):** Pouches, wraps, carry bags.
   - **Category III (Multi-layered Plastic - MLP):** At least one layer of plastic with metal foil/paper.
   - **Category IV (Compostable Plastics):** Certified under IS/ISO 17088.

2. **EPR Credit Generation on CIRCULUS:**
   - Every verified transaction of secondary recycled polymers generates cryptographically validated EPR credits.
   - Registered PIBOs (Producers, Importers, Brand Owners) can purchase verified recycling certificates directly via the CIRCULUS ledger.
   - Automatic dispatch of State Pollution Control Board (SPCB) manifests with e-Way bill cross-validation.

*Tip: You can use the **India Compliance Hub** tab to audit your facility's real-time EPR certificate quotas.*`;
  }

  // 2. Fly Ash & Thermal Power Regulations
  if (q.includes("fly ash") || q.includes("ash") || q.includes("thermal power") || q.includes("moefcc fly ash") || q.includes("ppc")) {
    return `### ⚡ MoEFCC Fly Ash Utilization Mandate & Logistics

Under the **MoEFCC Fly Ash Notification (2021 & 2023 Amendments)**:

1. **100% Utilization Mandate:**
   - Thermal Power Plants (TPPs) must achieve 100% fly ash utilization on a 3-year rolling average.
   - Unutilized legacy fly ash incurs environmental compensation penalties of ₹1,000 per MT.

2. **Certified Engineering Applications:**
   - **Portland Pozzolana Cement (PPC):** Conforms to **IS 3812 (Part 1)** pozzolanic grade.
   - **Fly Ash Bricks & AAC Blocks:** Conforms to **IS 12894** and **IS 2185 (Part 3)**.
   - **NHAI Road Embankments:** Mandatory fly ash stabilization within a 300 km radius of thermal plants.

3. **Carbon Decarbonization Credit:**
   - Every 1 MT of fly ash substituting OPC clinker avoids approximately **0.80 t CO₂e (800 kg CO₂e)**.
   - Circular transport must be handled via enclosed pneumatic bulker trucks under SPCB guidelines.`;
  }

  // 3. Digital Product Passport (DPP) & Blockchain
  if (
    q.includes("passport") ||
    q.includes("dpp") ||
    q.includes("blockchain") ||
    q.includes("polygon") ||
    q.includes("provenance") ||
    q.includes("sha-256") ||
    q.includes("smart contract") ||
    q.includes("ledger")
  ) {
    return `### 🛡️ CIRCULUS Digital Product Passport (DPP) & Provenance Ledger

CIRCULUS generates cryptographically anchored **Digital Material Passports** based on the ISO 14040/44 LCA & EU/India DPP framework:

- **Immutable Batch Hash:** Each lot is hashed using **SHA-256** representing its chemical purity, origin GPS coordinates, laboratory testing parameters, and chain-of-custody.
- **On-Chain Anchoring:** The passport root hash and custody events are periodically anchored to the **Polygon PoS / Arbitrum** public ledger to ensure tamper-proof audit trails for global supply chains.
- **Physical Verification:** QR-encoded tags linked to NFC transponders allow field auditors and customs officers to verify material composition instantly without relying on centralized databases.
- **Zero-Knowledge Privacy:** Proprietary pricing and trade secrets remain encrypted; only sustainability and compliance proofs are shared publicly.

*Explore the **Material Passports** and **Ownership Ledger** tabs to inspect real-time batch manifests.*`;
  }

  // 4. Heavy Melting Steel (HMS) / Ferrous Scrap
  if (q.includes("steel") || q.includes("ferrous") || q.includes("hms") || q.includes("iron scrap") || q.includes("scrap metal") || q.includes("tmt")) {
    return `### ⚙️ Heavy Melting Steel (HMS 1/2) Technical Specifications

1. **Standard Grades & Quality Benchmarks:**
   - **IS 2549 / ISRI 200-206:** Thickness ≥ 6mm, charging dimension < 1.5m x 0.5m.
   - Free from pressurized cylinders, sealed drums, galvanized dross, and non-metallic inclusions (<1% impurity).
   - High density for Electric Arc Furnace (EAF) and Induction Furnace melting into secondary TMT billets.

2. **Market Benchmark Pricing (India Hubs):**
   - **Kalinganagar / Jajpur (Odisha):** ₹38,500 – ₹42,000 / MT.
   - **Jalna / Mandi Gobindgarh:** ₹41,000 – ₹44,500 / MT.
   - **Alang (Shipbreaking Heavy Plate):** ₹42,500 – ₹45,000 / MT.

3. **Carbon Lifecycle Benefits:**
   - Recycling 1 MT of secondary steel scrap saves **1.50 t CO₂e (1,500 kg CO₂e)** and 74% less energy compared to virgin blast-furnace (BF-BOF) iron ore smelting.`;
  }

  // 5. rPET / Plastics
  if (q.includes("pet") || q.includes("rpet") || q.includes("plastic") || q.includes("polymer") || q.includes("hdpe") || q.includes("pp")) {
    return `### 🧪 Recycled PET (rPET) & Engineering Polymers

1. **Technical Specifications:**
   - **Hot Washed Clear Flakes (Grade AA):** Intrinsic Viscosity (IV) > 0.78 dl/g, moisture < 0.5%, PVC contamination < 50 ppm.
   - **Applications:** FSSAI/CPCB compliant bottle-to-bottle preforms, recycled polyester staple fiber (rPSF), and thermoforming sheet.

2. **HSN & GST Classification:**
   - **HSN Code 39076100:** Polyethylene terephthalate (PET).
   - **GST Rate:** 18% with full input tax credit (ITC) on industrial invoice.

3. **Carbon Savings:**
   - Avoids **1.72 kg CO₂e per kg of rPET** (1,720 kg CO₂e / MT) compared to virgin crude-oil naphtha-derived polymer resins.`;
  }

  // 6. Carbon Credits & Sustainability / LCA Calculations
  if (
    q.includes("carbon") ||
    q.includes("co2") ||
    q.includes("credit") ||
    q.includes("lca") ||
    q.includes("emission") ||
    q.includes("greenhouse") ||
    q.includes("scope 3") ||
    q.includes("esg")
  ) {
    return `### 🌱 Carbon Avoidance & Scope 3 LCA Methodology

CIRCULUS calculates carbon emissions avoided across 10 major industrial material streams following **ISO 14064** and **GHG Protocol** standards:

| Material Stream | Avoided Baseline | Factor (t CO₂e / MT) |
|---|---|---|
| **Aluminium Extrusion (6063)** | Hall-Héroult Bauxite Smelting | **8.20 t CO₂e** |
| **E-Waste Critical PCBs** | Precious Metal Ore Mining | **5.40 t CO₂e** |
| **Cotton Textile Chindi** | Virgin Cotton Agriculture & Dyeing | **3.20 t CO₂e** |
| **Recycled Tyre Rubber Crumb** | Virgin SBR Synthetic Rubber | **1.80 t CO₂e** |
| **rPET Flakes (AA Grade)** | Naphtha Crude Oil Virgin Polymer | **1.72 t CO₂e** |
| **HMS 1/2 Steel Scrap** | Blast Furnace Iron Ore / Coke | **1.50 t CO₂e** |
| **OCC Cardboard Bales** | Virgin Timber Logging & Pulping | **1.10 t CO₂e** |
| **Fly Ash (Pozzolanic)** | OPC Clinker Decarbonization | **0.80 t CO₂e** |
| **GBFS Slag** | Portland Clinker Calcination | **0.70 t CO₂e** |
| **Recycled Concrete (RCA)** | River Sand & Hill Blasting | **0.22 t CO₂e** |

*All carbon metrics are auditable via the **Impact Analytics** dashboard with downloadable BRSR-compliant sustainability certificates.*`;
  }

  // 7. Marketplace & Pricing / How to Buy & Sell
  if (
    q.includes("buy") ||
    q.includes("sell") ||
    q.includes("price") ||
    q.includes("marketplace") ||
    q.includes("listing") ||
    q.includes("how to") ||
    q.includes("bid") ||
    q.includes("auction")
  ) {
    return `### 🤝 CIRCULUS Secondary Material Marketplace Workflow

To buy or sell industrial secondary byproducts on CIRCULUS:

1. **AI Vision Material Scan:**
   - Go to **AI Material Scanner** to capture or upload images of your lot.
   - The neural engine detects composition, contamination risk, estimated weight, and assigns an IS/CPCB grade.

2. **Instant DPP Generation:**
   - Click *Create Material Passport* to generate a verifiable digital batch record with custody cryptographic hashes.

3. **Publish to Marketplace:**
   - Set your reserve price (INR/MT), minimum lot quantity, and warehouse pickup location.
   - Verified buyers across industrial corridors (Gujarat, Maharashtra, Tamil Nadu, Karnataka, NCR) receive automated match notifications.

4. **Escrow Settlement & Logistics:**
   - Smart contracts lock payment escrow upon bid acceptance.
   - SPCB e-Way bill and weighbridge slip are uploaded for digital release of funds.`;
  }

  // 8. E-Waste & Battery Rules
  if (q.includes("e-waste") || q.includes("ewaste") || q.includes("battery") || q.includes("pcb") || q.includes("lithium") || q.includes("electronic")) {
    return `### ⚡ E-Waste & Battery Waste Management Rules 2022

1. **E-Waste Rules (2022) Mandates:**
   - Covers 106 categories including IT hardware, consumer electronics, and **Solar PV modules**.
   - Strict recycling targets for recovery of precious and critical metals (Gold, Silver, Palladium, Copper, Lithium, Cobalt, Nickel).
   - Recyclers must hold valid authorization from respective SPCBs and CPCB EPR registration.

2. **Battery Waste Management Rules (BWMR 2022):**
   - Applies to EV batteries, industrial batteries, and portable consumer cells.
   - Mandatory minimum recycled material recovery: **70% by 2024-25**, scaling to **90% by 2026-27**.
   - Mandatory EPR certificate portal registration for battery manufacturers and recyclers.`;
  }

  // 9. Default greeting / general overview
  return `### 🤖 CIRCULUS Industrial Material Intelligence Copilot

I am your circular economy copilot, trained on Indian industrial standards, CPCB/SPCB regulations, and material valuation models. 

**I can assist you with:**
- 📜 **EPR Compliance:** CPCB Plastic Packaging (Cat I-IV), E-Waste, Battery & C&D Waste Rules.
- 🔬 **Material Technical Specs:** IS standards, contamination tolerance, Intrinsic Viscosity, moisture limits.
- 💰 **Market Valuation:** Real-time pricing across Sanand, Peenya, Manesar, Chakan, and Kalinganagar.
- 🌿 **Carbon LCA Metrics:** Scope 3 emissions avoided per MT of recycled feedstock.
- 🛡️ **Digital Product Passports:** Blockchain provenance hashes, batch custody, and QR tracking.

**Suggested Queries:**
- *"What are the CPCB EPR targets for Category I rigid plastics?"*
- *"Calculate carbon avoidance for 50 MT of Class F Fly Ash."*
- *"What is the HSN code and specification for HMS 1 steel scrap?"*
- *"How does the Digital Material Passport verify custody?"*`;
}
