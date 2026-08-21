import React, { useState } from "react";
import { 
  Sparkles, 
  Menu,
  ChevronDown
} from "lucide-react";
import { UserRole } from "../../types";

interface AppHeaderProps {
  onOpenMobileMenu: () => void;
  activeRole: UserRole;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onOpenMobileMenu,
  activeRole
}) => {
  return (
    <header className="h-16 border-b border-white/5 glass-panel flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 -ml-2 text-silver hover:text-ink transition"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="lg:hidden font-extrabold text-xl tracking-tight text-ink font-display">
          CIRCULUS
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
      </div>
    </header>
  );
};
