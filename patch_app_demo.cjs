const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove import
code = code.replace(/import \{ DemoTourGuide \} from "\.\/components\/demo\/DemoTourGuide";\n/, "");

// 2. Remove state
code = code.replace(/  const \[isDemoTourOpen, setIsDemoTourOpen\] = useState<boolean>\(false\);\n/, "");

// 3. Remove component rendering block
const demoTourBlock = /\s*\{\/\* 3-Minute Judge Demo Tour Guide Modal \*\/\}\n\s*<DemoTourGuide\n\s*isOpen=\{isDemoTourOpen\}\n\s*onClose=\{\(\) => setIsDemoTourOpen\(false\)\}\n\s*\/>/;
code = code.replace(demoTourBlock, "");

fs.writeFileSync('src/App.tsx', code);
