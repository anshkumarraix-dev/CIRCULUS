const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove import
code = code.replace(/import \{ CirculAiCopilot \} from "\.\/components\/copilot\/CirculAiCopilot";\n?/, "");

// 2. Remove state
code = code.replace(/  const \[isCopilotOpen, setIsCopilotOpen\] = useState<boolean>\(false\);\n?/, "");

// 3. Remove AppHeader props
code = code.replace(/          onToggleCopilot=\{\(\) => setIsCopilotOpen\(!isCopilotOpen\)\}\n/, "");
code = code.replace(/          isCopilotOpen=\{isCopilotOpen\}\n/, "");

// 4. Remove onAskCopilot
code = code.replace(/              onAskCopilot=\{\(p\) => \{\n                setActivePassportId\(p\.id\);\n                setIsCopilotOpen\(true\);\n              \}\}\n/, "");

// 5. Remove <CirculAiCopilot /> block
const copilotBlock = /\s*\{\/\* Floating CirculAI Copilot Drawer \*\/\}\n\s*<CirculAiCopilot\n\s*isOpen=\{isCopilotOpen\}\n\s*onClose=\{\(\) => setIsCopilotOpen\(false\)\}\n\s*activePassport=\{currentPassport \|\| undefined\}\n\s*activeRole=\{activeRole\}\n\s*\/>/;
code = code.replace(copilotBlock, "");

fs.writeFileSync('src/App.tsx', code);
