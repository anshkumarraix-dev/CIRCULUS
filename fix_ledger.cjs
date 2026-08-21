const fs = require('fs');
let code = fs.readFileSync('src/components/ledger/OwnershipLedgerView.tsx', 'utf8');

// The state type was likely \`useState<"mock" | "polygon">\`
code = code.replace(/useState<"mock" \| "polygon">/g, 'useState<"mock" | "polygon-amoy">');
code = code.replace(/const \[blockchainMode, setBlockchainMode\] = useState<\s*"mock"\s*\|\s*"polygon"\s*>/g, 'const [blockchainMode, setBlockchainMode] = useState<"mock" | "polygon-amoy">');
code = code.replace(/blockchainMode === 'polygon'/g, "blockchainMode === 'polygon-amoy'");
code = code.replace(/blockchainMode === "polygon"/g, 'blockchainMode === "polygon-amoy"');

fs.writeFileSync('src/components/ledger/OwnershipLedgerView.tsx', code);
