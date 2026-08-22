/**
 * CIRCULUS — Core Type Definitions (India Industrial Circularity Platform)
 */

export type EvidenceStatus =
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
  spotPriceEstimateInrPerMT?: number;
  priceRangeNote: string;
  regionalHubPricing: { hub: string; priceNote: string; priceInrPerMT?: number }[];
  regionalPrices?: { hub: string; priceInrPerMT: number; priceNote?: string }[];
  cpcbEprRules: string;
  cpcbEprStatus?: string;
  spcbMandates: string;
  marketTrendSummary: string;
  lastUpdated: string;
  groundingSources: GroundingSource[];
  sources?: { title: string; uri: string; domain?: string }[];
  searchQueries?: string[];
  trainedModelContext?: string;
}

export interface ScannerTrainingProfile {
  id: string;
  category: MaterialCategory;
  materialName: string;
  trainedAt: string;
  searchQueries: string[];
  benchmarkPriceInrPerMT: number;
  priceCorridor: string;
  cpcbEprDirectives: string;
  spcbComplianceNotes: string;
  visualDefectChecklist: string[];
  qualityGradeStandards: string[];
  groundingSources: GroundingSource[];
  status: "active_grounded" | "calibrated" | "cached";
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
  searchGrounding?: SearchGroundingResult;
  groundingTrained?: boolean;
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
  verificationStatus: "verified" | "pending_audit";
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
  verificationStatus: "verified" | "pending_audit";
  listedDate?: string;
  createdAt?: string;
  status?: "active" | "under_offer" | "settled";
}

export interface MatchRecommendation {
  id: string;
  listingId: string;
  buyerOrg: string;
  buyerType: string;
  industrySector?: string;
  annualCapacityMT?: number;
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

export interface GPSLocation {
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
  formattedAddress?: string;
  city?: string;
  state?: string;
  pincode?: string;
  district?: string;
  verifiedAt?: string;
}

export interface UserRole {
  id: string; // e.g. "supplier" | "buyer" | "auditor" or unique user ID
  name: string; // Signatory / User Name
  email?: string; // Corporate Email
  orgName: string; // Company / Facility Name
  companyName?: string; // Alias
  designation?: string; // e.g. "Plant Operations Head", "Procurement Lead"
  accountType?: "buyer" | "seller" | "auditor"; // Role
  scrapTypeProduced?: string; // e.g. "Aluminium Extrusion Scrap, Copper Wire"
  scrapTypeProcured?: string; // For buyers
  gstin: string;
  location: string; // "City, State"
  gpsLocation?: GPSLocation;
  avatar: string;
  isVerified?: boolean;
  registeredAt?: string;
  securityLevel?: string;
  token?: string;
}

export interface SellerProfile {
  id: string;
  name: string;
  companyName: string;
  designation: string;
  email: string;
  scrapTypeProduced: string;
  category: MaterialCategory;
  city: string;
  state: string;
  gstin: string;
  gpsLocation?: GPSLocation;
  monthlyVolumeMT?: number;
  purityAvg?: number;
  verifiedAt: string;
  isVerified: boolean;
  avatar?: string;
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
    id: "supplier", 
    name: "Rajesh Sharma", 
    email: "rajesh.sharma@alucast.in",
    orgName: "AluCast Manufacturing", 
    companyName: "AluCast Manufacturing Pvt Ltd",
    designation: "Plant Head & VP Operations",
    accountType: "seller",
    scrapTypeProduced: "Aluminium 6063 Scrap, Heavy Extrusions",
    gstin: "24AAACA1234B1Z5", 
    location: "Sanand, Gujarat", 
    gpsLocation: {
      latitude: 22.9904,
      longitude: 72.3812,
      formattedAddress: "GIDC Industrial Estate, Sanand II, Ahmedabad, Gujarat 382170",
      city: "Sanand",
      state: "Gujarat",
      pincode: "382170",
      verifiedAt: new Date().toISOString()
    },
    avatar: "🏭", 
    isVerified: true,
    securityLevel: "AES-256 / SPCB Node Certified"
  },
  { 
    id: "buyer", 
    name: "Priya Mehta", 
    email: "p.mehta@mahavirrecycle.com",
    orgName: "Mahavir PolyRecycle", 
    companyName: "Mahavir PolyRecycle Industries",
    designation: "Head of Procurement & Circularity",
    accountType: "buyer",
    scrapTypeProduced: "PET Flakes, Recycled Polymer Pellets",
    scrapTypeProcured: "rPET Bottle Bales, HDPE Scrap, PP Granules",
    gstin: "24AABCM1234F1Z8", 
    location: "Surat, Gujarat", 
    gpsLocation: {
      latitude: 21.1702,
      longitude: 72.8311,
      formattedAddress: "Sachin GIDC Industrial Area, Surat, Gujarat 394230",
      city: "Surat",
      state: "Gujarat",
      pincode: "394230",
      verifiedAt: new Date().toISOString()
    },
    avatar: "👔", 
    isVerified: true,
    securityLevel: "AES-256 / SPCB Node Certified"
  },
  { 
    id: "auditor", 
    name: "Dr. Vikram Kulkarni", 
    email: "vikram.k@greentechaudits.org",
    orgName: "GreenTech Audits", 
    companyName: "GreenTech Environmental Compliance Audits",
    designation: "Lead CPCB / SPCB Technical Auditor",
    accountType: "auditor",
    scrapTypeProduced: "EPR & Hazardous Waste Manifest Verification",
    gstin: "27AADCG9876E1Z2", 
    location: "Mumbai, Maharashtra", 
    gpsLocation: {
      latitude: 19.0760,
      longitude: 72.8777,
      formattedAddress: "Bandra-Kurla Complex, Bandra East, Mumbai, MH 400051",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400051",
      verifiedAt: new Date().toISOString()
    },
    avatar: "🛡️", 
    isVerified: true,
    securityLevel: "AES-256 / ISO 14001 Lead Assessor"
  },
];

