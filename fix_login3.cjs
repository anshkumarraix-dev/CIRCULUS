const fs = require('fs');
let code = fs.readFileSync('src/components/auth/LoginPage.tsx', 'utf-8');

code = code.replace(/rgba\(0,230,118,0\.4\)/g, 'rgba(239,122,59,0.4)');
code = code.replace(/rgba\(0,230,118,0\.1\)/g, 'rgba(239,122,59,0.1)');
code = code.replace(/rgba\(0,230,118,0\.3\)/g, 'rgba(239,122,59,0.3)');

fs.writeFileSync('src/components/auth/LoginPage.tsx', code);
