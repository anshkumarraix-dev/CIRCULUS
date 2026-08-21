const fs = require('fs');
let code = fs.readFileSync('src/components/marketplace/MarketplaceGrid.tsx', 'utf8');

code = code.replace(
  /          <\/div>\n          <\/div>\n          \n          \{\/\* Section 3: Interactive Process Steps \*\//,
  '          </div>\n          \n          {/* Section 3: Interactive Process Steps */'
);

fs.writeFileSync('src/components/marketplace/MarketplaceGrid.tsx', code);
