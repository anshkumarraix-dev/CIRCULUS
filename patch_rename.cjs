const fs = require('fs');

// server.ts
let serverCode = fs.readFileSync('server.ts', 'utf8');
serverCode = serverCode.replace(/app\.post\("\/api\/chat"/g, 'app.post("/api/copilot-chat"');
fs.writeFileSync('server.ts', serverCode);

// AIChatWidget.tsx
let widgetCode = fs.readFileSync('src/components/common/AIChatWidget.tsx', 'utf8');
widgetCode = widgetCode.replace(/await fetch\("\/api\/chat"/g, 'await fetch("/api/copilot-chat"');
fs.writeFileSync('src/components/common/AIChatWidget.tsx', widgetCode);
