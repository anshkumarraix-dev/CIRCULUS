import React, { useState, useMemo } from "react";
import { 
  Search, 
  MapPin, 
  Sparkles, 
  Layers, 
  ArrowRight,
  Plus,
  HelpCircle,
  TrendingUp,
  Award,
  CheckCircle2,
  Sliders,
  Zap,
  Leaf,
  IndianRupee,
  Truck,
  Building2,
  TreeDeciduous,
  Wind,
  Droplets,
  RotateCcw,
  Check,
  ShieldCheck,
  Factory
} from "lucide-react";
import { MarketplaceListing, MaterialPassport, OwnershipEvent, UserRole, MaterialCategory } from "../../types";
import { formatInrCurrency } from "../../lib/valuation-engine";
import { calculateMaterialCarbonImpact } from "../../lib/carbon-engine";
import { generateSimpleRecordHash } from "../../lib/ledger-adapter";
import { ListingDetailModal } from "./ListingDetailModal";
import { LiveActivityTicker } from "../common/LiveActivityTicker";

interface MarketplaceGridProps {
  listings: MarketplaceListing[];
  passports: MaterialPassport[];
  events?: OwnershipEvent[];
  onViewPassport: (passportId: string) => void;
  onOpenMatches: (listingId: string) => void;
  onOpenRealTimeEntryModal: () => void;
  onRealTimeEntryCreated?: (
    passport: MaterialPassport, 
    listing: MarketplaceListing, 
    event: OwnershipEvent
  ) => void;
  activeRole: UserRole;
  onSubmitOffer: (listingId: string, offerDetails: any) => void;
}

const CATEGORIES: { id: string; label: string; buyersCount: number; benchmark: string }[] = [
  { id: "all", label: "🌟 All Materials", buyersCount: 8, benchmark: "All categories" },
  { id: "non_ferrous", label: "🥫 Aluminium & Copper", buyersCount: 3, benchmark: "₹182/kg" },
  { id: "plastic", label: "🧴 Recycled Plastics", buyersCount: 2, benchmark: "₹41/kg" },
  { id: "ferrous", label: "🏗️ Steel & Iron", buyersCount: 2, benchmark: "₹37/kg" },
  { id: "fly_ash", label: "🏭 Power Plant Ash", buyersCount: 1, benchmark: "₹480/MT" },
  { id: "construction_demolition", label: "🧱 Crushed Stone Gravel", buyersCount: 1, benchmark: "₹600/MT" },
  { id: "slag", label: "⚙️ Factory Slag Sand", buyersCount: 1, benchmark: "₹1,800/MT" },
  { id: "wood", label: "📦 Brown Cardboard", buyersCount: 1, benchmark: "₹6.5/kg" },
];

const STATES = [
  "All States",
  "Gujarat",
  "Maharashtra",
  "Tamil Nadu",
  "Odisha",
  "Chhattisgarh",
  "Delhi NCR",
  "Karnataka",
  "Haryana",
];

const BENCHMARK_TICKERS = [
  { material: "Aluminium 6063 Scrap", rate: "₹182 / kg", trend: "+1.8%", category: "non_ferrous" },
  { material: "Copper Bright Wire 99%", rate: "₹742 / kg", trend: "+0.9%", category: "non_ferrous" },
  { material: "Clean rPET Flakes (Washed)", rate: "₹41 / kg", trend: "+2.4%", category: "plastic" },
  { material: "Heavy Melting Steel (HMS 1&2)", rate: "₹37.5 / kg", trend: "-0.4%", category: "ferrous" },
  { material: "Dry Pozzolanic Fly Ash", rate: "₹480 / MT", trend: "+1.1%", category: "fly_ash" },
];

// 4 Instant 1-Click Sample Batches for fast live testing
const QUICK_SAMPLE_BATCHES = [
  {
    key: "aluminium_extrusions",
    title: "Clean 6063 Aluminium Off-Cut Profiles",
    category: "non_ferrous" as MaterialCategory,
    materialType: "Aluminium Alloy 6063",
    purity: 98.4,
    grade: "Grade-A (Clean Cleaned)",
    quantityMT: 15,
    pricePerMT: 185000,
    city: "Sanand",
    state: "Gujarat",
    imageUrl: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80",
    suggestedApplications: ["Automotive Die Castings", "Architectural Windows", "Clean Billet Melting"],
    co2PerTon: 9.2
  },
  {
    key: "pet_bottles",
    title: "Post-Consumer Washed Clear rPET Flakes",
    category: "plastic" as MaterialCategory,
    materialType: "Polyethylene Terephthalate (rPET)",
    purity: 99.1,
    grade: "Grade-A (Hot-Washed)",
    quantityMT: 25,
    pricePerMT: 42000,
    city: "Surat",
    state: "Gujarat",
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
    suggestedApplications: ["Recycled Polyester Yarn", "FMCG Monolayer Thermoforming", "Strapping Bands"],
    co2PerTon: 2.3
  },
  {
    key: "steel_rebar",
    title: "Heavy Structural Steel Cutting Scrap",
    category: "ferrous" as MaterialCategory,
    materialType: "Structural Carbon Steel Fe500D",
    purity: 96.5,
    grade: "Heavy Melting Scrap (HMS-1)",
    quantityMT: 40,
    pricePerMT: 37500,
    city: "Raipur",
    state: "Chhattisgarh",
    imageUrl: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    suggestedApplications: ["Induction Furnace Billets", "TMT Construction Rebars", "Foundry Casting"],
    co2PerTon: 1.8
  },
  {
    key: "fly_ash_silo",
    title: "Dry Silo Electrostatic Fly Ash (Class-F)",
    category: "fly_ash" as MaterialCategory,
    materialType: "Pozzolanic Siliceous Fly Ash",
    purity: 92.0,
    grade: "Class-F (IS 3812 Part 1)",
    quantityMT: 80,
    pricePerMT: 520,
    city: "Jharsuguda",
    state: "Odisha",
    imageUrl: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80",
    suggestedApplications: ["Portland Pozzolana Cement (PPC)", "High-Strength Autoclaved Bricks", "Roller Compacted Concrete"],
    co2PerTon: 0.82
  }
];

export const MarketplaceGrid: React.FC<MarketplaceGridProps> = ({
  listings,
  passports,
  events = [],
  onViewPassport,
  onOpenMatches,
  onOpenRealTimeEntryModal,
  onRealTimeEntryCreated,
  activeRole,
  onSubmitOffer,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<string>("All States");
  const [sortBy, setSortBy] = useState<"circularity" | "price_asc" | "carbon" | "volume">("circularity");
  const [selectedListingForModal, setSelectedListingForModal] = useState<MarketplaceListing | null>(null);
  const [showHelperInfo, setShowHelperInfo] = useState<boolean>(true);

  // Interactive Live Calculator Simulator inside Empty / Playground State
  const [simMaterial, setSimMaterial] = useState<"aluminium" | "plastic" | "steel" | "copper" | "flyash">("aluminium");
  const [simTonnage, setSimTonnage] = useState<number>(20);
  const [quickCreatedKey, setQuickCreatedKey] = useState<string | null>(null);

  // Dynamic Simulator calculations
  const simPrices = {
    aluminium: { price: 185000, name: "6063 Aluminium Off-Cuts", cat: "non_ferrous" as MaterialCategory, co2: 9.2, img: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80" },
    plastic: { price: 42000, name: "Washed Clear rPET Flakes", cat: "plastic" as MaterialCategory, co2: 2.3, img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80" },
    steel: { price: 37500, name: "Heavy Melting Steel Scrap", cat: "ferrous" as MaterialCategory, co2: 1.8, img: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80" },
    copper: { price: 745000, name: "Pure Berry Copper Wire (99%)", cat: "non_ferrous" as MaterialCategory, co2: 6.8, img: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80" },
    flyash: { price: 520, name: "Silo Pozzolanic Fly Ash", cat: "fly_ash" as MaterialCategory, co2: 0.82, img: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80" },
  };

  const selectedSim = simPrices[simMaterial];
  const simEstimatedRupees = simTonnage * selectedSim.price;
  const simCo2Kg = Math.round(simTonnage * selectedSim.co2 * 1000);
  const simTrees = Math.round(simCo2Kg / 60);

  // Fast broadcast handler for 1-click sample
  const handleQuickBroadcastSample = (sample: typeof QUICK_SAMPLE_BATCHES[0]) => {
    if (!onRealTimeEntryCreated) return;
    
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const passportId = `CUS-2026-${sample.category.substring(0, 3).toUpperCase()}-${randomSuffix}`;
    const listingId = `LIST-${sample.category.substring(0, 3).toUpperCase()}-${randomSuffix}`;

    const totalValueInr = sample.quantityMT * sample.pricePerMT;
    const co2eAvoidedKg = Math.round(sample.quantityMT * sample.co2PerTon * 1000);

    const carbonRes = calculateMaterialCarbonImpact(sample.category, sample.quantityMT);

    const newPassport: MaterialPassport = {
      id: passportId,
      title: sample.title,
      category: sample.category,
      materialType: sample.materialType,
      grade: sample.grade,
      quantityMT: sample.quantityMT,
      reusabilityScore: Math.round(sample.purity),
      contaminationRisk: "low",
      condition: "excellent",
      confidenceScore: 0.98,
      ownerOrg: activeRole.orgName,
      ownerGstin: activeRole.gstin,
      locationCity: sample.city,
      locationState: sample.state,
      spcbJurisdiction: `${sample.state} SPCB`,
      hsnCode: "76020010",
      hazardousFlag: false,
      verificationStatus: "verified_onchain",
      recordHash: generateSimpleRecordHash({
        passportId,
        materialType: sample.materialType,
        quantityMT: sample.quantityMT,
        ownerOrg: activeRole.orgName,
        timestamp: new Date().toISOString()
      }),
      imageUrl: sample.imageUrl,
      suggestedApplications: sample.suggestedApplications,
      processingNeeded: ["Secondary segregation", "Clean melting"],
      visualEvidence: [sample.imageUrl],
      carbonImpact: {
        co2eAvoidedKg: carbonRes.avoidedCo2eKg,
        landfillDivertedMT: sample.quantityMT,
        methodologyNote: carbonRes.methodologyNote,
        emissionFactorUsed: carbonRes.emissionFactorUsed
      },
      valuation: {
        basePricePerMT: sample.pricePerMT,
        gradePremium: 2500,
        demandFactor: 1.05,
        logisticsFreightCost: 8500,
        estimatedTotalInr: totalValueInr,
        currency: "INR",
        disclaimer: "Spot market price estimate"
      },
      lifecycleStage: "recovery",
      evidenceStatus: "lab_verified",
      createdAt: new Date().toISOString(),
    };

    const newListing: MarketplaceListing = {
      id: listingId,
      passportId: passportId,
      title: sample.title,
      category: sample.category,
      materialType: sample.materialType,
      grade: sample.grade,
      quantityMT: sample.quantityMT,
      minimumOrderMT: Math.min(5, sample.quantityMT),
      pricePerMT: sample.pricePerMT,
      totalValueInr: totalValueInr,
      sellerOrg: activeRole.orgName,
      sellerGstin: activeRole.gstin,
      city: sample.city,
      state: sample.state,
      spcbJurisdiction: `${sample.state} SPCB`,
      hsnCode: "76020010",
      eprEligible: true,
      imageUrl: sample.imageUrl,
      reusabilityScore: Math.round(sample.purity),
      co2eAvoidedKg: carbonRes.avoidedCo2eKg,
      verificationStatus: "verified_onchain",
      status: "active",
      createdAt: new Date().toISOString()
    };

    const newEvent: OwnershipEvent = {
      id: `EVT-${Date.now()}`,
      passportId: passportId,
      timestamp: new Date().toISOString(),
      actor: activeRole.orgName,
      actorRole: "SCRAP_GENERATOR",
      location: `${sample.city}, ${sample.state}`,
      eventType: "CREATED",
      recordHash: generateSimpleRecordHash({
        eventId: `EVT-${Date.now()}`,
        passportId: passportId,
        actor: activeRole.orgName,
        timestamp: new Date().toISOString()
      }),
      notes: `1-Click fast factory dispatch under ${sample.state} SPCB norms.`,
      evidenceType: "lab_verified"
    };

    onRealTimeEntryCreated(newPassport, newListing, newEvent);
    setQuickCreatedKey(sample.key);
    setTimeout(() => setQuickCreatedKey(null), 3000);
  };

  // Broadcast from Simulator directly
  const handleBroadcastFromSimulator = () => {
    const customSample = {
      key: `sim_${simMaterial}`,
      title: `${simTonnage} MT ${selectedSim.name}`,
      category: selectedSim.cat,
      materialType: selectedSim.name,
      purity: 97.5,
      grade: "Grade-A (Clean Industrial)",
      quantityMT: simTonnage,
      pricePerMT: selectedSim.price,
      city: activeRole.city || "Sanand",
      state: activeRole.state || "Gujarat",
      imageUrl: selectedSim.img,
      suggestedApplications: ["Secondary Ingot Casting", "Circular Remanufacturing"],
      co2PerTon: selectedSim.co2
    };
    handleQuickBroadcastSample(customSample);
  };

  // Filter listings
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.materialType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sellerOrg.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
      const matchesState = selectedState === "All States" || item.state.toLowerCase().includes(selectedState.toLowerCase());

      return matchesSearch && matchesCat && matchesState;
    }).sort((a, b) => {
      if (sortBy === "circularity") return b.reusabilityScore - a.reusabilityScore;
      if (sortBy === "price_asc") return a.pricePerMT - b.pricePerMT;
      if (sortBy === "carbon") return b.co2eAvoidedKg - a.co2eAvoidedKg;
      if (sortBy === "volume") return b.quantityMT - a.quantityMT;
      return 0;
    });
  }, [listings, searchQuery, selectedCategory, selectedState, sortBy]);

  return (
    <div className="space-y-6">
      
      {/* Live Activity Ticker */}
      <LiveActivityTicker
        events={events}
        onOpenNewEntryModal={onOpenRealTimeEntryModal}
      />

      {/* Interactive Indian Scrap Benchmark Ticker */}
      <div className="bg-slate-900 text-white p-3 sm:p-4 rounded-2xl border border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs overflow-hidden">
        <div className="flex items-center gap-2 font-bold text-emerald-400 shrink-0">
          <TrendingUp className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>India Scrap Spot Benchmarks:</span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto w-full pb-1 sm:pb-0 scrollbar-none">
          {BENCHMARK_TICKERS.map((t, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedCategory(t.category);
                setSearchQuery("");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 border border-slate-700/60 whitespace-nowrap transition cursor-pointer text-[11px]"
              title={`Click to filter by ${t.material}`}
            >
              <span className="text-slate-300 font-medium">{t.material}:</span>
              <span className="font-mono font-bold text-white">{t.rate}</span>
              <span className={`font-mono text-[10px] font-bold ${t.trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                {t.trend}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 10th-Grade Friendly Explainer Banner with Clean Blur Design */}
      {showHelperInfo && (
        <div className="relative rounded-3xl overflow-hidden p-6 border border-blue-200/80 bg-gradient-to-r from-blue-50/90 via-emerald-50/80 to-teal-50/90 shadow-xs">
          <button
            onClick={() => setShowHelperInfo(false)}
            className="absolute top-4 right-4 text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
            title="Hide this tip"
          >
            ✕ Dismiss
          </button>

          <div className="flex items-start gap-4 max-w-4xl">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-blue-600/20 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-2 text-xs">
              <h4 className="font-extrabold text-sm sm:text-base text-white flex items-center gap-2">
                What is this Marketplace? (Clean Factory-to-Factory Trading)
              </h4>
              <p className="text-slate-600 leading-relaxed">
                When manufacturing factories have leftover clean scrap (like cut-off aluminium profiles, washed clear plastic bottles, or steel beams), they list them here. Other secondary manufacturing plants buy and melt them directly into new products. <strong>1 MT = 1,000 Kilograms (1 Metric Ton).</strong>
              </p>
              
              <div className="flex flex-wrap gap-4 pt-1 text-[11px] font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 text-emerald-800 bg-emerald-100/60 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 100% Quality Verified
                </span>
                <span className="flex items-center gap-1.5 text-blue-800 bg-blue-100/60 px-2.5 py-1 rounded-lg border border-blue-200">
                  <IndianRupee className="w-3.5 h-3.5 text-blue-600" /> Fair GST Market Rates
                </span>
                <span className="flex items-center gap-1.5 text-teal-800 bg-teal-100/60 px-2.5 py-1 rounded-lg border border-teal-200">
                  <Leaf className="w-3.5 h-3.5 text-teal-600" /> Shows Trees & Clean Air Saved
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search & Dynamic Interactive Filters */}
      <div className="bg-[#12181F] p-5 sm:p-6 rounded-3xl border border-slate-700 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search materials (e.g. Aluminium, Plastic Bottles, Copper Wire, Steel, Fly Ash, Sanand)..."
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-400 focus:border-blue-500 focus:bg-[#12181F] focus:outline-none font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-xs text-slate-700 focus:border-blue-500 font-bold cursor-pointer"
            >
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 text-xs text-slate-700 focus:border-blue-500 font-bold cursor-pointer"
            >
              <option value="circularity">Sort: Highest Purity Grade</option>
              <option value="price_asc">Sort: Price (Lowest First)</option>
              <option value="carbon">Sort: Most Smoke Saved (CO₂)</option>
              <option value="volume">Sort: Largest Batch (Tons)</option>
            </select>
          </div>
        </div>

        {/* Dynamic Category Filter Pills with Active Buyers Indicator */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs whitespace-nowrap font-extrabold transition cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "bg-slate-100 text-slate-700 hover:text-white hover:bg-slate-200/80 border border-slate-700/60"
                }`}
              >
                <span>{cat.label}</span>
                {cat.buyersCount > 0 && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isSelected ? "bg-[#12181F]/20 text-white" : "bg-emerald-100 text-emerald-800"
                  }`}>
                    {cat.buyersCount} Buyers
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Listings OR Interactive Playground Empty State */}
      {filteredListings.length > 0 ? (
        <div className="bg-[#12181F] rounded-2xl border border-slate-700/80 overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[10px] uppercase bg-[#1E2630] border-b border-slate-700 text-slate-400 font-bold">
                <tr>
                  <th className="px-4 py-3">Asset Hash / Digital ID</th>
                  <th className="px-4 py-3">Material & Grade</th>
                  <th className="px-4 py-3">Volume</th>
                  <th className="px-4 py-3">Purity</th>
                  <th className="px-4 py-3">Origin</th>
                  <th className="px-4 py-3">Spot Value</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredListings.map((listing) => {
                  const passport = passports.find((p) => p.id === listing.passportId);
                  return (
                    <tr key={listing.id} className="hover:bg-[#1E2630]/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <img src={listing.imageUrl} alt="" className="w-8 h-8 rounded bg-slate-800 object-cover border border-slate-700" />
                          <div>
                            <span className="font-mono text-[10px] text-slate-500 block">
                              {passport?.recordHash?.substring(0, 16) || listing.passportId}
                            </span>
                            <span className="font-bold text-[#00E676] flex items-center gap-1 mt-0.5">
                              <ShieldCheck className="w-3 h-3" />
                              Lab Verified
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 max-w-[200px]">
                        <p className="font-bold text-slate-100 truncate">{listing.title}</p>
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">{listing.grade}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono font-bold text-slate-200">{listing.quantityMT} MT</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <div className="w-full bg-slate-700 rounded-full h-1.5 max-w-[40px]">
                            <div className="bg-[#00E676] h-1.5 rounded-full" style={{ width: `${listing.reusabilityScore}%` }}></div>
                          </div>
                          <span className="font-mono text-slate-200">{listing.reusabilityScore}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-slate-300">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{listing.city}, {listing.state}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-mono font-bold text-white">₹{listing.pricePerMT.toLocaleString("en-IN")}/MT</p>
                        <p className="font-mono text-[10px] text-slate-400 mt-0.5">{formatInrCurrency(listing.totalValueInr, true)}</p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onViewPassport(listing.passportId)}
                            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                            title="View Passport"
                          >
                            <Layers className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setSelectedListingForModal(listing)}
                            className="px-3 py-1.5 rounded bg-[#FF6D00] hover:bg-[#E65C00] text-white font-bold text-[11px] transition shadow-md shadow-[#FF6D00]/20"
                          >
                            Buy / Offer
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        
        /* INTERACTIVE DISCOVERY & VALUE PLAYGROUND (When 0 listings are present) */
        <div className="space-y-6">
          
          {/* Section 1: 1-Click Fast Broadcast Batches */}
          <div className="bg-[#12181F] p-6 sm:p-8 rounded-3xl border border-slate-700 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-500/10 text-blue-400 text-xs font-extrabold border border-blue-500/20">
                  <Zap className="w-4 h-4" />
                  Instant 1-Click Scrap Launchers
                </div>
                <h3 className="text-xl font-extrabold text-white font-display">
                  Click Any Real Indian Factory Scrap Lot Below to Broadcast Instantly
                </h3>
                <p className="text-xs text-slate-400">
                  Select a pre-verified batch to automatically issue its Digital Aadhaar, calculate carbon savings, and find nearby buyer factories.
                </p>
              </div>

              <button
                onClick={onOpenRealTimeEntryModal}
                className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition cursor-pointer flex items-center gap-2 shadow-sm shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>+ Custom Real-Time Entry</span>
              </button>
            </div>

            {/* 4 Interactive Sample Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {QUICK_SAMPLE_BATCHES.map((batch) => {
                const isCreated = quickCreatedKey === batch.key;
                return (
                  <div
                    key={batch.key}
                    className="relative rounded-2xl border border-slate-700 hover:border-blue-500/50 overflow-hidden bg-[#1E2630] transition-all duration-300 p-4 space-y-3 flex flex-col justify-between shadow-2xs hover:shadow-md group"
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-800">
                      <img
                        src={batch.imageUrl}
                        alt={batch.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-[#0B0F13]/70 backdrop-blur-md text-white font-mono font-bold text-[10px] border border-slate-700">
                        {batch.quantityMT} MT
                      </span>
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-[#00E676] text-[#0B0F13] font-bold text-[10px]">
                        {batch.purity}% Clean
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-extrabold text-white text-xs leading-snug group-hover:text-blue-400 transition">
                        {batch.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{batch.city}, {batch.state}</span>
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-700 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold">Value:</span>
                        <p className="font-mono font-extrabold text-blue-400 text-xs">
                          {formatInrCurrency(batch.quantityMT * batch.pricePerMT, true)}
                        </p>
                      </div>

                      <button
                        onClick={() => handleQuickBroadcastSample(batch)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                          isCreated
                            ? "bg-[#00E676] text-[#0B0F13]"
                            : "bg-[#12181F] hover:bg-blue-600 hover:text-white text-blue-400 border border-blue-500/30"
                        }`}
                      >
                        {isCreated ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Broadcasted!</span>
                          </>
                        ) : (
                          <>
                            <Zap className="w-3.5 h-3.5" />
                            <span>Broadcast</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Interactive Live Scrap Payout & Carbon Estimator */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-6 sm:p-8 shadow-lg space-y-6">
            
            {/* Background Blur Overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20 scale-105 blur-sm mix-blend-overlay"
              style={{
                backgroundImage: `url('${selectedSim.img}')`
              }}
            ></div>

            <div className="relative z-10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-white/15">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-400/30 text-xs font-bold mb-1">
                    <Sliders className="w-3.5 h-3.5" />
                    Live Scrap Value & Carbon Calculator
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                    Estimate How Much Money & Clean Nature Your Factory Will Gain
                  </h3>
                </div>

                {/* Material Buttons */}
                <div className="flex flex-wrap items-center gap-1.5 bg-[#12181F]/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shrink-0">
                  {(["aluminium", "plastic", "steel", "copper", "flyash"] as const).map((mat) => (
                    <button
                      key={mat}
                      onClick={() => setSimMaterial(mat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition cursor-pointer ${
                        simMaterial === mat
                          ? "bg-[#12181F] text-white shadow-sm"
                          : "text-slate-200 hover:text-white"
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider Row */}
              <div className="bg-[#12181F]/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-200 uppercase tracking-wider">
                    Select Batch Weight to Sell:
                  </span>
                  <span className="font-mono font-extrabold text-emerald-300 text-sm bg-emerald-950/80 px-3.5 py-1 rounded-xl border border-emerald-500/30">
                    {simTonnage} Metric Tons ({simTonnage * 1000} Kilograms)
                  </span>
                </div>

                <input
                  type="range"
                  min={5}
                  max={100}
                  step={5}
                  value={simTonnage}
                  onChange={(e) => setSimTonnage(Number(e.target.value))}
                  className="w-full h-2.5 bg-[#12181F]/20 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>5 MT (Small Truck)</span>
                  <span>50 MT (Heavy Trailer)</span>
                  <span>100 MT (Bulk Train / Fleet)</span>
                </div>
              </div>

              {/* Real-time Calculation Result Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Rupee Payout Card */}
                <div className="bg-[#12181F]/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-1">
                  <span className="text-[11px] text-blue-300 font-bold uppercase flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5" />
                    Estimated Factory Revenue
                  </span>
                  <p className="text-2xl font-mono font-extrabold text-white">
                    {formatInrCurrency(simEstimatedRupees, true)}
                  </p>
                  <p className="text-[11px] text-slate-300">
                    At fair benchmark of ₹{(selectedSim.price).toLocaleString("en-IN")} / Ton
                  </p>
                </div>

                {/* Trees Card */}
                <div className="bg-emerald-950/60 backdrop-blur-md p-4 rounded-2xl border border-emerald-500/30 space-y-1">
                  <span className="text-[11px] text-emerald-300 font-bold uppercase flex items-center gap-1">
                    <TreeDeciduous className="w-3.5 h-3.5 text-emerald-400" />
                    Tree Planting Equivalent
                  </span>
                  <p className="text-2xl font-mono font-extrabold text-emerald-300">
                    {simTrees.toLocaleString("en-IN")} Trees
                  </p>
                  <p className="text-[11px] text-emerald-200">
                    {(simCo2Kg / 1000).toFixed(1)} Tons of CO₂ smoke kept out of our air
                  </p>
                </div>

                {/* Broadcast from Calc Button */}
                <div className="bg-[#12181F]/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[11px] text-slate-300 font-bold uppercase">Immediate Next Action</span>
                    <p className="text-xs text-slate-200 font-medium">Ready to list this exact batch?</p>
                  </div>

                  <button
                    onClick={handleBroadcastFromSimulator}
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-md"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Broadcast This {simTonnage} MT Lot Now</span>
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Section 3: Interactive Process Steps */}
          <div className="bg-[#12181F] p-6 sm:p-8 rounded-3xl border border-slate-700 space-y-4 shadow-xs">
            <h4 className="font-extrabold text-base text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#00E676]" />
              How Industrial Scrap Flows in CIRCULUS (3 Simple Steps)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-[#1E2630] p-4 rounded-2xl border border-slate-700 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center">
                  1
                </div>
                <h5 className="font-extrabold text-white text-sm">Log Scrap Photo & Tonnage</h5>
                <p className="text-slate-400 leading-relaxed">
                  Your factory takes a picture or enters scrap weight. Our AI automatically scans material purity and issues an official Digital Aadhaar ID card.
                </p>
              </div>

              <div className="bg-[#1E2630] p-4 rounded-2xl border border-slate-700 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-[#00E676] text-[#0B0F13] font-extrabold flex items-center justify-center">
                  2
                </div>
                <h5 className="font-extrabold text-white text-sm">Smart Matching with Nearby Plants</h5>
                <p className="text-slate-400 leading-relaxed">
                  Our system matches your batch with verified melting plants & recyclers located closest to you to save diesel freight and get highest rates.
                </p>
              </div>

              <div className="bg-[#1E2630] p-4 rounded-2xl border border-slate-700 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white font-extrabold flex items-center justify-center">
                  3
                </div>
                <h5 className="font-extrabold text-white text-sm">Transfer Custody & Save Nature</h5>
                <p className="text-slate-400 leading-relaxed">
                  Generate GST e-Way bills and SPCB manifests. Download official Green Audit certificates showing verified clean air and trees preserved.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Listing Detail & Negotiation Modal */}
      {selectedListingForModal && (
        <ListingDetailModal
          listing={selectedListingForModal}
          passport={passports.find((p) => p.id === selectedListingForModal.passportId)}
          onClose={() => setSelectedListingForModal(null)}
          onViewPassport={onViewPassport}
          activeRole={activeRole}
          onSubmitOffer={onSubmitOffer}
        />
      )}
    </div>
  );
};
