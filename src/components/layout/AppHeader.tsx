import React, { useState } from "react";
import { 
  Sparkles, 
  Menu,
  ChevronDown
} from "lucide-react";
import { UserRole } from "../../types";

interface AppHeaderProps {
  onToggleCopilot: () => void;
  isCopilotOpen: boolean;
  onOpenMobileMenu: () => void;
  activeRole: UserRole;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onToggleCopilot,
  isCopilotOpen,
  onOpenMobileMenu,
  activeRole
}) => {
  return (
    <header className="h-16 border-b border-white/5 bg-panel flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 -ml-2 text-silver hover:text-ink transition"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="lg:hidden font-extrabold text-lg tracking-tight text-ink font-display">
          CIRCULUS
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* AI Helper Bot */}
        <button
          id="btn-toggle-copilot"
          onClick={onToggleCopilot}
          aria-label="Ask AI Helper"
          className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer font-body ${
            isCopilotOpen
              ? "bg-copper text-white border-copper"
              : "bg-primary text-silver border-white/10 hover:border-white/30 hover:text-ink shadow-sm"
          }`}
        >
          <Sparkles className={`w-3.5 h-3.5 ${isCopilotOpen ? "text-white" : "text-copper"}`} />
          <span className="hidden sm:inline">Ask AI Helper</span>
        </button>
      </div>
    </header>
  );
};
