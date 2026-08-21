const fs = require('fs');
let code = fs.readFileSync('src/components/marketplace/MarketplaceGrid.tsx', 'utf8');

// Replace the top level return to use a fragment, so that even if divs close early, it might just render side by side, and we can find the extra div visually. Or it will just fix the JSX AST enough to compile.
code = code.replace(
  /return \(\n    <div className="space-y-6" ref=\{containerRef\} onMouseMove=\{handleMouseMove\}>/,
  'return (\n    <>\n    <div className="space-y-6" ref={containerRef} onMouseMove={handleMouseMove}>'
);

code = code.replace(
  /        \/>\n      \)\}\n    <\/div>\n  \);\n\};/,
  '        />\n      )}\n    </div>\n    </>\n  );\n};'
);

fs.writeFileSync('src/components/marketplace/MarketplaceGrid.tsx', code);
