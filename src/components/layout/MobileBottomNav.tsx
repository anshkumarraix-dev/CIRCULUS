import React from "react";
import { 
  Store, 
  Search, 
  Camera, 
  ShieldCheck, 
  Leaf
} from "lucide-react";

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenRealTimeEntry?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab
}) => {
  const navItems = [
    { id: "marketplace", label: "Exchange", icon: Store },
    { id: "matches", label: "Matches", icon: Search },
    { id: "scanner", label: "Scan", icon: Camera },
    { id: "passports", label: "Passports", icon: ShieldCheck },
    { id: "impact", label: "Impact", icon: Leaf },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0A0B0D]/95 backdrop-blur-lg border-t border-white/10 px-2 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
                isActive ? "text-copper" : "text-silver hover:text-ink"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] font-medium mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
