const fs = require('fs');
let code = fs.readFileSync('src/components/layout/AppHeader.tsx', 'utf8');

// 1. Remove props from interface
code = code.replace(/  onToggleCopilot: \(\) => void;\n/, "");
code = code.replace(/  isCopilotOpen: boolean;\n/, "");

// 2. Remove props from component
code = code.replace(/  onToggleCopilot,\n/, "");
code = code.replace(/  isCopilotOpen,\n/, "");

// 3. Remove the button block
const buttonBlock = /\s*\{\/\* AI Helper Bot \*\/\}\n\s*<button[\s\S]*?<\/button>/;
code = code.replace(buttonBlock, "");

fs.writeFileSync('src/components/layout/AppHeader.tsx', code);
