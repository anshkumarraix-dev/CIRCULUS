/**
 * CIRCULUS — Core Type Definitions (India Industrial Circularity Platform)
 */

export type EvidenceStatus =
  | "demo"
  | "user_provided"
  | "ai_estimated"
  | "lab_verified"
  | "third_party_verified"
  | "not_verified";

export interface DataEvidence {
  status: EvidenceStatus;
  sourceName?: string;
  documentId?: string;
  capturedAt?: string;
  notes?: string;
}

export type MaterialCategory =
  | "ferrous"
  | "non_ferrous"
  | "plastic"
  | "paper_cardboard"
  | "glass"
  | "ewaste"
  | "wood"
  | "textile"
  | "rubber"
  | "organic"
  | "fly_ash"
  | "slag"
  | "construction_demolition"
  | "other";

export interface RealtimeDetectionResult {
  detectedObject: string;
  category: MaterialCategory;
  materialSubtype: string;
  confidence: number;
  isRecognized: boolean;
  visualTraits: string[];
  suggestedAction: string;
  warning?: string;
  timestamp?: string;
}

export interface GroundingSource {
  title: string;
  url: string;
  domain?: string;
}

export interface SearchGroundingResult {
  materialName: string;
  category: MaterialCategory;
  spotPricePerMT?: number;
  priceRangeNote: string;
  regionalHubPricing: { hub: string; priceNote: string }[];
  cpcbEprRules: string;
  spcbMandates: string;
  marketTrendSummary: string;
  lastUpdated: string;
  groundingSources: GroundingSource[];
}

export interface IndiaMaterialMetadata {
  materialCategory: MaterialCategory;
  state?: string;
  city?: string;
  facilityName?: string;
  gstin?: string;
  pan?: string;
  udyamId?: string;
  spcbJurisdiction?: string;
  cpcbRegistrationNumber?: string;
  eprCategory?: string;
  hsnCode?: string;
  hazardousFlag: boolean;
  eWayBillNumber?: string;
}

export interface MaterialAnalysis {
  materialType: string;
  subtype?: string;
  grade: string;
  condition: "excellent" | "good" | "fair" | "poor";
  confidence: number;
  quantityEstimate?: {
    value?: number;
    unit: string;
  };
  reusabilityScore: number;
  contaminationRisk: "low" | "medium" | "high";
  visualEvidence: string[];
  suggestedApplications: string[];
  processingNeeded: string[];
  estimatedValueRange?: {
    min: number;
    max: number;
    currency: "INR";
  };
  carbonImpact: {
    landfillAvoidanceKgCO2e: number;
    reuseAvoidanceKgCO2e: number;
    methodologyNote: string;
  };
  warnings: string[];
  indiaMetadata?: IndiaMaterialMetadata;
}

export interface ValuationBreakdown {
  basePricePerMT: number;
  gradePremium: number;
  demandFactor: number;
  logisticsFreightCost: number;
  estimatedTotalInr: number;
  currency: "INR";
  disclaimer: string;
}

export interface MaterialPassport {
  id: string; // e.g. CUS-AL-6063-GJ
  title: string;
  materialType: string;
  category: MaterialCategory;
  grade: string;
  quantityMT: number;
  reusabilityScore: number;
  contaminationRisk: "low" | "medium" | "high";
  condition: "excellent" | "good" | "fair" | "poor";
  confidenceScore: number;
  ownerOrg: string;
  ownerGstin?: string;
  locationState: string;
  locationCity: string;
  spcbJurisdiction: string;
  hsnCode: string;
  eprCategory?: string;
  hazardousFlag: boolean;
  createdAt: string;
  verifiedAt?: string;
  verificationStatus: "demo_ledger" | "demo_ledger_anchored" | "pending_audit";
  aiStatus?: "AI_ANALYZED" | "USER_DECLARED";
  aiSource?: string;
  documentStatus?: "DOCUMENT_SUBMITTED" | "DOCUMENT_VERIFIED" | "PENDING";
  labStatus?: "LAB_VERIFICATION_PENDING" | "LAB_VERIFIED" | "NOT_PROVIDED";
  organizationStatus?: "ORGANIZATION_VERIFIED" | "PENDING";
  gstinStatus?: "GSTIN_FORMAT_CHECKED" | "GSTIN_VERIFIED" | "PENDING";
  ledgerTxHash?: string;
  recordHash: string;
  imageUrl: string;
  suggestedApplications: string[];
  processingNeeded: string[];
  visualEvidence: string[];
  carbonImpact: {
    co2eAvoidedKg: number;
    landfillDivertedMT: number;
    methodologyNote: string;
    emissionFactorUsed: number;
  };
  valuation: ValuationBreakdown;
  lifecycleStage: "input" | "waste" | "recovery" | "reuse" | "impact";
  evidenceStatus: EvidenceStatus;
  notes?: string;
}

export interface MarketplaceListing {
  id: string;
  passportId: string;
  title: string;
  materialType: string;
  category: MaterialCategory;
  grade: string;
  quantityMT: number;
  minimumOrderMT: number;
  pricePerMT: number; // in INR
  totalValueInr: number; // in INR
  sellerOrg: string;
  sellerGstin: string;
  sellerRating?: number;
  city: string;
  state: string;
  spcbJurisdiction: string;
  hsnCode: string;
  eprEligible: boolean;
  eprCategory?: string;
  imageUrl: string;
  reusabilityScore: number;
  co2eAvoidedKg: number;
  verificationStatus: "demo_ledger_anchored" | "demo_ledger" | "pending_audit";
  listedDate?: string;
  createdAt?: string;
  status?: "active" | "under_offer" | "settled";
}

export interface MatchRecommendation {
  id: string;
  listingId: string;
  buyerOrg: string;
  buyerType: string;
  buyerCity: string;
  buyerState: string;
  spcbJurisdiction: string;
  distanceKm: number;
  matchScore: number; // 0-100
  estimatedFreightInr: number;
  buyerFacilityImage?: string;
  buyerAvatar?: string;
  cleanEnvImage?: string;
  cleanEnvStat?: string;
  whyMatch: {
    materialFit: string;
    quantityFit: string;
    gradeCompatibility: string;
    logisticsSummary: string;
    carbonSavingsPotential: string;
    regulatoryAlignment: string;
  };
  recommendedApplication: string;
  status: "suggested" | "offer_sent" | "accepted" | "in_transit";
}

export interface OwnershipEvent {
  id: string;
  passportId: string;
  eventType: 
    | "CREATED" 
    | "CLASSIFIED" 
    | "PASSPORT_ISSUED" 
    | "PASSPORT_MINTED"
    | "LISTED" 
    | "MATCH_OFFER_TRANSMITTED"
    | "OFFER_ACCEPTED" 
    | "CUSTODY_TRANSFERRED" 
    | "REUSE_VERIFIED";
  actor: string;
  actorRole: string;
  location: string;
  timestamp: string;
  txHash?: string;
  recordHash: string;
  blockNumber?: number;
  notes: string;
  evidenceType?: EvidenceStatus;
}

export interface UserRole {
  id: string;
  name: string;
  orgName: string;
  gstin: string;
  location: string;
  avatar: string;
  isVerified?: boolean;
}

export interface BRSRReportSummary {
  reportingPeriod: string;
  generatedDate: string;
  organizationName: string;
  gstin: string;
  totalMaterialDivertedMT: number;
  totalCo2eAvoidedKg: number;
  circularityScoreAvg: number;
  totalTransactionsValueInr: number;
  materialBreakdown: {
    category: string;
    quantityMT: number;
    co2eAvoidedKg: number;
    primaryReuseRoute: string;
  }[];
  methodologyStandard: string;
  complianceDisclaimers: string[];
}

export const USER_ROLES: UserRole[] = [
  {
    id: "guest",
    name: "Guest Explorer",
    orgName: "Public Viewer",
    gstin: "N/A",
    location: "N/A",
    avatar: "👁️",
    isVerified: false
  },
  { id: "supplier", name: "Plant Manager", orgName: "AluCast Manufacturing", gstin: "24AAACA1234B1Z5", location: "Sanand, GJ", avatar: "👤", isVerified: true },
  { id: "buyer", name: "Procurement Lead", orgName: "Mahavir PolyRecycle", gstin: "24AABCM1234F1Z8", location: "Surat, GJ", avatar: "👔", isVerified: true },
  { id: "auditor", name: "Compliance Officer", orgName: "GreenTech Audits", gstin: "27AADCG9876E1Z2", location: "Mumbai, MH", avatar: "🛡️", isVerified: true },
];
