const fs = require('fs');
let code = fs.readFileSync('src/components/marketplace/MarketplaceGrid.tsx', 'utf-8');

code = code.replace(
  /      <\/div>\s*\n\s*\)\}\n\s*\{\/\* Search & Dynamic Interactive Filters \*\/\}/,
  "      {/* Search & Dynamic Interactive Filters */}"
);

fs.writeFileSync('src/components/marketplace/MarketplaceGrid.tsx', code);
