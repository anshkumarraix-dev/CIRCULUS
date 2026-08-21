const fs = require('fs');
let code = fs.readFileSync('src/components/scanner/MaterialScanner.tsx', 'utf8');

code = code.replace(/selectedPresetName/g, '""');

// Also fix `filteredPresets.map` - since I already deleted it, the render block might be broken or I deleted it incorrectly.
