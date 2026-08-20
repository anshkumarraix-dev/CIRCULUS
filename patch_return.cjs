const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf-8');

app = app.replace(
  /<div className="h-screen bg-primary text-ink flex overflow-hidden font-sans">/,
  `  return (\n    <div className="h-screen bg-primary text-ink flex overflow-hidden font-sans">`
);

fs.writeFileSync('src/App.tsx', app);
