const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /      <RealTimeEntryModal[\s\S]*?\/>\n    <\/div>\n  \);\n\}/;
const replacement = `      <RealTimeEntryModal
        isOpen={isRealTimeModalOpen}
        onClose={() => setIsRealTimeModalOpen(false)}
        activeRole={activeRole}
        onEntryCreated={handleRealTimeEntryCreated}
      />
      {/* Global AI Chat Widget */}
      <AIChatWidget />
    </div>
  );
}`;

if (regex.test(code)) {
    code = code.replace(regex, replacement);
    fs.writeFileSync('src/App.tsx', code);
    console.log("Replaced successfully!");
} else {
    console.log("Could not find the target string in App.tsx.");
}
