const fs = require('fs');
let code = fs.readFileSync('src/components/marketplace/MarketplaceGrid.tsx', 'utf-8');

code = code.replace(/bg-slate-900/g, 'bg-panel');
code = code.replace(/bg-slate-800/g, 'bg-white/5');
code = code.replace(/bg-slate-100/g, 'bg-white/10');
code = code.replace(/bg-slate-200\/80/g, 'bg-white/20');
code = code.replace(/bg-slate-700/g, 'bg-white/10');
code = code.replace(/border-slate-800/g, 'border-white/5');
code = code.replace(/border-slate-700/g, 'border-white/10');
code = code.replace(/text-slate-700/g, 'text-ink');
code = code.replace(/text-white/g, 'text-ink');
code = code.replace(/text-slate-600/g, 'text-silver/80');

fs.writeFileSync('src/components/marketplace/MarketplaceGrid.tsx', code);
