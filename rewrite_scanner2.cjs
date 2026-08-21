const fs = require('fs');
let code = fs.readFileSync('src/components/scanner/MaterialScanner.tsx', 'utf8');

const regex = /  \/\/ Handle sample dataset selection[\s\S]*?const handleSelectPreset = [\s\S]*?\}\n  \};\n/;
code = code.replace(regex, "");

fs.writeFileSync('src/components/scanner/MaterialScanner.tsx', code);
