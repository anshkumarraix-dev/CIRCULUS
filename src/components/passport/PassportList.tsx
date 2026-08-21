import React, { useState } from "react";
import { 
  Layers, 
  Search, 
  Plus, 
  ShieldCheck, 
  MapPin, 
  ArrowRight,
  Leaf,
  Camera
} from "lucide-react";
import { MaterialPassport } from "../../types";
import { formatInrCurrency } from "../../lib/valuation-engine";

interface PassportListProps {
  passports: MaterialPassport[];
  onSelectPassport: (passportId: string) => void;
  onNavigateToScanner: () => void;
}

export const PassportList: React.FC<PassportListProps> = ({
  passports,
  onSelectPassport,
  onNavigateToScanner,
}) => {
  const [search, setSearch] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const filtered = passports.filter((p) => {
    const matchesSearch =
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.ownerOrg.toLowerCase().includes(search.toLowerCase()) ||
      p.locationCity.toLowerCase().includes(search.toLowerCase()) ||
      p.locationState.toLowerCase().includes(search.toLowerCase()) ||
      p.hsnCode.includes(search);

    const matchesCat = filterCategory === "all" || p.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner with Material Classification & Recycling Yard Photography */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 border border-[#00E676]/30 bg-gradient-to-r from-[#00E676]/10 via-[#12181F] to-[#1E2630] text-white shadow-md">
        <img
          src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1600&q=80"
          alt="Recycling Yard & Material Passports"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20 pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/30 text-sm font-bold">
              <Layers className="w-4 h-4 text-[#00E676]" />
              Product Aadhaar Directory
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Digital Identity Cards for All Scrap Lots
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
              Every batch of recycled material gets its own digital Aadhaar ID card. It shows who made it, how clean it is, what new items can be made from it, and has a scannable QR code for trucks.
            </p>
          </div>

          <button
            onClick={onNavigateToScanner}
            className="px-5 py-3 rounded-2xl bg-[#00E676] hover:bg-[#00C853] text-[#0B0F13] font-extrabold text-sm flex items-center gap-2 transition cursor-pointer shadow-md shadow-[#00E676]/20 shrink-0 border border-[#00C853]"
          >
            <Camera className="w-4 h-4 stroke-[2.5]" />
            <span>Scan Photo to Create ID Card</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="bg-[#12181F] p-5 rounded-3xl border border-slate-700 flex flex-col sm:flex-row gap-3 items-center justify-between shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name, factory, city, or ID (e.g. Aluminium, Pune, CUS-AL)..."
            className="w-full bg-[#1E2630] border border-slate-600 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:border-[#00E676] focus:bg-[#1E2630]/80 focus:outline-none font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="bg-[#1E2630] border border-slate-600 rounded-xl px-3 py-2.5 text-sm text-slate-300 focus:border-[#00E676] focus:bg-[#1E2630]/80 focus:outline-none cursor-pointer font-semibold"
          >
            <option value="all">All Materials</option>
            <option value="non_ferrous">Aluminium & Copper</option>
            <option value="plastic">Recycled Plastic</option>
            <option value="ferrous">Steel & Iron</option>
            <option value="fly_ash">Power Plant Ash</option>
            <option value="construction_demolition">Crushed Gravel</option>
            <option value="slag">Slag Sand</option>
            <option value="wood">Brown Cardboard</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((passport) => (
            <div
              key={passport.id}
              onClick={() => onSelectPassport(passport.id)}
              className="bg-[#12181F] rounded-3xl border border-slate-700 hover:border-[#00E676] hover:shadow-lg hover:shadow-[#00E676]/10 transition duration-300 overflow-hidden flex flex-col justify-between shadow-xs cursor-pointer group"
            >
              {/* Image & Badges */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1E2630]">
                <img
                  src={passport.imageUrl}
                  alt={passport.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-xl bg-[#12181F]/95 backdrop-blur-md text-slate-300 font-mono text-xs font-bold border border-slate-700 shadow-xs">
                    {passport.id}
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-[#00E676]/20 backdrop-blur-md text-[#00E676] text-xs font-bold border border-[#00E676]/30 shadow-xs flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    Verified
                  </span>
                </div>

                <div className="absolute bottom-3 right-3 bg-[#00E676] text-[#0B0F13] px-2.5 py-1 rounded-xl text-sm font-extrabold shadow-md">
                  {passport.reusabilityScore}% Clean
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase truncate">{passport.ownerOrg}</p>
                  <h3 className="text-lg font-extrabold text-white group-hover:text-[#00E676] transition mt-0.5 leading-snug tracking-tight">
                    {passport.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {passport.locationCity}, {passport.locationState}
                  </p>
                </div>

                {/* Stats Box */}
                <div className="bg-[#1E2630] p-3.5 rounded-2xl border border-slate-700 space-y-1.5 text-sm">
                  <div className="flex justify-between text-slate-400">
                    <span>Weight Available:</span>
                    <span className="text-white font-bold">{passport.quantityMT} Tons</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Estimated Total Value:</span>
                    <span className="text-white font-bold font-mono">
                      {formatInrCurrency(passport.valuation.estimatedTotalInr, true)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-700">
                    <span className="flex items-center gap-1 text-[#00E676] font-semibold">
                      <Leaf className="w-3.5 h-3.5" /> Smoke Saved:
                    </span>
                    <span className="text-[#00E676] font-bold">
                      {(passport.carbonImpact.co2eAvoidedKg / 1000).toFixed(1)} t CO₂
                    </span>
                  </div>
                </div>

                {/* View Button */}
                <div className="pt-1 flex items-center justify-between text-sm font-bold text-slate-300 group-hover:text-[#00E676] transition-colors">
                  <span>Open Product ID Card & QR Tag</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-[#12181F] p-8 sm:p-12 rounded-3xl border border-slate-700 text-center space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-3xl bg-accent-cyan/10 text-accent-cyan flex items-center justify-center mx-auto">
              <Layers className="w-7 h-7" />
            </div>
            <p className="text-lg font-extrabold text-white">No Digital Scrap Aadhaar Cards Found</p>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Upload or scan a photo of your factory scrap batch to mint a new Digital Aadhaar identity card with verifiable QR code.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={onNavigateToScanner}
                className="px-5 py-2.5 rounded-2xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-sm font-bold transition flex items-center gap-2 cursor-pointer shadow-sm shadow-[#1B4332]/20"
              >
                <Camera className="w-4 h-4" />
                <span>Scan Photo to Create First ID Card</span>
              </button>
            </div>
          </div>

          {/* 3-Step Educational Guide */}
          <div className="bg-[#12181F] p-6 sm:p-8 rounded-3xl border border-slate-700 space-y-4 shadow-xs">
            <h4 className="font-extrabold text-base text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              How Digital Aadhaar Cards Function (3 Step Workflow):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-700/80 space-y-1.5">
                <span className="w-6 h-6 rounded-full bg-[#1B4332] text-white font-bold flex items-center justify-center text-sm">1</span>
                <p className="font-bold text-white">AI Spectral Purity Test</p>
                <p className="text-slate-500 text-sm">Gemini Vision analyzes scrap surface, alloy grade (6063, 304, rPET), and contamination percentage.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-700/80 space-y-1.5">
                <span className="w-6 h-6 rounded-full bg-[#1B4332] text-white font-bold flex items-center justify-center text-sm">2</span>
                <p className="font-bold text-white">QR Code Minting</p>
                <p className="text-slate-500 text-sm">A unique tamper-evident Digital Aadhaar card is minted with CPCB compliance tags and valuation.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-700/80 space-y-1.5">
                <span className="w-6 h-6 rounded-full bg-[#1B4332] text-white font-bold flex items-center justify-center text-sm">3</span>
                <p className="font-bold text-white">Verified Marketplace Broadcast</p>
                <p className="text-slate-500 text-sm">Certified batches are broadcast directly to registered recyclers and secondary smelters.</p>
              </div>
            </div>
          </div>

          {/* Ghost Preview Cards at 40% opacity */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 opacity-40 select-none pointer-events-none">
            <div className="bg-[#12181F] rounded-3xl border border-dashed border-slate-600 p-5 space-y-3">
              <div className="h-36 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-400 font-mono text-sm">
                [GHOST SAMPLE: 6063 Extrusions]
              </div>
              <p className="font-bold text-sm text-slate-400">Sample: Clean Extrusion Aluminium Scrap</p>
              <div className="flex justify-between text-sm text-slate-500 pt-2 border-t border-slate-700">
                <span>Weight: 18.5 MT</span>
                <span>Purity: 97.4%</span>
              </div>
            </div>
            <div className="bg-[#12181F] rounded-3xl border border-dashed border-slate-600 p-5 space-y-3">
              <div className="h-36 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-400 font-mono text-sm">
                [GHOST SAMPLE: rPET Flakes]
              </div>
              <p className="font-bold text-sm text-slate-400">Sample: Washed Industrial Bottle Flakes</p>
              <div className="flex justify-between text-sm text-slate-500 pt-2 border-t border-slate-700">
                <span>Weight: 24.0 MT</span>
                <span>Purity: 99.1%</span>
              </div>
            </div>
            <div className="bg-[#12181F] rounded-3xl border border-dashed border-slate-600 p-5 space-y-3">
              <div className="h-36 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-400 font-mono text-sm">
                [GHOST SAMPLE: Heavy Melting Steel]
              </div>
              <p className="font-bold text-sm text-slate-400">Sample: HMS 1 & 2 Structural Steel</p>
              <div className="flex justify-between text-sm text-slate-500 pt-2 border-t border-slate-700">
                <span>Weight: 35.0 MT</span>
                <span>Purity: 94.0%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
