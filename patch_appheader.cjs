const fs = require('fs');
let code = fs.readFileSync('src/components/layout/AppHeader.tsx', 'utf8');

code = code.replace(
  /className="h-16 border-b border-white\/5 bg-panel flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30"/,
  'className="h-16 border-b border-white/5 glass-panel flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30"'
);

fs.writeFileSync('src/components/layout/AppHeader.tsx', code);
