import React from "react";
import { Zap, ArrowRight, ShieldCheck, Plus, Sparkles } from "lucide-react";
import { OwnershipEvent } from "../../types";

interface LiveActivityTickerProps {
  events: OwnershipEvent[];
  onOpenNewEntryModal: () => void;
  onSelectEvent?: (passportId: string) => void;
}

export const LiveActivityTicker: React.FC<LiveActivityTickerProps> = ({
  events,
  onOpenNewEntryModal,
  onSelectEvent,
}) => {
  const recentEvents = events.slice(0, 5);

  return (
    <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
      
      {/* Left indicator & latest event marquee */}
      <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[10px] font-semibold uppercase tracking-wider shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          REAL-TIME FEED
        </div>

        {recentEvents.length > 0 ? (
          <div className="flex items-center gap-2 overflow-hidden text-xs truncate">
            <span className="font-semibold text-slate-900 truncate">
              {recentEvents[0].actor}:
            </span>
            <span className="text-slate-600 truncate">
              {recentEvents[0].notes}
            </span>
            <span className="text-[11px] font-mono text-slate-500 shrink-0">
              ({recentEvents[0].location.split(",")[0]})
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Ready for live factory entries. Click "+ Add Real-Time Entry" to broadcast.</span>
          </div>
        )}
      </div>

      {/* Right Quick Real-Time Entry Action Button */}
      <button
        id="btn-quick-realtime-entry"
        onClick={onOpenNewEntryModal}
        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs uppercase tracking-tight flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm shadow-blue-600/20 shrink-0"
      >
        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>+ Add Real-Time Entry</span>
      </button>
    </div>
  );
};

