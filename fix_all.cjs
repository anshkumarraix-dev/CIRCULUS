const fs = require('fs');

// Fix X in MarketplaceGrid
let grid = fs.readFileSync('src/components/marketplace/MarketplaceGrid.tsx', 'utf-8');
if(!grid.includes(' X,')) {
  grid = grid.replace(/import \{ ([^}]+) \} from "lucide-react";/, 'import { $1, X } from "lucide-react";');
}
if(!grid.includes('HelpCircle')) {
  grid = grid.replace(/import \{ ([^}]+) \} from "lucide-react";/, 'import { $1, HelpCircle } from "lucide-react";');
}
fs.writeFileSync('src/components/marketplace/MarketplaceGrid.tsx', grid);


// Fix UserRole type in types.ts
let types = fs.readFileSync('src/types.ts', 'utf-8');
types = types.replace(
  /export interface UserRole \{[^}]+\}/,
  `export interface UserRole {
  id: string;
  name: string;
  orgName: string;
  gstin: string;
  location: string;
  avatar: string;
  isVerified?: boolean;
}`
);
fs.writeFileSync('src/types.ts', types);


// Fix currentPassport in App.tsx
let app = fs.readFileSync('src/App.tsx', 'utf-8');

app = app.replace(
  /  const \[isDemoTourOpen, setIsDemoTourOpen\] = useState<boolean>\(false\);/,
  `  const [isDemoTourOpen, setIsDemoTourOpen] = useState<boolean>(false);
  const currentPassport = activePassportId
    ? passports.find((p) => p.id === activePassportId)
    : null;`
);

app = app.replace(
  /  const currentPassport = activePassportId\n    \? passports\.find\(\(p\) => p\.id === activePassportId\)\n    : null;\n\n  return \(\n    <div className="h-screen bg-primary text-ink flex overflow-hidden font-sans">/,
  `  return (\n    <div className="h-screen bg-primary text-ink flex overflow-hidden font-sans">`
);

fs.writeFileSync('src/App.tsx', app);
