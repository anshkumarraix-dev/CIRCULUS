const fs = require('fs');
let code = fs.readFileSync('src/components/layout/AppHeader.tsx', 'utf8');

code = code.replace(
  'className="h-16 border-b border-white/5 bg-panel flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30"',
  'className="h-16 border-b border-[var(--color-neo-border)] neo-glass flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shadow-none"'
);

code = code.replace(
  /className=\{`px-3 py-1\.5 rounded-lg border text-xs font-bold flex items-center gap-1\.5 transition cursor-pointer font-body \$\{[\s\S]*?\}\`\}/,
  `className={\`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition cursor-pointer font-body \${
            isCopilotOpen
              ? "bg-[var(--color-neo-accent)] text-white border-transparent"
              : "neo-btn-secondary"
          }\`}`
);

fs.writeFileSync('src/components/layout/AppHeader.tsx', code);
