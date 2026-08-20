const fs = require('fs');
let code = fs.readFileSync('src/components/marketplace/MarketplaceGrid.tsx', 'utf-8');

code = code.replace(
  /\{showHelperInfo && \(\s*\{\/\* Marketplace Onboarding Popover \*\/\}/,
  "{/* Marketplace Onboarding Popover */}"
);

code = code.replace(
  /      <\/div>\n      \)\}\n      \{\/\* Search & Dynamic Interactive Filters \*\/\}/,
  "      {/* Search & Dynamic Interactive Filters */}"
);

fs.writeFileSync('src/components/marketplace/MarketplaceGrid.tsx', code);
