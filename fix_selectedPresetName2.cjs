const fs = require('fs');
let code = fs.readFileSync('src/components/scanner/MaterialScanner.tsx', 'utf8');

code = code.replace(/setSelectedPresetName\(""\);/g, '');
code = code.replace(/selectedPresetName/g, '""');

fs.writeFileSync('src/components/scanner/MaterialScanner.tsx', code);
