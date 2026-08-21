const fs = require('fs');
let code = fs.readFileSync('src/components/common/AIChatWidget.tsx', 'utf8');

code = code.replace(
  /\} catch \(error: any\) \{\n\s*setMessages\(\[\.\.\.newMessages, \{ role: "model", text: "Sorry, I encountered an error connecting to the server\." \}\]\);\n\s*\}/,
  `} catch (error: any) {
      setMessages([...newMessages, { role: "model", text: "Sorry, I encountered an error connecting to the server. Details: " + String(error) }]);
    }`
);
fs.writeFileSync('src/components/common/AIChatWidget.tsx', code);
