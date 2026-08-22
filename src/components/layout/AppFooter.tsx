import React from "react";
import { Recycle, ShieldAlert, Sparkles, ExternalLink } from "lucide-react";
import { CirculusLogo } from "../common/CirculusLogo";

export const AppFooter: React.FC = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 mt-16 text-slate-600 text-sm">
      {/* Top Footer Section with Coordinates & Professional Typography */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-slate-200/80">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12">
          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Industrial Hub</span>
            <span className="text-sm font-mono text-slate-800 font-medium tracking-tight">Gujarat & Maharashtra Corridors</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">System Status</span>
            <span className="text-sm font-mono text-slate-800 font-medium tracking-tight flex items-center gap-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              ACTIVE_DISPATCH
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Standard Framework</span>
            <span className="text-sm font-mono text-slate-800 font-medium tracking-tight">CPCB EPR • SEBI BRSR P6</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-bold">Protocol Release</span>
            <span className="text-sm font-mono text-blue-700 font-bold tracking-tight">V.4.2 // ENTERPRISE</span>
          </div>
        </div>

        <div className="flex flex-col md:items-end">
          <CirculusLogo size="sm" showTagline={true} glow={false} />
        </div>
      </div>

      {/* Disclaimers & Regulatory Notices */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <Recycle className="w-4 h-4 text-blue-600" />
          <span className="font-bold text-slate-800">CIRCULUS PROTOCOL</span>
          <span>•</span>
          <span>Algorithmic B2B Secondary Resource Exchange</span>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <span className="font-mono text-xs">E-WAY BILL / GST COMPLIANT</span>
          <span>•</span>
          <span className="font-mono text-xs">CARBON ACCOUNTING (ISO 14064)</span>
          <span>•</span>
          <span className="text-xs">© 2026 CIRCULUS INDIA. ALL RIGHTS RESERVED.</span>
        </div>
      </div>
    </footer>
  );
};

