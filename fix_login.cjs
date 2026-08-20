const fs = require('fs');
let code = fs.readFileSync('src/components/auth/LoginPage.tsx', 'utf-8');

// Replace colors
code = code.replace(/bg-\[#00E676\]/g, 'bg-copper');
code = code.replace(/hover:bg-\[#00c968\]/g, 'hover:bg-copper/90');
code = code.replace(/text-\[#00E676\]/g, 'text-copper');
code = code.replace(/border-\[#00E676\]/g, 'border-copper');
code = code.replace(/ring-\[#00E676\]/g, 'ring-copper');
code = code.replace(/shadow-\[0_0_15px_rgba\(0,230,118,0\.3\)\]/g, 'shadow-[0_0_15px_rgba(239,122,59,0.3)]');
code = code.replace(/bg-\[#12181F\]/g, 'bg-primary');
code = code.replace(/bg-slate-900/g, 'bg-panel');
code = code.replace(/bg-slate-800/g, 'bg-white/5');
code = code.replace(/bg-slate-700/g, 'bg-white/10');
code = code.replace(/border-slate-800/g, 'border-white/5');
code = code.replace(/border-slate-700/g, 'border-white/10');
code = code.replace(/border-slate-600/g, 'border-white/20');
code = code.replace(/bg-black\/40/g, 'bg-white/5');
code = code.replace(/text-slate-400/g, 'text-silver');
code = code.replace(/text-slate-500/g, 'text-silver/60');
code = code.replace(/text-slate-600/g, 'text-silver/40');
code = code.replace(/text-slate-700/g, 'text-silver/30');
code = code.replace(/placeholder-slate-600/g, 'placeholder-silver/40');
code = code.replace(/placeholder-slate-700/g, 'placeholder-silver/30');

// Replace green elements in the hero text / logo if they exist
code = code.replace(/from-\[#00E676\]/g, 'from-copper');
code = code.replace(/to-\[#00E676\]/g, 'to-copper');

fs.writeFileSync('src/components/auth/LoginPage.tsx', code);
