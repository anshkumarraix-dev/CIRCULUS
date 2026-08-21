const fs = require('fs');
let code = fs.readFileSync('src/components/marketplace/MarketplaceGrid.tsx', 'utf8');

code = code.replace(/text-copper/g, 'text-accent-gold');
code = code.replace(/text-copper\/800/g, 'text-accent-gold');
code = code.replace(/bg-copper\/100/g, 'bg-accent-gold/10');
code = code.replace(/bg-copper/g, 'bg-accent-gold');
code = code.replace(/text-white/g, 'text-primary'); // in some badges maybe? Wait, let's just do copper replacements.
code = code.replace(/border-copper/g, 'border-accent-gold');

fs.writeFileSync('src/components/marketplace/MarketplaceGrid.tsx', code);
