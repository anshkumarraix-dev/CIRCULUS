const fs = require('fs');
let code = fs.readFileSync('src/components/common/AIChatWidget.tsx', 'utf8');

code = code.replace(
  /const data = await response\.json\(\);/,
  `const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch(e) {
        throw new Error("Invalid JSON from server. Status: " + response.status + " Body: " + responseText.substring(0, 100));
      }`
);
fs.writeFileSync('src/components/common/AIChatWidget.tsx', code);
