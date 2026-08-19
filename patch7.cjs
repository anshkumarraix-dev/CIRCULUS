const fs = require('fs');
let content = fs.readFileSync('./src/components/auth/LoginPage.tsx', 'utf-8');

content = content.replace(
  /<div className="mt-8 text-center border-t border-white\/10 pt-6">\s*<p className="text-\[10px\] text-slate-500 flex items-center justify-center gap-1.5 font-mono">\s*<Lock className="w-3 h-3" \/>\s*Protected by 256-bit SHA state proofs. Compliant with MoEFCC & CPCB Digital Waste Rules 2026.\s*<\/p>\s*<\/div>/g,
  `<div className="mt-8 text-center pt-6">\n                <p className="text-[10px] text-slate-500/80 flex items-center justify-center gap-1.5 font-mono lowercase tracking-widest">\n                  <Lock className="w-3 h-3" />\n                  protected by 256-bit sha state proofs • cpcb rules 2026\n                </p>\n              </div>`
);

fs.writeFileSync('./src/components/auth/LoginPage.tsx', content);
