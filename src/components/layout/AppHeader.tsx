import React from "react";
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
  const [roleDropdownOpen, setRoleDropdownOpen] = React.useState(false);

  const navItems = [
    { id: "marketplace", label: "Marketplace", sublabel: "Buy & Sell", icon: Search, badge: listingsCount },
    { id: "scanner", label: "Photo Scanner", sublabel: "AI Test", icon: Camera },
    { id: "passports", label: "Digital ID Cards", sublabel: "Product Aadhaar", icon: Layers, badge: passportsCount },
    { id: "matches", label: "Find Buyers", sublabel: "Smart Match", icon: Users2 },
    { id: "impact", label: "Green Impact", sublabel: "Trees & CO₂", icon: BarChart3 },
    { id: "ledger", label: "Safe History", sublabel: "Timeline", icon: History },
    { id: "compliance", label: "Rules & Permits", sublabel: "Simple Laws", icon: FileCheck2 },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      
      {/* Top clean micro bar with simple guidance */}
      <div className="bg-slate-100/90 px-4 sm:px-6 py-1.5 border-b border-slate-200 text-xs text-slate-600 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            CIRCULUS • Clean Recycling Made Easy
          </span>
          <span className="hidden sm:inline text-slate-500 text-xs">
            📍 Current User: <strong className="text-slate-700">{activeRole.orgName}</strong> ({activeRole.location})
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDemoTour}
            className="text-xs font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 transition cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>How it Works (Quick Tour)</span>
          </button>
          <span className="text-slate-300">|</span>
          <button
            onClick={onSignOut}
            className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition flex items-center gap-1 cursor-pointer"
          >
            <LogOut className="w-3 h-3" />
            <span className="hidden sm:inline">Change User</span>
          </button>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        
        {/* Brand Logo with Plain English Tagline */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab("marketplace")}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform duration-200">
              <Recycle className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 font-display">CIRCULUS</span>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">Industrial Scrap Recycling & Trading</p>
            </div>
          </button>
        </div>

        {/* Clean Nav Tabs with simple language */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-white text-blue-700 shadow-sm border border-slate-200 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-500"}`} />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-700"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Side: + Sell Scrap Button & Role Profile */}
        <div className="flex items-center gap-2.5">
          
          {/* Quick Add Scrap Button */}
          <button
            onClick={onOpenRealTimeEntry}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-sm shadow-blue-600/20"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span className="hidden sm:inline">Add My Scrap</span>
          </button>

          {/* AI Helper Bot Button */}
          <button
            id="btn-toggle-copilot"
            onClick={onToggleCopilot}
            className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              isCopilotOpen
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-slate-800 border-slate-200 hover:border-emerald-500 hover:text-emerald-700"
            }`}
            title="Ask Questions in Simple Words"
          >
            <Sparkles className={`w-4 h-4 ${isCopilotOpen ? "text-white" : "text-emerald-600"}`} />
            <span className="hidden md:inline">AI Helper</span>
          </button>

          {/* User Account Switcher */}
          <div className="relative">
            <button
              id="btn-role-switcher"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs text-left transition cursor-pointer shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-sm">
                {activeRole.avatar}
              </div>
              <div className="hidden sm:block">
                <p className="text-slate-900 font-bold truncate max-w-[120px] leading-tight">{activeRole.orgName}</p>
                <p className="text-[10px] text-slate-500 capitalize">{activeRole.id === "supplier" ? "Scrap Seller" : activeRole.id === "buyer" ? "Scrap Buyer" : "Inspector"}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-xl p-2.5 z-50">
                <div className="px-2 py-1.5 border-b border-slate-100 mb-1.5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">CHOOSE WHO YOU ARE</p>
                  <p className="text-[11px] text-slate-500">Switch between selling, buying, or checking green rules</p>
                </div>
                {USER_ROLES.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => {
                      setActiveRole(role);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition flex items-center gap-3 cursor-pointer mb-1 ${
                      activeRole.id === role.id
                        ? "bg-blue-50 text-blue-700 border border-blue-200 font-semibold"
                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-base">
                      {role.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate text-slate-900">{role.orgName}</p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {role.id === "supplier" ? "🏢 Sells scrap from factory" : role.id === "buyer" ? "🏭 Buys scrap to make new goods" : "📋 Checks safety & green rules"}
                      </p>
                    </div>
                  </button>
                ))}

                <div className="pt-1.5 mt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setRoleDropdownOpen(false);
                      onSignOut();
                    }}
                    className="w-full p-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition flex items-center gap-2 cursor-pointer"
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
      <div className="lg:hidden px-3 py-2 bg-slate-50 border-t border-slate-200 overflow-x-auto flex gap-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap font-semibold flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
