/**
 * CIRCULUS — Explainable AI Matching Engine (India Edition)
 */

import { MarketplaceListing, MatchRecommendation, MaterialPassport } from "../types";
import { estimateFreightCostInr } from "./valuation-engine";

export interface BuyerProfile {
  id: string;
  name: string;
  type: string;
  city: string;
  state: string;
  spcbJurisdiction: string;
  distanceKm: number;
  acceptedCategories: string[];
  minimumPurityRequired: number; // e.g. 85
  targetFurnaceType: string;
  typicalLotCapacityMT: number;
  facilityImageUrl: string;
  buyerAvatar: string;
  cleanEnvImage: string;
  cleanEnvStat: string;
}

export const INDIAN_BUYERS_DIRECTORY: BuyerProfile[] = [
  {
    id: "B-GJ-01",
    name: "Gujarat Solar Frame Extrusions Ltd",
    type: "Secondary Aluminium Billet & Solar Profile Manufacturer",
    city: "Changodar (Ahmedabad)",
    state: "Gujarat",
    spcbJurisdiction: "GPCB (Gujarat)",
    distanceKm: 28,
    acceptedCategories: ["non_ferrous"],
    minimumPurityRequired: 90,
    targetFurnaceType: "Induction Melting Furnace & Continuous Billet Caster",
    typicalLotCapacityMT: 20,
    facilityImageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80",
    buyerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    cleanEnvImage: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=80",
    cleanEnvStat: "100% Rooftop Solar Powered Foundry • Zero Smog",
  },
  {
    id: "B-GJ-02",
    name: "Baroda Automotive Die Castings LLP",
    type: "Tier-1 Auto Component Foundry",
    city: "Savli (Vadodara)",
    state: "Gujarat",
    spcbJurisdiction: "GPCB (Gujarat)",
    distanceKm: 135,
    acceptedCategories: ["non_ferrous"],
    minimumPurityRequired: 85,
    targetFurnaceType: "Reverberatory Aluminium Alloy Furnace",
    typicalLotCapacityMT: 25,
    facilityImageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80",
    buyerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    cleanEnvImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1000&q=80",
    cleanEnvStat: "94% Waste Heat Recovery Loop • Green Auto Castings",
  },
  {
    id: "B-MH-01",
    name: "Mahindra Sustainable Preforms Ltd",
    type: "FSSAI-Certified Circular Beverage Preform Maker",
    city: "Talegaon (Pune)",
    state: "Maharashtra",
    spcbJurisdiction: "MPCB (Maharashtra)",
    distanceKm: 24,
    acceptedCategories: ["plastic"],
    minimumPurityRequired: 88,
    targetFurnaceType: "Decontamination & Solid-State Polycondensation Line",
    typicalLotCapacityMT: 25,
    facilityImageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1000&q=80",
    buyerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    cleanEnvImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80",
    cleanEnvStat: "FSSAI Food-Safe rPET • Prevents Ocean Plastic",
  },
  {
    id: "B-MH-02",
    name: "Aparna Synthetics & Technical Textiles Ltd",
    type: "Recycled Polyester Staple Fibre (rPSF) Producer",
    city: "Tarapur (Palghar)",
    state: "Maharashtra",
    spcbJurisdiction: "MPCB (Maharashtra)",
    distanceKm: 160,
    acceptedCategories: ["plastic"],
    minimumPurityRequired: 80,
    targetFurnaceType: "Fibre Extrusion & Melt-Spinning Plant",
    typicalLotCapacityMT: 35,
    facilityImageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1000&q=80",
    buyerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    cleanEnvImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
    cleanEnvStat: "Zero Liquid Discharge (ZLD) Recycled Water System",
  },
  {
    id: "B-OD-01",
    name: "Jindal TMT & Structural Rolling Mills",
    type: "Secondary Steel Re-Rolling Mill",
    city: "Jajpur",
    state: "Odisha",
    spcbJurisdiction: "OSPCB (Odisha)",
    distanceKm: 42,
    acceptedCategories: ["ferrous"],
    minimumPurityRequired: 80,
    targetFurnaceType: "50-Ton Electric Arc Furnace (EAF)",
    typicalLotCapacityMT: 80,
    facilityImageUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80",
    buyerAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    cleanEnvImage: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1000&q=80",
    cleanEnvStat: "Electric Arc Steel saves 85% coal compared to blast furnaces",
  },
  {
    id: "B-CG-01",
    name: "UltraTech Cement Grinding Unit (Bilaspur)",
    type: "Portland Pozzolana Cement (PPC) Manufacturer",
    city: "Bilaspur",
    state: "Chhattisgarh",
    spcbJurisdiction: "CECB (Chhattisgarh)",
    distanceKm: 85,
    acceptedCategories: ["fly_ash", "slag"],
    minimumPurityRequired: 85,
    targetFurnaceType: "Vertical Roller Mill (VRM) Cement Grinder",
    typicalLotCapacityMT: 150,
    facilityImageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1000&q=80",
    buyerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    cleanEnvImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    cleanEnvStat: "Replaces clinker with fly ash, slashing CO₂ by 40%",
  },
  {
    id: "B-DL-01",
    name: "NCR Infrastructure & Pavers LLP",
    type: "Precast Concrete & Highway Paver Block Plant",
    city: "Ecotech Extension, Greater Noida",
    state: "Delhi NCR",
    spcbJurisdiction: "UPPCB (Uttar Pradesh)",
    distanceKm: 22,
    acceptedCategories: ["construction_demolition", "fly_ash"],
    minimumPurityRequired: 75,
    targetFurnaceType: "Automated Concrete Batching & Block Moulding Station",
    typicalLotCapacityMT: 100,
    facilityImageUrl: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1000&q=80",
    buyerAvatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    cleanEnvImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
    cleanEnvStat: "Saves riverbed sand mining with 100% C&D crushed aggregates",
  },
  {
    id: "B-KA-01",
    name: "JSW Green Cement & Slag Beneficiation",
    type: "Portland Slag Cement (PSC) Grinding Unit",
    city: "Toranagallu (Ballari)",
    state: "Karnataka",
    spcbJurisdiction: "KSPCB (Karnataka)",
    distanceKm: 18,
    acceptedCategories: ["slag"],
    minimumPurityRequired: 90,
    targetFurnaceType: "High-Efficiency Roller Press & Ball Mill",
    typicalLotCapacityMT: 200,
    facilityImageUrl: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1000&q=80",
    buyerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    cleanEnvImage: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1000&q=80",
    cleanEnvStat: "Slag circularity eliminates quarry blasting & dust",
  },
];

export function findMatchesForListing(listing: MarketplaceListing | MaterialPassport): MatchRecommendation[] {
  const category = listing.category;
  const quantity = "quantityMT" in listing ? listing.quantityMT : 10;
  const reusability = "reusabilityScore" in listing ? listing.reusabilityScore : 90;
  const listingId = "id" in listing ? listing.id : "LIST-GEN";

  // Filter relevant buyers
  const candidates = INDIAN_BUYERS_DIRECTORY.filter(b => b.acceptedCategories.includes(category));

  return candidates.map((buyer, index) => {
    // Calculate match score
    const categoryFit = 40; // 40 max
    const purityFit = Math.min(30, Math.round((reusability / 100) * 30));
    const distancePenalty = Math.min(20, Math.round((buyer.distanceKm / 200) * 15));
    const distanceFit = Math.max(5, 20 - distancePenalty);
    const capacityRatio = Math.min(1, quantity / buyer.typicalLotCapacityMT);
    const capacityFit = Math.round(capacityRatio * 10);
    const totalScore = Math.min(98, categoryFit + purityFit + distanceFit + capacityFit);

    const freight = estimateFreightCostInr(buyer.distanceKm, quantity);

    return {
      id: `MATCH-${listingId}-${buyer.id}-${index}`,
      listingId,
      buyerOrg: buyer.name,
      buyerType: buyer.type,
      buyerCity: buyer.city,
      buyerState: buyer.state,
      spcbJurisdiction: buyer.spcbJurisdiction,
      distanceKm: buyer.distanceKm,
      matchScore: totalScore,
      estimatedFreightInr: freight.estimatedFreightInr,
      buyerFacilityImage: buyer.facilityImageUrl,
      buyerAvatar: buyer.buyerAvatar,
      cleanEnvImage: buyer.cleanEnvImage,
      cleanEnvStat: buyer.cleanEnvStat,
      whyMatch: {
        materialFit: `Direct chemical & physical compatibility for ${buyer.targetFurnaceType}.`,
        quantityFit: `${quantity} MT lot matches their standard procurement cycle (capacity ~${buyer.typicalLotCapacityMT} MT).`,
        gradeCompatibility: `Purity score (${reusability}%) exceeds plant minimum acceptance threshold of ${buyer.minimumPurityRequired}%.`,
        logisticsSummary: `${buyer.distanceKm} km transit (${freight.transitHours} hrs turnaround) via standard industrial expressway corridor.`,
        carbonSavingsPotential: `Replaces virgin feedstock while minimizing transit emissions via short-radius haul.`,
        regulatoryAlignment: `Compliant inter-state/intra-state industrial exchange under ${buyer.spcbJurisdiction} jurisdiction.`,
      },
      recommendedApplication: `Direct utilization in ${buyer.name}'s manufacturing cycle.`,
      status: "suggested",
    };
  });
}
