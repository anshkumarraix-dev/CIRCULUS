const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf-8');
if(!app.includes('import { Sidebar }')) {
  app = app.replace(
    /import \{ AppHeader \} from "\.\/components\/layout\/AppHeader";/,
    'import { AppHeader } from "./components/layout/AppHeader";\nimport { Sidebar } from "./components/layout/Sidebar";'
  );
}
fs.writeFileSync('src/App.tsx', app);

let grid = fs.readFileSync('src/components/marketplace/MarketplaceGrid.tsx', 'utf-8');
grid = grid.replace(/import \{ ([^}]+) \} from "lucide-react";/, 'import { $1, X, HelpCircle } from "lucide-react";');
fs.writeFileSync('src/components/marketplace/MarketplaceGrid.tsx', grid);
