const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf-8');
app = app.replace(/    <\/div>\n  \);\n\}/, '    </div>\n  );\n}'); // Just ensuring normal ending
fs.writeFileSync('src/App.tsx', app);
