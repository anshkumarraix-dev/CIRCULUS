const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const demoTourBlock = /\s*\{\/\* 3-Minute Judge Demo Tour Guide Modal \*\/\}\n\s*<DemoTourGuide[\s\S]*?\/>/;
code = code.replace(demoTourBlock, "");
fs.writeFileSync('src/App.tsx', code);
