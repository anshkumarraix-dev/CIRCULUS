import React from "react";
import { 
  PlayCircle, 
  X, 
  Sparkles, 
  Layers, 
  Search, 
  Users2, 
  ShieldCheck, 
  BarChart3, 
  ArrowRight,
  CheckCircle2,
  Camera,
  BookOpen
} from "lucide-react";

interface DemoTourGuideProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateStep: (tab: string, passportId?: string) => void;
}

const TOUR_STEPS = [
  {
    step: "1",
    tab: "scanner",
    title: "1. Photo Quality Scanner",
    subtitle: "AI Scrap Recognition",
    desc: "Take or pick a photo of metal, plastic, or ash. The smart AI tells you how clean it is, what items can be made from it, and estimates its fair price in Rupees.",
    icon: Camera,
    badge: "Step 1: Scan",
  },
  {
    step: "2",
    tab: "passports",
    title: "2. Digital Product ID (Aadhaar Card)",
    subtitle: "Verified Scrap Identity",
    desc: "Creates an official digital certificate for the batch. Includes a scannable QR code tag to print and stick on truck transport bags and bills.",
    icon: Layers,
    badge: "Step 2: ID Card",
  },
  {
    step: "3",
    tab: "marketplace",
    title: "3. Buy & Sell Marketplace",
    subtitle: "Direct Factory Scrap Trading",
    desc: "Browse verified scrap lots across India with real product photos, clean prices in Rupees, and 1-click purchase offer forms.",
    icon: Search,
    badge: "Step 3: Market",
  },
  {
    step: "4",
    tab: "matches",
    title: "4. Match with Nearby Factories",
    subtitle: "Short Truck Routes",
    desc: "Finds factories located nearby that want your scrap to make new goods. Calculates exact lorry road distance to save transport money and fuel.",
    icon: Users2,
    badge: "Step 4: Matches",
  },
  {
    step: "5",
    tab: "ledger",
    title: "5. Safe Timeline of Ownership",
    subtitle: "Permanent Record",
    desc: "Keeps an authentic record of who made, inspected, and bought the scrap, preventing fake or stolen material from being traded.",
    icon: ShieldCheck,
    badge: "Step 5: Safety",
  },
  {
    step: "6",
    tab: "impact",
    title: "6. Clean Air & Trees Saved",
    subtitle: "Green Planet Impact",
    desc: "Shows the exact kilograms of black chimney smoke prevented and the tree planting equivalent of recycling this scrap.",
    icon: BarChart3,
    badge: "Step 6: Green Wins",
  },
];

export const DemoTourGuide: React.FC<DemoTourGuideProps> = ({
  isOpen,
  onClose,
  onNavigateStep,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#12181F] rounded-3xl border border-slate-700 max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 animate-fadeIn">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white tracking-tight">
                  How Circulus Works (Simple 6-Step Guide)
                </h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Easy Tour
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Understand how factories turn leftover scrap into valuable new products step-by-step.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-400 p-1.5 rounded-xl hover:bg-slate-100 cursor-pointer text-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOUR_STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-slate-50 p-5 rounded-2xl border border-slate-700 hover:border-blue-300 hover:bg-blue-50/40 transition duration-300 space-y-3 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-800">
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-blue-600">
                      STEP {item.step}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-white mt-2 group-hover:text-blue-600 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onNavigateStep(item.tab);
                    onClose();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#12181F] hover:bg-blue-600 hover:text-white text-blue-700 border border-slate-700 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs group-hover:border-blue-600"
                >
                  <span>Open {item.title.split(".")[1]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            💡 Click any step button to jump directly to that feature!
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-300 text-xs font-bold transition cursor-pointer"
          >
            Got it, Let's Start!
          </button>
        </div>
      </div>
    </div>
  );
};
