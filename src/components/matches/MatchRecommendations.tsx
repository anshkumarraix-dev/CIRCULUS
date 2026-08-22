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
  Info,
  Award,
  Factory,
  CheckCircle,
  X,
  RotateCcw,
  Layers,
  Flame,
  Scale
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
  const [inquiryCustomNote, setInquiryCustomNote] = useState<string>("Ready for immediate dispatch with GST e-Way Bill & SPCB manifest.");
  const [inquirySuccess, setInquirySuccess] = useState<boolean>(false);

  // Multi-Criteria Filtering State
  const [directorySearch, setDirectorySearch] = useState<string>("");
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>("all");
  const [selectedProximityFilter, setSelectedProximityFilter] = useState<string>("all"); // "all", "30", "50", "75", "100", "150"
  const [selectedCapacityFilter, setSelectedCapacityFilter] = useState<string>("all"); // "all", "50000", "150000", "300000", "1000000"
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");
  const [selectedStateFilter, setSelectedStateFilter] = useState<string>("all");
  const [isFilterPanelExpanded, setIsFilterPanelExpanded] = useState<boolean>(false);

  // Sector list derived from directory
  const industrySectors = useMemo(() => {
    const set = new Set<string>();
    INDIAN_BUYERS_DIRECTORY.forEach((b) => {
      if (b.industrySector) set.add(b.industrySector);
    });
    return Array.from(set).sort();
  }, []);

  // Filtered Live Matches
  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const q = directorySearch.toLowerCase();
      const matchesText =
        !q ||
        match.buyerOrg.toLowerCase().includes(q) ||
        match.buyerType.toLowerCase().includes(q) ||
        match.buyerCity.toLowerCase().includes(q) ||
        match.buyerState.toLowerCase().includes(q) ||
        (match.industrySector && match.industrySector.toLowerCase().includes(q));

      // Proximity (Distance in km)
      let matchesProximity = true;
      if (selectedProximityFilter !== "all") {
        const maxKm = parseInt(selectedProximityFilter, 10);
        matchesProximity = match.distanceKm <= maxKm;
      }

      // Annual Procurement Capacity (MT/year)
      let matchesCapacity = true;
      if (selectedCapacityFilter !== "all") {
        const minCapacity = parseInt(selectedCapacityFilter, 10);
        const buyerCapacity = match.annualCapacityMT || 100000;
        matchesCapacity = buyerCapacity >= minCapacity;
      }

      // Industry Sector
      const matchesSector =
        selectedSectorFilter === "all" ||
        (match.industrySector && match.industrySector.toLowerCase() === selectedSectorFilter.toLowerCase()) ||
        match.buyerType.toLowerCase().includes(selectedSectorFilter.toLowerCase());

      return matchesText && matchesProximity && matchesCapacity && matchesSector;
    });
  }, [matches, directorySearch, selectedProximityFilter, selectedCapacityFilter, selectedSectorFilter]);

  // Filtered Directory Buyers
  const filteredDirectoryBuyers = useMemo(() => {
    return INDIAN_BUYERS_DIRECTORY.filter((buyer) => {
      const q = directorySearch.toLowerCase();
      const matchesText =
        !q ||
        buyer.name.toLowerCase().includes(q) ||
        buyer.corporateGroup.toLowerCase().includes(q) ||
        buyer.type.toLowerCase().includes(q) ||
        buyer.city.toLowerCase().includes(q) ||
        buyer.state.toLowerCase().includes(q) ||
        buyer.industrialZone.toLowerCase().includes(q) ||
        buyer.targetFurnaceType.toLowerCase().includes(q) ||
        buyer.industrySector.toLowerCase().includes(q);

      // Proximity (Distance in km)
      let matchesProximity = true;
      if (selectedProximityFilter !== "all") {
        const maxKm = parseInt(selectedProximityFilter, 10);
        matchesProximity = buyer.distanceKm <= maxKm;
      }

      // Annual Procurement Capacity (MT/year)
      let matchesCapacity = true;
      if (selectedCapacityFilter !== "all") {
        const minCapacity = parseInt(selectedCapacityFilter, 10);
        matchesCapacity = buyer.annualRecyclingCapacityMT >= minCapacity;
      }

      // Industry Sector
      const matchesSector =
        selectedSectorFilter === "all" ||
        buyer.industrySector.toLowerCase() === selectedSectorFilter.toLowerCase();

      // Scrap Category
      const matchesCat =
        selectedCategoryFilter === "all" ||
        buyer.acceptedCategories.includes(selectedCategoryFilter);

      // State
      const matchesState =
        selectedStateFilter === "all" ||
        buyer.state.toLowerCase() === selectedStateFilter.toLowerCase();

      return matchesText && matchesProximity && matchesCapacity && matchesSector && matchesCat && matchesState;
    });
  }, [
    directorySearch,
    selectedProximityFilter,
    selectedCapacityFilter,
    selectedSectorFilter,
    selectedCategoryFilter,
    selectedStateFilter,
  ]);

  // Count active filters
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (directorySearch.trim() !== "") count++;
    if (selectedSectorFilter !== "all") count++;
    if (selectedProximityFilter !== "all") count++;
    if (selectedCapacityFilter !== "all") count++;
    if (selectedCategoryFilter !== "all") count++;
    if (selectedStateFilter !== "all") count++;
    return count;
  }, [
    directorySearch,
    selectedSectorFilter,
    selectedProximityFilter,
    selectedCapacityFilter,
    selectedCategoryFilter,
    selectedStateFilter,
  ]);

  const handleResetFilters = () => {
    setDirectorySearch("");
    setSelectedSectorFilter("all");
    setSelectedProximityFilter("all");
    setSelectedCapacityFilter("all");
    setSelectedCategoryFilter("all");
    setSelectedStateFilter("all");
  };

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
            <span>Verified Real-World Indian Industrial Recyclers</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            Direct Matchmaking with Real Industrial Consumers
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Connect your industrial scrap with verified, operational secondary manufacturing plants across India (Hindalco, Tata Steel Recycling, Reliance Recron, UltraTech Cement, JSW, Mahindra CERO, Gravita). Filter buyers by transit proximity, procurement capacity, and industry sector.
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
              <span>Active Batch Matches ({filteredMatches.length}{matches.length !== filteredMatches.length ? ` / ${matches.length}` : ""})</span>
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
              <span>All-India Verified Buyer Directory ({filteredDirectoryBuyers.length} / {INDIAN_BUYERS_DIRECTORY.length} Plants)</span>
            </button>
          </div>
        </div>
      </div>

      {/* MASTER FILTERING SYSTEM BAR */}
      <div className="bg-[#12181F] p-5 sm:p-6 rounded-3xl border border-slate-700 space-y-4 shadow-sm">
        
        {/* Header & Quick Action Row */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#00E676]/15 text-[#00E676] flex items-center justify-center border border-[#00E676]/30">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-extrabold text-base">Buyer Matchmaking Filters</h3>
                {activeFiltersCount > 0 && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#00E676] text-[#0B0F13] font-mono font-extrabold text-xs">
                    {activeFiltersCount} Active
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                Filter potential industrial buyers by proximity radius, annual capacity, and sector
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer border border-slate-700"
              >
                <RotateCcw className="w-3 h-3 text-[#FF6D00]" />
                <span>Reset Filters</span>
              </button>
            )}
            <button
              onClick={() => setIsFilterPanelExpanded(!isFilterPanelExpanded)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                isFilterPanelExpanded
                  ? "bg-[#00E676]/15 text-[#00E676] border-[#00E676]/40"
                  : "bg-[#1E2630] text-slate-300 border-slate-700 hover:text-white"
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>{isFilterPanelExpanded ? "Simple View" : "All 5 Filter Dimensions"}</span>
            </button>
          </div>
        </div>

        {/* Primary Filter Grid: Search + Sector + Proximity + Capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* 1. Keyword Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={directorySearch}
              onChange={(e) => setDirectorySearch(e.target.value)}
              placeholder="Search plant, group, furnace..."
              className="w-full bg-[#1E2630] border border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:border-[#00E676] focus:outline-none font-medium"
            />
            {directorySearch && (
              <button
                onClick={() => setDirectorySearch("")}
                className="absolute right-3 top-3 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 2. Industry Sector Filter */}
          <div className="space-y-1">
            <select
              value={selectedSectorFilter}
              onChange={(e) => setSelectedSectorFilter(e.target.value)}
              className="w-full bg-[#1E2630] border border-slate-700 rounded-2xl px-3.5 py-2.5 text-sm text-slate-200 focus:border-[#00E676] font-semibold cursor-pointer outline-none transition"
            >
              <option value="all">🏭 All Industry Sectors</option>
              {industrySectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Proximity / Transit Distance Filter */}
          <div className="space-y-1">
            <select
              value={selectedProximityFilter}
              onChange={(e) => setSelectedProximityFilter(e.target.value)}
              className="w-full bg-[#1E2630] border border-slate-700 rounded-2xl px-3.5 py-2.5 text-sm text-slate-200 focus:border-[#00E676] font-semibold cursor-pointer outline-none transition"
            >
              <option value="all">📍 Proximity: All Distances</option>
              <option value="30">📍 Local Corridor (≤ 30 km)</option>
              <option value="50">📍 Regional Cluster (≤ 50 km)</option>
              <option value="75">📍 Inter-District (≤ 75 km)</option>
              <option value="100">📍 Inter-State Transit (≤ 100 km)</option>
              <option value="150">📍 National Network (≤ 150 km)</option>
            </select>
          </div>

          {/* 4. Annual Procurement Capacity Filter */}
          <div className="space-y-1">
            <select
              value={selectedCapacityFilter}
              onChange={(e) => setSelectedCapacityFilter(e.target.value)}
              className="w-full bg-[#1E2630] border border-slate-700 rounded-2xl px-3.5 py-2.5 text-sm text-slate-200 focus:border-[#00E676] font-semibold cursor-pointer outline-none transition"
            >
              <option value="all">⚡ Capacity: All Capacities</option>
              <option value="1000000">⚡ Mega Consumers (≥ 1,000,000 MT/yr)</option>
              <option value="300000">⚡ Large Industrial (≥ 300,000 MT/yr)</option>
              <option value="150000">⚡ Mid-to-Large (≥ 150,000 MT/yr)</option>
              <option value="50000">⚡ Processors & Recyclers (≥ 50,000 MT/yr)</option>
            </select>
          </div>
        </div>

        {/* Secondary Expanded Filter Controls: Category + State + Fast Chips */}
        {isFilterPanelExpanded && (
          <div className="pt-3 border-t border-slate-800 space-y-3 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Material Scrap Category */}
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-[#00E676]" />
                  <span>Scrap Feedstock Category</span>
                </label>
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="w-full bg-[#1E2630] border border-slate-700 rounded-2xl px-3.5 py-2.5 text-sm text-slate-200 focus:border-[#00E676] font-medium cursor-pointer outline-none"
                >
                  <option value="all">All Scrap Categories</option>
                  <option value="non_ferrous">Aluminium, Copper & Zinc Smelting</option>
                  <option value="plastic">rPET, Flakes & Circular Polymers</option>
                  <option value="ferrous">Steel & Heavy Melting Scrap (HMS)</option>
                  <option value="fly_ash">Fly Ash & Pozzolanic Co-Processing</option>
                  <option value="slag">Blast Furnace Slag & GGBS</option>
                  <option value="construction_demolition">C&D Concrete Aggregates</option>
                  <option value="battery">Spent Battery & Lead Refining</option>
                  <option value="paper_packaging">Waste Paper & OCC Corrugated</option>
                  <option value="rubber_tyres">Tyres & Reclaim Crumb Rubber</option>
                </select>
              </div>

              {/* State & Industrial Zone */}
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#00E676]" />
                  <span>State & Industrial Development Area</span>
                </label>
                <select
                  value={selectedStateFilter}
                  onChange={(e) => setSelectedStateFilter(e.target.value)}
                  className="w-full bg-[#1E2630] border border-slate-700 rounded-2xl px-3.5 py-2.5 text-sm text-slate-200 focus:border-[#00E676] font-medium cursor-pointer outline-none"
                >
                  <option value="all">All States & Industrial Corridors</option>
                  <option value="Maharashtra">Maharashtra (MIDC Taloja / Tarapur)</option>
                  <option value="Gujarat">Gujarat (GIDC Vadodara / Limda)</option>
                  <option value="Haryana">Haryana (HSIIDC Rohtak)</option>
                  <option value="Karnataka">Karnataka (KIADB Toranagallu)</option>
                  <option value="Uttar Pradesh">Uttar Pradesh (UPSIDC Rania / Greater Noida)</option>
                  <option value="Rajasthan">Rajasthan (RIICO Phagi Jaipur)</option>
                  <option value="Delhi NCR">Delhi NCR (Ecotech)</option>
                  <option value="Odisha">Odisha (Kalinganagar Jajpur)</option>
                  <option value="Chhattisgarh">Chhattisgarh (BALCO Korba)</option>
                  <option value="Himachal Pradesh">Himachal Pradesh (Darlaghat)</option>
                  <option value="Uttarakhand">Uttarakhand (Lalkuan)</option>
                  <option value="West Bengal">West Bengal (Haldia Port)</option>
                </select>
              </div>
            </div>

            {/* Quick Filter Presets */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Quick Sector & Capacity Presets:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setSelectedSectorFilter("Secondary Metallurgy & Non-Ferrous Smelting");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                    selectedSectorFilter === "Secondary Metallurgy & Non-Ferrous Smelting"
                      ? "bg-[#00E676] text-[#0B0F13] border-[#00C853]"
                      : "bg-[#1E2630] text-slate-300 border-slate-700 hover:text-white"
                  }`}
                >
                  ⚡ Non-Ferrous Smelters (Hindalco, BALCO, Gravita)
                </button>

                <button
                  onClick={() => {
                    setSelectedSectorFilter("Secondary Metallurgy & Ferrous Steel");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                    selectedSectorFilter === "Secondary Metallurgy & Ferrous Steel"
                      ? "bg-[#00E676] text-[#0B0F13] border-[#00C853]"
                      : "bg-[#1E2630] text-slate-300 border-slate-700 hover:text-white"
                  }`}
                >
                  🔩 Steel & EAF Furnaces (Tata Steel, JSW, Jindal)
                </button>

                <button
                  onClick={() => {
                    setSelectedSectorFilter("Petrochemicals & Circular Polymers");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                    selectedSectorFilter === "Petrochemicals & Circular Polymers"
                      ? "bg-[#00E676] text-[#0B0F13] border-[#00C853]"
                      : "bg-[#1E2630] text-slate-300 border-slate-700 hover:text-white"
                  }`}
                >
                  ♻️ Circular Polymers & rPET (Reliance, Ganesha)
                </button>

                <button
                  onClick={() => {
                    setSelectedProximityFilter("50");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                    selectedProximityFilter === "50"
                      ? "bg-[#00E676] text-[#0B0F13] border-[#00C853]"
                      : "bg-[#1E2630] text-slate-300 border-slate-700 hover:text-white"
                  }`}
                >
                  📍 Nearby Short Radius (≤ 50 km)
                </button>

                <button
                  onClick={() => {
                    setSelectedCapacityFilter("1000000");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                    selectedCapacityFilter === "1000000"
                      ? "bg-[#00E676] text-[#0B0F13] border-[#00C853]"
                      : "bg-[#1E2630] text-slate-300 border-slate-700 hover:text-white"
                  }`}
                >
                  🏢 Mega Plants (≥ 1,000,000 MT/yr)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Filter Badges Bar */}
        {activeFiltersCount > 0 && (
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs border-t border-slate-800">
            <span className="text-slate-500 font-bold">Active Criteria:</span>
            
            {directorySearch && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1E2630] text-slate-200 border border-slate-700 font-medium">
                <span>Keyword: "{directorySearch}"</span>
                <button onClick={() => setDirectorySearch("")} className="text-slate-400 hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedSectorFilter !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30 font-bold">
                <Factory className="w-3 h-3" />
                <span>Sector: {selectedSectorFilter}</span>
                <button onClick={() => setSelectedSectorFilter("all")} className="hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedProximityFilter !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-500/15 text-[#FF6D00] border border-orange-500/30 font-bold">
                <MapPin className="w-3 h-3" />
                <span>Proximity: ≤ {selectedProximityFilter} km</span>
                <button onClick={() => setSelectedProximityFilter("all")} className="hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCapacityFilter !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold">
                <Scale className="w-3 h-3" />
                <span>Capacity: ≥ {parseInt(selectedCapacityFilter).toLocaleString("en-IN")} MT/yr</span>
                <button onClick={() => setSelectedCapacityFilter("all")} className="hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedCategoryFilter !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-500/30 font-bold">
                <Layers className="w-3 h-3" />
                <span>Category: {selectedCategoryFilter}</span>
                <button onClick={() => setSelectedCategoryFilter("all")} className="hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {selectedStateFilter !== "all" && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/15 text-purple-300 border border-purple-500/30 font-bold">
                <MapPin className="w-3 h-3" />
                <span>State: {selectedStateFilter}</span>
                <button onClick={() => setSelectedStateFilter("all")} className="hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="text-[#FF6D00] hover:underline font-bold ml-1 cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* VIEW TAB 1: Live Matches for logged scrap */}
      {activeViewTab === "live_matches" && (
        <div className="space-y-6">
          {filteredMatches.length > 0 ? (
            <div className="space-y-6">
              {filteredMatches.map((match) => {
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
                      <div className="absolute top-4 left-4 flex items-center gap-2 flex-wrap">
                        <span className="px-3.5 py-1.5 rounded-xl bg-[#00E676] text-[#0B0F13] font-extrabold text-sm flex items-center gap-1.5 shadow-md shadow-[#00E676]/30 border border-[#00C853]">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          {match.matchScore}% Match Fit
                        </span>
                        <span className="px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md text-white font-mono font-bold text-sm border border-white/20 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#FF6D00]" />
                          {match.distanceKm} km transit
                        </span>
                        {match.industrySector && (
                          <span className="hidden sm:inline-flex px-3 py-1 rounded-xl bg-[#1E2630]/90 backdrop-blur-md text-slate-200 font-bold text-xs border border-slate-600 items-center gap-1">
                            <Factory className="w-3 h-3 text-[#00E676]" />
                            {match.industrySector}
                          </span>
                        )}
                      </div>

                      {/* Clean Environment Badge on Right */}
                      <div className="absolute top-4 right-4 hidden sm:flex items-center gap-2">
                        <div className="px-3.5 py-1.5 rounded-xl bg-[#1E2630]/80 backdrop-blur-md text-[#00E676] border border-[#00E676]/30 text-sm font-semibold flex items-center gap-1.5 shadow-md">
                          <Leaf className="w-3.5 h-3.5" />
                          <span>{match.cleanEnvStat || "100% Circular Feedstock"}</span>
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
                            <div className="flex items-center gap-2">
                              <h3 className="text-xl sm:text-xl font-extrabold text-white leading-tight">
                                {match.buyerOrg}
                              </h3>
                              <span className="px-2 py-0.5 rounded-md bg-[#00E676]/20 text-[#00E676] text-xs font-bold border border-[#00E676]/30">
                                Verified
                              </span>
                            </div>
                            <p className="text-sm text-slate-300 flex items-center gap-1.5 flex-wrap">
                              <span className="text-[#00E676] font-medium">{match.buyerType}</span>
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

                      {/* Regulatory & Circular Outcome Strip */}
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#1E2630] via-[#12181F] to-[#1E2630] border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-xl bg-[#00E676]/20 text-[#00E676] flex items-center justify-center shrink-0 border border-[#00E676]/30">
                            <TreeDeciduous className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-extrabold text-slate-300">Circular Application: </span>
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
                          <span>Authorized SPCB Exchange</span>
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            onClick={() => handleOpenInquiryModal(match)}
                            className="px-4 py-2.5 rounded-2xl bg-[#1E2630] hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-sm transition cursor-pointer border border-slate-600"
                          >
                            Simulate Rate & Lorry
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
                  <Users2 className="w-8 h-8 text-[#00E676]" />
                </div>
                <div className="max-w-md mx-auto space-y-1.5">
                  <h3 className="text-xl font-extrabold text-white">
                    {matches.length > 0
                      ? "No Active Matches Fit Your Selected Filter Criteria"
                      : "No Active Matches for Current Local Batches"}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {matches.length > 0
                      ? "Try loosening your proximity, capacity, or industry sector filters to discover more matching plants."
                      : "Log a material lot or take an AI camera scan to generate instant matchmaking. You can also explore our directory of verified real-world Indian secondary manufacturing plants below!"}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={handleResetFilters}
                      className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-sm transition cursor-pointer border border-slate-600 flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4 text-[#FF6D00]" />
                      <span>Clear Active Filters</span>
                    </button>
                  )}
                  <button
                    onClick={() => setActiveViewTab("buyer_directory")}
                    className="px-6 py-3 rounded-2xl bg-[#00E676] hover:bg-[#00C853] text-[#0B0F13] font-extrabold text-sm transition cursor-pointer shadow-sm shadow-[#00E676]/20"
                  >
                    Explore All-India Real Buyer Plants Directory ({INDIAN_BUYERS_DIRECTORY.length} Plants) →
                  </button>
                </div>
              </div>

              {/* 3-Step Educational Guide */}
              <div className="bg-[#12181F] p-6 sm:p-8 rounded-3xl border border-slate-700 space-y-4 shadow-xs">
                <h4 className="font-extrabold text-base text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#00E676]" />
                  How CIRCULUS Real-World Buyer Matching Works:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="bg-[#1E2630] p-4 rounded-2xl border border-slate-700 space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#00E676] text-[#0B0F13] font-bold flex items-center justify-center text-sm">1</span>
                    <p className="font-bold text-white">Real Industrial Corridors</p>
                    <p className="text-slate-400 text-sm">Calculates road freight to real industrial estates (MIDC, GIDC, HSIIDC, RIICO, KIADB) across India.</p>
                  </div>
                  <div className="bg-[#1E2630] p-4 rounded-2xl border border-slate-700 space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#00E676] text-[#0B0F13] font-bold flex items-center justify-center text-sm">2</span>
                    <p className="font-bold text-white">Furnace Metallurgy Match</p>
                    <p className="text-slate-400 text-sm">Pairs specific scrap alloy specs with actual furnace inputs (EAF, Induction, SSP, Rotary converters).</p>
                  </div>
                  <div className="bg-[#1E2630] p-4 rounded-2xl border border-slate-700 space-y-1.5">
                    <span className="w-6 h-6 rounded-full bg-[#00E676] text-[#0B0F13] font-bold flex items-center justify-center text-sm">3</span>
                    <p className="font-bold text-white">Direct Enterprise Settlement</p>
                    <p className="text-slate-400 text-sm">Bypasses middleman cuts, generating compliant GST e-Way bills and BRSR circularity credits.</p>
                  </div>
                </div>
              </div>

              {/* Sample Real-World Verified Buyers Preview Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-slate-400 px-1">
                  <span className="font-bold uppercase tracking-wider text-xs text-slate-500">Sample Verified Industrial Consumers in Network</span>
                  <span className="text-[#00E676] text-xs font-mono">100% Real-World Existing Plants</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {INDIAN_BUYERS_DIRECTORY.slice(0, 4).map((b) => (
                    <div 
                      key={b.id} 
                      onClick={() => handleOpenInquiryModal(b)}
                      className="bg-[#12181F] rounded-2xl border border-slate-700 hover:border-[#00E676]/60 p-5 space-y-3 cursor-pointer transition"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-lg bg-[#00E676]/10 text-[#00E676] font-bold text-xs border border-[#00E676]/20">
                          {b.corporateGroup}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">📍 {b.distanceKm} km • {b.city}, {b.state}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-white">{b.name}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{b.type}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-800 font-mono">
                        <span className="text-emerald-400 font-bold">{b.industrySector}</span>
                        <span className="text-[#00E676] font-bold">Connect →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW TAB 2: All-India Verified Scrap Buyer Directory */}
      {activeViewTab === "buyer_directory" && (
        <div className="space-y-6">
          
          {/* Status Header */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-mono text-sm text-slate-300">
              Showing <strong className="text-[#00E676]">{filteredDirectoryBuyers.length}</strong> of {INDIAN_BUYERS_DIRECTORY.length} verified real-world plants
            </span>
            <span className="text-[#00E676] font-semibold hidden sm:flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Direct procurement access with 100% CPCB/SPCB authorizations
            </span>
          </div>

          {filteredDirectoryBuyers.length === 0 ? (
            <div className="bg-[#12181F] p-8 sm:p-12 rounded-3xl border border-slate-700 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-3xl bg-[#1E2630] text-slate-400 border border-slate-600 flex items-center justify-center mx-auto shadow-inner">
                <Search className="w-8 h-8 text-[#FF6D00]" />
              </div>
              <div className="max-w-md mx-auto space-y-1.5">
                <h3 className="text-xl font-extrabold text-white">No Buyers Found Matching Current Filters</h3>
                <p className="text-sm text-slate-400">
                  Try adjusting your proximity radius, annual capacity threshold, or sector filter to see more real-world industrial consumers.
                </p>
              </div>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-2xl bg-[#00E676] hover:bg-[#00C853] text-[#0B0F13] font-extrabold text-sm transition cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            /* Grid of Verified Real-World Buyer Plants */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDirectoryBuyers.map((buyer) => (
                <div
                  key={buyer.id}
                  className="bg-[#12181F] rounded-3xl border border-slate-700 hover:border-[#00E676] transition duration-300 overflow-hidden shadow-xs hover:shadow-lg hover:shadow-[#00E676]/10 flex flex-col justify-between group"
                >
                  {/* Header Image with Blur Layer */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={buyer.facilityImageUrl}
                      alt={buyer.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12181F] via-[#12181F]/40 to-transparent"></div>

                    {/* Corporate Group & Real Verification Chip */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                      <span className="px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md text-white text-xs font-extrabold border border-white/20">
                        {buyer.corporateGroup}
                      </span>
                      <span className="px-2.5 py-1 rounded-xl bg-[#00E676]/20 backdrop-blur-md text-[#00E676] text-xs font-bold border border-[#00E676]/40 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified Real Plant
                      </span>
                    </div>

                    {/* Clean Environment Chip */}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-xl bg-[#1E2630]/85 backdrop-blur-md text-[#00E676] text-xs font-bold border border-[#00E676]/30 flex items-center gap-1 shadow-md">
                        <Leaf className="w-3 h-3 text-[#00E676]" />
                        <span>{buyer.cleanEnvStat}</span>
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
                      <img
                        src={buyer.buyerAvatar}
                        alt={buyer.name}
                        className="w-11 h-11 rounded-xl object-cover border-2 border-slate-700 bg-[#0B0F13] shadow-sm shrink-0"
                      />
                      <div className="truncate">
                        <h4 className="text-white font-extrabold text-lg truncate">{buyer.name}</h4>
                        <p className="text-[#00E676] text-xs font-medium truncate">📍 {buyer.industrialZone} • {buyer.city}, {buyer.state}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3 text-sm">
                      
                      {/* Sector & Proximity Badges */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-1 rounded-lg bg-[#00E676]/10 text-[#00E676] text-xs font-bold border border-[#00E676]/20 flex items-center gap-1">
                          <Factory className="w-3 h-3" />
                          <span>{buyer.industrySector}</span>
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-orange-500/10 text-[#FF6D00] text-xs font-bold border border-orange-500/20 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{buyer.distanceKm} km Transit</span>
                        </span>
                      </div>

                      <div>
                        <span className="text-xs text-slate-500 uppercase font-bold">Plant Operations:</span>
                        <p className="text-white font-medium">{buyer.type}</p>
                      </div>

                      <div className="bg-[#1E2630] p-3 rounded-xl border border-slate-700 space-y-1.5">
                        <span className="text-xs text-slate-500 uppercase font-bold">Melting / Processing Line:</span>
                        <p className="text-slate-300 font-medium text-xs leading-relaxed">{buyer.targetFurnaceType}</p>
                      </div>

                      {/* Verified Credentials Grid */}
                      <div className="grid grid-cols-2 gap-2 text-xs bg-[#0B0F13] p-2.5 rounded-xl border border-slate-800 font-mono">
                        <div>
                          <span className="text-slate-500 block">GSTIN:</span>
                          <span className="text-slate-300 font-bold">{buyer.gstin}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Annual Capacity:</span>
                          <span className="text-[#00E676] font-bold">{buyer.annualRecyclingCapacityMT.toLocaleString("en-IN")} MT/yr</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">CPCB / SPCB Auth:</span>
                          <span className="text-slate-400 truncate block" title={buyer.cpcbAuthNumber}>{buyer.cpcbAuthNumber}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Procurement Lot:</span>
                          <span className="text-slate-300 font-bold">~{buyer.typicalLotCapacityMT} MT per dispatch</span>
                        </div>
                      </div>

                      {/* Certifications row */}
                      <div className="flex items-center gap-1.5 flex-wrap pt-1">
                        {buyer.certifications.map((c, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] font-mono border border-slate-700">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleOpenInquiryModal(buyer)}
                      className="w-full py-2.5 rounded-xl bg-[#1E2630] hover:bg-[#00E676] hover:text-[#0B0F13] border border-slate-600 text-white font-bold text-sm transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm group/btn mt-2"
                    >
                      <span>Connect with {buyer.name.split(" ")[0]} Procurement</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Interactive Quotation & Route Simulation Modal */}
      {selectedBuyerForModal && (
        <div className="fixed inset-0 z-50 bg-[#0B0F13]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto overscroll-contain">
          <div className="bg-[#12181F] rounded-3xl border border-slate-700 max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative my-8 animate-fadeIn">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs uppercase font-bold px-2.5 py-0.5 rounded-lg bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30">
                  REAL-WORLD INDUSTRIAL DISPATCH
                </span>
                <h2 className="text-xl font-extrabold text-white mt-1 font-display">
                  {"buyerOrg" in selectedBuyerForModal ? selectedBuyerForModal.buyerOrg : selectedBuyerForModal.name}
                </h2>
                <p className="text-sm text-slate-400">
                  {"industrialZone" in selectedBuyerForModal && selectedBuyerForModal.industrialZone ? `${selectedBuyerForModal.industrialZone} • ` : ""}
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
                <p className="font-bold text-[#00E676]">Circular Environment Impact</p>
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
                  <p className="text-slate-500 text-xs font-mono">Estimated Lorry Turnaround</p>
                  <p className="font-extrabold text-white font-mono">18 to 24 Hours Transit</p>
                </div>
                <div className="text-right">
                  <p className="text-slate-500 text-xs font-mono">SPCB Tracking</p>
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
                    <span>Inquiry Transmitted to Procurement Division!</span>
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


