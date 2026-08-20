const fs = require('fs');
let code = fs.readFileSync('src/components/marketplace/MarketplaceGrid.tsx', 'utf-8');

// Remove import
code = code.replace(/import \{ LiveActivityTicker \} from "\.\.\/common\/LiveActivityTicker";\n/, '');

// Remove component usage
code = code.replace(/      \{\/\* Live Activity Ticker \*\/\}\n      <LiveActivityTicker\n        events=\{events\}\n        onOpenNewEntryModal=\{onOpenRealTimeEntryModal\}\n      \/>\n/, '');

fs.writeFileSync('src/components/marketplace/MarketplaceGrid.tsx', code);
