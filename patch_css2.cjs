const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf-8');

// Replace the previous patch completely to be safe
css = `
@import "tailwindcss";

@theme {
  --color-primary: #1C1A17;
  --color-panel: #262220;
  --color-copper: #A85D33;
  --color-moss: #6B8F5C;
  --color-silver: #B8B2A6;
  --color-ink: #EDE8DF;
  
  --font-sans: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif;
  --font-display: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;
}

@layer base {
  body {
    background-color: var(--color-primary);
    color: var(--color-ink);
    min-height: 100vh;
    overflow-x: hidden;
    letter-spacing: -0.012em;
  }
  
  h1, h2, h3, h4, h5, h6, .font-display, .font-heading {
    letter-spacing: -0.025em;
    font-weight: 700 !important;
    font-family: var(--font-display);
  }
  
  .font-body {
    font-family: var(--font-body);
  }
  
  .font-mono {
    font-family: var(--font-mono);
    letter-spacing: -0.02em;
  }
}

/* Custom crisp scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: var(--color-panel);
}
::-webkit-scrollbar-thumb {
  background: var(--color-silver);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-copper);
}

::selection {
  background-color: var(--color-copper);
  color: #fff;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

@keyframes scan {
  0% { transform: translateY(-100px); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
}

.animate-scan {
  animation: scan 4s ease-in-out infinite;
}
`;

fs.writeFileSync('src/index.css', css);
