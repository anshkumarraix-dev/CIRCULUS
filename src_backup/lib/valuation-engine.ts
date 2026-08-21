/**
 * CIRCULUS — Dynamic Valuation & Freight Estimation Engine (India Edition)
 */

import { MaterialCategory, ValuationBreakdown } from "../types";

export interface CategoryBasePrice {
  basePerMT: number; // in INR
  gradePurityMultiplier: Record<string, number>;
  regionalDemandInr: number;
}

export const BASE_MATERIAL_PRICE_INDEX: Record<MaterialCategory, CategoryBasePrice> = {
  non_ferrous: {
    basePerMT: 198000,
    gradePurityMultiplier: { excellent: 1.08, good: 1.0, fair: 0.92, poor: 0.8 },
    regionalDemandInr: 5000,
  },
  plastic: {
    basePerMT: 82000,
    gradePurityMultiplier: { excellent: 1.06, good: 1.0, fair: 0.9, poor: 0.75 },
    regionalDemandInr: 2000,
  },
  ferrous: {
    basePerMT: 38500,
    gradePurityMultiplier: { excellent: 1.05, good: 1.0, fair: 0.92, poor: 0.82 },
    regionalDemandInr: 1000,
  },
  paper_cardboard: {
    basePerMT: 14500,
    gradePurityMultiplier: { excellent: 1.08, good: 1.0, fair: 0.88, poor: 0.7 },
    regionalDemandInr: 500,
  },
  glass: {
    basePerMT: 4200,
    gradePurityMultiplier: { excellent: 1.1, good: 1.0, fair: 0.85, poor: 0.7 },
    regionalDemandInr: 150,
  },
  ewaste: {
    basePerMT: 320000,
    gradePurityMultiplier: { excellent: 1.15, good: 1.0, fair: 0.85, poor: 0.65 },
    regionalDemandInr: 10000,
  },
  wood: {
    basePerMT: 6500,
    gradePurityMultiplier: { excellent: 1.1, good: 1.0, fair: 0.85, poor: 0.7 },
    regionalDemandInr: 200,
  },
  textile: {
    basePerMT: 32000,
    gradePurityMultiplier: { excellent: 1.1, good: 1.0, fair: 0.85, poor: 0.7 },
    regionalDemandInr: 800,
  },
  rubber: {
    basePerMT: 28000,
    gradePurityMultiplier: { excellent: 1.08, good: 1.0, fair: 0.88, poor: 0.72 },
    regionalDemandInr: 600,
  },
  organic: {
    basePerMT: 3500,
    gradePurityMultiplier: { excellent: 1.1, good: 1.0, fair: 0.85, poor: 0.7 },
    regionalDemandInr: 100,
  },
  fly_ash: {
    basePerMT: 900,
    gradePurityMultiplier: { excellent: 1.12, good: 1.0, fair: 0.85, poor: 0.7 },
    regionalDemandInr: 50,
  },
  construction_demolition: {
    basePerMT: 600,
    gradePurityMultiplier: { excellent: 1.1, good: 1.0, fair: 0.9, poor: 0.75 },
    regionalDemandInr: 30,
  },
  slag: {
    basePerMT: 1800,
    gradePurityMultiplier: { excellent: 1.08, good: 1.0, fair: 0.92, poor: 0.8 },
    regionalDemandInr: 50,
  },
  other: {
    basePerMT: 15000,
    gradePurityMultiplier: { excellent: 1.05, good: 1.0, fair: 0.9, poor: 0.75 },
    regionalDemandInr: 500,
  },
};

export function estimateFreightCostInr(distanceKm: number, quantityMT: number = 10): {
  estimatedFreightInr: number;
  freightPerMT: number;
  transitHours: number;
  estimateNote: string;
} {
  // Indian industrial road freight benchmark: ~₹40 per km for a standard 10-15MT truckload, minimum base fare ₹2,500
  const ratePerKm = 38;
  const baseFare = 2200;
  const trucksNeeded = Math.ceil(quantityMT / 15);
  const totalFreight = (baseFare + distanceKm * ratePerKm) * trucksNeeded;
  const freightPerMT = Math.round(totalFreight / Math.max(quantityMT, 1));
  const transitHours = Number((distanceKm / 45).toFixed(1)); // avg 45 km/h for heavy cargo in industrial corridors

  return {
    estimatedFreightInr: Math.round(totalFreight),
    freightPerMT,
    transitHours,
    estimateNote: `Estimated for ${distanceKm} km transit via standard highway corridor (${trucksNeeded} x 15MT multi-axle truck). Indicative road logistics rate.`,
  };
}

export function calculateDynamicValuation(
  category: MaterialCategory,
  condition: "excellent" | "good" | "fair" | "poor",
  quantityMT: number,
  distanceKm: number = 40
): ValuationBreakdown {
  const index = BASE_MATERIAL_PRICE_INDEX[category] || BASE_MATERIAL_PRICE_INDEX.other;
  const basePrice = index.basePerMT;
  const multiplier = index.gradePurityMultiplier[condition] || 1.0;
  const gradePremium = Math.round(basePrice * (multiplier - 1.0));
  const demandFactor = index.regionalDemandInr;
  const freight = estimateFreightCostInr(distanceKm, quantityMT);
  const logisticsAdjustment = freight.freightPerMT;

  const adjustedPricePerMT = Math.max(100, basePrice + gradePremium + demandFactor - logisticsAdjustment);
  const totalInr = Math.round(adjustedPricePerMT * quantityMT);

  return {
    basePricePerMT: basePrice,
    gradePremium,
    demandFactor,
    logisticsFreightCost: logisticsAdjustment,
    estimatedTotalInr: totalInr,
    currency: "INR",
    disclaimer: "Indicative prototype valuation calculated using spot material indices, purity factor, and corridor freight estimates. Not a binding market trade quote.",
  };
}

export function formatInrCurrency(amount: number, compact: boolean = false): string {
  if (compact) {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)} Cr`;
    }
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)}L`;
    }
    if (amount >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}k`;
    }
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
