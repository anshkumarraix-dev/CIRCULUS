const fs = require('fs');
let code = fs.readFileSync('src/components/marketplace/MarketplaceGrid.tsx', 'utf8');

code = code.replace(
  /<\/motion.div>\n\n          \{\/\* Search and Filter Bar \*\//,
  ''
);

code = code.replace(
  /          \{\/\* Section 3: Interactive Process Steps \*\//,
  '          </motion.div>\n          {/* Section 3: Interactive Process Steps */'
);

fs.writeFileSync('src/components/marketplace/MarketplaceGrid.tsx', code);
