const fs = require('fs');
let code = fs.readFileSync('src/components/marketplace/ListingDetailModal.tsx', 'utf8');

code = code.replace(
  /bg-panel rounded-3xl border border-white\/10 max-w-2xl w-full p-6 space-y-6 shadow-2xl relative my-8 animate-fadeIn/,
  'glass-panel glow-edge-teal rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative my-8 animate-fadeIn'
);
code = code.replace(/bg-blue-600/g, 'bg-accent-teal text-primary');
code = code.replace(/text-blue-600/g, 'text-accent-teal');
code = code.replace(/hover:bg-blue-700/g, 'hover:bg-accent-teal/80');
code = code.replace(/shadow-blue-600\/20/g, 'shadow-accent-teal/20');
code = code.replace(/border-blue-600/g, 'border-accent-teal');
code = code.replace(/text-copper/g, 'text-accent-gold');
code = code.replace(/bg-copper\/100/g, 'bg-accent-gold/10');
code = code.replace(/bg-panel\/50 backdrop-blur-sm/g, 'bg-primary/60 backdrop-blur-md');

fs.writeFileSync('src/components/marketplace/ListingDetailModal.tsx', code);
