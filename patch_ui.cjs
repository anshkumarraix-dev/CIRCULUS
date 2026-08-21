const fs = require('fs');

// Patch Sidebar.tsx
let sidebar = fs.readFileSync('src/components/layout/Sidebar.tsx', 'utf8');

// Section headers
sidebar = sidebar.replace(
  /className="px-3 mb-2 text-xs font-semibold text-stone-300 uppercase tracking-wider font-mono"/g,
  'className="px-3 mb-2 text-[12px] font-[600] text-[#D6D3D1] uppercase tracking-[0.05em] font-mono"'
);

// Active Tab
sidebar = sidebar.replace(
  /\? "bg-orange-500\/10 text-orange-500 border-l-\[3px\] border-orange-500 font-bold"/g,
  '? "bg-[#F97316]/15 text-white border-l-[3px] border-[#F97316] font-bold"'
);

fs.writeFileSync('src/components/layout/Sidebar.tsx', sidebar);

// Patch MatchRecommendations.tsx
let match = fs.readFileSync('src/components/matches/MatchRecommendations.tsx', 'utf8');

// Add Radar to imports
if (!match.includes('Radar,')) {
  match = match.replace('Users2,', 'Radar,\n  Users2,');
}

// Hero banner compression
match = match.replace('p-6 sm:p-10', 'py-5 px-6');
match = match.replace('text-2xl sm:text-4xl', 'text-2xl');
match = match.replace('text-xs sm:text-sm text-slate-300', 'text-sm text-gray-300');

// Tab switcher styling
match = match.replace(
  'activeViewTab === "live_matches"\n                  ? "bg-[#00E676] text-[#0B0F13] shadow-md border border-[#00C853]"\n                  : "bg-[#1E2630]/80 hover:bg-[#1E2630] text-white backdrop-blur-md border border-slate-700"',
  'activeViewTab === "live_matches" ? "bg-[#10B981] text-black font-bold shadow-md" : "border border-gray-600 bg-transparent text-white hover:bg-white/5"'
);
match = match.replace(
  'activeViewTab === "buyer_directory"\n                  ? "bg-[#00E676] text-[#0B0F13] shadow-md border border-[#00C853]"\n                  : "bg-[#1E2630]/80 hover:bg-[#1E2630] text-white backdrop-blur-md border border-slate-700"',
  'activeViewTab === "buyer_directory" ? "bg-[#10B981] text-black font-bold shadow-md" : "border border-gray-600 bg-transparent text-white hover:bg-white/5"'
);

// Empty State Card
match = match.replace('<Users2 className="w-8 h-8" />', '<Radar className="w-8 h-8 animate-pulse text-[#10B981]" />');
match = match.replace(
  'className="px-6 py-3 rounded-2xl bg-[#00E676] hover:bg-[#00C853] text-[#0B0F13] font-extrabold text-xs transition cursor-pointer shadow-sm shadow-[#00E676]/20"',
  'className="px-6 py-3 rounded-2xl bg-[#10B981] text-[#000000] font-[700] text-sm transition cursor-pointer shadow-sm hover:opacity-90"'
);
// Make the empty state descriptive text more visible
match = match.replace(
  'text-xs text-slate-400 leading-relaxed',
  'text-sm text-[#D1D5DB] leading-relaxed'
);

// 3-Step Process Cards
match = match.replace(/bg-slate-50/g, 'bg-[#1F2937]');
match = match.replace(/text-slate-500 text-\[11px\]/g, 'text-gray-300 text-[12px]');

match = match.replace(
  '<span className="w-6 h-6 rounded-full bg-[#1B4332] text-white font-bold flex items-center justify-center text-[11px]">1</span>',
  '<span className="w-6 h-6 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-[11px]">1</span>'
);
match = match.replace(
  '<span className="w-6 h-6 rounded-full bg-[#1B4332] text-white font-bold flex items-center justify-center text-[11px]">2</span>',
  '<span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-[11px]">2</span>'
);
match = match.replace(
  '<span className="w-6 h-6 rounded-full bg-[#1B4332] text-white font-bold flex items-center justify-center text-[11px]">3</span>',
  '<span className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-[11px]">3</span>'
);

// Border stroke updates
match = match.replace(/border-slate-700/g, 'border-gray-700');
match = match.replace(/border-slate-800/g, 'border-gray-700');

// Ghost Preview Match Cards
match = match.replace(
  '<div className="flex items-center justify-between">\n                    <span className="font-bold text-xs text-[#00E676]">98% MATCH FIT • 42 KM</span>\n                    <span className="text-[10px] text-slate-500 font-mono">SANAND HUB</span>\n                  </div>',
  `<div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">98% MATCH FIT</span>
                    <span className="px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[10px] font-bold">42 KM • SANAND HUB</span>
                  </div>`
);
match = match.replace(
  '<div className="flex items-center justify-between">\n                    <span className="font-bold text-xs text-[#00E676]">95% MATCH FIT • 78 KM</span>\n                    <span className="text-[10px] text-slate-500 font-mono">HAZIRA CORRIDOR</span>\n                  </div>',
  `<div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">95% MATCH FIT</span>
                    <span className="px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[10px] font-bold">78 KM • HAZIRA CORRIDOR</span>
                  </div>`
);

match = match.replace(
  '<div className="flex justify-between text-xs text-slate-400 pt-2 border-t border-gray-700 font-mono">\n                    <span>Rate: ₹215,000/MT</span>\n                    <span className="text-[#00E676]">CO₂ Saved: 9.2 t/MT</span>\n                  </div>',
  `<div className="flex justify-between items-center text-xs text-gray-300 pt-3 border-t border-gray-700">
                    <span className="text-xl font-bold text-emerald-400">₹215,000/MT</span>
                    <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5"><Leaf className="w-3 h-3"/> CO₂ Saved: 9.2 t/MT</span>
                  </div>`
);
match = match.replace(
  '<div className="flex justify-between text-xs text-slate-400 pt-2 border-t border-gray-700 font-mono">\n                    <span>Rate: ₹68,000/MT</span>\n                    <span className="text-[#00E676]">CO₂ Saved: 2.3 t/MT</span>\n                  </div>',
  `<div className="flex justify-between items-center text-xs text-gray-300 pt-3 border-t border-gray-700">
                    <span className="text-xl font-bold text-emerald-400">₹68,000/MT</span>
                    <span className="bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full font-bold flex items-center gap-1.5"><Leaf className="w-3 h-3"/> CO₂ Saved: 2.3 t/MT</span>
                  </div>`
);

// Muted body text general fixes
match = match.replace(/text-slate-400/g, 'text-gray-300');
match = match.replace(/text-slate-300/g, 'text-gray-200');

fs.writeFileSync('src/components/matches/MatchRecommendations.tsx', match);
