const fs = require('fs');
let code = fs.readFileSync('src/components/marketplace/MarketplaceGrid.tsx', 'utf8');

code = code.replace(
  /<input\n\s*type="range"/,
  '<motion.input\n                  whileHover={{ scale: 1.02 }}\n                  whileTap={{ scale: 0.98 }}\n                  type="range"'
);

code = code.replace(
  /accent-emerald-400"\n\s*\/>/,
  'accent-accent-cyan shadow-[0_0_15px_rgba(79,216,232,0.5)]"\n                />'
);

fs.writeFileSync('src/components/marketplace/MarketplaceGrid.tsx', code);
