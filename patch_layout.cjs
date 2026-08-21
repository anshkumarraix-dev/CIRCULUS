const fs = require('fs');

let sidebar = fs.readFileSync('src/components/layout/Sidebar.tsx', 'utf8');
sidebar = sidebar.replace(
  /fixed lg:static inset-y-0 left-0 z-50/,
  'fixed lg:sticky lg:top-0 lg:h-screen inset-y-0 left-0 z-50'
);
fs.writeFileSync('src/components/layout/Sidebar.tsx', sidebar);

let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(
  /className="h-screen bg-primary text-ink flex overflow-hidden font-sans relative"/,
  'className="bg-primary text-ink flex min-h-screen font-sans relative"'
);
app = app.replace(
  /className="flex-1 flex flex-col min-w-0 overflow-hidden"/,
  'className="flex-1 flex flex-col min-w-0"'
);
app = app.replace(
  /className="flex-1 overflow-y-auto px-4 sm:px-6 py-8"/,
  'className="flex-1 px-4 sm:px-6 py-8"'
);

// Add Lenis import and wrapper
if (!app.includes('ReactLenis')) {
  app = app.replace(
    /import React, \{ useState, useEffect \} from "react";/,
    'import React, { useState, useEffect } from "react";\nimport { ReactLenis } from "lenis/react";'
  );
  
  app = app.replace(
    /return \(\n    <div className="bg-primary/,
    'return (\n    <ReactLenis root>\n      <div className="bg-primary'
  );
  
  app = app.replace(
    /    <\/div>\n  \);\n\}/,
    '      </div>\n    </ReactLenis>\n  );\n}'
  );
}
fs.writeFileSync('src/App.tsx', app);

