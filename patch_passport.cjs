const fs = require('fs');
let code = fs.readFileSync('src/components/passport/MaterialPassportView.tsx', 'utf8');

// Replace copper colors with cyan or teal or gold
code = code.replace(/bg-copper\/600/g, 'bg-accent-cyan text-primary');
code = code.replace(/hover:bg-copper\/700/g, 'hover:bg-accent-cyan/80');
code = code.replace(/text-copper\/500/g, 'text-accent-gold');
code = code.replace(/bg-copper\/500/g, 'bg-accent-gold');
code = code.replace(/border-copper\/500/g, 'border-accent-gold');
code = code.replace(/shadow-blue-600\/20/g, 'shadow-accent-cyan/20');
code = code.replace(/bg-\[\#00E676\]/g, 'bg-accent-teal');
code = code.replace(/border-\[\#00E676\]/g, 'border-accent-teal');
code = code.replace(/text-\[\#00E676\]/g, 'text-accent-teal');

// Panels to glass-panel where appropriate
code = code.replace(/bg-panel rounded-3xl border border-white\/10 overflow-hidden shadow-xs/g, 'glass-panel glow-edge-cyan rounded-3xl overflow-hidden');
code = code.replace(/bg-gradient-to-r from-\[\#1E2630\] via-\[\#12181F\] to-\[\#1E2630\]/g, 'bg-panel-steel/30 backdrop-blur-md');

code = code.replace(/bg-\[\#1E2630\]/g, 'bg-white/5');
code = code.replace(/bg-\[\#0B0F13\]/g, 'bg-transparent');
code = code.replace(/bg-\[\#12181F\]/g, 'bg-primary');

// Modals
code = code.replace(/bg-panel rounded-3xl border border-white\/10 p-6 sm:p-7 max-w-lg w-full space-y-5 shadow-2xl animate-fadeIn my-6/g, 'glass-panel glow-edge-cyan rounded-3xl p-6 sm:p-7 max-w-lg w-full space-y-5 shadow-2xl animate-fadeIn my-6');
code = code.replace(/bg-panel\/50 backdrop-blur-sm/g, 'bg-primary/60 backdrop-blur-md');
code = code.replace(/bg-slate-50/g, 'bg-panel');
code = code.replace(/text-slate-500/g, 'text-ink-muted');

// General text colors
code = code.replace(/text-silver/g, 'text-ink-muted');
code = code.replace(/text-silver\/80/g, 'text-ink-muted');
code = code.replace(/border-white\/10/g, 'border-white/10');

fs.writeFileSync('src/components/passport/MaterialPassportView.tsx', code);
