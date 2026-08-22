import React from "react";
import { 
  Store, 
  Search, 
  Plus, 
  ShieldCheck, 
  History, 
  FileText, 
  Leaf, 
  Camera
} from "lucide-react";
import { UserRole } from "../../types";
import { CirculusLogo } from "../common/CirculusLogo";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeRole: UserRole;
  onOpenRealTimeEntry: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  activeRole,
  onOpenRealTimeEntry,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const navGroups = [
    {
      title: "Trade",
      items: [
        { id: "marketplace", label: "Marketplace", icon: Store },
        { id: "matches", label: "Find Buyers", icon: Search },
      ]
    },
    {
      title: "Compliance",
      items: [
        { id: "passports", label: "Digital ID Cards", icon: ShieldCheck },
        { id: "ledger", label: "Safe History", icon: History },
        { id: "compliance", label: "Rules & Permits", icon: FileText },
      ]
    },
    {
      title: "Insights",
      items: [
        { id: "impact", label: "Green Impact", icon: Leaf },
        { id: "scanner", label: "Photo Scanner", icon: Camera },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:sticky lg:top-0 lg:h-screen inset-y-0 left-0 z-50
        w-64 glass-panel border-r border-white/5
        flex flex-col transition-transform duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="mb-8">
            <CirculusLogo size="md" showTagline={true} glow={true} />
          </div>
          
          <button
            onClick={() => {
              onOpenRealTimeEntry();
              setIsMobileOpen(false);
            }}
            className="w-full py-3 mb-6 rounded-lg bg-copper hover:bg-copper/90 text-white font-bold text-base flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Scrap Lot</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 pb-6 space-y-8">
          {navGroups.map((group) => (
            <div key={group.title}>
              <h3 className="px-3 mb-2 text-xs font-bold text-silver/60 uppercase tracking-widest font-mono">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileOpen(false);
                      }}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-base transition cursor-pointer
                        ${isActive 
                          ? "bg-copper/10 text-copper border-l-2 border-copper font-bold" 
                          : "text-silver hover:text-ink hover:bg-white/5 border-l-2 border-transparent"
                        }
                      `}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-copper" : "text-silver/70"}`} />
                      <span className="font-body">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="px-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-base shrink-0">
              {activeRole.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-ink font-bold truncate text-sm">{activeRole.orgName}</p>
              <p className="text-xs text-silver truncate font-body">{activeRole.name}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
