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
  Search
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
      {/* Hero Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            Safety & Anti-Fraud Timeline
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Safe Record of Who Handled & Moved This Scrap
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
            Every handover between factories, drivers, and buyers is permanently saved so no one can fake scrap quantities or sell stolen goods.
          </p>
        </div>

        {/* Demo Mode Toggle */}
        <div className="bg-slate-50 p-1.5 rounded-2xl border border-slate-200 flex items-center gap-1 shrink-0">
          <button
            onClick={() => setBlockchainMode("mock")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              blockchainMode === "mock"
                ? "bg-white text-blue-700 shadow-xs border border-slate-200"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Standard Mode
          </button>
          <button
            onClick={() => setBlockchainMode("polygon")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
              blockchainMode === "polygon"
                ? "bg-white text-purple-700 shadow-xs border border-purple-200"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Polygon Testnet
          </button>
        </div>
      </div>

      {/* Verify Authenticity Tool */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 space-y-3 shadow-xs">
        <p className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Search className="w-4 h-4 text-blue-600" />
          Check If a Scrap ID or Digital Stamp is Real:
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={hashSearch}
            onChange={(e) => setHashSearch(e.target.value)}
            placeholder="Type or paste Scrap ID (e.g. CUS-AL-6063-GJ) or digital proof code..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 font-medium focus:border-blue-500 focus:bg-white focus:outline-none transition"
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
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-blue-600" />
              Transfer Scrap to a Buyer Factory
            </h3>

            {passports.length > 0 ? (
              <form onSubmit={handleTransfer} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Select Scrap Batch</label>
                  <select
                    value={selectedPassportId}
                    onChange={(e) => setSelectedPassportId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 text-xs focus:border-blue-500 focus:bg-white focus:outline-none font-medium"
                  >
                    {passports.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.id} — {p.title} ({p.quantityMT} Tons)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Current Factory Owner</label>
                  <input
                    type="text"
                    disabled
                    value={`${activeRole.orgName} (${activeRole.gstin})`}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-600 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Buyer Factory Name</label>
                  <input
                    type="text"
                    value={recipientOrg}
                    onChange={(e) => setRecipientOrg(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs focus:border-blue-500 focus:bg-white focus:outline-none font-medium"
                    placeholder="e.g. Gujarat Solar Frame Extrusions"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Transfer City & Location</label>
                  <input
                    type="text"
                    value={transferLocation}
                    onChange={(e) => setTransferLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs focus:border-blue-500 focus:bg-white focus:outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Handover Notes & Bill Number</label>
                  <textarea
                    rows={2}
                    value={transferNotes}
                    onChange={(e) => setTransferNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 text-xs focus:border-blue-500 focus:bg-white focus:outline-none font-medium"
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
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-2 text-xs">
                <p className="font-bold text-slate-700">No Scrap Batches Available to Transfer</p>
                <p className="text-slate-500 text-[11px]">
                  Add a real-time entry or scan a batch photo to register scrap before recording custody handovers.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Event History (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-150">
            <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Live Scrap Movement History
            </h3>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
              {events.length} Events Saved
            </span>
          </div>

          <div className="space-y-3">
            {events.length > 0 ? (
              events.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs hover:border-blue-300 transition"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-blue-700">{ev.eventType.replace(/_/g, " ")}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold">
                        ID: {ev.passportId}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {new Date(ev.timestamp).toLocaleDateString("en-IN")}
                    </span>
                  </div>

                  <p className="text-slate-700 text-xs leading-relaxed">{ev.notes}</p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                    <span><strong>By:</strong> {ev.actor}</span>
                    <span>📍 {ev.location}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center space-y-2 text-xs">
                <p className="font-bold text-slate-700">No Timeline Events Recorded Yet</p>
                <p className="text-slate-500 text-[11px]">
                  All creation, custody handovers, lab tests, and truck transports will appear here in chronological order.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
