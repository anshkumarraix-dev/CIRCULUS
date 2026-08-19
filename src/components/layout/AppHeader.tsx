import React, { useState } from "react";
import { 
  Recycle, 
  Layers, 
  Search, 
  Camera, 
  BarChart3, 
  History, 
  FileCheck2, 
  Users2, 
  ChevronDown, 
  Plus, 
  LogOut, 
  Sparkles, 
  BookOpen
} from "lucide-react";
import { UserRole } from "../../types";

interface AppHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeRole: UserRole;
  setActiveRole: (role: UserRole) => void;
  onOpenDemoTour: () => void;
  onToggleCopilot: () => void;
  onOpenRealTimeEntry: () => void;
  onSignOut: () => void;
  isCopilotOpen: boolean;
  passportsCount: number;
  listingsCount: number;
}

export const USER_ROLES: UserRole[] = [
  {
    id: "supplier",
    name: "Rajesh Varma",
    orgName: "Apex Aluminium Factory",
    gstin: "24AAACA1234B1Z5",
    location: "Sanand, Gujarat",
    avatar: "🏭",
  },
  {
    id: "buyer",
    name: "Vikram Malhotra",
    orgName: "Solar Frame Makers",
    gstin: "24AABCS9876C1Z9",
    location: "Changodar, Gujarat",
    avatar: "☀️",
  },
  {
    id: "auditor",
    name: "Dr. Ananya Sen",
    orgName: "Green Pollution Inspector",
    gstin: "24GPCB00000A1Z1",
    location: "Gandhinagar, Gujarat",
    avatar: "📋",
  },
];

export const AppHeader: React.FC<AppHeaderProps> = ({
  activeTab,
  setActiveTab,
  activeRole,
  setActiveRole,
  onOpenDemoTour,
  onToggleCopilot,
  onOpenRealTimeEntry,
  onSignOut,
  isCopilotOpen,
  passportsCount,
  listingsCount,
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navItems = [
    { id: "marketplace", label: "Marketplace", icon: Search, badge: listingsCount },
    { id: "scanner", label: "Photo Scanner", icon: Camera },
    { id: "passports", label: "Digital ID Cards", icon: Layers, badge: passportsCount },
    { id: "matches", label: "Find Buyers", icon: Users2 },
    { id: "impact", label: "Green Impact", icon: BarChart3 },
    { id: "ledger", label: "Safe History", icon: History },
    { id: "compliance", label: "Rules & Permits", icon: FileCheck2 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F13]/95 backdrop-blur-md border-b border-slate-800/90 shadow-xs">
      {/* Main Clean Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab("marketplace")}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[#00E676]/10 border border-[#00E676]/30 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
              <Recycle className="w-5 h-5 text-[#00E676] stroke-[2.2]" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white font-display">CIRCULUS</span>
            </div>
          </button>
        </div>

        {/* Center Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#12181F]/80 p-1 rounded-2xl border border-slate-700/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer font-bold ${
                  isActive
                    ? "bg-[#1E2630] text-[#00E676] shadow-xs border border-slate-600/80"
                    : "text-slate-400 hover:text-slate-200 hover:bg-[#1E2630]/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#00E676]" : "text-slate-500"}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? "bg-[#00E676]/20 text-[#00E676] border border-[#00E676]/30" : "bg-slate-800 text-slate-300"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Add Scrap */}
          <button
            onClick={onOpenRealTimeEntry}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#00E676] hover:bg-[#00C853] text-[#0B0F13] text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm shadow-[#00E676]/20"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Add Scrap Lot</span>
          </button>

          {/* AI Helper Bot */}
          <button
            id="btn-toggle-copilot"
            onClick={onToggleCopilot}
            className={`px-3 py-1.5 sm:py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              isCopilotOpen
                ? "bg-[#FF6D00] text-white border-[#FF6D00]"
                : "bg-[#12181F] text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white shadow-2xs"
            }`}
            title="Ask Questions in Simple Words"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isCopilotOpen ? "text-white" : "text-[#FF6D00]"}`} />
            <span className="hidden md:inline">AI Helper</span>
          </button>

          {/* How it Works Link */}
          <button
            onClick={onOpenDemoTour}
            className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer rounded-xl hover:bg-slate-800"
            title="Interactive Demo Tour"
          >
            <BookOpen className="w-3.5 h-3.5 text-slate-500" />
            <span>Tour</span>
          </button>

          {/* User Account Switcher */}
          <div className="relative">
            <button
              id="btn-role-switcher"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 bg-[#12181F] hover:bg-slate-800 border border-slate-700 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs transition cursor-pointer shadow-2xs"
            >
              <div className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs">
                {activeRole.avatar}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-white font-bold truncate max-w-[110px] leading-tight text-xs">{activeRole.orgName}</p>
                <p className="text-[10px] text-slate-500 leading-none mt-0.5">{activeRole.name}</p>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#12181F] border border-slate-700 rounded-2xl shadow-xl p-2.5 z-50 animate-fadeIn">
                <div className="px-2 py-1.5 border-b border-slate-100 mb-1.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ACTIVE ORGANIZATION</p>
                  <p className="text-xs font-bold text-white mt-0.5">{activeRole.orgName}</p>
                  <p className="text-[11px] text-slate-500">{activeRole.location} • GSTIN: {activeRole.gstin}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-1">SWITCH ROLE</p>
                  {USER_ROLES.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => {
                        setActiveRole(role);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-xl text-xs transition flex items-center gap-2.5 cursor-pointer ${
                        activeRole.id === role.id
                          ? "bg-emerald-50 text-[#1B4332] border border-emerald-200/80 font-bold"
                          : "text-slate-400 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sm">
                        {role.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate text-white text-xs">{role.orgName}</p>
                        <p className="text-[10px] text-slate-500 truncate">
                          {role.id === "supplier" ? "Scrap Seller" : role.id === "buyer" ? "Scrap Buyer" : "Compliance Auditor"}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-2 mt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setRoleDropdownOpen(false);
                      onSignOut();
                    }}
                    className="w-full p-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="lg:hidden px-3 py-2 bg-slate-50/90 border-t border-slate-700/80 overflow-x-auto flex gap-1.5 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap font-bold flex items-center gap-1.5 cursor-pointer transition ${
                isActive
                  ? "bg-[#1B4332] text-white shadow-xs"
                  : "bg-[#12181F] text-slate-400 border border-slate-700"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? "bg-[#12181F]/20 text-white" : "bg-slate-800 text-slate-400"
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
