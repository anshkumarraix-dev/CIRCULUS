const fs = require('fs');

// App.tsx
let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(/activeRole\.role === /g, 'activeRole.id === ');
fs.writeFileSync('src/App.tsx', app);

// OwnershipLedgerView.tsx
let ledger = fs.readFileSync('src/components/ledger/OwnershipLedgerView.tsx', 'utf8');
ledger = ledger.replace(/setBlockchainMode\("polygon"\)/g, 'setBlockchainMode("polygon-amoy")');
fs.writeFileSync('src/components/ledger/OwnershipLedgerView.tsx', ledger);

// MarketplaceGrid.tsx
let market = fs.readFileSync('src/components/marketplace/MarketplaceGrid.tsx', 'utf8');
market = market.replace(/activeRole\.city/g, '(activeRole.location?.split(",")[0] || "")');
market = market.replace(/activeRole\.state/g, '(activeRole.location?.split(",")[1]?.trim() || "")');
fs.writeFileSync('src/components/marketplace/MarketplaceGrid.tsx', market);

// MaterialScanner.tsx
let scanner = fs.readFileSync('src/components/scanner/MaterialScanner.tsx', 'utf8');
scanner = scanner.replace(/setInputMode\("presets"\)/g, 'setInputMode("upload")');
fs.writeFileSync('src/components/scanner/MaterialScanner.tsx', scanner);
