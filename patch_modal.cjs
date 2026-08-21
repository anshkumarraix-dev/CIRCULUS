const fs = require('fs');
let code = fs.readFileSync('src/components/common/RealTimeEntryModal.tsx', 'utf8');

code = code.replace(
  /bg-\[\#12181F\] rounded-3xl border border-slate-700 max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 animate-fadeIn/,
  'glass-panel glow-edge-cyan rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative my-8 animate-fadeIn'
);
code = code.replace(
  /bg-blue-600/g,
  'bg-accent-cyan text-primary'
);
code = code.replace(
  /text-blue-700/g,
  'text-accent-cyan'
);
code = code.replace(
  /hover:bg-blue-700/g,
  'hover:bg-accent-cyan/80'
);
code = code.replace(
  /shadow-blue-600\/20/g,
  'shadow-accent-cyan/20'
);
code = code.replace(
  /bg-slate-800 border border-slate-700/g,
  'bg-primary border border-white/10'
);
code = code.replace(
  /focus:border-blue-500 focus:bg-\[\#12181F\]/g,
  'focus:border-accent-cyan focus:bg-primary/50'
);
code = code.replace(
  /text-slate-500 hover:text-white bg-slate-100 hover:bg-slate-200/g,
  'text-ink-muted hover:text-ink bg-white/5 hover:bg-white/10'
);
code = code.replace(
  /text-white/g,
  'text-ink'
);
code = code.replace(
  /bg-slate-900\/40 backdrop-blur-sm/g,
  'bg-primary/60 backdrop-blur-md'
);

fs.writeFileSync('src/components/common/RealTimeEntryModal.tsx', code);
