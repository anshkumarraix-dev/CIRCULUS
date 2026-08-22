import React, { useState, useRef, useEffect } from "react";
import { 
  Menu, 
  User, 
  LogOut, 
  ChevronDown, 
  ShieldCheck, 
  Building2, 
  MapPin,
  ExternalLink,
  Layers,
  Sparkles,
  Compass
} from "lucide-react";
import { UserRole } from "../../types";
import { CirculusLogo } from "../common/CirculusLogo";

interface AppHeaderProps {
  activeRole: UserRole;
  onOpenRealTimeEntry?: () => void;
  onOpenMobileMenu?: () => void;
  onOpenAccountDetails?: () => void;
  onSignOut: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  activeRole,
  onOpenRealTimeEntry,
  onOpenMobileMenu,
  onOpenAccountDetails,
  onSignOut
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const isSeller = activeRole.accountType === "seller" || activeRole.id === "supplier";

  return (
    <header className="h-16 border-b border-white/5 glass-panel flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 bg-[#0A0B0D]/90 backdrop-blur-md font-sans">
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button 
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 -ml-1 text-silver hover:text-ink transition rounded-lg hover:bg-white/5 cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="lg:hidden flex items-center">
          <CirculusLogo size="xs" showTagline={false} glow={false} />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
        {/* GPS Node Location Pill */}
        <div 
          onClick={onOpenAccountDetails}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-silver hover:text-ink font-mono transition cursor-pointer"
          title="Click to view verified GPS coordinates"
        >
          <Compass className="w-3.5 h-3.5 text-copper" />
          <span className="truncate max-w-[140px]">
            {activeRole.gpsLocation?.city || activeRole.location || "Sanand, GJ"}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Account Button & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            aria-expanded={isDropdownOpen}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-medium text-ink transition cursor-pointer"
          >
            <div className="w-6 h-6 rounded-md bg-copper/20 border border-copper/30 flex items-center justify-center text-xs shrink-0">
              {activeRole.avatar || <User className="w-3.5 h-3.5 text-copper" />}
            </div>
            <div className="text-left hidden sm:block">
              <span className="font-semibold text-xs text-ink block leading-none truncate max-w-[120px]">
                {activeRole.name}
              </span>
              <span className="text-[10px] text-silver block leading-none mt-0.5 truncate max-w-[120px]">
                {isSeller ? "Seller Node" : "Buyer Node"}
              </span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-silver transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Account Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-32px)] rounded-2xl bg-[#12141A] border border-white/10 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-ink">
              {/* User Profile Summary */}
              <div className="flex items-start gap-3 pb-3 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-copper/10 border border-copper/30 flex items-center justify-center text-lg shrink-0">
                  {activeRole.avatar || "🏭"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-ink font-bold truncate text-sm">
                      {activeRole.companyName || activeRole.orgName}
                    </p>
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  </div>
                  <p className="text-xs text-silver truncate">{activeRole.name}</p>
                  <p className="text-[11px] text-copper/90 font-medium truncate mt-0.5">
                    {activeRole.designation || "Plant Operations Lead"}
                  </p>
                </div>
              </div>

              {/* Account Facility & Scrap Details */}
              <div className="py-3 space-y-2 text-xs text-silver">
                <div className="flex items-center gap-2 text-silver/90">
                  <MapPin className="w-3.5 h-3.5 text-copper shrink-0" />
                  <span className="truncate">
                    {activeRole.gpsLocation?.formattedAddress || activeRole.location}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-silver/90">
                  <Layers className="w-3.5 h-3.5 text-accent-teal shrink-0" />
                  <span className="truncate">
                    Scrap: {activeRole.scrapTypeProduced || activeRole.scrapTypeProcured || "Aluminium, Ferrous"}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1 font-mono text-[11px] text-silver/60">
                  <span>GSTIN: {activeRole.gstin || "24AAACA1234B1Z5"}</span>
                  <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    SPCB Verified
                  </span>
                </div>
              </div>

              {/* View Full Profile Dossier Button */}
              <div className="pt-2 border-t border-white/10 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    if (onOpenAccountDetails) onOpenAccountDetails();
                  }}
                  className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-ink transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-copper" />
                  <span>View Full Account & GPS Dossier</span>
                </button>

                {/* Sign Out Action */}
                <button
                  type="button"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    onSignOut();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 text-xs font-semibold transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out of Gateway</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
