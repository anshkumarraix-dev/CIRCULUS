import React, { useState, useMemo } from "react";
import { 
  Users2, 
  CheckCircle2, 
  MapPin, 
  Truck, 
  Leaf, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Send,
  Building2,
  ThumbsUp,
  SlidersHorizontal,
  Search,
  Filter,
  Eye,
  TreeDeciduous,
  Wind,
  PhoneCall,
  Check,
  ChevronRight,
  ExternalLink,
  Info
} from "lucide-react";
import { MatchRecommendation, MarketplaceListing, MaterialPassport, UserRole } from "../../types";
import { INDIAN_BUYERS_DIRECTORY, BuyerProfile } from "../../lib/matching-engine";
import { formatInrCurrency } from "../../lib/valuation-engine";

interface MatchRecommendationsProps {
  matches: MatchRecommendation[];
  listings: MarketplaceListing[];
  passports: MaterialPassport[];
  onViewPassport: (passportId: string) => void;
  onInitiateTransfer: (listingId: string, buyerOrg: string) => void;
  activeRole: UserRole;
}

export const MatchRecommendations: React.FC<MatchRecommendationsProps> = ({
  matches,
  listings,
  passports,
  onViewPassport,
  onInitiateTransfer,
  activeRole,
}) => {
  const [activeViewTab, setActiveViewTab] = useState<"live_matches" | "buyer_directory">("live_matches");
  const [sentOfferMap, setSentOfferMap] = useState<Record<string, boolean>>({});
  const [selectedBuyerForModal, setSelectedBuyerForModal] = useState<BuyerProfile | MatchRecommendation | null>(null);
  const [inquiryQuantityMT, setInquiryQuantityMT] = useState<number>(20);
  const [inquiryCustomNote, setInquiryCustomNote] = useState<string>("Ready for immediate dispatch under GST e-Way Bill.");
  const [inquirySuccess, setInquirySuccess] = useState<boolean>(false);

  // Directory search & filters
  const [directorySearch, setDirectorySearch] = useState<string>("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>("all");

  const filteredDirectoryBuyers = useMemo(() => {
    return INDIAN_BUYERS_DIRECTORY.filter((buyer) => {
      const matchesText =
        buyer.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
        buyer.type.toLowerCase().includes(directorySearch.toLowerCase()) ||
        buyer.city.toLowerCase().includes(directorySearch.toLowerCase()) ||
        buyer.state.toLowerCase().includes(directorySearch.toLowerCase());
      
      const matchesCat =
        selectedCategoryFilter === "all" ||
        buyer.acceptedCategories.includes(selectedCategoryFilter);

      const matchesState =
        selectedStateFilter === "all" ||
        buyer.state.toLowerCase() === selectedStateFilter.toLowerCase();

      return matchesText && matchesCat && matchesState;
    });
  }, [directorySearch, selectedCategoryFilter, selectedStateFilter]);

  const handleSendProposal = (match: MatchRecommendation) => {
    setSentOfferMap((prev) => ({ ...prev, [match.id]: true }));
    onInitiateTransfer(match.listingId, match.buyerOrg);
  };

  const handleOpenInquiryModal = (buyer: BuyerProfile | MatchRecommendation) => {
    setSelectedBuyerForModal(buyer);
    setInquirySuccess(false);
  };

  const handleConfirmInquiryDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBuyerForModal) return;
    const buyerOrgName = "buyerOrg" in selectedBuyerForModal ? selectedBuyerForModal.buyerOrg : selectedBuyerForModal.name;
    const listingId = "listingId" in selectedBuyerForModal ? selectedBuyerForModal.listingId : "DIRECT-INQUIRY";
    
    if ("id" in selectedBuyerForModal) {
      setSentOfferMap((prev) => ({ ...prev, [selectedBuyerForModal.id]: true }));
    }
    onInitiateTransfer(listingId, buyerOrgName);
    setInquirySuccess(true);
    setTimeout(() => {
      setSelectedBuyerForModal(null);
      setInquirySuccess(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Dynamic Visual Banner with Clean Environment Backdrop Blur */}
      <div className="relative rounded-3xl overflow-hidden border border-[#00E676]/30 bg-gradient-to-r from-[#12181F] via-[#1E2630] to-[#0B0F13] text-white p-6 sm:p-10 shadow-lg">
        {/* Clean environment blurred photography layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 scale-105 blur-sm mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1600&q=80')`
          }}
        ></div>

        {/* Ambient colored lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E676]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#FF6D00]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E676]/10 backdrop-blur-md border border-[#00E676]/30 text-sm font-semibold tracking-wide text-[#00E676]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Powered Clean Circular Matchmaking</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            Direct Connections with Verified Scrap Buyer Factories
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Match your industrial scrap directly with verified secondary manufacturing plants across India. Cut diesel freight emissions, eliminate broker commissions, and support 100% clean circular recycling.
          </p>

          {/* Quick Tab Switcher */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => setActiveViewTab("live_matches")}
              className={`px-5 py-2.5 rounded-2xl text-sm font-extrabold transition cursor-pointer flex items-center gap-2 ${
                activeViewTab === "live_matches"
                  ? "bg-[#00E676] text-[#0B0F13] shadow-md border border-[#00C853]"
                  : "bg-[#1E2630]/80 hover:bg-[#1E2630] text-white backdrop-blur-md border border-slate-700"
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Active Batch Matches ({matches.length})</span>
            </button>

            <button
              onClick={() => setActiveViewTab("buyer_directory")}
              className={`px-5 py-2.5 rounded-2xl text-sm font-extrabold transition cursor-pointer flex items-center gap-2 ${
                activeViewTab === "buyer_directory"
                  ? "bg-[#00E676] text-[#0B0F13] shadow-md border border-[#00C853]"
                  : "bg-[#1E2630]/80 hover:bg-[#1E2630] text-white backdrop-blur-md border border-slate-700"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>All-India Scrap Buyer Directory ({INDIAN_BUYERS_DIRECTORY.length} Plants)</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW TAB 1: Live Matches for logged scrap */}
      {activeViewTab === "live_matches" && (
        <div className="space-y-6">
          {matches.length > 0 ? (
            <div className="space-y-6">
              {matches.map((match) => {
                const listing = listings.find((l) => l.id === match.listingId);
                const isSent = sentOfferMap[match.id];

                return (
                  <div
                    key={match.id}
                    className="bg-[#12181F] rounded-3xl border border-slate-700 hover:border-[#00E676] transition-all duration-300 overflow-hidden shadow-xs hover:shadow-lg hover:shadow-[#00E676]/10 group"
                  >
                    {/* Top Visual Header: Buyer Plant Photo + Clean Environment Badge */}
                    <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
                      <img
                        src={match.buyerFacilityImage || "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=1200&q=80"}
                        alt={match.buyerOrg}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-60"
                      />

                      {/* Backdrop Blur Overlay at Bottom of Photo */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12181F] via-[#12181F]/60 to-transparent"></div>

                      {/* Match Fit Floating Pill */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3.5 py-1.5 rounded-xl bg-[#00E676] text-[#0B0F13] font-extrabold text-sm flex items-center gap-1.5 shadow-md shadow-[#00E676]/30 border border-[#00C853]">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          {match.matchScore}% Match Fit
                        </span>
                        <span className="px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white font-medium text-sm border border-white/20">
                          📍 {match.distanceKm} km away
                        </span>
                      </div>

                      {/* Clean Environment Badge on Right */}
                      <div className="absolute top-4 right-4 hidden sm:flex items-center gap-2">
                        <div className="px-3.5 py-1.5 rounded-xl bg-[#1E2630]/80 backdrop-blur-md text-[#00E676] border border-[#00E676]/30 text-sm font-semibold flex items-center gap-1.5 shadow-md">
                          <Leaf className="w-3.5 h-3.5" />
                          <span>{match.cleanEnvStat || "100% Recycled Scrap Loop"}</span>
                        </div>
                      </div>

                      {/* Buyer Title & Avatar overlaid on Photo */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={match.buyerAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"}
                            alt={match.buyerOrg}
                            className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-700 shadow-md shrink-0 bg-[#0B0F13]"
                          />
                          <div>
                            <h3 className="text-xl sm:text-xl font-extrabold text-white leading-tight">
                              {match.buyerOrg}
                            </h3>
                            <p className="text-sm text-slate-300 flex items-center gap-1.5">
                              <span className="text-[#00E676]">{match.buyerType}</span>
                              <span>•</span>
                              <span>{match.buyerCity}, {match.buyerState}</span>
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleOpenInquiryModal(match)}
                          className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E2630]/80 hover:bg-[#1E2630] backdrop-blur-md text-white text-sm font-bold border border-slate-600 transition cursor-pointer shrink-0"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#00E676]" />
                          <span>Plant Specs</span>
                        </button>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 sm:p-8 space-y-6">
                      
                      {/* Scrap Batch & Freight Bar */}
                      {listing && (
                        <div className="bg-[#1E2630] p-4 rounded-2xl border border-slate-700 flex flex-wrap items-center justify-between gap-4 text-sm">
                          <div className="flex items-center gap-3">
                            <img src={listing.imageUrl} alt={listing.title} className="w-12 h-12 rounded-xl object-cover border border-slate-600 shadow-2xs opacity-90" />
                            <div>
                              <p className="font-extrabold text-white text-base">{listing.title}</p>
                              <p className="text-slate-400 font-mono mt-0.5">
                                {listing.quantityMT} Tons Available • Asking ₹{listing.pricePerMT.toLocaleString("en-IN")}/Ton
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <span className="text-xs text-slate-500 font-bold uppercase">Estimated Lorry Freight</span>
                              <p className="font-mono font-extrabold text-[#00E676] text-base">
                                ₹{match.estimatedFreightInr.toLocaleString("en-IN")}
                              </p>
                            </div>
                            <button
                              onClick={() => onViewPassport(listing.passportId)}
                              className="px-3.5 py-2 rounded-xl bg-[#12181F] hover:bg-slate-800 border border-slate-600 text-slate-300 hover:text-white font-bold text-sm cursor-pointer shadow-2xs transition-colors"
                            >
                              Digital Aadhaar →
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Explainability Grid: Clean Nature & Technical Fit */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-[#12181F] p-4 rounded-2xl border border-slate-700 space-y-1.5">
                          <p className="font-extrabold text-white flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
                            Technical Compatibility:
                          </p>
                          <p className="text-slate-400 leading-relaxed">{match.whyMatch.materialFit}</p>
                        </div>

                        <div className="bg-[#12181F] p-4 rounded-2xl border border-slate-700 space-y-1.5">
                          <p className="font-extrabold text-white flex items-center gap-1.5">
                            <Truck className="w-4 h-4 text-[#FF6D00]" />
                            Optimized Transit Corridor:
                          </p>
                          <p className="text-slate-400 leading-relaxed">{match.whyMatch.logisticsSummary}</p>
                        </div>

                        <div className="bg-[#00E676]/5 p-4 rounded-2xl border border-[#00E676]/20 space-y-1.5">
                          <p className="font-extrabold text-[#00E676] flex items-center gap-1.5">
                            <Leaf className="w-4 h-4 text-[#00E676]" />
                            Clean Environment Impact:
                          </p>
                          <p className="text-emerald-100/80 leading-relaxed">{match.whyMatch.carbonSavingsPotential}</p>
                        </div>
                      </div>

                      {/* Clean Nature Impact Preview Strip */}
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1E2630] via-[#12181F] to-[#1E2630] border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-xl bg-[#00E676]/20 text-[#00E676] flex items-center justify-center shrink-0 border border-[#00E676]/30">
                            <TreeDeciduous className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-extrabold text-slate-300">Circular Product Outcome: </span>
                            <span className="text-[#00E676]">{match.recommendedApplication}</span>
                          </div>
                        </div>

                        <div className="text-sm text-slate-400 font-semibold flex items-center gap-1.5 shrink-0">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#00E676]" />
                          <span>{match.spcbJurisdiction} Compliant</span>
                        </div>
                      </div>

                      {/* Bottom Action Footer */}
                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-mono">
                          <Building2 className="w-4 h-4 text-slate-500" />
                          <span>Procurement Lot Size: ~25 MT per order</span>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => handleOpenInquiryModal(match)}
                            className="px-4 py-2.5 rounded-2xl bg-[#1E2630] hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-sm transition cursor-pointer border border-slate-600"
                          >
                            Simulate Price & Lorry
                          </button>

                          {isSent ? (
                            <div className="bg-[#00E676]/10 px-5 py-2.5 rounded-2xl border border-[#00E676]/30 text-sm font-bold text-[#00E676] flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Offer Dispatched to {match.buyerOrg}!</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleSendProposal(match)}
                              className="px-5 py-2.5 rounded-2xl bg-[#FF6D00] hover:bg-[#E65C00] text-white font-extrabold text-sm transition cursor-pointer flex items-center justify-center gap-2 shadow-sm shadow-[#FF6D00]/20"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>Dispatch Direct Deal Offer</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-[#12181F] p-8 sm:p-12 rounded-3xl border border-slate-700 text-center space-y-5 shadow-xs">
                <div className="w-16 h-16 rounded-3xl bg-[#1E2630] text-slate-400 border border-slate-600 flex items-center justify-center mx-auto shadow-inner">
                  <Users2 className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto space-y-1.5">
                  <h3 className="text-xl font-extrabold text-white">No Active Batch Matches Right Now</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Add a real-time scrap batch or scan a photo to instantly find buyers. You can also explore our full directory of verified Indian scrap buyer factories below!
                  </p>
                </div>

                <button
                  onClick={() => setActiveViewTab("buyer_directory")}
                  className="px-6 py-3 rounded-2xl bg-[#00E676] hover:bg-[#00C853] text-[#0B0F13] font-extrabold text-sm transition cursor-pointer shadow-sm shadow-[#00E676]/20"
                >
                  Explore Verified Buyer Factories Directory →
                </button>
              </div>

              {/* 3-Step Educational Guide */}
              <div className="bg-[#12181F] p-6 sm:p-8 rounded-3xl border border-slate-700 space-y-4 shadow-xs">
                <h4 className="font-extrabold text-base text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  How Intelligent Buyer Matching Works (3 Steps):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-700/80 space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#1B4332] text-white font-bold flex items-center justify-center text-sm">1</span>
                    <p className="font-bold text-white">Proximity & Freight Scoring</p>
                    <p className="text-slate-500 text-sm">Calculates road distance to nearest secondary smelter in km, reducing transport diesel smoke.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-700/80 space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#1B4332] text-white font-bold flex items-center justify-center text-sm">2</span>
                    <p className="font-bold text-white">Furnace Metallurgy Match</p>
                    <p className="text-slate-500 text-sm">Pairs specific scrap alloy specs (e.g. 6063 extrusions) with melting furnaces requiring that exact input.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-700/80 space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#1B4332] text-white font-bold flex items-center justify-center text-sm">3</span>
                    <p className="font-bold text-white">Direct Factory Settlement</p>
                    <p className="text-slate-500 text-sm">Direct trade with zero middleman margin, generating verified BRSR circularity records.</p>
                  </div>
                </div>
              </div>

              {/* Ghost Preview Match Cards at 40% opacity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 opacity-40 select-none pointer-events-none">
                <div className="bg-[#12181F] rounded-3xl border border-dashed border-slate-700 p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#00E676]">98% MATCH FIT • 42 KM</span>
                    <span className="text-xs text-slate-500 font-mono">SANAND HUB</span>
                  </div>
                  <h4 className="font-bold text-base text-slate-300">Gujarat Secondary Extrusions Pvt Ltd</h4>
                  <p className="text-sm text-slate-500">Demands 50 MT/month Aluminium 6063 Clean Billets</p>
                  <div className="flex justify-between text-sm text-slate-400 pt-2 border-t border-slate-800 font-mono">
                    <span>Rate: ₹215,000/MT</span>
                    <span className="text-[#00E676]">CO₂ Saved: 9.2 t/MT</span>
                  </div>
                </div>

                <div className="bg-[#12181F] rounded-3xl border border-dashed border-slate-700 p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#00E676]">95% MATCH FIT • 78 KM</span>
                    <span className="text-xs text-slate-500 font-mono">HAZIRA CORRIDOR</span>
                  </div>
                  <h4 className="font-bold text-base text-slate-300">Mahavir Eco-Polymers Reclaiming</h4>
                  <p className="text-sm text-slate-500">Demands 100 MT/month rPET Industrial Flakes</p>
                  <div className="flex justify-between text-sm text-slate-400 pt-2 border-t border-slate-800 font-mono">
                    <span>Rate: ₹68,000/MT</span>
                    <span className="text-[#00E676]">CO₂ Saved: 2.3 t/MT</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW TAB 2: All-India Verified Scrap Buyer Directory */}
      {activeViewTab === "buyer_directory" && (
        <div className="space-y-6">
          
          {/* Search & State Filter Controls */}
          <div className="bg-[#12181F] p-5 rounded-3xl border border-slate-700 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={directorySearch}
                  onChange={(e) => setDirectorySearch(e.target.value)}
                  placeholder="Search buyer factories by name, city, furnace type..."
                  className="w-full bg-[#1E2630] border border-slate-600 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:border-[#00E676] focus:bg-[#1E2630]/80 focus:outline-none font-medium"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="bg-[#1E2630] border border-slate-600 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:border-[#00E676] font-semibold cursor-pointer outline-none"
                >
                  <option value="all">All Scrap Categories</option>
                  <option value="non_ferrous">Aluminium & Copper</option>
                  <option value="plastic">Recycled Plastics (rPET)</option>
                  <option value="ferrous">Steel & Iron</option>
                  <option value="fly_ash">Fly Ash & Pozzolana</option>
                  <option value="slag">Slag & Marine Cements</option>
                  <option value="construction_demolition">C&D Aggregates</option>
                </select>

                <select
                  value={selectedStateFilter}
                  onChange={(e) => setSelectedStateFilter(e.target.value)}
                  className="bg-[#1E2630] border border-slate-600 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:border-[#00E676] font-semibold cursor-pointer outline-none"
                >
                  <option value="all">All States</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
              </div>
            </div>
          </div>

          {/* Grid of Verified Buyer Plants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDirectoryBuyers.map((buyer) => (
              <div
                key={buyer.id}
                className="bg-[#12181F] rounded-3xl border border-slate-700 hover:border-[#00E676] transition duration-300 overflow-hidden shadow-xs hover:shadow-lg hover:shadow-[#00E676]/10 flex flex-col justify-between group"
              >
                {/* Header Image with Blur Layer */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={buyer.facilityImageUrl}
                    alt={buyer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12181F] via-[#12181F]/40 to-transparent"></div>

                  {/* Clean Environment Chip */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 rounded-xl bg-[#1E2630]/85 backdrop-blur-md text-[#00E676] text-sm font-bold border border-[#00E676]/30 flex items-center gap-1 shadow-md">
                      <Leaf className="w-3 h-3 text-[#00E676]" />
                      <span>{buyer.cleanEnvStat}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
                    <img
                      src={buyer.buyerAvatar}
                      alt={buyer.name}
                      className="w-10 h-10 rounded-xl object-cover border-2 border-slate-700 bg-[#0B0F13] shadow-sm shrink-0"
                    />
                    <div className="truncate">
                      <h4 className="text-white font-extrabold text-lg truncate">{buyer.name}</h4>
                      <p className="text-[#00E676] text-sm truncate">📍 {buyer.city}, {buyer.state}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5 text-sm">
                    <div>
                      <span className="text-xs text-slate-500 uppercase font-bold">Plant Operations:</span>
                      <p className="text-white font-medium">{buyer.type}</p>
                    </div>

                    <div className="bg-[#1E2630] p-3 rounded-xl border border-slate-700 space-y-1">
                      <span className="text-xs text-slate-500 uppercase font-bold">Melting / Processing Line:</span>
                      <p className="text-slate-300 font-medium">{buyer.targetFurnaceType}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-slate-400 pt-1">
                      <span><strong>Min Purity:</strong> {buyer.minimumPurityRequired}%</span>
                      <span><strong>Lot Size:</strong> ~{buyer.typicalLotCapacityMT} MT</span>
                      <span><strong>Board:</strong> {buyer.spcbJurisdiction}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenInquiryModal(buyer)}
                    className="w-full py-2.5 rounded-xl bg-[#1E2630] hover:bg-slate-700 border border-slate-600 text-white font-bold text-sm transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Connect & Send Quotation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Quotation & Route Simulation Modal */}
      {selectedBuyerForModal && (
        <div className="fixed inset-0 z-50 bg-[#0B0F13]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto overscroll-contain">
          <div className="bg-[#12181F] rounded-3xl border border-slate-700 max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative my-8 animate-fadeIn">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs uppercase font-bold px-2.5 py-0.5 rounded-lg bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30">
                  INSTANT BUYER DISPATCH
                </span>
                <h2 className="text-xl font-extrabold text-white mt-1 font-display">
                  {"buyerOrg" in selectedBuyerForModal ? selectedBuyerForModal.buyerOrg : selectedBuyerForModal.name}
                </h2>
                <p className="text-sm text-slate-400">
                  {"buyerCity" in selectedBuyerForModal ? `${selectedBuyerForModal.buyerCity}, ${selectedBuyerForModal.buyerState}` : `${selectedBuyerForModal.city}, ${selectedBuyerForModal.state}`}
                </p>
              </div>
              <button
                onClick={() => setSelectedBuyerForModal(null)}
                className="text-slate-500 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 cursor-pointer text-sm transition"
              >
                ✕ Close
              </button>
            </div>

            {/* Clean Environment Impact Strip inside Modal */}
            <div className="p-3.5 rounded-2xl bg-[#1E2630] border border-[#00E676]/30 flex items-center gap-3 text-sm">
              <div className="w-8 h-8 rounded-xl bg-[#00E676]/20 text-[#00E676] flex items-center justify-center shrink-0 border border-[#00E676]/30">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-[#00E676]">Clean Environment Benefit</p>
                <p className="text-emerald-100/80 text-sm">
                  {"cleanEnvStat" in selectedBuyerForModal ? selectedBuyerForModal.cleanEnvStat : "Certified circular recycling avoids coal burning & mining"}
                </p>
              </div>
            </div>

            <form onSubmit={handleConfirmInquiryDispatch} className="space-y-4 text-sm">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Lot Size to Offer (Metric Tons)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={5}
                    max={100}
                    step={5}
                    value={inquiryQuantityMT}
                    onChange={(e) => setInquiryQuantityMT(Number(e.target.value))}
                    className="flex-1 accent-[#00E676] cursor-pointer"
                  />
                  <span className="w-20 px-3 py-1.5 rounded-xl bg-[#1E2630] text-white font-mono font-bold text-center border border-slate-700">
                    {inquiryQuantityMT} MT
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Sender Factory Profile</label>
                <input
                  type="text"
                  disabled
                  value={`${activeRole.orgName} (${activeRole.gstin})`}
                  className="w-full bg-[#1E2630] border border-slate-700 rounded-xl px-3 py-2 text-slate-400 text-sm font-medium opacity-70"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Handover Notes / Delivery Terms</label>
                <textarea
                  rows={2}
                  value={inquiryCustomNote}
                  onChange={(e) => setInquiryCustomNote(e.target.value)}
                  className="w-full bg-[#1E2630] border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:border-[#00E676] focus:bg-[#1E2630]/80 focus:outline-none font-medium"
                />
              </div>

              <div className="bg-[#1E2630] p-3.5 rounded-2xl border border-slate-700 flex items-center justify-between text-sm">
                <div>
                  <p className="text-slate-500 text-sm">Estimated Lorry Turnaround</p>
                  <p className="font-extrabold text-white font-mono">18 to 24 Hours Transit</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 text-sm">SPCB Tracking</p>
                  <p className="font-bold text-[#00E676]">Digital Manifest Ready</p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#00E676] hover:bg-[#00C853] text-[#0B0F13] font-extrabold text-sm transition cursor-pointer flex items-center justify-center gap-2 shadow-sm shadow-[#00E676]/20 border border-[#00C853]"
              >
                {inquirySuccess ? (
                  <>
                    <Check className="w-4 h-4 text-[#0B0F13]" />
                    <span>Inquiry Transmitted Successfully!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Confirm & Dispatch Commercial Proposal</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

