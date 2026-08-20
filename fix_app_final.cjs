const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf-8');
const lines = app.split('\n');
const lastLines = lines.slice(-5);
console.log(lastLines);

// Find the mismatched closing tag. The error in App.tsx was:
// src/App.tsx(384,3): error TS1128: Declaration or statement expected.
// src/App.tsx(386,1): error TS1005: '}' expected.
