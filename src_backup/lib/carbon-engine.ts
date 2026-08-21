/**
 * CIRCULUS — Carbon Impact Engine & BRSR Analytics (India Edition)
 */

import { MaterialCategory, MaterialPassport, BRSRReportSummary } from "../types";

export interface CarbonFactorDefinition {
  category: MaterialCategory;
  materialName: string;
  avoidedKgCo2ePerKg: number; // e.g. 8.2 for aluminium
  landfillDiversionFactor: number;
  sourceStandard: string;
}

export const CARBON_FACTORS: Record<string, CarbonFactorDefinition> = {
  non_ferrous: {
    category: "non_ferrous",
    materialName: "Secondary Aluminium 6063 / Copper",
    avoidedKgCo2ePerKg: 8.2,
    landfillDiversionFactor: 1.0,
    sourceStandard: "Secondary Non-Ferrous Substitution Factor (Bauxite smelting offset)",
  },
  plastic: {
    category: "plastic",
    materialName: "Recycled Polymers (rPET / HDPE / PP)",
    avoidedKgCo2ePerKg: 1.7,
    landfillDiversionFactor: 1.0,
    sourceStandard: "CPCB EPR Plastic LCA Benchmark (Virgin PTA/MEG petrochemical offset)",
  },
  ferrous: {
    category: "ferrous",
    materialName: "Heavy Melting Steel Scrap (HMS 1/2)",
    avoidedKgCo2ePerKg: 1.5,
    landfillDiversionFactor: 1.0,
    sourceStandard: "SAIL & World Steel Association EAF vs BF-BOF emissions factor",
  },
  paper_cardboard: {
    category: "paper_cardboard",
    materialName: "Recycled Corrugated Cardboard & Kraft Paper",
    avoidedKgCo2ePerKg: 1.1,
    landfillDiversionFactor: 1.0,
    sourceStandard: "Forest Tree Preservation & Pulping Energy Reduction Model",
  },
  glass: {
    category: "glass",
    materialName: "Recycled Glass Cullet & Bottles",
    avoidedKgCo2ePerKg: 0.65,
    landfillDiversionFactor: 1.0,
    sourceStandard: "Cullet Remelting Furnace Energy Reduction Standard",
  },
  ewaste: {
    category: "ewaste",
    materialName: "Printed Circuit Boards & Electronic Waste",
    avoidedKgCo2ePerKg: 5.4,
    landfillDiversionFactor: 1.0,
    sourceStandard: "Precious & Critical Metal Hydrometallurgical Recovery LCA",
  },
  wood: {
    category: "wood",
    materialName: "Reclaimed Timber, Pallets & Woodchips",
    avoidedKgCo2ePerKg: 0.9,
    landfillDiversionFactor: 1.0,
    sourceStandard: "Timber Carbon Sequestration & Virgin Deforestation Avoidance",
  },
  textile: {
    category: "textile",
    materialName: "Recycled Cotton & Synthetic Fabric Scraps",
    avoidedKgCo2ePerKg: 3.2,
    landfillDiversionFactor: 1.0,
    sourceStandard: "Textile Waste Upcycling & Raw Cotton Farming Avoidance",
  },
  rubber: {
    category: "rubber",
    materialName: "Shredded Crumb Rubber & End-of-Life Tires",
    avoidedKgCo2ePerKg: 1.8,
    landfillDiversionFactor: 1.0,
    sourceStandard: "Pyrolysis & Asphalt Rubber Modifier Clinker Model",
  },
  organic: {
    category: "organic",
    materialName: "Agricultural Biomass & Food Waste",
    avoidedKgCo2ePerKg: 0.85,
    landfillDiversionFactor: 1.0,
    sourceStandard: "Methane Emission Avoidance & Anaerobic Digestion Benchmark",
  },
  fly_ash: {
    category: "fly_ash",
    materialName: "IS 3812 Class F Pozzolanic Fly Ash",
    avoidedKgCo2ePerKg: 0.8,
    landfillDiversionFactor: 1.0,
    sourceStandard: "MoEFCC Fly Ash Notification & Portland Pozzolana Cement Clinker Displacement Model",
  },
  construction_demolition: {
    category: "construction_demolition",
    materialName: "Recycled Concrete Aggregate (IS 383)",
    avoidedKgCo2ePerKg: 0.25,
    landfillDiversionFactor: 1.0,
    sourceStandard: "C&D Waste Rules 2025 Natural Quarrying & Heavy Transport Offset Baseline",
  },
  slag: {
    category: "slag",
    materialName: "Granulated Blast Furnace Slag (IS 12089)",
    avoidedKgCo2ePerKg: 0.75,
    landfillDiversionFactor: 1.0,
    sourceStandard: "Bureau of Indian Standards IS 12089 Clinker Replacement Carbon Model",
  },
  other: {
    category: "other",
    materialName: "General Industrial Byproduct",
    avoidedKgCo2ePerKg: 0.5,
    landfillDiversionFactor: 1.0,
    sourceStandard: "Generic Industrial Circularity Factor",
  },
};

export const INDIA_CCTS_CARBON_PRICE_INR_PER_TCO2E = 2000; // ₹2,000 / tCO2e (India Carbon Credit Trading Scheme base preset)
export const GLOBAL_CARBON_PRICE_USD_PER_TCO2E = 42; // $42 / tCO2e

export function calculateMaterialCarbonImpact(category: MaterialCategory, quantityMT: number) {
  const factor = CARBON_FACTORS[category] || CARBON_FACTORS.other;
  const quantityKg = quantityMT * 1000;
  const avoidedCo2eKg = quantityKg * factor.avoidedKgCo2ePerKg;
  const avoidedCo2eTonnes = avoidedCo2eKg / 1000;
  const carbonCreditValueInr = avoidedCo2eTonnes * INDIA_CCTS_CARBON_PRICE_INR_PER_TCO2E;

  return {
    avoidedCo2eKg: Math.round(avoidedCo2eKg),
    avoidedCo2eTonnes: Number(avoidedCo2eTonnes.toFixed(2)),
    landfillDivertedMT: quantityMT,
    carbonCreditValueInr: Math.round(carbonCreditValueInr),
    emissionFactorUsed: factor.avoidedKgCo2ePerKg,
    methodologyNote: `${factor.sourceStandard} — ${factor.avoidedKgCo2ePerKg} kg CO₂e avoided per kg recycled material vs virgin extraction baseline.`,
  };
}

export function generateBRSRReport(passports: MaterialPassport[]): BRSRReportSummary {
  const totalDiverted = passports.reduce((sum, p) => sum + p.quantityMT, 0);
  const totalCo2e = passports.reduce((sum, p) => sum + p.carbonImpact.co2eAvoidedKg, 0);
  const avgCircularity = passports.length > 0 
    ? Math.round(passports.reduce((sum, p) => sum + p.reusabilityScore, 0) / passports.length) 
    : 0;
  const totalValuation = passports.reduce((sum, p) => sum + p.valuation.estimatedTotalInr, 0);

  // Group by category
  const categoryMap = new Map<string, { quantityMT: number; co2eAvoidedKg: number; primaryReuseRoute: string }>();
  passports.forEach(p => {
    const existing = categoryMap.get(p.category) || { quantityMT: 0, co2eAvoidedKg: 0, primaryReuseRoute: p.suggestedApplications[0] || "Secondary processing" };
    existing.quantityMT += p.quantityMT;
    existing.co2eAvoidedKg += p.carbonImpact.co2eAvoidedKg;
    categoryMap.set(p.category, existing);
  });

  const materialBreakdown = Array.from(categoryMap.entries()).map(([cat, data]) => ({
    category: cat.replace("_", " ").toUpperCase(),
    quantityMT: Number(data.quantityMT.toFixed(2)),
    co2eAvoidedKg: Math.round(data.co2eAvoidedKg),
    primaryReuseRoute: data.primaryReuseRoute,
  }));

  return {
    reportingPeriod: "FY 2026-27 (Q1-Q2)",
    generatedDate: new Date().toISOString().split("T")[0],
    organizationName: "CIRCULUS Verified Industrial Network (India Operations)",
    gstin: "24AAACA1234B1Z5 (Aggregated Multi-Entity Network)",
    totalMaterialDivertedMT: Number(totalDiverted.toFixed(2)),
    totalCo2eAvoidedKg: Math.round(totalCo2e),
    circularityScoreAvg: avgCircularity,
    totalTransactionsValueInr: Math.round(totalValuation),
    materialBreakdown,
    methodologyStandard: "SEBI BRSR Principle 6 (Environment & Circular Economy) + GHG Protocol Scope 3 Category 1/12 Avoided Emissions",
    complianceDisclaimers: [
      "Prototype estimate based on configured emission factors. Not an official legal certification or regulatory filing.",
      "Primary data collected through CIRCULUS Material Passports and verified on local/testnet ledgers.",
      "Carbon avoidance figures calculated with reference to Indian Central Pollution Control Board (CPCB) and Bureau of Indian Standards (BIS) parameters.",
    ],
  };
}
