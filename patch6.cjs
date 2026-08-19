const fs = require('fs');
let content = fs.readFileSync('./src/components/auth/LoginPage.tsx', 'utf-8');

// The original file had text-white as default. Let's make sure our specific buttons have text-black.
content = content.replace(
  /className="([^"]*bg-\[#00E676\][^"]*)text-white([^"]*)"/g,
  'className="$1text-black$2"'
);

fs.writeFileSync('./src/components/auth/LoginPage.tsx', content);
