import React, { useState } from "react";
import { 
  X, 
  Plus, 
  Sparkles, 
  MapPin, 
  IndianRupee, 
  Leaf, 
  ShieldCheck, 
  CheckCircle2,
  Building2,
  Layers,
  ArrowRight
} from "lucide-react";
import { MaterialCategory, MaterialPassport, MarketplaceListing, OwnershipEvent, UserRole } from "../../types";
import { calculateMaterialCarbonImpact } from "../../lib/carbon-engine";
import { calculateDynamicValuation, formatInrCurrency } from "../../lib/valuation-engine";
import { generateSimpleRecordHash } from "../../lib/ledger-adapter";

interface RealTimeEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeRole: UserRole;
  onEntryCreated: (passport: MaterialPassport, listing: MarketplaceListing, event: OwnershipEvent) => void;
}

const CATEGORY_OPTIONS: { id: MaterialCategory; label: string; defaultHsn: string; defaultPrice: number }[] = [
  { id: "non_ferrous", label: "Non-Ferrous (Aluminium 6063 / Copper)", defaultHsn: "76020010", defaultPrice: 198000 },
  { id: "plastic", label: "Industrial Plastic (rPET / HDPE / PP)", defaultHsn: "39159000", defaultPrice: 82000 },
  { id: "paper_cardboard", label: "Paper & Cardboard (Kraft Bales)", defaultHsn: "47071000", defaultPrice: 15500 },
  { id: "ewaste", label: "E-Waste (Printed Circuit Boards)", defaultHsn: "85480000", defaultPrice: 320000 },
  { id: "glass", label: "Glass Cullet (Soda-Lime Flint)", defaultHsn: "70010000", defaultPrice: 4200 },
  { id: "wood", label: "Wood / Timber (Pallet Planks)", defaultHsn: "44013900", defaultPrice: 6500 },
  { id: "textile", label: "Textile Waste (Cotton Fabric)", defaultHsn: "63109010", defaultPrice: 31000 },
  { id: "rubber", label: "Rubber Crumb (Tire Granules)", defaultHsn: "40040000", defaultPrice: 28500 },
  { id: "organic", label: "Organic / Biomass Pellets", defaultHsn: "14049090", defaultPrice: 3800 },
  { id: "ferrous", label: "Ferrous Metal (HMS 1/2 Steel Scrap)", defaultHsn: "72044900", defaultPrice: 38500 },
  { id: "fly_ash", label: "Fly Ash (IS 3812 Class F Pozzolanic)", defaultHsn: "26219000", defaultPrice: 900 },
  { id: "construction_demolition", label: "C&D Recycled Aggregate (IS 383)", defaultHsn: "25171010", defaultPrice: 600 },
  { id: "slag", label: "GBFS Blast Furnace Slag", defaultHsn: "26190010", defaultPrice: 1800 },
  { id: "other", label: "Other Circular Byproduct", defaultHsn: "99999999", defaultPrice: 10000 },
];

const PRESET_IMAGES: Record<MaterialCategory, string> = {
  non_ferrous: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?auto=format&fit=crop&w=800&q=80",
  plastic: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
  paper_cardboard: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80",
  ewaste: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  glass: "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&w=800&q=80",
  wood: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80",
  textile: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
  rubber: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80",
  organic: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
  ferrous: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  fly_ash: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80",
  construction_demolition: "https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?auto=format&fit=crop&w=800&q=80",
  slag: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  other: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
};

export const RealTimeEntryModal: React.FC<RealTimeEntryModalProps> = ({
  isOpen,
  onClose,
  activeRole,
  onEntryCreated,
}) => {
  const [category, setCategory] = useState<MaterialCategory>("non_ferrous");
  const [title, setTitle] = useState<string>("Secondary Aluminium Extrusion Scrap (Grade 6063)");
  const [grade, setGrade] = useState<string>("6063-T6 Pure Profile");
  const [quantityMT, setQuantityMT] = useState<number>(12.5);
  const [pricePerMT, setPricePerMT] = useState<number>(198000);
  const [reusabilityScore, setReusabilityScore] = useState<number>(94);
  const [city, setCity] = useState<string>(activeRole.location.split(",")[0] || "Sanand");
  const [state, setState] = useState<string>("Gujarat");
  const [hsnCode, setHsnCode] = useState<string>("76020010");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  // Real-time calculations
  const carbonImpact = calculateMaterialCarbonImpact(category, quantityMT);
  const totalValueInr = Math.round(pricePerMT * quantityMT);

  const handleCategoryChange = (newCat: MaterialCategory) => {
    setCategory(newCat);
    const selectedOpt = CATEGORY_OPTIONS.find((c) => c.id === newCat);
    if (selectedOpt) {
      setHsnCode(selectedOpt.defaultHsn);
      setPricePerMT(selectedOpt.defaultPrice);
      if (newCat === "non_ferrous") {
        setTitle("Secondary Aluminium Extrusion Scrap (Grade 6063)");
        setGrade("6063-T6 Pure Profile");
        setReusabilityScore(94);
      } else if (newCat === "plastic") {
        setTitle("Optical Clean rPET Flakes (Post-Industrial)");
        setGrade("rPET Extrusion Flakes Grade A");
        setReusabilityScore(91);
      } else if (newCat === "ferrous") {
        setTitle("Heavy Melting Steel Scrap (HMS 1/2)");
        setGrade("HMS 1/2 80:20 Mix");
        setReusabilityScore(88);
      } else if (newCat === "fly_ash") {
        setTitle("Thermal Fly Ash Pozzolanic (IS 3812 Class F)");
        setGrade("IS 3812 Class F Grade I");
        setReusabilityScore(85);
      } else if (newCat === "construction_demolition") {
        setTitle("Recycled Concrete Aggregate (IS 383 Class II)");
        setGrade("IS 383 Coarse 20mm");
        setReusabilityScore(82);
      } else if (newCat === "slag") {
        setTitle("Granulated Blast Furnace Slag (GBFS)");
        setGrade("IS 12089 Grade A");
        setReusabilityScore(86);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const passportId = `CUS-${category.slice(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${state.slice(0, 2).toUpperCase()}`;
      const listingId = `LIST-${Math.floor(1000 + Math.random() * 9000)}`;
      const timestamp = new Date().toISOString();
      const txHash = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`;

      const valuation = calculateDynamicValuation(category, "good", quantityMT, 40);
      valuation.basePricePerMT = pricePerMT;
      valuation.estimatedTotalInr = totalValueInr;

      const recordPayload = {
        id: passportId,
        materialType: title,
        grade,
        quantityMT,
        reusabilityScore,
        ownerOrg: activeRole.orgName,
        ownerGstin: activeRole.gstin,
        timestamp,
      };
      const recordHash = generateSimpleRecordHash(recordPayload);

      // Create Passport
      const newPassport: MaterialPassport = {
        id: passportId,
        title,
        materialType: title.split("(")[0].trim(),
        category,
        grade,
        quantityMT,
        reusabilityScore,
        contaminationRisk: reusabilityScore >= 90 ? "low" : "medium",
        condition: "good",
        confidenceScore: 97,
        ownerOrg: activeRole.orgName,
        ownerGstin: activeRole.gstin,
        locationState: state,
        locationCity: city,
        spcbJurisdiction: `${state} Pollution Control Board`,
        hsnCode,
        eprCategory: category === "plastic" ? "Category I (Rigid rPET)" : "Industrial Byproduct Stream",
        hazardousFlag: false,
        createdAt: timestamp,
        verifiedAt: timestamp,
        verificationStatus: "verified",
        ledgerTxHash: txHash,
        recordHash,
        imageUrl: PRESET_IMAGES[category] || PRESET_IMAGES.non_ferrous,
        suggestedApplications: [
          "Direct secondary remelting & casting",
          "Automotive & construction extrusion alloys",
          "Circular closed-loop manufacturing",
        ],
        processingNeeded: ["Magnetic separation", "Bale compression"],
        visualEvidence: [
          "Uniform metallurgical / polymer surface consistency",
          "No visible oil sludge or halogenated contamination",
        ],
        carbonImpact: {
          co2eAvoidedKg: carbonImpact.avoidedCo2eKg,
          landfillDivertedMT: quantityMT,
          methodologyNote: carbonImpact.methodologyNote,
          emissionFactorUsed: carbonImpact.emissionFactorUsed,
        },
        valuation,
        lifecycleStage: "recovery",
        evidenceStatus: "third_party_verified",
        notes: `Real-time batch registered by ${activeRole.orgName} via CIRCULUS dispatch console.`,
      };

      // Create Marketplace Listing
      const newListing: MarketplaceListing = {
        id: listingId,
        passportId,
        title,
        materialType: title.split("(")[0].trim(),
        category,
        grade,
        quantityMT,
        minimumOrderMT: Math.min(5, quantityMT),
        pricePerMT,
        totalValueInr,
        sellerOrg: activeRole.orgName,
        sellerGstin: activeRole.gstin,
        city,
        state,
        spcbJurisdiction: `${state} Pollution Control Board`,
        hsnCode,
        eprEligible: category === "plastic" || category === "non_ferrous",
        imageUrl: PRESET_IMAGES[category] || PRESET_IMAGES.non_ferrous,
        reusabilityScore,
        co2eAvoidedKg: carbonImpact.avoidedCo2eKg,
        verificationStatus: "verified",
        createdAt: timestamp,
        status: "active",
      };

      // Create Ledger Event
      const newEvent: OwnershipEvent = {
        id: `EVT-${Date.now()}`,
        passportId,
        eventType: "PASSPORT_MINTED",
        timestamp,
        actor: activeRole.orgName,
        actorRole: activeRole.id,
        location: `${city}, ${state}`,
        notes: `Real-time material batch minted and listed on exchange. Quantity: ${quantityMT} MT. HSN: ${hsnCode}. Avoided CO₂e: ${(carbonImpact.avoidedCo2eKg / 1000).toFixed(1)} t.`,
        txHash,
        recordHash,
        blockNumber: 104850,
      };

      setIsSubmitting(false);
      onEntryCreated(newPassport, newListing, newEvent);
      onClose();
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto overscroll-contain">
      <div className="glass-panel glow-edge-cyan rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative my-8 animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent-cyan text-primary flex items-center justify-center text-ink font-bold">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-ink uppercase tracking-tight font-display">
                Add Real-Time Material Entry
              </h2>
              <p className="text-xs uppercase tracking-wider font-mono text-slate-500">
                Instant Passport Minting & Live Marketplace Auction
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-ink flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Category Dropdown */}
          <div>
            <label className="block text-sm uppercase tracking-wider text-slate-400 font-semibold mb-1.5">
              Material Stream Category
            </label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value as MaterialCategory)}
              className="w-full bg-primary border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-ink focus:border-accent-cyan focus:bg-primary/50 focus:outline-none font-semibold"
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </div>

          {/* Title & Grade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm uppercase tracking-wider text-slate-400 font-semibold mb-1">
                Material Name / Batch Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2 text-sm text-ink focus:border-accent-cyan focus:bg-primary/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-slate-400 font-semibold mb-1">
                Standard Alloy / Polymer Grade
              </label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                required
                className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2 text-sm text-ink focus:border-accent-cyan focus:bg-primary/50 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Volume, Price & Circularity */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm uppercase tracking-wider text-slate-400 font-semibold mb-1">
                Batch Volume (MT)
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={quantityMT}
                onChange={(e) => setQuantityMT(parseFloat(e.target.value) || 1)}
                required
                className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2 text-sm text-ink focus:border-accent-cyan focus:bg-primary/50 focus:outline-none font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-slate-400 font-semibold mb-1">
                Unit Price (₹/MT)
              </label>
              <input
                type="number"
                step="500"
                min="100"
                value={pricePerMT}
                onChange={(e) => setPricePerMT(parseFloat(e.target.value) || 100)}
                required
                className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2 text-sm text-accent-cyan focus:border-accent-cyan focus:bg-primary/50 focus:outline-none font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-slate-400 font-semibold mb-1">
                Circularity Score (0-100)
              </label>
              <input
                type="number"
                min="50"
                max="100"
                value={reusabilityScore}
                onChange={(e) => setReusabilityScore(parseInt(e.target.value) || 90)}
                className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2 text-sm text-ink focus:border-accent-cyan focus:bg-primary/50 focus:outline-none font-mono font-bold"
              />
            </div>
          </div>

          {/* Location & HSN */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm uppercase tracking-wider text-slate-400 font-semibold mb-1">
                City / Industrial Cluster
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2 text-sm text-ink focus:border-accent-cyan focus:bg-primary/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-slate-400 font-semibold mb-1">
                State
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2 text-sm text-ink focus:border-accent-cyan focus:bg-primary/50 focus:outline-none font-medium"
              >
                <option value="Gujarat">Gujarat</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Odisha">Odisha</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Delhi NCR">Delhi NCR</option>
              </select>
            </div>

            <div>
              <label className="block text-sm uppercase tracking-wider text-slate-400 font-semibold mb-1">
                GST HSN (8-digit)
              </label>
              <input
                type="text"
                value={hsnCode}
                onChange={(e) => setHsnCode(e.target.value)}
                required
                className="w-full bg-primary border border-white/10 rounded-lg px-3 py-2 text-sm text-ink focus:border-accent-cyan focus:bg-primary/50 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Live Calculated Impact Strip */}
          <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 grid grid-cols-2 gap-4 text-sm font-mono">
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block">Live Total Lot Value</span>
              <p className="text-xl font-bold text-accent-cyan mt-0.5">{formatInrCurrency(totalValueInr, true)}</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-bold block flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" /> Avoided Scope 3 CO₂e
              </span>
              <p className="text-xl font-bold text-emerald-700 mt-0.5">{(carbonImpact.avoidedCo2eKg / 1000).toFixed(1)} tCO₂e</p>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl bg-accent-cyan text-primary hover:bg-accent-cyan/80 text-ink font-bold text-sm uppercase tracking-tight transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-accent-cyan/20"
          >
            {isSubmitting ? (
              <span>Minting Digital Passport & Broadcasting Live...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-ink" />
                <span>Broadcast Real-Time Entry to Marketplace</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
