const fs = require('fs');
let content = fs.readFileSync('./src/components/auth/LoginPage.tsx', 'utf-8');

// Fix the ticker animation class in the component
content = content.replace(
  /className="animate-\[ticker_15s_linear_infinite\] inline-block"/g,
  'className="animate-[ticker_15s_linear_infinite] inline-block whitespace-nowrap" style={{ animation: "ticker 15s linear infinite" }}'
);

fs.writeFileSync('./src/components/auth/LoginPage.tsx', content);
