const fs = require('fs');
let code = fs.readFileSync('src/components/ledger/OwnershipLedgerView.tsx', 'utf8');

code = code.replace(/\{\/\* Demo Mode Toggle \*\/\}/g, "{/* Ledger Mode Toggle */}");
code = code.replace(/Demo Ledger/g, "Local Ledger");

fs.writeFileSync('src/components/ledger/OwnershipLedgerView.tsx', code);
