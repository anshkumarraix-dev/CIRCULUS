import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { 
  ShieldCheck, 
  Layers, 
  Leaf, 
  IndianRupee, 
  CheckCircle2, 
  QrCode, 
  ArrowRight, 
  History, 
  Sparkles,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  MapPin,
  Building2,
  Lock,
  Printer
} from "lucide-react";
import { MaterialPassport, OwnershipEvent } from "../../types";
import { formatInrCurrency } from "../../lib/valuation-engine";

interface MaterialPassportViewProps {
  passport: MaterialPassport;
  onBackToList?: () => void;
  onFindMatches: (passportId: string) => void;
  onTransferCustody: (passportId: string) => void;
  onAskCopilot: (passport: MaterialPassport) => void;
  events?: OwnershipEvent[];
}

export const MaterialPassportView: React.FC<MaterialPassportViewProps> = ({
  passport,
  onBackToList,
  onFindMatches,
  onTransferCustody,
  onAskCopilot,
  events = [],
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [showAdvancedTech, setShowAdvancedTech] = useState<boolean>(false);
  const [copiedHash, setCopiedHash] = useState<boolean>(false);

  const [copiedAadhaarText, setCopiedAadhaarText] = useState<boolean>(false);

  const getDigitalAadhaarText = () => {
    return [
      `=== DIGITAL AADHAAR OF SCRAP ===`,
      `Aadhaar Card ID: ${passport.id}`,
      `Batch Name: ${passport.title}`,
      `Material Type: ${passport.materialType} (${passport.category.toUpperCase()})`,
      `Quality Grade: ${passport.grade}`,
      `Net Weight: ${passport.quantityMT} MT (${passport.quantityMT * 1000} kg)`,
      `Cleanliness / Purity: ${passport.reusabilityScore}% Clean Grade`,
      `HSN Tariff Code: ${passport.hsnCode}`,
      `Generator Facility: ${passport.ownerOrg}`,
      `GSTIN: ${passport.ownerGstin}`,
      `Origin Facility: ${passport.locationCity}, ${passport.locationState}`,
      `SPCB Jurisdiction: ${passport.spcbJurisdiction}`,
      `CO2 Emissions Saved: ${(passport.carbonImpact.co2eAvoidedKg / 1000).toFixed(1)} MT CO2e`,
      `Fair Value Est.: ₹${passport.valuation.estimatedTotalInr.toLocaleString("en-IN")}`,
      `Cryptographic Hash: ${passport.recordHash}`,
      `Status: VERIFIED ON-CHAIN (CIRCULUS PROTOCOL)`,
      `Direct On-Device Data - Zero Website Redirect`,
    ].join("\n");
  };

  useEffect(() => {
    const aadhaarData = getDigitalAadhaarText();
    QRCode.toDataURL(
      aadhaarData,
      {
        width: 360,
        margin: 2,
        color: {
          dark: "#0f172a",
          light: "#ffffff",
        },
      }
    ).then((url) => setQrCodeUrl(url)).catch((err) => console.error("QR Code Error:", err));
  }, [passport]);

  const copyHashToClipboard = () => {
    navigator.clipboard.writeText(passport.recordHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const copyAadhaarToClipboard = () => {
    navigator.clipboard.writeText(getDigitalAadhaarText());
    setCopiedAadhaarText(true);
    setTimeout(() => setCopiedAadhaarText(false), 2500);
  };

  const simpleSteps = [
    { num: "1", title: "Factory Scrap Made", desc: "Clean offcuts logged at factory", done: true },
    { num: "2", title: "AI Quality Scan", desc: `${passport.reusabilityScore}% Clean score verified`, done: true },
    { num: "3", title: "Digital ID Created", desc: "Aadhaar Card issued with QR", done: true },
    { num: "4", title: "Sell to Buyer", desc: "Matched with recycling factory", done: passport.lifecycleStage === "reuse" || passport.lifecycleStage === "impact" },
    { num: "5", title: "New Goods Made", desc: "Melted into brand new products", done: passport.lifecycleStage === "impact" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Bar with Simple Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {onBackToList && (
          <button
            onClick={onBackToList}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 transition cursor-pointer shadow-xs"
          >
            <ChevronLeft className="w-4 h-4" />
            ← Back to All ID Cards
          </button>
        )}

        <div className="flex items-center gap-2.5 ml-auto">
          <button
            onClick={() => setShowQrModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 transition cursor-pointer shadow-xs"
          >
            <QrCode className="w-4 h-4 text-blue-600" />
            <span>Print Truck QR Tag</span>
          </button>

          <button
            onClick={() => onAskCopilot(passport)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border border-emerald-300 text-xs font-bold text-emerald-800 transition cursor-pointer shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Ask AI About This</span>
          </button>

          <button
            onClick={() => onFindMatches(passport.id)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold transition cursor-pointer shadow-sm shadow-blue-600/20"
          >
            <span>Find Buying Factories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Digital ID Card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        
        {/* ID Card Header */}
        <div className="bg-gradient-to-r from-blue-50/80 via-slate-50 to-emerald-50/60 px-6 sm:px-8 py-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/20 shrink-0">
              <Layers className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-800 border border-blue-200">
                  DIGITAL ID: {passport.id}
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Authentic
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display mt-1">
                {passport.title}
              </h1>
            </div>
          </div>

          <div className="text-left md:text-right text-xs">
            <p className="text-slate-500 font-medium">Card Created: {new Date(passport.createdAt).toLocaleDateString("en-IN")}</p>
            <p className="text-blue-700 font-bold text-sm mt-0.5">HSN Code: {passport.hsnCode}</p>
          </div>
        </div>

        {/* 5-Step Simple Lifecycle Bar */}
        <div className="px-6 sm:px-8 py-4 bg-slate-50 border-b border-slate-200">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
            Recycling Journey of this Scrap Batch:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {simpleSteps.map((step) => (
              <div
                key={step.num}
                className={`p-3 rounded-2xl border text-xs transition ${
                  step.done
                    ? "bg-white border-blue-200 text-slate-900 shadow-xs"
                    : "bg-slate-100/60 border-slate-200 text-slate-400"
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    step.done ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"
                  }`}>
                    {step.num}
                  </span>
                  <span className={step.done ? "text-blue-800" : "text-slate-500"}>{step.title}</span>
                </div>
                <p className="text-[11px] text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core ID Card Body */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Product Photo & QR Tag (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="aspect-square w-full rounded-2xl overflow-hidden border border-slate-200 relative bg-slate-100 shadow-xs">
              <img
                src={passport.imageUrl}
                alt={passport.materialType}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-slate-900 border border-slate-200 shadow-xs">
                ⚖️ {passport.quantityMT} Tons Batch
              </div>
            </div>

            {/* Scannable Bale Tag */}
            {qrCodeUrl && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center gap-3.5">
                <img src={qrCodeUrl} alt="Passport QR" className="w-18 h-18 rounded-xl border border-slate-200 p-1 bg-white shrink-0" />
                <div className="text-xs">
                  <p className="font-extrabold text-slate-900">Scannable QR Tag</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Stick this QR code on physical truck bags or lorry bills.
                  </p>
                  <button
                    onClick={() => setShowQrModal(true)}
                    className="text-xs text-blue-600 hover:text-blue-700 mt-1 cursor-pointer font-bold flex items-center gap-1"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print Large QR Tag
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Key Details, Green Facts & Uses (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* 4 Big Simple Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-bold uppercase block">Cleanliness Score</span>
                <p className="text-2xl font-extrabold text-emerald-700 font-mono mt-1">{passport.reusabilityScore}%</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Top-grade clean</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-bold uppercase block">Total Weight</span>
                <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">{passport.quantityMT} Tons</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{passport.quantityMT * 1000} Kilograms</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-bold uppercase block flex items-center gap-1">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  Smoke Saved
                </span>
                <p className="text-2xl font-extrabold text-emerald-700 font-mono mt-1">
                  {(passport.carbonImpact.co2eAvoidedKg / 1000).toFixed(1)} t
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Tons of CO₂ gas</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-[11px] text-slate-500 font-bold uppercase block flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5 text-blue-600" />
                  Total Value
                </span>
                <p className="text-2xl font-extrabold text-blue-700 font-mono mt-1">
                  {formatInrCurrency(passport.valuation.estimatedTotalInr, true)}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">₹{passport.valuation.basePricePerMT.toLocaleString("en-IN")}/Ton</p>
              </div>
            </div>

            {/* Who Owns & Where Is It? */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2.5">
              <span className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-600" />
                Factory & Location Details
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Owner</span>
                  <p className="font-extrabold text-slate-900 mt-0.5 truncate">{passport.ownerOrg}</p>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">GST: {passport.ownerGstin}</p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Factory City & State</span>
                  <p className="font-extrabold text-slate-900 mt-0.5 truncate">{passport.locationCity}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{passport.locationState}, India</p>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Local Authority</span>
                  <p className="font-extrabold text-blue-700 mt-0.5 truncate">{passport.spcbJurisdiction}</p>
                  <p className="text-[10px] text-emerald-700 font-bold mt-0.5">✓ Green Safety Certified</p>
                </div>
              </div>
            </div>

            {/* What can be made from this scrap? */}
            <div className="space-y-2">
              <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                What can factories manufacture from this scrap?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {passport.suggestedApplications.map((app, i) => (
                  <div key={i} className="text-xs text-slate-800 flex items-center gap-2 bg-blue-50/70 p-3 rounded-xl border border-blue-200/60 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{app}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Simple Green Fact */}
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-emerald-800">
                <Leaf className="w-4 h-4 text-emerald-600" />
                Why recycling this helps our planet:
              </p>
              <p className="leading-relaxed">
                {passport.carbonImpact.methodologyNote || "Melting recycled materials uses up to 95% less electricity than mining raw rocks from the earth. Keeps dumpyards clean and reduces factory smoke."}
              </p>
            </div>

            {/* Collapsible Advanced Digital Proof */}
            <div className="pt-2">
              <button
                onClick={() => setShowAdvancedTech(!showAdvancedTech)}
                className="w-full p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center justify-between cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Advanced Digital Proof & Blockchain Security Numbers</span>
                </span>
                {showAdvancedTech ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showAdvancedTech && (
                <div className="mt-2 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs font-mono animate-fadeIn">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">SHA-256 Unique Proof Hash</span>
                    <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-slate-200 mt-1">
                      <span className="text-[11px] text-slate-600 truncate">{passport.recordHash}</span>
                      <button onClick={copyHashToClipboard} className="text-blue-600 text-[10px] font-bold ml-2 cursor-pointer">
                        {copiedHash ? "COPIED" : "COPY"}
                      </button>
                    </div>
                  </div>
                  {passport.ledgerTxHash && (
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Polygon Ledger Transaction ID</span>
                      <p className="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-200 mt-1 truncate">
                        {passport.ledgerTxHash}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Ownership & Movement History */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <History className="w-4 h-4 text-blue-600" />
              Safe Record of Who Owned & Handled This Scrap
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Every step is saved in the safe timeline so everyone knows where the material came from.
            </p>
          </div>
          <button
            onClick={() => onTransferCustody(passport.id)}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 transition cursor-pointer"
          >
            + Transfer to Buyer
          </button>
        </div>

        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200">
          {events.length > 0 ? (
            events.map((ev) => (
              <div key={ev.id} className="relative">
                <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow-xs"></div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900">{ev.eventType.replace(/_/g, " ")}</span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {new Date(ev.timestamp).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                  <p className="text-slate-700">{ev.notes}</p>
                  <p className="text-[11px] text-slate-500 pt-0.5">
                    By: <strong>{ev.actor}</strong> ({ev.location})
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="relative">
              <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white"></div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                <p className="font-bold text-slate-900">ID CARD CREATED</p>
                <p className="text-slate-600 mt-1">{passport.notes || "Material batch recorded and verified."}</p>
                <p className="text-[11px] text-slate-500 mt-1">Logged by: {passport.ownerOrg}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Printable Digital Aadhaar QR Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 max-w-lg w-full space-y-5 shadow-2xl animate-fadeIn my-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-tight font-display">
                  Digital Aadhaar QR • Direct Scrap Data
                </span>
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs cursor-pointer font-bold px-2 py-1 rounded-lg hover:bg-slate-100 transition"
              >
                ✕ Close
              </button>
            </div>

            {/* Zero Redirect Alert Tag */}
            <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-3 text-xs text-blue-900 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Direct Digital Aadhaar Data (No URL Redirect)</p>
                <p className="text-[11px] text-blue-700 mt-0.5 leading-relaxed">
                  Scanning this QR code with any phone camera or handheld scanner displays the raw Digital Aadhaar certificate on-screen immediately without opening any website.
                </p>
              </div>
            </div>

            {/* QR Code Canvas */}
            <div className="bg-slate-50 p-4 rounded-3xl border border-slate-200 text-center">
              <div className="bg-white p-3 rounded-2xl inline-block shadow-md mx-auto border border-slate-200">
                <img src={qrCodeUrl} alt="Digital Aadhaar QR" className="w-56 h-56 mx-auto" />
              </div>
              <p className="text-[10px] text-slate-500 font-mono mt-2 font-semibold">
                SCAN WITH ANY CAMERA • DIRECT AADHAAR TEXT PAYLOAD
              </p>
            </div>

            {/* Digital Aadhaar Data Summary Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500 font-semibold">Aadhaar Card ID:</span>
                <span className="font-mono font-bold text-blue-700">{passport.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Scrap Description:</span>
                <span className="font-bold text-slate-900 text-right truncate max-w-[240px]">{passport.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Weight / Quantity:</span>
                <span className="font-bold text-slate-900">{passport.quantityMT} Tons ({passport.quantityMT * 1000} kg)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Cleanliness / Purity:</span>
                <span className="font-bold text-emerald-700">{passport.reusabilityScore}% Clean Grade</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Facility / Owner:</span>
                <span className="font-bold text-slate-900 truncate max-w-[240px]">{passport.ownerOrg}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Origin GSTIN:</span>
                <span className="font-mono text-slate-800">{passport.ownerGstin}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">SPCB Jurisdiction:</span>
                <span className="text-slate-700">{passport.spcbJurisdiction}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200/80">
                <span className="text-slate-500 font-semibold">Proof Hash:</span>
                <span className="font-mono text-[10px] text-slate-600 truncate max-w-[200px]">{passport.recordHash}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={copyAadhaarToClipboard}
                className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-bold text-slate-800 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{copiedAadhaarText ? "Copied Aadhaar!" : "Copy Aadhaar Text"}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm shadow-blue-600/20"
              >
                <Printer className="w-4 h-4" />
                <span>Print Truck Tag</span>
              </button>
            </div>

            <p className="text-[10px] text-center text-slate-400 font-mono">
              CIRCULUS INDIA INDUSTRIAL PROTOCOL • COMPLIANT WITH DIGITAL WASTE RULES 2026
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
