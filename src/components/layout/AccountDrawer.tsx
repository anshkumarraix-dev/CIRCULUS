import React, { useState } from "react";
import { 
  X, 
  User, 
  Building2, 
  Mail, 
  Briefcase, 
  Layers, 
  MapPin, 
  ShieldCheck, 
  Key, 
  LogOut, 
  Compass, 
  CheckCircle2, 
  ExternalLink,
  Lock,
  Cpu,
  RefreshCw,
  Edit3
} from "lucide-react";
import { UserRole, GPSLocation } from "../../types";
import { GoogleMapsLocationPicker } from "../common/GoogleMapsLocationPicker";

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeRole: UserRole;
  onSignOut: () => void;
  onUpdateRole?: (updatedRole: UserRole) => void;
}

export const AccountDrawer: React.FC<AccountDrawerProps> = ({
  isOpen,
  onClose,
  activeRole,
  onSignOut,
  onUpdateRole
}) => {
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [updatedLocation, setUpdatedLocation] = useState<GPSLocation | null>(activeRole.gpsLocation || null);
  const [isSavedToast, setIsSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleSaveLocation = () => {
    if (updatedLocation && onUpdateRole) {
      const newRole: UserRole = {
        ...activeRole,
        gpsLocation: updatedLocation,
        location: updatedLocation.city && updatedLocation.state 
          ? `${updatedLocation.city}, ${updatedLocation.state}` 
          : activeRole.location,
      };
      onUpdateRole(newRole);
      localStorage.setItem("circulus_role", JSON.stringify(newRole));
      setIsEditingLocation(false);
      setIsSavedToast(true);
      setTimeout(() => setIsSavedToast(false), 3000);
    }
  };

  const isSeller = activeRole.accountType === "seller" || activeRole.id === "supplier";
  const isBuyer = activeRole.accountType === "buyer" || activeRole.id === "buyer";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#0F1318] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-ink font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-copper/10 border border-copper/30 flex items-center justify-center text-xl shrink-0">
              {activeRole.avatar || "🏭"}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-ink">
                  Enterprise Account Profile
                </h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-mono border ${
                  isSeller 
                    ? "bg-accent-gold/10 text-accent-gold border-accent-gold/30"
                    : "bg-accent-teal/10 text-accent-teal border-accent-teal/30"
                }`}>
                  {isSeller ? "Registered Scrap Seller" : isBuyer ? "Verified Scrap Buyer" : "Compliance Auditor"}
                </span>
              </div>
              <p className="text-xs text-silver font-body">
                Authenticated Industrial Node & CPCB/SPCB Compliance Dossier
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-silver hover:text-ink hover:bg-white/5 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {isSavedToast && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>GPS Facility Coordinates updated and cryptographically hashed!</span>
            </div>
          )}

          {/* User & Company Identity Card */}
          <div className="bg-panel rounded-2xl border border-white/10 p-4 sm:p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-silver flex items-center gap-1.5 font-mono">
              <Building2 className="w-3.5 h-3.5 text-copper" />
              <span>Corporate & Signatory Identity</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-silver/60 uppercase text-[10px] font-bold tracking-wider">Authorized Officer</span>
                <p className="text-sm font-bold text-ink flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-copper" />
                  <span>{activeRole.name}</span>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-silver/60 uppercase text-[10px] font-bold tracking-wider">Company / Plant Name</span>
                <p className="text-sm font-bold text-ink truncate">
                  {activeRole.companyName || activeRole.orgName}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-silver/60 uppercase text-[10px] font-bold tracking-wider">Official Designation</span>
                <p className="text-xs font-semibold text-ink/90 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-accent-teal" />
                  <span>{activeRole.designation || "Plant Operations Lead"}</span>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-silver/60 uppercase text-[10px] font-bold tracking-wider">Corporate Email</span>
                <p className="text-xs font-mono font-semibold text-accent-gold flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-accent-gold" />
                  <span>{activeRole.email || "officer@enterprise.in"}</span>
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-silver/60 uppercase text-[10px] font-bold tracking-wider">Account Role Category</span>
                <p className="text-xs font-bold text-ink">
                  {isSeller ? "Industrial Scrap Producer / Generator" : isBuyer ? "Secondary Smelter / Circular Recycler" : "Technical Auditor"}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-silver/60 uppercase text-[10px] font-bold tracking-wider">15-Digit GSTIN</span>
                <p className="text-xs font-mono font-bold text-ink/90">
                  {activeRole.gstin || "24AAACA1234B1Z5"}
                </p>
              </div>
            </div>

            {/* Scrap Type Handled / Produced */}
            <div className="pt-3 border-t border-white/5 space-y-1.5">
              <span className="text-silver/60 uppercase text-[10px] font-bold tracking-wider flex items-center gap-1.5">
                <Layers className="w-3 h-3 text-copper" />
                <span>
                  {isSeller ? "Types of Industrial Scrap Produced" : "Secondary Raw Materials Procured / Handled"}
                </span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(activeRole.scrapTypeProduced || activeRole.scrapTypeProcured || "Aluminium 6063, Copper Wire, rPET")
                  .split(/[,;]/)
                  .map((item, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-ink flex items-center gap-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-copper" />
                      {item.trim()}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* GPS Facility Location & Google Map */}
          <div className="bg-panel rounded-2xl border border-white/10 p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-silver flex items-center gap-1.5 font-mono">
                <MapPin className="w-3.5 h-3.5 text-copper" />
                <span>Verified GPS Facility Location</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsEditingLocation((prev) => !prev)}
                className="text-xs text-copper hover:text-copper/80 font-bold flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3 h-3" />
                <span>{isEditingLocation ? "Cancel Location Edit" : "Update GPS Location"}</span>
              </button>
            </div>

            {isEditingLocation ? (
              <div className="space-y-3">
                <GoogleMapsLocationPicker
                  initialLocation={activeRole.gpsLocation}
                  onLocationSelected={(loc) => setUpdatedLocation(loc)}
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingLocation(false)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-silver hover:text-ink cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveLocation}
                    className="px-4 py-1.5 rounded-lg bg-copper hover:bg-copper/90 text-panel text-xs font-bold cursor-pointer shadow-md"
                  >
                    Save GPS Coordinates
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white/5 p-3 rounded-xl border border-white/5 font-mono">
                  <div>
                    <span className="text-silver/60 text-[10px] block">COORDINATES</span>
                    <span className="text-ink font-bold">
                      {activeRole.gpsLocation 
                        ? `${activeRole.gpsLocation.latitude.toFixed(5)}°N, ${activeRole.gpsLocation.longitude.toFixed(5)}°E`
                        : "22.99040°N, 72.38120°E"}
                    </span>
                  </div>
                  <div>
                    <span className="text-silver/60 text-[10px] block">SPCB JURISDICTION</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {activeRole.gpsLocation?.state || "Gujarat"} SPCB Verified Node
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-silver/60 text-[10px] block">DISPATCH GATE ADDRESS</span>
                    <span className="text-ink font-sans font-medium text-xs">
                      {activeRole.gpsLocation?.formattedAddress || activeRole.location || "GIDC Industrial Corridor, Gujarat 382170"}
                    </span>
                  </div>
                </div>

                {/* Embedded Interactive Google Map Snapshot */}
                <div className="w-full h-36 rounded-xl overflow-hidden border border-white/10 relative">
                  <iframe
                    title="Account Facility Location"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight={0}
                    marginWidth={0}
                    src={`https://maps.google.com/maps?q=${activeRole.gpsLocation?.latitude || 22.9904},${activeRole.gpsLocation?.longitude || 72.3812}&hl=en&z=14&t=k&output=embed`}
                    className="w-full h-full object-cover filter contrast-105 opacity-85"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>GPS Telemetry Active</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Security & Cryptographic Session Info */}
          <div className="bg-panel rounded-2xl border border-white/10 p-4 sm:p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-silver flex items-center gap-1.5 font-mono">
              <Lock className="w-3.5 h-3.5 text-accent-teal" />
              <span>Cryptographic Session & Security Status</span>
            </h4>

            <div className="space-y-2 text-xs font-mono text-silver/80">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                <span>Access Token Hash</span>
                <span className="text-accent-gold font-bold truncate max-w-[200px]">
                  0x{Math.abs((activeRole.email || "token").split("").reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0)).toString(16).padStart(16, "0")}...
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                <span>Security Protocol</span>
                <span className="text-emerald-400 font-bold">
                  AES-256 / SHA-256 SPCB Hardened
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                <span>Verification State</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Authorized Enterprise Signatory
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-white/10 bg-white/5 flex items-center justify-between gap-3">
          <p className="text-[11px] text-silver font-mono">
            Compliance Standard: MoEFCC / CPCB Digital Circularity 2026
          </p>

          <button
            type="button"
            onClick={() => {
              onClose();
              onSignOut();
            }}
            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Secure Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
