const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

code = code.replace(
  /family=IBM\+Plex\+Mono:wght@400;500;600;700&family=IBM\+Plex\+Sans:wght@400;500;600;700/,
  'family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600;700'
);

// Also remove the old tailwind classes on body that are now handled by layer base
code = code.replace(
  /class="bg-slate-50 text-slate-900 antialiased selection:bg-blue-600 selection:text-white"/,
  'class="antialiased"'
);

fs.writeFileSync('index.html', code);
