import React, { useState } from "react";
import { 
  X, 
  MapPin, 
  Leaf, 
  Truck, 
  Send, 
  CheckCircle2, 
  Layers,
  Sparkles,
  Award,
  IndianRupee
} from "lucide-react";
import { MarketplaceListing, MaterialPassport, UserRole } from "../../types";
import { formatInrCurrency, estimateFreightCostInr } from "../../lib/valuation-engine";

interface ListingDetailModalProps {
  listing: MarketplaceListing;
  passport?: MaterialPassport;
  onClose: () => void;
  onViewPassport: (passportId: string) => void;
  activeRole: UserRole;
  onSubmitOffer: (listingId: string, offerDetails: { quantityMT: number; offerPricePerMT: number; deliveryCity: string }) => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({
  listing,
  passport,
  onClose,
  onViewPassport,
  activeRole,
  onSubmitOffer,
}) => {
  const [weightUnit, setWeightUnit] = useState<"kg" | "tonne" | "metric_tonne">("metric_tonne");
  const [offerQty, setOfferQty] = useState<number>(listing.quantityMT);
  const [enteredOfferQty, setEnteredOfferQty] = useState<number>(listing.quantityMT);
  const [offerPrice, setOfferPrice] = useState<number>(listing.pricePerMT);
  const [destinationCity, setDestinationCity] = useState<string>("Ahmedabad Factory Gate");
  const [offerSubmitted, setOfferSubmitted] = useState<boolean>(false);

  const handleQtyChange = (val: number, unit: "kg" | "tonne" | "metric_tonne" = weightUnit) => {
    setEnteredOfferQty(val);
    const mt = unit === "kg" ? val / 1000 : val;
    setOfferQty(Math.max(0.001, parseFloat(mt.toFixed(4))));
  };

  const handleUnitChange = (newUnit: "kg" | "tonne" | "metric_tonne") => {
    setWeightUnit(newUnit);
    if (newUnit === "kg") {
      setEnteredOfferQty(Math.round(offerQty * 1000 * 10) / 10);
    } else {
      setEnteredOfferQty(Math.round(offerQty * 100) / 100);
    }
  };

  const estimatedFreight = estimateFreightCostInr(35, offerQty);
  const totalOfferValue = offerQty * offerPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitOffer(listing.id, {
      quantityMT: offerQty,
      offerPricePerMT: offerPrice,
      deliveryCity: destinationCity,
    });
    setOfferSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0F13]/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto overscroll-contain">
      <div className="glass-panel glow-edge-teal rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative my-8 animate-fadeIn">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold px-2.5 py-0.5 rounded-lg bg-copper/500/10 text-accent-gold/400 border border-copper/500/20">
                📦 {listing.category.replace("_", " ")}
              </span>
              <span className="text-sm font-semibold px-2 py-0.5 rounded-lg bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/20">
                {listing.reusabilityScore}% Clean Grade
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-ink tracking-tight mt-1.5">{listing.title}</h2>
            <p className="text-sm text-silver/80 mt-0.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FF6D00]" />
              Location: <strong className="text-ink">{listing.city}, {listing.state}</strong> • Seller: <strong className="text-ink">{listing.sellerOrg}</strong>
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-ink p-2 rounded-xl hover:bg-white/5 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Left: Product Photo & Details */}
          <div className="space-y-4">
            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/10 relative bg-white/5 shadow-xs">
              <img src={listing.imageUrl} alt={listing.materialType} className="w-full h-full object-cover" />
              <div className="absolute top-2.5 left-2.5 bg-[#0B0F13]/90 backdrop-blur-md px-2.5 py-1 rounded-xl text-sm font-bold text-ink border border-white/10 shadow-xs">
                {listing.quantityMT} Tons Available
              </div>
            </div>

            {/* Simple Facts Card */}
            <div className="bg-[#1E2630] p-4 rounded-2xl border border-white/10 space-y-2.5 text-sm">
              <div className="flex justify-between text-silver/80">
                <span>Total Weight:</span>
                <span className="text-ink font-bold">{listing.quantityMT} Tons ({listing.quantityMT * 1000} kg)</span>
              </div>
              <div className="flex justify-between text-silver/80">
                <span>Price per Ton:</span>
                <span className="text-accent-gold/400 font-bold font-mono">₹{listing.pricePerMT.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-silver/80">
                <span>Total Value:</span>
                <span className="text-ink font-extrabold font-mono">{formatInrCurrency(listing.totalValueInr, true)}</span>
              </div>
              <div className="flex justify-between text-silver/80 border-t border-white/10 pt-1.5">
                <span className="flex items-center gap-1 text-[#00E676] font-semibold">
                  <Leaf className="w-3.5 h-3.5" /> Smoke Prevented:
                </span>
                <span className="text-[#00E676] font-bold">{(listing.co2eAvoidedKg / 1000).toFixed(1)} Tons of CO₂</span>
              </div>
            </div>

            {/* What this becomes */}
            {passport && passport.suggestedApplications && (
              <div className="bg-copper/500/10 p-3 rounded-2xl border border-copper/500/30 text-sm text-accent-gold/100">
                <p className="font-bold text-sm uppercase tracking-wider text-accent-gold/400 mb-1">
                  ✨ What can be made from this scrap:
                </p>
                <p className="leading-relaxed">
                  {passport.suggestedApplications.join(", ")}
                </p>
              </div>
            )}

            <button
              onClick={() => {
                onClose();
                onViewPassport(listing.passportId);
              }}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-slate-700 border border-white/10 text-sm font-bold text-ink transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <Layers className="w-4 h-4 text-[#FF6D00]" />
              View Full Product ID Card (Aadhaar)
            </button>
          </div>

          {/* Right: Buy / Send Offer Form */}
          <div className="space-y-4">
            <div className="bg-[#1E2630] p-5 rounded-2xl border border-white/10 space-y-4">
              <div>
                <h4 className="text-sm font-bold text-ink uppercase tracking-wider flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5 text-accent-gold/400" />
                  Send Buy Offer to Seller
                </h4>
                <p className="text-sm text-silver/80 mt-0.5">
                  Enter how many tons you want and what price you would like to pay.
                </p>
              </div>

              {offerSubmitted ? (
                <div className="bg-[#00E676]/10 p-5 rounded-2xl border border-[#00E676]/30 text-center space-y-2 py-8">
                  <div className="w-10 h-10 rounded-full bg-[#00E676]/20 text-[#00E676] flex items-center justify-center mx-auto border border-[#00E676]/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <p className="text-base font-bold text-[#00E676]">Offer Sent Successfully!</p>
                  <p className="text-sm text-[#00E676]/80">
                    {listing.sellerOrg} has received your purchase offer of {offerQty} Tons for ₹{totalOfferValue.toLocaleString("en-IN")}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 text-sm">
                  <div className="bg-[#0B0F13] p-3 rounded-xl border border-white/10 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label className="block text-silver font-bold text-xs uppercase tracking-wider">
                        Purchase Quantity
                      </label>
                      {/* Unit Selector Pills */}
                      <div className="inline-flex p-0.5 rounded-lg bg-black/40 border border-white/10 text-xs font-semibold">
                        <button
                          type="button"
                          onClick={() => handleUnitChange("kg")}
                          className={`px-2 py-0.5 rounded-md transition cursor-pointer ${
                            weightUnit === "kg"
                              ? "bg-copper text-white font-bold shadow-xs"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          kg
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUnitChange("tonne")}
                          className={`px-2 py-0.5 rounded-md transition cursor-pointer ${
                            weightUnit === "tonne"
                              ? "bg-copper text-white font-bold shadow-xs"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          Tonne
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUnitChange("metric_tonne")}
                          className={`px-2 py-0.5 rounded-md transition cursor-pointer ${
                            weightUnit === "metric_tonne"
                              ? "bg-copper text-white font-bold shadow-xs"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          Metric Tonnes (MT)
                        </button>
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        type="number"
                        min={weightUnit === "kg" ? (listing.minimumOrderMT || 1) * 1000 : listing.minimumOrderMT || 0.1}
                        max={weightUnit === "kg" ? listing.quantityMT * 1000 : listing.quantityMT}
                        step={weightUnit === "kg" ? 100 : 0.5}
                        value={enteredOfferQty}
                        onChange={(e) => handleQtyChange(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#12141A] border border-white/10 rounded-xl px-3 py-2 text-sm font-bold text-ink focus:border-copper focus:outline-none"
                      />
                      <span className="absolute right-3 top-2 text-xs font-bold text-slate-400 font-mono uppercase">
                        {weightUnit === "kg" ? "KG" : weightUnit === "tonne" ? "TONNES" : "MT"}
                      </span>
                    </div>

                    {/* Equivalent conversion */}
                    <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
                      <span>Max available: {listing.quantityMT} MT ({(listing.quantityMT * 1000).toLocaleString("en-IN")} kg)</span>
                      <span className="text-emerald-400 font-bold">= {offerQty} MT ({offerQty * 1000} kg)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-silver font-bold mb-1">
                      Your Offer Price (₹ per Ton)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-slate-500 font-bold">₹</span>
                      <input
                        type="number"
                        step={100}
                        value={offerPrice}
                        onChange={(e) => setOfferPrice(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#0B0F13] border border-white/10 rounded-xl pl-7 pr-3 py-2 text-sm font-bold text-ink focus:border-copper/500 focus:outline-none"
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Seller asking: ₹{listing.pricePerMT.toLocaleString("en-IN")} / Ton</p>
                  </div>

                  <div>
                    <label className="block text-silver font-bold mb-1">
                      Your Factory Delivery City
                    </label>
                    <input
                      type="text"
                      value={destinationCity}
                      onChange={(e) => setDestinationCity(e.target.value)}
                      placeholder="e.g. Changodar, Ahmedabad"
                      className="w-full bg-[#0B0F13] border border-white/10 rounded-xl px-3 py-2 text-sm text-ink focus:border-copper/500 focus:outline-none font-medium placeholder-slate-600"
                    />
                  </div>

                  {/* Summary Box */}
                  <div className="bg-panel p-3.5 rounded-xl border border-white/10 space-y-1.5">
                    <div className="flex justify-between font-bold text-ink">
                      <span>Total Amount You Pay:</span>
                      <span className="text-accent-gold/400 font-mono text-base">₹{totalOfferValue.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>Est. Truck Transport:</span>
                      <span className="font-mono text-silver/80">~₹{estimatedFreight.estimatedFreightInr.toLocaleString("en-IN")}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-copper/600 hover:bg-copper/500 text-ink font-bold text-sm transition cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Purchase Offer to Seller</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
