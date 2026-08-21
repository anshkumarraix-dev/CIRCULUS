import { GoogleGenAI } from "@google/genai";

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Comprehensive local domain responses for circular economy and Indian compliance
function generateDomainFallback(query: string): string {
  const q = (query || "").toLowerCase().trim();

  if (q.includes("epr") || q.includes("cpcb") || q.includes("spcb") || q.includes("plastic") || q.includes("compliance")) {
    return `### 📋 CPCB Extended Producer Responsibility (EPR) Guidelines

Under the **Plastic Waste Management (PWM) Rules 2022 / 2024** by CPCB & MoEFCC:
- **Category I (Rigid Plastics):** Minimum recycled plastic content is 30% (2025-26), scaling to 60% by 2028-29.
- **Category II (Flexible Packaging):** Single layer films, pouches, carry bags.
- **Category III (Multi-layered Plastics):** Barrier packaging with metallic foils.
- **Category IV (Compostable Plastics):** Certified under IS/ISO 17088 standards.

Verified secondary transactions on CIRCULUS automatically generate auditable EPR certificates and State Pollution Control Board manifests.`;
  }

  if (q.includes("fly ash") || q.includes("ash") || q.includes("moefcc") || q.includes("cement") || q.includes("ppc")) {
    return `### ⚡ MoEFCC Fly Ash Utilization Standard

Under the **MoEFCC Fly Ash Notification (2021/2023)**:
- Thermal power plants must achieve 100% fly ash utilization.
- **IS 3812 (Part 1)** Pozzolanic grade fly ash substitutes OPC clinker in Portland Pozzolana Cement (PPC).
- Each 1 MT of fly ash substituting cement clinker avoids **0.80 t CO₂e (800 kg CO₂e)**.
- Transportation requires enclosed pneumatic bulkers under SPCB regulations.`;
  }

  if (q.includes("passport") || q.includes("dpp") || q.includes("blockchain") || q.includes("polygon") || q.includes("provenance")) {
    return `### 🛡️ CIRCULUS Digital Product Passport (DPP) Architecture

- **SHA-256 Provenance:** Every material lot is sealed with a cryptographic hash capturing chemical composition, location GPS, and testing parameters.
- **On-Chain Anchoring:** State roots are anchored to **Polygon PoS / Arbitrum** for tamper-evident supply chain auditing.
- **NFC / QR Field Scanning:** Real-time mobile verification without centralized database lock-in.`;
  }

  if (q.includes("carbon") || q.includes("co2") || q.includes("lca") || q.includes("emission") || q.includes("credit")) {
    return `### 🌱 Carbon Avoidance & LCA Emission Offsets

- **Aluminium 6063 Scrap:** Avoids **8.20 t CO₂e / MT** (vs. virgin bauxite smelting).
- **E-Waste PCBs:** Avoids **5.40 t CO₂e / MT** (vs. open-pit precious metal ore extraction).
- **Recycled Cotton Chindi:** Avoids **3.20 t CO₂e / MT** (vs. virgin cotton agriculture).
- **Tire Rubber Crumb:** Avoids **1.80 t CO₂e / MT** (vs. virgin synthetic SBR).
- **rPET Flakes (AA):** Avoids **1.72 t CO₂e / MT** (vs. virgin crude naphtha).
- **HMS Steel Scrap:** Avoids **1.50 t CO₂e / MT** (vs. blast furnace iron ore).
- **Fly Ash (Pozzolanic):** Avoids **0.80 t CO₂e / MT** (vs. calcined cement clinker).`;
  }

  if (q.includes("steel") || q.includes("ferrous") || q.includes("hms") || q.includes("iron")) {
    return `### ⚙️ Heavy Melting Steel Scrap (HMS 1/2) Specifications

- **Standard:** IS 2549 / ISRI 200-206 (thickness ≥ 6mm).
- **Pricing:** ₹38,500 – ₹42,000 / MT across Kalinganagar, Jalna, and Mandi Gobindgarh.
- **Environmental Offset:** Saves 1.50 t CO₂e and 74% energy per MT vs blast-furnace ore route.`;
  }

  return `### 🤖 CIRCULUS Industrial Material Intelligence Copilot

I can help you navigate Indian industrial circular economy regulations, material pricing, Digital Product Passports, and carbon accounting:
- **EPR Quotas:** CPCB Plastic Categories I–IV, E-Waste & Battery rules.
- **Secondary Pricing:** Live rates across Sanand, Peenya, Manesar, Chakan, and Kalinganagar.
- **Material Passports:** Cryptographic SHA-256 batch provenance & Polygon anchoring.
- **Carbon Accounting:** Auditable Scope 3 avoided emissions (ISO 14064 / GHG Protocol).`;
}

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed. Use POST." });
  }

  const { message, history, systemInstruction } = req.body || {};
  const query = typeof message === "string" ? message : "";

  if (!query.trim()) {
    return res.status(400).json({ success: false, error: "Message is required." });
  }

  const ai = getGeminiClient();
  if (ai) {
    const modelsToTry = ["gemini-3.7-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
    const sysPrompt = systemInstruction || "You are the CIRCULUS Industrial Copilot, an expert AI assistant specializing in Indian industrial circular economy, CPCB/SPCB EPR regulations, Digital Product Passports (DPP), material valuation, and carbon lifecycle assessment (LCA).";

    for (const model of modelsToTry) {
      try {
        const contents: any[] = [];
        if (Array.isArray(history)) {
          for (const h of history.slice(-6)) {
            if (h.role && h.text) {
              contents.push({
                role: h.role === "assistant" || h.role === "model" ? "model" : "user",
                parts: [{ text: String(h.text) }],
              });
            }
          }
        }
        contents.push({ role: "user", parts: [{ text: query }] });

        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            systemInstruction: sysPrompt,
            temperature: 0.7,
          },
        });

        if (response.text) {
          return res.status(200).json({
            success: true,
            text: response.text,
            source: "gemini_live",
          });
        }
      } catch (err) {
        console.warn(`[Vercel Serverless] Model ${model} failed, trying next:`, err);
      }
    }
  }

  // Fallback domain response
  const fallbackText = generateDomainFallback(query);
  return res.status(200).json({
    success: true,
    text: fallbackText,
    source: "circulus_knowledge_base",
  });
}
