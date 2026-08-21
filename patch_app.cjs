const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The widget is imported but not rendered correctly at the end.
// We'll look for the very last '</div>' before '  );\n}'
const widgetTag = `
      {/* Global AI Chat Widget */}
      <AIChatWidget />
    </div>
  );
}
`;
code = code.replace(/    <\/div>\n  \);\n\}$/, widgetTag);

fs.writeFileSync('src/App.tsx', code);
