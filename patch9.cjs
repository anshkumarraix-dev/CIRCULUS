const fs = require('fs');
let content = fs.readFileSync('./src/components/auth/LoginPage.tsx', 'utf-8');

content = content.replace(
  /<div className="mt-8 text-center border-t border-white\/10 pt-6">/g,
  '<div className="mt-8 text-center pt-6">'
);

content = content.replace(
  /Protected by 256-bit SHA state proofs\. Compliant with MoEFCC & CPCB Digital Waste Rules 2026\./g,
  'protected by 256-bit sha state proofs • cpcb rules 2026'
);

content = content.replace(
  /className="text-\[10px\] text-center text-slate-500 font-mono pt-2"/g,
  'className="text-[10px] text-center text-slate-500/80 flex items-center justify-center gap-1.5 font-mono lowercase tracking-widest pt-2"'
);

fs.writeFileSync('./src/components/auth/LoginPage.tsx', content);
