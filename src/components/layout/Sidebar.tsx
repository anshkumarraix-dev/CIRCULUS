import React from "react";
import { 
  Store, 
  Search, 
  Plus, 
  ShieldCheck, 
  History, 
  FileText, 
  Leaf, 
  Camera,
  Settings,
  LogOut
} from "lucide-react";
import { UserRole } from "../../types";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeRole: UserRole;
  onSignOut: () => void;
  onDeleteAccount: () => void;
  onOpenRealTimeEntry: () => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  activeRole,
  onSignOut,
  onDeleteAccount,
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
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-panel border-r border-white/5
        flex flex-col transition-transform duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
             <div className="w-8 h-8 rounded bg-copper flex items-center justify-center shadow-[0_0_15px_rgba(168,93,51,0.4)]">
               <div className="w-4 h-4 border-2 border-black rounded-full border-t-transparent animate-spin"></div>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-ink font-display">CIRCULUS</span>
          </div>
          
          <button
            onClick={() => {
              onOpenRealTimeEntry();
              setIsMobileOpen(false);
            }}
            className="w-full py-3 mb-6 rounded-lg bg-copper hover:bg-copper/90 text-white font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Scrap Lot</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-8 scrollbar-hide">
          {navGroups.map((group) => (
            <div key={group.title}>
              <h3 className="px-3 mb-2 text-[10px] font-bold text-silver/60 uppercase tracking-widest font-mono">
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
                        w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition cursor-pointer
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
          <div className="mb-4 px-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-sm shrink-0">
              {activeRole.avatar}
            </div>
            <div className="min-w-0">
              <p className="text-ink font-bold truncate text-xs">{activeRole.orgName}</p>
              <p className="text-[10px] text-silver truncate font-body">{activeRole.name}</p>
            </div>
          </div>
          
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-silver hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-body">Sign Out</span>
          </button>
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete your account? All personal data will be anonymized and removed.")) {
                onDeleteAccount();
              }
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-silver hover:text-red-500 hover:bg-red-500/10 transition cursor-pointer mt-1"
          >
            <span className="font-body text-xs text-red-500/70">Delete Account</span>
          </button>

        </div>
      </aside>
    </>
  );
};
