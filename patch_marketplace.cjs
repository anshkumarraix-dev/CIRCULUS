const fs = require('fs');
let code = fs.readFileSync('src/components/marketplace/MarketplaceGrid.tsx', 'utf-8');

// 1. Add MaterialBadge import and remove hardcoded badges
code = code.replace(
  /import \{ LiveActivityTicker \} from "\.\.\/common\/LiveActivityTicker";/,
  `import { LiveActivityTicker } from "../common/LiveActivityTicker";\nimport { MaterialBadge } from "../ui/MaterialBadge";`
);

// 2. Add local storage for onboarding
code = code.replace(
  /const \[showHelperInfo, setShowHelperInfo\] = useState<boolean>\(true\);/,
  `const [showHelperInfo, setShowHelperInfo] = useState<boolean>(true);
  const [introDismissed, setIntroDismissed] = useState<boolean>(true);
  
  React.useEffect(() => {
    const dismissed = localStorage.getItem('circulus_marketplace_intro_dismissed') === 'true';
    setIntroDismissed(dismissed);
  }, []);

  const dismissIntro = () => {
    localStorage.setItem('circulus_marketplace_intro_dismissed', 'true');
    setIntroDismissed(true);
  };`
);

// 3. Fix price ticker
// The existing code has:
/*
      <div className="bg-slate-900 text-white p-3 sm:p-4 rounded-2xl border border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs overflow-hidden">
        <div className="flex items-center gap-2 font-bold text-emerald-400 shrink-0">
          <TrendingUp className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>India Scrap Spot Benchmarks:</span>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto w-full pb-1 sm:pb-0 scrollbar-none">
          {BENCHMARK_TICKERS.map((t, idx) => (
*/
code = code.replace(
  /<div className="bg-slate-900 text-white p-3 sm:p-4 rounded-2xl border border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs overflow-hidden">[\s\S]*?<div className="flex items-center gap-3 overflow-x-auto w-full pb-1 sm:pb-0 scrollbar-none">/,
  `<div className="bg-panel text-ink p-3 sm:p-4 rounded-lg border border-white/5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-bold text-copper shrink-0">
          <TrendingUp className="w-4 h-4 text-copper animate-pulse" />
          <span className="font-display">India Scrap Spot Benchmarks:</span>
        </div>
        <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex min-w-max items-center gap-6">`
);

// Add the closing div for min-w-max flex
code = code.replace(
  /<\/div>\s*<\/div>\s*\{\/\* Search and Filter Header \*\/\}/,
  `          </div>\n        </div>\n      </div>\n\n      {/* Search and Filter Header */}`
);

// Fix colors in the benchmark buttons
code = code.replace(
  /className={`shrink-0 px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap flex flex-col \${selectedCategory === t\.category \? "bg-emerald-950\/80 border-emerald-500\/50 shadow-\[0_0_15px_rgba\(16,185,129,0\.15\)\]" : "bg-\[#1E2630\] border-slate-700 hover:border-slate-500"}`}/g,
  "className={`shrink-0 px-3 py-1.5 rounded-lg border transition-all cursor-pointer whitespace-nowrap flex flex-col ${selectedCategory === t.category ? \"bg-copper/10 border-copper/50\" : \"bg-white/5 border-white/10 hover:border-white/30\"}`}"
);

code = code.replace(/text-emerald-400 font-bold/g, 'text-copper font-mono font-bold');
code = code.replace(/text-slate-300 font-medium/g, 'text-silver font-medium font-body');

// 4. Update the onboarding card
const oldOnboarding = /<div className="relative rounded-3xl overflow-hidden p-6 border border-blue-200\/80 bg-gradient-to-r from-blue-50\/90 via-emerald-50\/80 to-teal-50\/90 shadow-xs">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const newOnboarding = `
      {/* Marketplace Onboarding Popover */}
      {!introDismissed && (
        <div className="relative rounded-lg p-6 border border-copper/30 bg-copper/5 shadow-sm mb-6 flex justify-between items-start">
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-sm sm:text-base text-ink flex items-center gap-2 font-display">
              What is this Marketplace?
            </h4>
            <p className="text-silver leading-relaxed font-body">
              When manufacturing factories have leftover clean scrap (like cut-off aluminium profiles, washed clear plastic bottles, or steel beams), they list them here. Other secondary manufacturing plants buy and melt them directly into new products. <strong className="text-ink">1 MT = 1,000 Kilograms (1 Metric Ton).</strong>
            </p>
          </div>
          <button onClick={dismissIntro} className="p-2 text-silver hover:text-ink transition">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
      <div className="flex justify-end mb-4">
        {introDismissed && (
          <button onClick={() => setIntroDismissed(false)} className="text-[10px] text-silver hover:text-copper flex items-center gap-1 font-body">
            <HelpCircle className="w-3 h-3" /> How it works
          </button>
        )}
      </div>
`;

code = code.replace(oldOnboarding, newOnboarding);

// Make sure X and HelpCircle are imported
if (!code.includes('HelpCircle')) {
  code = code.replace(/import \{ ([^}]+) \} from "lucide-react";/, 'import { $1, X, HelpCircle } from "lucide-react";');
}

// 5. Replace generic Tailwind blues/slates in search/filter header
code = code.replace(/bg-\[#12181F\]/g, 'bg-panel');
code = code.replace(/bg-\[#1E2630\]/g, 'bg-white/5');
code = code.replace(/border-slate-700\/80/g, 'border-white/5');
code = code.replace(/border-slate-700/g, 'border-white/10');
code = code.replace(/text-slate-400/g, 'text-silver');
code = code.replace(/text-slate-300/g, 'text-ink/80');
code = code.replace(/text-slate-500/g, 'text-silver/60');
code = code.replace(/text-emerald-400/g, 'text-copper');
code = code.replace(/text-emerald-500/g, 'text-copper');
code = code.replace(/bg-emerald-500/g, 'bg-copper');
code = code.replace(/bg-blue-600/g, 'bg-copper');
code = code.replace(/bg-blue-700/g, 'bg-copper/90');
code = code.replace(/shadow-blue-600\/20/g, 'shadow-copper/20');
code = code.replace(/border-blue-500\/50/g, 'border-copper/50');

// Replace badge markup with MaterialBadge component
// We can use regex to replace `<span className="px-2.5 py-1 text-\[10px\] font-semibold uppercase tracking-widest rounded-full.*?>.*?<\/span>` 
// Actually, it's safer to just let the MaterialBadge be used where applicable.
code = code.replace(/<span className="px-2.5 py-1 text-\[10px\] font-semibold uppercase tracking-widest rounded-full bg-slate-800 text-slate-300">([^<]+)<\/span>/g, '<MaterialBadge category={listing.category} />');
code = code.replace(/<span className="px-2\.5 py-1 text-\[10px\] font-semibold uppercase tracking-widest rounded-full bg-blue-900\/50 text-blue-300 border border-blue-700\/50">\s*([^<]+)\s*<\/span>/g, '<MaterialBadge category={listing.category} />');

fs.writeFileSync('src/components/marketplace/MarketplaceGrid.tsx', code);
