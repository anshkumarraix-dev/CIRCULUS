const fs = require('fs');

let content = fs.readFileSync('src/components/scanner/MaterialScanner.tsx', 'utf8');

content = content.replace(/bg-slate-800 border border-emerald-200\/80/g, 'neo-glass border-[var(--color-neo-accent)]');
content = content.replace(/bg-slate-800\/50 border border-slate-700\/60 opacity-60/g, 'neo-surface opacity-50 border-[var(--color-neo-border)]');
content = content.replace(/bg-slate-800 hover:bg-slate-100 text-slate-700/g, 'neo-btn-secondary');
content = content.replace(/bg-slate-800 hover:bg-slate-700 text-[a-z0-9-]+( font-bold)?( flex items-center gap-[0-9.]+ transition cursor-pointer)?/g, 'neo-btn-secondary $2');
content = content.replace(/bg-slate-800 hover:neo-surface border-slate-700 hover:border-blue-300/g, 'neo-surface hover:neo-glass');
content = content.replace(/bg-slate-800\/[0-9]+\s+p-[0-9]+\s+rounded-[a-z0-9]+\s+border\s+border-slate-700(\/[0-9]+)?/g, 'neo-surface p-2 rounded-xl');
content = content.replace(/bg-slate-800 hover:bg-slate-700 text-blue-300 hover:text-blue-200 text-\[11px\] font-medium border border-slate-700 transition/g, 'neo-btn-secondary text-[11px]');

fs.writeFileSync('src/components/scanner/MaterialScanner.tsx', content);
