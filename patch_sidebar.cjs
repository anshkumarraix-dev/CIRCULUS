const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Sidebar.tsx', 'utf8');

code = code.replace(
  /w-64 bg-panel border-r border-white\/5/,
  'w-64 glass-panel border-r border-white/5'
);
code = code.replace(
  /bg-copper flex items-center justify-center shadow-\[0_0_15px_rgba\(168,93,51,0\.4\)\]/,
  'bg-accent-teal flex items-center justify-center shadow-[0_0_15px_rgba(42,157,143,0.4)]'
);
code = code.replace(
  /text-copper bg-copper\/10/,
  'text-accent-cyan bg-accent-cyan/10'
);
code = code.replace(
  /text-copper bg-copper\/20/,
  'text-accent-cyan bg-accent-cyan/20'
);
code = code.replace(
  /hover:bg-white\/5 hover:text-ink/g,
  'hover:bg-white/5 hover:text-ink transition-all'
);

fs.writeFileSync('src/components/layout/Sidebar.tsx', code);
