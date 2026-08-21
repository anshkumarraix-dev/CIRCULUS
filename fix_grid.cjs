const fs = require('fs');
let code = fs.readFileSync('src/components/marketplace/MarketplaceGrid.tsx', 'utf8');

// Fix 1: The early closing motion.div
code = code.replace(
  /<\/motion\.div>\n\s*<div className="bg-panel p-4 sm:p-5 rounded-2xl border border-white\/10 shadow-xs">/,
  '</div>\n      <div className="bg-panel p-4 sm:p-5 rounded-2xl border border-white/10 shadow-xs">'
);

// Fix 2: The opening motion.div that doesn't have a close
code = code.replace(
  /<motion\.div style=\{\{ opacity: heroOpacity, y: heroY \}\} className="flex flex-col lg:flex-row gap-6 items-start justify-between relative">/,
  '<div className="flex flex-col lg:flex-row gap-6 items-start justify-between relative">'
);

// Fix 3: The motion.div for stagger children
code = code.replace(
  /<motion\.div variants=\{\{ hidden: \{ opacity: 0 \}, show: \{ opacity: 1, transition: \{ staggerChildren: 0.1 \} \} \}\} initial="hidden" whileInView="show" viewport=\{\{ once: true, margin: "-50px" \}\} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">/,
  '<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">'
);
code = code.replace(
  /<\/motion\.div>\n\s*<\/div>\n\s*\{\/\* Section 2:/,
  '</div>\n          </div>\n          {/* Section 2:'
);

fs.writeFileSync('src/components/marketplace/MarketplaceGrid.tsx', code);
