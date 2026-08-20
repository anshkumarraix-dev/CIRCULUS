const fs = require('fs');
let code = fs.readFileSync('src/components/marketplace/MarketplaceGrid.tsx', 'utf-8');
code = code.replace(/Factory\s*X,/, 'Factory,\n  X,');
fs.writeFileSync('src/components/marketplace/MarketplaceGrid.tsx', code);
