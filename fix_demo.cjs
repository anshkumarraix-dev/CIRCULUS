const fs = require('fs');
let code = fs.readFileSync('src/components/demo/DemoTourGuide.tsx', 'utf-8');

code = code.replace(/bg-\[#12181F\]/g, 'bg-panel');
code = code.replace(/bg-slate-900/g, 'bg-panel');
code = code.replace(/bg-slate-800/g, 'bg-white/5');
code = code.replace(/border-slate-800/g, 'border-white/5');
code = code.replace(/border-slate-700/g, 'border-white/10');
code = code.replace(/text-slate-400/g, 'text-silver/80');
code = code.replace(/text-slate-300/g, 'text-silver');
code = code.replace(/text-white/g, 'text-ink');
code = code.replace(/text-blue-/g, 'text-copper/');
code = code.replace(/bg-blue-/g, 'bg-copper/');
code = code.replace(/border-blue-/g, 'border-copper/');

fs.writeFileSync('src/components/demo/DemoTourGuide.tsx', code);
