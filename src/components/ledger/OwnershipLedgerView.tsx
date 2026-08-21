import React, { useState } from "react";
import { 
  ShieldCheck, 
  Hash, 
  Link as LinkIcon, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  Layers, 
  Info, 
  Clock, 
  Building2, 
  Lock, 
  RefreshCw, 
  Search,
  Check,
  Truck,
  FileText
} from "lucide-react";
import { MaterialPassport, OwnershipEvent, UserRole } from "../../types";
import { OwnershipLedgerAdapter } from "../../lib/ledger-adapter";

interface OwnershipLedgerViewProps {
  passports: MaterialPassport[];
  events: OwnershipEvent[];
  onAddEvent: (event: OwnershipEvent) => void;
  activeRole: UserRole;
  onViewPassport: (passportId: string) => void;
}

export const OwnershipLedgerView: React.FC<OwnershipLedgerViewProps> = ({
  passports,
  events,
  onAddEvent,
  activeRole,
  onViewPassport,
}) => {
  const [blockchainMode, setBlockchainMode] = useState<"mock" | "polygon">("mock");
  const [selectedPassportId, setSelectedPassportId] = useState<string>(passports[0]?.id || "");
  const [recipientOrg, setRecipientOrg] = useState<string>("Gujarat Solar Frame Extrusions");
  const [transferNotes, setTransferNotes] = useState<string>("Scrap handover completed under GST e-Way bill #7291823719");
  const [transferLocation, setTransferLocation] = useState<string>("Changodar Logistics Hub, Gujarat");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hashSearch, setHashSearch] = useState<string>("");
  const [verificationResult, setVerificationResult] = useState<string | null>(null);

  React.useEffect(() => {
    if (!selectedPassportId && passports.length > 0) {
      setSelectedPassportId(passports[0].id);
    }
  }, [passports, selectedPassportId]);

  const selectedPassport = passports.find((p) => p.id === selectedPassportId);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPassport) return;

    setIsSubmitting(true);
    const adapter = new OwnershipLedgerAdapter(blockchainMode);

    try {
      const newEvent = await adapter.transferOwnership(
        selectedPassport.id,
        recipientOrg,
        activeRole.orgName,
        activeRole.id,
        transferNotes,
        transferLocation
      );

      onAddEvent(newEvent);
      setTransferNotes("");
    } catch (err) {
      console.error("Ledger transfer error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyHash = () => {
    if (!hashSearch.trim()) return;
    const foundPassport = passports.find(
      (p) => p.recordHash.toLowerCase() === hashSearch.trim().toLowerCase() || p.id.toLowerCase() === hashSearch.trim().toLowerCase()
    );
    const foundEvent = events.find((e) => e.txHash?.toLowerCase() === hashSearch.trim().toLowerCase());

    if (foundPassport) {
      setVerificationResult(`✓ VERIFIED AUTHENTIC: "${foundPassport.title}" (${foundPassport.id}) is authentic and registered to ${foundPassport.ownerOrg}.`);
    } else if (foundEvent) {
      setVerificationResult(`✓ VERIFIED TRANSACTION: Action "${foundEvent.eventType}" by ${foundEvent.actor} is authentic.`);
    } else {
      setVerificationResult("✗ NOT FOUND: ID or Hash did not match any registered records.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner with Logistics & Weighbridge Photography */}
      <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 border border-emerald-200 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white shadow-md">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80"
          alt="Logistics and Transport Checkpoint"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-35 pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Safety & Anti-Fraud Timeline
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
              Safe Record of Who Handled & Moved This Scrap
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
              Every handover between factories, drivers, and buyers is permanently saved so no one can fake scrap quantities or sell stolen goods.
            </p>
          </div>

          {/* Demo Mode Toggle */}
          <div className="bg-slate-900/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 flex items-center gap-1 shrink-0">
            <button
              onClick={() => setBlockchainMode("mock")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                blockchainMode === "mock"
                  ? "bg-[#12181F] text-emerald-400 shadow-xs border border-slate-700"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Demo Ledger
            </button>
            <button
              onClick={() => setBlockchainMode("polygon")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                blockchainMode === "polygon"
                  ? "bg-purple-600 text-white shadow-xs border border-purple-400"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Polygon Testnet
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal 3-Step Guided Progress Stepper */}
      <div className="bg-[#12181F] p-4 sm:p-5 rounded-3xl border border-slate-700 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {[
            {
              step: 1,
              title: "1. Select Scrap & Custodian",
              desc: selectedPassport ? `Selected: ${selectedPassport.id}` : "Choose batch to transfer",
              isCompleted: !!selectedPassport,
              isActive: !selectedPassport,
            },
            {
              step: 2,
              title: "2. Record Handover & Hash",
              desc: isSubmitting ? "Generating SHA-256 content hash..." : "Log SPCB/GST transfer proof",
              isCompleted: events.length > 0,
              isActive: !!selectedPassport && !isSubmitting,
            },
            {
              step: 3,
              title: "3. View on Safe Explorer",
              desc: `${events.length} verified events on ledger`,
              isCompleted: events.length > 0,
              isActive: events.length > 0,
            },
          ].map((s, idx, arr) => (
            <React.Fragment key={s.step}>
              <div
                className={`flex items-center gap-3 w-full sm:w-auto p-2.5 sm:p-3 rounded-2xl transition duration-200 ${
                  s.isActive
                    ? "bg-emerald-50/90 border border-emerald-500/40 shadow-sm shadow-emerald-500/10 ring-2 ring-emerald-500/20"
                    : s.isCompleted
                    ? "bg-slate-800 border border-emerald-200/80"
                    : "bg-slate-800/50 border border-slate-700/60 opacity-60"
                }`}
              >
                {s.isCompleted ? (
                  <div className="w-8 h-8 rounded-full bg-[#1B4332] text-white flex items-center justify-center shadow-xs shrink-0">
                    <Check className="w-4 h-4 text-white stroke-[3]" />
                  </div>
                ) : s.isActive ? (
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-emerald-600/30 animate-pulse shrink-0">
                    {s.step}
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full border-2 border-slate-600 text-slate-400 bg-[#12181F] flex items-center justify-center font-bold text-xs shrink-0">
                    {s.step}
                  </div>
                )}
                <div className="min-w-0">
                  <p className={`text-xs font-bold truncate ${s.isActive ? "text-emerald-400" : s.isCompleted ? "text-white" : "text-slate-500"}`}>
                    {s.title}
                  </p>
                  <p className={`text-[11px] truncate ${s.isActive ? "text-emerald-400 font-semibold" : s.isCompleted ? "text-emerald-500" : "text-slate-400"}`}>
                    {s.desc}
                  </p>
                </div>
              </div>

              {idx < arr.length - 1 && (
                <div className="hidden sm:block flex-1 h-[2px] bg-slate-200 mx-2">
                  <div
                    className={`h-full transition-all duration-300 ${
                      s.isCompleted ? "bg-[#1B4332]" : "bg-slate-200"
                    }`}
                  ></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Verify Authenticity Tool */}
      <div className="bg-[#12181F] p-5 rounded-3xl border border-slate-700 space-y-3 shadow-xs">
        <p className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Search className="w-4 h-4 text-blue-600" />
          Check If a Scrap ID or Digital Stamp is Real:
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={hashSearch}
            onChange={(e) => setHashSearch(e.target.value)}
            placeholder="Type or paste Scrap ID (e.g. CUS-AL-6063-GJ) or digital proof code..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 font-medium focus:border-blue-500 focus:bg-[#12181F] focus:outline-none transition"
          />
          <button
            onClick={handleVerifyHash}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-extrabold text-white transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify Authenticity</span>
          </button>
        </div>

        {verificationResult && (
          <p className={`text-xs p-3 rounded-2xl ${
            verificationResult.startsWith("✓")
              ? "bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold"
              : "bg-red-50 text-red-900 border border-red-200 font-semibold"
          }`}>
            {verificationResult}
          </p>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Transfer to Buyer (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#12181F] p-6 rounded-3xl border border-slate-700 space-y-4 shadow-xs">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-blue-600" />
              Transfer Scrap to a Buyer Factory
            </h3>

            {passports.length > 0 ? (
              <form onSubmit={handleTransfer} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Select Scrap Batch</label>
                  <select
                    value={selectedPassportId}
                    onChange={(e) => setSelectedPassportId(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-slate-200 text-xs focus:border-blue-500 focus:bg-[#12181F] focus:outline-none font-medium"
                  >
                    {passports.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.id} — {p.title} ({p.quantityMT} Tons)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Current Factory Owner</label>
                  <input
                    type="text"
                    disabled
                    value={`${activeRole.orgName} (${activeRole.gstin})`}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-400 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Buyer Factory Name</label>
                  <input
                    type="text"
                    value={recipientOrg}
                    onChange={(e) => setRecipientOrg(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 text-xs focus:border-blue-500 focus:bg-[#12181F] focus:outline-none font-medium"
                    placeholder="e.g. Gujarat Solar Frame Extrusions"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Transfer City & Location</label>
                  <input
                    type="text"
                    value={transferLocation}
                    onChange={(e) => setTransferLocation(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 text-xs focus:border-blue-500 focus:bg-[#12181F] focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Handover Notes & Bill Number</label>
                  <textarea
                    rows={2}
                    value={transferNotes}
                    onChange={(e) => setTransferNotes(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 text-xs focus:border-blue-500 focus:bg-[#12181F] focus:outline-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !selectedPassport}
                  className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs transition cursor-pointer flex items-center justify-center gap-2 shadow-sm shadow-blue-600/20"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving Transfer Record...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>Confirm & Save Transfer to History</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 text-center space-y-2 text-xs">
                <p className="font-bold text-slate-300">No Scrap Batches Available to Transfer</p>
                <p className="text-slate-500 text-[11px]">
                  Add a real-time entry or scan a batch photo to register scrap before recording custody handovers.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Event History (7 cols) */}
        <div className="lg:col-span-7 bg-[#12181F] p-6 rounded-3xl border border-slate-700 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-150">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Live Scrap Movement History
            </h3>
            <span className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-xl">
              {events.length} Events Saved
            </span>
          </div>

          <div className="space-y-3">
            {events.length > 0 ? (
              events.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-2 text-xs hover:border-blue-300 transition"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-blue-400">{ev.eventType.replace(/_/g, " ")}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-lg bg-[#12181F] border border-slate-700 text-slate-300 font-semibold">
                        ID: {ev.passportId}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {new Date(ev.timestamp).toLocaleDateString("en-IN")}
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs leading-relaxed">{ev.notes}</p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-700 text-[11px] text-slate-500">
                    <span><strong>By:</strong> {ev.actor}</span>
                    <span>📍 {ev.location}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="space-y-4">
                {/* 3-Step Educational Guide */}
                <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-3">
                  <p className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-blue-600" />
                    How Chain of Custody Works (3-Step Lifecycle):
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                    <div className="p-2.5 rounded-xl bg-[#12181F] border border-slate-700/80">
                      <span className="font-bold text-emerald-500 block mb-0.5">1. Origin Mint</span>
                      <p className="text-slate-500">Generator registers scrap lot with AI purity & geo-stamp.</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#12181F] border border-slate-700/80">
                      <span className="font-bold text-blue-400 block mb-0.5">2. Safe Handover</span>
                      <p className="text-slate-500">Logistics driver or recycler records receipt with GST e-Way bill.</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#12181F] border border-slate-700/80">
                      <span className="font-bold text-purple-400 block mb-0.5">3. Final Remelt</span>
                      <p className="text-slate-500">Authorized smelter logs recycling proof & closes circular loop.</p>
                    </div>
                  </div>
                </div>

                {/* Ghost Cards at 40% opacity */}
                <div className="space-y-2.5 opacity-40 select-none pointer-events-none">
                  <div className="bg-slate-800 p-4 rounded-2xl border border-dashed border-slate-600 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-400">CUSTODY TRANSFER</span>
                      <span className="text-[10px] text-slate-500 font-mono">HASH: 0x8f3c...1e9a</span>
                    </div>
                    <p className="text-slate-400 text-xs">Sample: Transferred 25.0 MT Aluminium 6063 Scrap to Recycler Plant</p>
                    <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-700">
                      <span>By: Reliance Industries Logistics</span>
                      <span>📍 Sanand Hub, GJ</span>
                    </div>
                  </div>

                  <div className="bg-slate-800 p-4 rounded-2xl border border-dashed border-slate-600 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400">FINAL REMELT CERTIFICATE</span>
                      <span className="text-[10px] text-slate-500 font-mono">HASH: 0x4a12...99b2</span>
                    </div>
                    <p className="text-slate-400 text-xs">Sample: 100% recycled into secondary extrusion billets. 230 t CO₂ avoided.</p>
                    <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-700">
                      <span>By: Gujarat Secondary Metals Ltd</span>
                      <span>📍 Hazira, GJ</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
