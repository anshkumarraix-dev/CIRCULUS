import React, { useState } from "react";
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
  const [simulatedTons, setSimulatedTons] = useState<number>(passports.reduce((sum, p) => sum + p.quantityMT, 0) || 50);
  const [simulatedCategory, setSimulatedCategory] = useState<"aluminium" | "plastic" | "steel" | "flyash">("aluminium");

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
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white p-6 sm:p-10 shadow-lg">
        
        {/* Lush Greenery Photography with Ambient Blur & Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 blur-xs mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80')`
          }}
        ></div>

        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-emerald-300">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real Environmental & Climate Impact</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              Preserving India's Air, Rivers, and Forests
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
              By reusing industrial scrap locally, secondary factories eliminate coal kiln smoke, reduce landfill waste, and protect natural water reservoirs.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              id="btn-export-brsr-report"
              onClick={() => setShowBrsrModal(true)}
              className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs flex items-center gap-2 transition cursor-pointer shadow-md shadow-emerald-950/40"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Download Sustainability Audit</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Big Simple Metric Cards with Soft Glassmorphic Touches */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Scrap Saved from Dumps */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-blue-300 transition duration-300">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Factory className="w-4 h-4 text-blue-600" />
            Scrap Kept Out of Dumps
          </p>
          <p className="text-3xl font-extrabold text-slate-900 font-mono mt-2">
            {totalDivertedMT.toFixed(1)} <span className="text-lg text-blue-600">Tons</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">({(totalDivertedMT * 1000).toLocaleString("en-IN")} kg recycled)</p>
          <div className="mt-3 pt-3 border-t border-slate-150 flex items-center justify-between text-xs text-slate-500">
            <span>Landfills avoided</span>
            <span className="text-emerald-700 font-bold">100% Recycled</span>
          </div>
        </div>

        {/* Metric 2: Smoke Saved (CO2) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-emerald-300 transition duration-300">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Wind className="w-4 h-4 text-emerald-600" />
            Air Smoke Prevented (CO₂)
          </p>
          <p className="text-3xl font-extrabold text-emerald-700 font-mono mt-2">
            {totalCo2eAvoidedTonnes.toFixed(1)} <span className="text-lg text-emerald-600">Tons</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">Verified greenhouse gas mitigation</p>
          <div className="mt-3 pt-3 border-t border-slate-150 flex items-center justify-between text-xs text-slate-500">
            <span>Clean air saved</span>
            <span className="text-emerald-700 font-bold">GHG Protocol</span>
          </div>
        </div>

        {/* Metric 3: Trees Equivalent */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-emerald-300 transition duration-300">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <TreeDeciduous className="w-4 h-4 text-emerald-600" />
            Tree Planting Equivalent
          </p>
          <p className="text-3xl font-extrabold text-emerald-700 font-mono mt-2">
            {treesEquivalent.toLocaleString("en-IN")} <span className="text-lg text-emerald-600">Trees</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">Equivalent carbon absorption forest</p>
          <div className="mt-3 pt-3 border-t border-slate-150 flex items-center justify-between text-xs text-slate-500">
            <span>Nature balance</span>
            <span className="text-emerald-700 font-bold">🌱 High Positive</span>
          </div>
        </div>

        {/* Metric 4: Total Value Unlocked */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-blue-300 transition duration-300">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <IndianRupee className="w-4 h-4 text-blue-600" />
            Scrap Money Realized
          </p>
          <p className="text-3xl font-extrabold text-blue-700 font-mono mt-2">
            {formatInrCurrency(totalValueInr, true)}
          </p>
          <p className="text-xs text-slate-500 mt-1">Directly paid to source industries</p>
          <div className="mt-3 pt-3 border-t border-slate-150 flex items-center justify-between text-xs text-slate-500">
            <span>Fair Indian Rupee rates</span>
            <span className="text-blue-700 font-bold">Zero Broker Cuts</span>
          </div>
        </div>
      </div>

      {/* Interactive Clean Environment Simulator */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-150">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-extrabold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Interactive Clean Nature Simulator
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 font-display">
              See How Much Nature You Save When Recycling Increases
            </h3>
            <p className="text-xs text-slate-500">
              Move the slider to calculate how many trees, liters of clean water, and hours of coal smoke are avoided!
            </p>
          </div>

          {/* Material Category Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl shrink-0">
            {(["aluminium", "plastic", "steel", "flyash"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSimulatedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition cursor-pointer ${
                  simulatedCategory === cat
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {cat === "flyash" ? "Fly Ash" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Range Slider */}
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-600" />
              Adjust Scrap Recycling Volume:
            </label>
            <span className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-mono font-extrabold text-sm shadow-xs">
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
            className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />

          <div className="flex justify-between text-[11px] text-slate-400 font-mono">
            <span>1 Ton</span>
            <span>100 Tons</span>
            <span>250 Tons</span>
            <span>500 Tons</span>
          </div>
        </div>

        {/* Dynamic Impact Result Cards with Nature Photography Backdrops */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Fresh Air Preserved */}
          <div className="relative rounded-2xl overflow-hidden p-5 border border-emerald-200/80 bg-gradient-to-br from-emerald-500/10 to-teal-500/20 backdrop-blur-md space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Wind className="w-4 h-4" />
            </div>
            <p className="text-2xl font-mono font-extrabold text-emerald-950">
              {simCo2AvoidedTonnes.toFixed(1)} MT
            </p>
            <p className="text-xs font-bold text-emerald-900">Carbon Smoke Kept Out of Sky</p>
            <p className="text-[11px] text-emerald-700 leading-snug">
              Stops toxic smoke and lowers smog over industrial cities.
            </p>
          </div>

          {/* Card 2: Fresh Water Protected */}
          <div className="relative rounded-2xl overflow-hidden p-5 border border-blue-200/80 bg-gradient-to-br from-blue-500/10 to-cyan-500/20 backdrop-blur-md space-y-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Droplets className="w-4 h-4" />
            </div>
            <p className="text-2xl font-mono font-extrabold text-blue-950">
              {simWaterLiters.toLocaleString("en-IN")} L
            </p>
            <p className="text-xs font-bold text-blue-900">Clean Water Protected</p>
            <p className="text-[11px] text-blue-700 leading-snug">
              Eliminates the heavy acid water washing required for virgin ore mining.
            </p>
          </div>

          {/* Card 3: Trees Equivalent */}
          <div className="relative rounded-2xl overflow-hidden p-5 border border-teal-200/80 bg-gradient-to-br from-teal-500/10 to-emerald-500/20 backdrop-blur-md space-y-2">
            <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
              <TreeDeciduous className="w-4 h-4" />
            </div>
            <p className="text-2xl font-mono font-extrabold text-teal-950">
              {simTrees.toLocaleString("en-IN")} Trees
            </p>
            <p className="text-xs font-bold text-teal-900">Equivalent Forest Size</p>
            <p className="text-[11px] text-teal-700 leading-snug">
              Matches the yearly air-cleaning power of a mature grove of banyan & neem trees.
            </p>
          </div>

          {/* Card 4: Coal Burning Hours Avoided */}
          <div className="relative rounded-2xl overflow-hidden p-5 border border-amber-200/80 bg-gradient-to-br from-amber-500/10 to-orange-500/20 backdrop-blur-md space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
              <Sun className="w-4 h-4" />
            </div>
            <p className="text-2xl font-mono font-extrabold text-amber-950">
              {simCoalHours.toLocaleString("en-IN")} Hours
            </p>
            <p className="text-xs font-bold text-amber-900">Coal Kiln Hours Saved</p>
            <p className="text-[11px] text-amber-700 leading-snug">
              Electricity and coal energy avoided by melting scrap instead of rock ore.
            </p>
          </div>

        </div>
      </div>

      {/* Breakdown by Scrap Types */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-150">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Scrap Breakdown: What Was Saved & What It Becomes
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              See the exact tons and clean air savings for every type of scrap material.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-xl">
            {passports.length} Verified Batches
          </span>
        </div>

        {brsrReport.materialBreakdown.length > 0 ? (
          <div className="space-y-3">
            {brsrReport.materialBreakdown.map((item, idx) => {
              const pct = totalDivertedMT > 0 ? Math.round((item.quantityMT / totalDivertedMT) * 100) : 0;
              return (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">{item.category}</span>
                    <span className="text-emerald-700 font-mono font-bold">
                      {(item.co2eAvoidedKg / 1000).toFixed(1)} Tons of CO₂ smoke avoided
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(5, pct)}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 pt-0.5">
                    <span><strong>{item.quantityMT} Tons</strong> ({pct}% of all scrap)</span>
                    <span className="text-blue-700 font-semibold">✨ Made into: {item.primaryReuseRoute}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6 text-xs text-slate-400">
            No batches logged yet. Log your first scrap passport to see live category breakdowns.
          </div>
        )}
      </div>

      {/* Green Audit Modal */}
      {showBrsrModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative my-8 animate-fadeIn">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs uppercase font-bold px-2.5 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                  GREEN ENVIRONMENTAL AUDIT
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 mt-1.5 font-display">
                  Official Sustainability & Circularity Summary Report
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Verified scrap diversion and greenhouse gas emission prevention sheet</p>
              </div>
              <button
                onClick={() => setShowBrsrModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 cursor-pointer text-xs"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Reporting Period</p>
                  <p className="font-extrabold text-slate-900 mt-0.5">{brsrReport.reportingPeriod}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Total Material Recycled</p>
                  <p className="font-extrabold text-slate-900 mt-0.5">{brsrReport.totalMaterialDivertedMT} Tons</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Smoke Prevented (CO₂)</p>
                  <p className="font-extrabold text-emerald-700 mt-0.5">
                    {(brsrReport.totalCo2eAvoidedKg / 1000).toFixed(1)} Tons
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Trees Equivalent</p>
                  <p className="font-extrabold text-emerald-700 mt-0.5">{treesEquivalent.toLocaleString("en-IN")} Trees</p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="p-3 font-bold">Material</th>
                      <th className="p-3 font-bold">Weight (Tons)</th>
                      <th className="p-3 font-bold">Smoke Saved</th>
                      <th className="p-3 font-bold">What It Becomes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {brsrReport.materialBreakdown.length > 0 ? (
                      brsrReport.materialBreakdown.map((row, idx) => (
                        <tr key={idx} className="text-slate-700">
                          <td className="p-3 font-bold text-slate-900">{row.category}</td>
                          <td className="p-3 font-mono">{row.quantityMT} MT</td>
                          <td className="p-3 font-mono text-emerald-700 font-bold">{(row.co2eAvoidedKg / 1000).toFixed(1)} t</td>
                          <td className="p-3">{row.primaryReuseRoute}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-slate-400">No active batches logged yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-150">
              <span className="text-xs text-slate-500">
                {downloaded ? "✓ Report Downloaded!" : "Standard JSON format ready for audit"}
              </span>
              <button
                onClick={handleDownloadBrsrJson}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer shadow-xs"
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
