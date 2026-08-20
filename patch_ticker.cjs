const fs = require('fs');
let code = fs.readFileSync('src/components/common/LiveActivityTicker.tsx', 'utf-8');

code = code.replace(/bg-\[#12181F\]/g, 'bg-panel');
code = code.replace(/border-slate-700/g, 'border-white/5');
code = code.replace(/bg-emerald-50 text-emerald-700 border border-emerald-200/g, 'bg-copper/10 text-copper border border-copper/30 font-body');
code = code.replace(/bg-emerald-500/g, 'bg-copper');
code = code.replace(/text-slate-400/g, 'text-silver font-body');
code = code.replace(/text-slate-500/g, 'text-silver/60 font-body');
code = code.replace(/text-white/g, 'text-ink font-body');
code = code.replace(/bg-blue-600/g, 'bg-copper');
code = code.replace(/hover:bg-blue-700/g, 'hover:bg-copper/90');
code = code.replace(/shadow-blue-600\/20/g, 'shadow-copper/20');
code = code.replace(/font-mono/g, 'font-mono');

fs.writeFileSync('src/components/common/LiveActivityTicker.tsx', code);
