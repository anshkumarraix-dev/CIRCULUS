const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

html = html.replace(
  /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=JetBrains\+Mono[^"]+" rel="stylesheet">/,
  '<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">'
);

fs.writeFileSync('index.html', html);
