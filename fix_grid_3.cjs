const fs = require('fs');
let code = fs.readFileSync('src/components/marketplace/MarketplaceGrid.tsx', 'utf-8');

code = code.replace(
  /          \}\)\}\n        <\/div>\n      <\/div>\n      \{\/\* 10th-Grade Friendly Explainer Banner with Clean Blur Design \*\/\}/,
  "          ))}\n        </div>\n      </div>\n      </div>\n      {/* 10th-Grade Friendly Explainer Banner with Clean Blur Design */}"
);

fs.writeFileSync('src/components/marketplace/MarketplaceGrid.tsx', code);
