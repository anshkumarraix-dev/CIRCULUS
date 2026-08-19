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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      {/* Main Clean Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab("marketplace")}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[#1B4332] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
              <Recycle className="w-5 h-5 text-emerald-300 stroke-[2.2]" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 font-display">CIRCULUS</span>
            </div>
          </button>
        </div>

        {/* Center Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/80">
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
                    ? "bg-white text-[#1B4332] shadow-xs border border-slate-200/80"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#1B4332]" : "text-slate-400"}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? "bg-emerald-50 text-[#1B4332] border border-emerald-200" : "bg-slate-200 text-slate-700"
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
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm shadow-[#1B4332]/20"
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
                ? "bg-[#1B4332] text-white border-[#1B4332]"
                : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:text-slate-900 shadow-2xs"
            }`}
            title="Ask Questions in Simple Words"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isCopilotOpen ? "text-white" : "text-emerald-600"}`} />
            <span className="hidden md:inline">AI Helper</span>
          </button>

          {/* How it Works Link */}
          <button
            onClick={onOpenDemoTour}
            className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition cursor-pointer rounded-xl hover:bg-slate-100"
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
              className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs transition cursor-pointer shadow-2xs"
            >
              <div className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-xs">
                {activeRole.avatar}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-slate-900 font-bold truncate max-w-[110px] leading-tight text-xs">{activeRole.orgName}</p>
                <p className="text-[10px] text-slate-500 leading-none mt-0.5">{activeRole.name}</p>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-2.5 z-50 animate-fadeIn">
                <div className="px-2 py-1.5 border-b border-slate-100 mb-1.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ACTIVE ORGANIZATION</p>
                  <p className="text-xs font-bold text-slate-900 mt-0.5">{activeRole.orgName}</p>
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
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-sm">
                        {role.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold truncate text-slate-900 text-xs">{role.orgName}</p>
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
      <div className="lg:hidden px-3 py-2 bg-slate-50/90 border-t border-slate-200/80 overflow-x-auto flex gap-1.5 scrollbar-none">
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
                  : "bg-white text-slate-600 border border-slate-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
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
