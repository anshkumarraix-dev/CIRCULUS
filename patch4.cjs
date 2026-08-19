const fs = require('fs');
const content = fs.readFileSync('./src/components/auth/LoginPage.tsx', 'utf-8');

const newContent = content
  .replace(
    /className="text-xs text-slate-400 flex items-center justify-center gap-1.5"/g,
    `className="text-[10px] text-slate-500 flex items-center justify-center gap-1.5 font-mono"`
  );

fs.writeFileSync('./src/components/auth/LoginPage.tsx', newContent);
