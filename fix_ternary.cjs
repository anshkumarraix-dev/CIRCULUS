const fs = require('fs');
let code = fs.readFileSync('src/components/scanner/MaterialScanner.tsx', 'utf8');

const regex = /\) : \(\n\s*\/\* VERIFIED INDUSTRIAL DATASET SELECTOR \*\/[\s\S]*?      \)\}\n\s*\{\/\* Step 2 & 3: Weight & AI Test Result \*\/\}/;

code = code.replace(regex, ")}\n\n      {/* Step 2 & 3: Weight & AI Test Result */}");
code = code.replace(/\{inputMode === "camera" \? \(/, "{inputMode === \"camera\" && (");

fs.writeFileSync('src/components/scanner/MaterialScanner.tsx', code);
