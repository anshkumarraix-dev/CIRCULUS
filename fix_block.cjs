const fs = require('fs');
let code = fs.readFileSync('src/components/marketplace/MarketplaceGrid.tsx', 'utf8');

const regex = /          <\/div>\n          <\/div>\n          \{\/\* Section 3: Interactive Process Steps \*\/\}\n          <div className="bg-panel p-6 sm:p-8 rounded-3xl border border-white\/10 space-y-4 shadow-xs">/;

// Just search for the Section 3 comment and replace everything around it.
code = code.replace(/          <\/div>\n          <\/div>\n          <\/div>\n          \{\/\* Section 3: Interactive Process Steps \*\/\}\n          <div className="bg-panel p-6 sm:p-8 rounded-3xl border border-white\/10 space-y-4 shadow-xs">/,
`          </div>
          {/* Section 3: Interactive Process Steps */}
          <div className="bg-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4 shadow-xs">`
);

fs.writeFileSync('src/components/marketplace/MarketplaceGrid.tsx', code);
