const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');
code = code.replace(/  \);\n\);\n\}/g, '  );\n}');
code = code.replace(/  \);\n\}/g, '  );\n}'); // Just to be safe, replace correctly
code = code.replace(/<\/div>\s*  \);\n\)/, '</div>\n  )');
fs.writeFileSync('src/App.tsx', code);
