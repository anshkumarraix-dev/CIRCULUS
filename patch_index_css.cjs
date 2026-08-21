const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

const themeInsert = `
  /* Global Neo-Industrial Design System Tokens */
  --color-neo-bg: #0A0C10; 
  --color-neo-surface: #12151C; 
  --color-neo-surface-glass: rgba(18, 21, 28, 0.6); 
  --color-neo-surface-hero: rgba(26, 31, 41, 0.4); 
  
  --color-neo-border: rgba(255, 255, 255, 0.06);
  --color-neo-border-strong: rgba(255, 255, 255, 0.12);
  
  --color-neo-text: #E2E8F0;
  --color-neo-text-muted: #94A3B8;
  
  --color-neo-accent: #0EA5E9;
  --color-neo-emerald: #10B981;
  --color-neo-amber: #F59E0B;
  --color-neo-rose: #F43F5E;
`;

css = css.replace('@theme {', '@theme {' + themeInsert);

const layerInsert = `
@layer utilities {
  .app-shell {
    background-color: var(--color-neo-bg);
    color: var(--color-neo-text);
    background-image: 
      radial-gradient(circle at 15% 50%, rgba(14, 165, 233, 0.03), transparent 25%),
      radial-gradient(circle at 85% 30%, rgba(16, 185, 129, 0.03), transparent 25%);
  }

  .neo-glass {
    background: var(--color-neo-surface-glass);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--color-neo-border);
    box-shadow: 0 4px 24px -4px rgba(0,0,0,0.3);
  }

  .neo-glass-hero {
    background: var(--color-neo-surface-hero);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--color-neo-border-strong);
    box-shadow: 0 8px 32px -4px rgba(0,0,0,0.4);
  }

  .neo-surface {
    background: var(--color-neo-surface);
    border: 1px solid var(--color-neo-border);
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  }

  /* Interactive Elements */
  .neo-btn-primary {
    background: var(--color-neo-emerald);
    color: #000000;
    font-weight: 600;
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 8px rgba(16, 185, 129, 0.2);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .neo-btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px rgba(16, 185, 129, 0.3);
    background: #0D9488;
  }
  .neo-btn-primary:active {
    transform: translateY(0);
    box-shadow: 0 1px 4px rgba(16, 185, 129, 0.2);
  }

  .neo-btn-secondary {
    background: var(--color-neo-surface-glass);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: var(--color-neo-text);
    border: 1px solid var(--color-neo-border-strong);
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .neo-btn-secondary:hover {
    background: rgba(255,255,255,0.06);
    border-color: rgba(255,255,255,0.2);
    transform: translateY(-1px);
  }

  .neo-input {
    background: rgba(0,0,0,0.2);
    border: 1px solid var(--color-neo-border);
    color: var(--color-neo-text);
    transition: all 0.2s ease-out;
  }
  .neo-input:focus {
    border-color: var(--color-neo-accent);
    outline: none;
    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.1);
    background: rgba(0,0,0,0.3);
  }
}
`;

css = css + '\n' + layerInsert;

fs.writeFileSync('src/index.css', css);
