const fs = require('fs');
let code = fs.readFileSync('src/components/passport/MaterialPassportView.tsx', 'utf8');

// 1. Remove prop from interface
code = code.replace(/  onAskCopilot: \(passport: MaterialPassport\) => void;\n/, "");

// 2. Remove prop from component
code = code.replace(/  onAskCopilot,\n/, "");

// 3. Remove the button block
const buttonBlock = /\s*<button\n\s*onClick=\{\(\) => onAskCopilot\(passport\)\}[\s\S]*?<\/button>/;
code = code.replace(buttonBlock, "");

fs.writeFileSync('src/components/passport/MaterialPassportView.tsx', code);
