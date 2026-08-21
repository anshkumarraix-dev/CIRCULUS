const fs = require('fs');
let code = fs.readFileSync('src/lib/ledger-adapter.ts', 'utf8');

code = code.replace(
  'export function generateSimpleRecordHash(payload: object): string {\n  const str = JSON.stringify(payload);\n  let hash = 0;\n  for (let i = 0; i < str.length; i++) {\n    const char = str.charCodeAt(i);\n    hash = (hash << 5) - hash + char;\n    hash |= 0; // Convert to 32bit integer\n  }\n  const hex = Math.abs(hash).toString(16).padStart(8, "0");\n  return `sha256-${hex}98fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`;\n}',
  `import { sha256 } from 'js-sha256';\n\nexport function generateSimpleRecordHash(payload: object): string {\n  return sha256(JSON.stringify(payload));\n}`
);

fs.writeFileSync('src/lib/ledger-adapter.ts', code);
