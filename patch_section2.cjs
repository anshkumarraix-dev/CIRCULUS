const fs = require('fs');
let code = fs.readFileSync('src/components/marketplace/MarketplaceGrid.tsx', 'utf8');

code = code.replace(
  /<div className="relative rounded-3xl overflow-hidden border border-white\/5 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-ink p-6 sm:p-8 shadow-lg space-y-6">/,
  '<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="relative glass-panel glow-edge-teal rounded-3xl overflow-hidden border border-white/10 p-6 sm:p-8 shadow-2xl space-y-6">'
);

code = code.replace(
  /<\/div>\n\s*\{\/\* Search and Filter Bar \*\//,
  '</motion.div>\n\n          {/* Search and Filter Bar */'
);

fs.writeFileSync('src/components/marketplace/MarketplaceGrid.tsx', code);
