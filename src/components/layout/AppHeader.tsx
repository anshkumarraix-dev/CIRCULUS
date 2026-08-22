import React, { useState, useRef, useEffect } from "react";
import { 
  Menu,
  Plus,
  User,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Building2,
  MapPin
} from "lucide-react";
import { UserRole } from "../../types";
import { CirculusLogo } from "../common/CirculusLogo";

interface AppHeaderProps {
  activeRole: UserRole;
  onOpenRealTimeEntry?: () => void;
  onOpenMobileMenu?: () => void;
  onSignOut: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  activeRole,
  onOpenRealTimeEntry,
  onOpenMobileMenu,
  onSignOut
}) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    };
    if (isAccountOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAccountOpen]);

  return (
    <header className="h-16 border-b border-white/5 glass-panel flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 bg-[#0A0B0D]/90 backdrop-blur-md">
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

      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        {/* Account Button & Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsAccountOpen((prev) => !prev)}
            aria-expanded={isAccountOpen}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-medium text-ink transition cursor-pointer"
          >
            <div className="w-6 h-6 rounded-md bg-copper/20 border border-copper/30 flex items-center justify-center text-xs shrink-0">
              {activeRole.avatar || <User className="w-3.5 h-3.5 text-copper" />}
            </div>
            <span className="font-medium">Account</span>
            <ChevronDown className={`w-3.5 h-3.5 text-silver transition-transform duration-200 ${isAccountOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Account Dropdown Menu */}
          {isAccountOpen && (
            <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-32px)] rounded-xl bg-[#12141A] border border-white/10 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* User Profile Summary */}
              <div className="flex items-start gap-3 pb-3 border-b border-white/10">
                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-lg shrink-0">
                  {activeRole.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="text-ink font-bold truncate text-sm">{activeRole.orgName}</p>
                    {activeRole.isVerified && (
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-silver truncate font-body">{activeRole.name}</p>
                  {activeRole.gstin && activeRole.gstin !== "N/A" && (
                    <p className="text-[11px] font-mono text-silver/70 truncate mt-0.5">
                      GSTIN: {activeRole.gstin}
                    </p>
                  )}
                </div>
              </div>

              {/* Account Facility Details */}
              <div className="py-2.5 space-y-1.5 text-xs text-silver">
                {activeRole.location && activeRole.location !== "N/A" && (
                  <div className="flex items-center gap-2 text-silver/80">
                    <MapPin className="w-3.5 h-3.5 text-copper shrink-0" />
                    <span className="truncate">{activeRole.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-silver/80">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">
                    {activeRole.id === "guest" ? "Read-Only Exploration" : "Industrial Verified Node"}
                  </span>
                </div>
              </div>

              {/* Sign Out Action */}
              <div className="pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setIsAccountOpen(false);
                    onSignOut();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 text-xs sm:text-sm font-semibold transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

