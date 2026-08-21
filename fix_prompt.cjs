const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

// Replace the word "Google Search and Google Maps" with just "Google Maps"
code = code.replace(/the Google Search and Google Maps tools to find real, factual answers/g, 'the Google Maps tool to find real, factual answers for locations, routing, and distances');

fs.writeFileSync('server.ts', code);
