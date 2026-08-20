const fs = require('fs');
let code = fs.readFileSync('src/components/auth/LoginPage.tsx', 'utf8');

code = code.replace(
  'return () => { if(interval) clearInterval(interval); };',
  '}\n      return () => { if(interval) clearInterval(interval); };'
);

fs.writeFileSync('src/components/auth/LoginPage.tsx', code);
