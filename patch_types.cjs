const fs = require('fs');
let typesCode = fs.readFileSync('src/types.ts', 'utf8');

typesCode = typesCode.replace(/"demo_ledger" \| "demo_ledger_anchored" \| "pending_audit"/g, '"verified" | "pending_audit"');
typesCode = typesCode.replace(/"demo_ledger_anchored" \| "demo_ledger" \| "pending_audit"/g, '"verified" | "pending_audit"');
typesCode = typesCode.replace(/  \| "demo"\n/g, "");

fs.writeFileSync('src/types.ts', typesCode);
