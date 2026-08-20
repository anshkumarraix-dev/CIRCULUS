const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf-8');

const newTokens = `
  --bg-primary: #1C1A17;
  --bg-panel: #262220;
  --accent-copper: #A85D33;
  --accent-moss: #6B8F5C;
  --metal-silver: #B8B2A6;
  --color-ink: #EDE8DF;
`;

// Insert into :root inside @layer base
css = css.replace(':root {', ':root {' + newTokens);

// Update theme colors
const themeBlock = `
  --color-primary: var(--bg-primary);
  --color-panel: var(--bg-panel);
  --color-copper: var(--accent-copper);
  --color-moss: var(--accent-moss);
  --color-silver: var(--metal-silver);
  --color-ink: var(--color-ink);
  
  --font-sans: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif;
  --font-display: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;
`;

css = css.replace(/@theme\s*\{[^}]+\}/, `@theme {${themeBlock}}`);

// Fix body background and color
css = css.replace(/body\s*\{[^}]+\}/, `body {
    background-color: var(--bg-primary);
    color: var(--color-ink);
    min-height: 100vh;
    overflow-x: hidden;
    letter-spacing: -0.012em;
  }`);

fs.writeFileSync('src/index.css', css);
