const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Revert the tools array to just googleMaps
code = code.replace(/tools: \[\{ googleMaps: \{\} \}, \{ googleSearch: \{\} \}\]/, 'tools: [{ googleMaps: {} }]');

fs.writeFileSync('server.ts', code);
