import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { 
  BarChart3, 
  Leaf, 
  IndianRupee, 
  TrendingUp, 
  Download, 
  FileCheck2, 
  Layers, 
  Sparkles, 
  CheckCircle2, 
  Info,
  ShieldCheck,
  TreeDeciduous,
  Factory,
  Droplets,
  Wind,
  Sun,
  Sliders,
  RotateCcw
} from "lucide-react";
import { MaterialPassport, BRSRReportSummary } from "../../types";
import { generateBRSRReport, INDIA_CCTS_CARBON_PRICE_INR_PER_TCO2E } from "../../lib/carbon-engine";
import { formatInrCurrency } from "../../lib/valuation-engine";

interface ImpactAnalyticsDashboardProps {
  passports: MaterialPassport[];
}

export const ImpactAnalyticsDashboard: React.FC<ImpactAnalyticsDashboardProps> = ({ passports }) => {
  const [carbonPriceInr, setCarbonPriceInr] = useState<number>(INDIA_CCTS_CARBON_PRICE_INR_PER_TCO2E);
  const [showBrsrModal, setShowBrsrModal] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  // Interactive Clean Environment Simulator state
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [simulatedTons, setSimulatedTons] = useState<number>(passports.reduce((sum, p) => sum + p.quantityMT, 0) || 50);
  const [simulatedCategory, setSimulatedCategory] = useState<"aluminium" | "plastic" | "steel" | "flyash">("aluminium");

  const toggleTooltip = (key: string) => {
    setActiveTooltip(activeTooltip === key ? null : key);
  };

  const brsrReport = generateBRSRReport(passports);

  const totalDivertedMT = passports.reduce((sum, p) => sum + p.quantityMT, 0);
  const totalCo2eAvoidedKg = passports.reduce((sum, p) => sum + p.carbonImpact.co2eAvoidedKg, 0);
  const totalCo2eAvoidedTonnes = totalCo2eAvoidedKg / 1000;
  const totalValueInr = passports.reduce((sum, p) => sum + p.valuation.estimatedTotalInr, 0);
  const treesEquivalent = Math.round(totalCo2eAvoidedKg / 60);

  // Dynamic simulation calculations
  const simMultiplier = simulatedCategory === "aluminium" ? 9.2 : simulatedCategory === "plastic" ? 2.3 : simulatedCategory === "steel" ? 1.8 : 0.8;
  const simCo2AvoidedTonnes = simulatedTons * simMultiplier;
  const simTrees = Math.round(simCo2AvoidedTonnes * 16.6);
  const simWaterLiters = Math.round(simulatedTons * 14200);
  const simCoalHours = Math.round(simulatedTons * 48);
  const simLandfillAreaSqM = Math.round(simulatedTons * 3.4);

  const handleDownloadBrsrJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(brsrReport, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `CIRCULUS-Green-Report-FY26.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="space-y-8">
      
      {/* Dynamic Visual Banner with Clean Environment Photography & Backdrop Blur */}
      <div className="relative rounded-3xl overflow-hidden border border-[#00E676]/30 bg-gradient-to-r from-[#12181F] via-[#1E2630] to-[#0B0F13] text-ink p-6 sm:p-10 shadow-lg">
        
        {/* Lush Greenery Photography with Ambient Blur & Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 scale-105 blur-xs mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80')`
          }}
        ></div>

        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00E676]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#00E676]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E676]/10 backdrop-blur-md border border-[#00E676]/30 text-sm font-semibold text-[#00E676]">
              <Leaf className="w-3.5 h-3.5" />
              <span>Real Environmental & Climate Impact</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ink font-display">
              Preserving India's Air, Rivers, and Forests
            </h1>
            <p className="text-sm sm:text-base text-silver leading-relaxed max-w-xl">
              By reusing industrial scrap locally, secondary factories eliminate coal kiln smoke, reduce landfill waste, and protect natural water reservoirs.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              id="btn-export-brsr-report"
              onClick={() => setShowBrsrModal(true)}
              className="px-5 py-3 rounded-2xl bg-[#00E676] hover:bg-[#00C853] text-[#0B0F13] font-extrabold text-sm flex items-center gap-2 transition cursor-pointer shadow-md shadow-[#00E676]/20 border border-[#00C853]"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Download Sustainability Audit</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Big Simple Metric Cards with Soft Glassmorphic Touches & Methodology Tooltips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Scrap Saved from Dumps */}
        <div className="bg-panel p-6 rounded-3xl border border-white/10 shadow-xs hover:border-[#00E676]/50 transition duration-300 relative">
          <div className="flex items-center justify-between">
            <p className="text-sm text-silver/80 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Factory className="w-4 h-4 text-[#00E676]" />
              Scrap Kept Out of Dumps
            </p>
            <button
              onClick={() => toggleTooltip("landfill")}
              className="p-1 rounded-lg text-slate-500 hover:text-[#00E676] hover:bg-[#1E2630] transition cursor-pointer"
              title="View Calculation Methodology"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-3xl font-extrabold text-ink font-mono mt-2">
            {totalDivertedMT.toFixed(1)} <span className="text-xl text-[#00E676]">Tons</span>
          </p>
          <p className="text-sm text-silver/80 mt-1">({(totalDivertedMT * 1000).toLocaleString("en-IN")} kg recycled)</p>
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-sm text-slate-500">
            <span>Landfills avoided</span>
            <span className="text-[#00E676] font-bold">100% Recycled</span>
          </div>

          {activeTooltip === "landfill" && (
            <div className="absolute inset-x-3 top-full mt-2 z-30 p-3.5 rounded-2xl bg-[#0B0F13] text-ink text-sm space-y-1.5 shadow-xl border border-[#00E676]/30 animate-fadeIn">
              <p className="font-bold text-[#00E676]">Methodology: Landfill Diversion</p>
              <p className="text-silver">
                Formula: Physical gross weight (MT) redirected from open municipal landfill dumps (Pirana, Gazipur, Deonar) to certified secondary remelting plants under CPCB Solid Waste Management Rules 2016.
              </p>
            </div>
          )}
        </div>

        {/* Metric 2: Smoke Saved (CO2) */}
        <div className="bg-panel p-6 rounded-3xl border border-white/10 shadow-xs hover:border-[#00E676]/50 transition duration-300 relative">
          <div className="flex items-center justify-between">
            <p className="text-sm text-silver/80 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-[#00E676]" />
              Air Smoke Prevented (CO₂)
            </p>
            <button
              onClick={() => toggleTooltip("co2")}
              className="p-1 rounded-lg text-slate-500 hover:text-[#00E676] hover:bg-[#1E2630] transition cursor-pointer"
              title="View Carbon Calculation Methodology"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-3xl font-extrabold text-[#00E676] font-mono mt-2">
            {totalCo2eAvoidedTonnes.toFixed(1)} <span className="text-xl text-[#00E676]/80">Tons</span>
          </p>
          <p className="text-sm text-silver/80 mt-1">Verified greenhouse gas mitigation</p>
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-sm text-slate-500">
            <span>Clean air saved</span>
            <span className="text-[#00E676] font-bold">GHG Protocol</span>
          </div>

          {activeTooltip === "co2" && (
            <div className="absolute inset-x-3 top-full mt-2 z-30 p-3.5 rounded-2xl bg-[#0B0F13] text-ink text-sm space-y-1.5 shadow-xl border border-[#00E676]/30 animate-fadeIn">
              <p className="font-bold text-[#00E676]">Methodology: Avoided CO₂ Emissions</p>
              <p className="text-silver">
                Formula: (Virgin Smelting Emission Baseline − Secondary Remelting Energy Factor) × Tonnage. Secondary aluminium saves 9.2 t CO₂e/MT, rPET saves 2.3 t CO₂e/MT, scrap steel saves 1.8 t CO₂e/MT (BEE CCTS & IPCC Scope 1 & 3 baselines).
              </p>
            </div>
          )}
        </div>

        {/* Metric 3: Trees Equivalent */}
        <div className="bg-panel p-6 rounded-3xl border border-white/10 shadow-xs hover:border-[#00E676]/50 transition duration-300 relative">
          <div className="flex items-center justify-between">
            <p className="text-sm text-silver/80 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <TreeDeciduous className="w-4 h-4 text-[#00E676]" />
              Tree Planting Equivalent
            </p>
            <button
              onClick={() => toggleTooltip("trees")}
              className="p-1 rounded-lg text-slate-500 hover:text-[#00E676] hover:bg-[#1E2630] transition cursor-pointer"
              title="View Tree Equivalence Methodology"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-3xl font-extrabold text-[#00E676] font-mono mt-2">
            {treesEquivalent.toLocaleString("en-IN")} <span className="text-xl text-[#00E676]/80">Trees</span>
          </p>
          <p className="text-sm text-silver/80 mt-1">Equivalent carbon absorption forest</p>
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-sm text-slate-500">
            <span>Nature balance</span>
            <span className="text-[#00E676] font-bold">🌱 High Positive</span>
          </div>

          {activeTooltip === "trees" && (
            <div className="absolute inset-x-3 top-full mt-2 z-30 p-3.5 rounded-2xl bg-[#0B0F13] text-ink text-sm space-y-1.5 shadow-xl border border-[#00E676]/30 animate-fadeIn">
              <p className="font-bold text-[#00E676]">Methodology: Forest Equivalence</p>
              <p className="text-silver">
                Formula: Avoided CO₂e (kg) ÷ 60 kg/tree. Based on CPCB urban forestry standards: 1 mature tree absorbs approximately 60 kg of CO₂ over a 10-year growth lifecycle.
              </p>
            </div>
          )}
        </div>

        {/* Metric 4: Total Value Unlocked */}
        <div className="bg-panel p-6 rounded-3xl border border-white/10 shadow-xs hover:border-[#00E676]/50 transition duration-300 relative">
          <div className="flex items-center justify-between">
            <p className="text-sm text-silver/80 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <IndianRupee className="w-4 h-4 text-silver" />
              Scrap Money Realized
            </p>
            <button
              onClick={() => toggleTooltip("valuation")}
              className="p-1 rounded-lg text-slate-500 hover:text-[#00E676] hover:bg-[#1E2630] transition cursor-pointer"
              title="View Valuation Methodology"
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-3xl font-extrabold text-ink font-mono mt-2">
            {formatInrCurrency(totalValueInr, true)}
          </p>
          <p className="text-sm text-silver/80 mt-1">Directly paid to source industries</p>
          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-sm text-slate-500">
            <span>Fair Indian Rupee rates</span>
            <span className="text-[#00E676] font-bold">Zero Broker Cuts</span>
          </div>

          {activeTooltip === "valuation" && (
            <div className="absolute inset-x-3 top-full mt-2 z-30 p-3.5 rounded-2xl bg-[#0B0F13] text-ink text-sm space-y-1.5 shadow-xl border border-[#00E676]/30 animate-fadeIn">
              <p className="font-bold text-[#00E676]">Methodology: Valuation Index</p>
              <p className="text-silver">
                Formula: Spot Base Price × Material Purity Index − Freight Logistics. Benchmarked against Indian scrap clusters (Mandi Gobindgarh, Alang, Hazira, Peenya).
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Clean Environment Simulator */}
      <div className="relative rounded-3xl overflow-hidden border border-[#00E676]/30 bg-panel p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#00E676]/10 text-[#00E676] text-sm font-extrabold border border-[#00E676]/20">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Clean Nature Simulator
            </div>
            <h3 className="text-xl font-extrabold text-ink font-display">
              See How Much Nature You Save When Recycling Increases
            </h3>
            <p className="text-sm text-silver/80">
              Move the slider to calculate how many trees, liters of clean water, and hours of coal smoke are avoided!
            </p>
          </div>

          {/* Material Category Selector */}
          <div className="flex items-center gap-1.5 bg-[#1E2630] p-1 rounded-2xl shrink-0 border border-white/10">
            {(["aluminium", "plastic", "steel", "flyash"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSimulatedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-sm font-bold capitalize transition cursor-pointer ${
                  simulatedCategory === cat
                    ? "bg-[#00E676] text-[#0B0F13] shadow-xs"
                    : "text-silver/80 hover:text-ink"
                }`}
              >
                {cat === "flyash" ? "Fly Ash" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Range Slider */}
        <div className="bg-[#1E2630] p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-extrabold text-silver uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#00E676]" />
              Adjust Scrap Recycling Volume:
            </label>
            <span className="px-4 py-1.5 rounded-xl bg-[#00E676] text-[#0B0F13] font-mono font-extrabold text-base shadow-xs border border-[#00C853]">
              {simulatedTons} Metric Tons
            </span>
          </div>

          <input
            type="range"
            min={1}
            max={500}
            step={5}
            value={simulatedTons}
            onChange={(e) => setSimulatedTons(Number(e.target.value))}
            className="w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#00E676]"
          />

          <div className="flex justify-between text-sm text-slate-500 font-mono">
            <span>1 Ton</span>
            <span>100 Tons</span>
            <span>250 Tons</span>
            <span>500 Tons</span>
          </div>
        </div>

        {/* Dynamic Impact Result Cards with Nature Photography Backdrops */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Fresh Air Preserved */}
          <div className="relative rounded-2xl overflow-hidden p-5 border border-[#00E676]/30 bg-gradient-to-br from-[#00E676]/5 to-[#00E676]/10 backdrop-blur-md space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#00E676]/20 text-[#00E676] flex items-center justify-center shadow-xs border border-[#00E676]/30">
              <Wind className="w-4 h-4" />
            </div>
            <p className="text-2xl font-mono font-extrabold text-[#00E676]">
              {simCo2AvoidedTonnes.toFixed(1)} MT
            </p>
            <p className="text-sm font-bold text-emerald-100">Carbon Smoke Kept Out of Sky</p>
            <p className="text-sm text-emerald-200/70 leading-snug">
              Stops toxic smoke and lowers smog over industrial cities.
            </p>
          </div>

          {/* Card 2: Fresh Water Protected */}
          <div className="relative rounded-2xl overflow-hidden p-5 border border-cyan-400/30 bg-gradient-to-br from-cyan-400/5 to-blue-500/10 backdrop-blur-md space-y-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-400/20 text-cyan-400 flex items-center justify-center shadow-xs border border-cyan-400/30">
              <Droplets className="w-4 h-4" />
            </div>
            <p className="text-2xl font-mono font-extrabold text-cyan-400">
              {simWaterLiters.toLocaleString("en-IN")} L
            </p>
            <p className="text-sm font-bold text-cyan-100">Clean Water Protected</p>
            <p className="text-sm text-cyan-200/70 leading-snug">
              Eliminates the heavy acid water washing required for virgin ore mining.
            </p>
          </div>

          {/* Card 3: Trees Equivalent */}
          <div className="relative rounded-2xl overflow-hidden p-5 border border-emerald-400/30 bg-gradient-to-br from-emerald-400/5 to-teal-500/10 backdrop-blur-md space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-400/20 text-emerald-400 flex items-center justify-center shadow-xs border border-emerald-400/30">
              <TreeDeciduous className="w-4 h-4" />
            </div>
            <p className="text-2xl font-mono font-extrabold text-emerald-400">
              {simTrees.toLocaleString("en-IN")} Trees
            </p>
            <p className="text-sm font-bold text-emerald-100">Equivalent Forest Size</p>
            <p className="text-sm text-emerald-200/70 leading-snug">
              Matches the yearly air-cleaning power of a mature grove of banyan & neem trees.
            </p>
          </div>

          {/* Card 4: Coal Burning Hours Avoided */}
          <div className="relative rounded-2xl overflow-hidden p-5 border border-[#FF6D00]/30 bg-gradient-to-br from-[#FF6D00]/5 to-[#FF6D00]/10 backdrop-blur-md space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#FF6D00]/20 text-[#FF6D00] flex items-center justify-center shadow-xs border border-[#FF6D00]/30">
              <Sun className="w-4 h-4" />
            </div>
            <p className="text-2xl font-mono font-extrabold text-[#FF6D00]">
              {simCoalHours.toLocaleString("en-IN")} Hours
            </p>
            <p className="text-sm font-bold text-orange-100">Coal Kiln Hours Saved</p>
            <p className="text-sm text-orange-200/70 leading-snug">
              Electricity and coal energy avoided by melting scrap instead of rock ore.
            </p>
          </div>

        </div>
      </div>

      {/* Breakdown by Scrap Types */}
      <div className="bg-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div>
            <h3 className="text-lg font-extrabold text-ink flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00E676]" />
              Scrap Breakdown: What Was Saved & What It Becomes
            </h3>
            <p className="text-sm text-silver/80 mt-0.5">
              See the exact tons and clean air savings for every type of scrap material.
            </p>
          </div>
          <span className="text-sm font-bold text-silver bg-[#1E2630] px-3 py-1 rounded-xl border border-slate-600">
            {passports.length} Verified Batches
          </span>
        </div>

        {brsrReport.materialBreakdown.length > 0 ? (
          <div className="space-y-3">
            {brsrReport.materialBreakdown.map((item, idx) => {
              const pct = totalDivertedMT > 0 ? Math.round((item.quantityMT / totalDivertedMT) * 100) : 0;
              return (
                <div key={idx} className="bg-[#1E2630] p-4 rounded-2xl border border-white/10 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-ink text-base">{item.category}</span>
                    <span className="text-[#00E676] font-mono font-bold">
                      {(item.co2eAvoidedKg / 1000).toFixed(1)} Tons of CO₂ smoke avoided
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#00E676] h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(5, pct)}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-silver pt-0.5">
                    <span><strong className="text-ink">{item.quantityMT} Tons</strong> ({pct}% of all scrap)</span>
                    <span className="text-silver/80 font-semibold">✨ Made into: <span className="text-ink">{item.primaryReuseRoute}</span></span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-sm text-slate-500">
            No batches logged yet. Log your first scrap passport to see live category breakdowns.
          </div>
        )}
      </div>

      {/* Green Audit Modal */}
      {showBrsrModal && (
        <div className="fixed inset-0 z-50 bg-[#0B0F13]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto overscroll-contain">
          <div className="bg-panel rounded-3xl border border-white/10 max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative my-8 animate-fadeIn">
            <div className="flex items-start justify-between pb-3 border-b border-white/5">
              <div>
                <span className="text-sm uppercase font-bold px-2.5 py-0.5 rounded-lg bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30">
                  GREEN ENVIRONMENTAL AUDIT
                </span>
                <h2 className="text-xl font-extrabold text-ink mt-1.5 font-display">
                  Official Sustainability & Circularity Summary Report
                </h2>
                <p className="text-sm text-silver/80 mt-0.5">Verified scrap diversion and greenhouse gas emission prevention sheet</p>
              </div>
              <button
                onClick={() => setShowBrsrModal(false)}
                className="text-slate-500 hover:text-ink p-1.5 rounded-xl hover:bg-white/5 cursor-pointer text-sm transition"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-[#1E2630] p-4 rounded-2xl border border-white/10 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Reporting Period</p>
                  <p className="font-extrabold text-ink mt-0.5">{brsrReport.reportingPeriod}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Total Material Recycled</p>
                  <p className="font-extrabold text-ink mt-0.5">{brsrReport.totalMaterialDivertedMT} Tons</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Smoke Prevented (CO₂)</p>
                  <p className="font-extrabold text-[#00E676] mt-0.5">
                    {(brsrReport.totalCo2eAvoidedKg / 1000).toFixed(1)} Tons
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold">Trees Equivalent</p>
                  <p className="font-extrabold text-[#00E676] mt-0.5">{treesEquivalent.toLocaleString("en-IN")} Trees</p>
                </div>
              </div>

              <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#0B0F13]">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#1E2630] text-silver/80 border-b border-white/10">
                    <tr>
                      <th className="p-3 font-bold">Material</th>
                      <th className="p-3 font-bold">Weight (Tons)</th>
                      <th className="p-3 font-bold">Smoke Saved</th>
                      <th className="p-3 font-bold">What It Becomes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {brsrReport.materialBreakdown.length > 0 ? (
                      brsrReport.materialBreakdown.map((row, idx) => (
                        <tr key={idx} className="text-silver">
                          <td className="p-3 font-bold text-ink">{row.category}</td>
                          <td className="p-3 font-mono">{row.quantityMT} MT</td>
                          <td className="p-3 font-mono text-[#00E676] font-bold">{(row.co2eAvoidedKg / 1000).toFixed(1)} t</td>
                          <td className="p-3">{row.primaryReuseRoute}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-slate-500">No active batches logged yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <span className="text-sm text-slate-500 font-mono">
                {downloaded ? "✓ Report Downloaded!" : "Standard JSON format ready for audit"}
              </span>
              <button
                onClick={handleDownloadBrsrJson}
                className="px-5 py-2.5 rounded-xl bg-[#00E676] hover:bg-[#00C853] text-[#0B0F13] font-bold text-sm flex items-center gap-2 transition cursor-pointer shadow-xs border border-[#00C853]"
              >
                <Download className="w-4 h-4" />
                <span>Download Green Audit File</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
