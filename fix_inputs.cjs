const fs = require('fs');

let content = fs.readFileSync('src/components/auth/LoginPage.tsx', 'utf-8');

// Unify all inputs
content = content.replace(/className="w-full bg-slate-800 border border-slate-200 rounded-xl/g, 'className="w-full bg-white border border-slate-300 rounded-xl shadow-sm');
content = content.replace(/focus:border-blue-500 focus:bg-\[#12181F\]/g, 'focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-slate-50');

content = content.replace(/className="w-full bg-slate-800 border border-slate-200 rounded-lg/g, 'className="w-full bg-white border border-slate-300 rounded-lg shadow-sm');

// Fix buttons that might be wrong
content = content.replace(/className="w-full py-3\.5 rounded-xl bg-\[#00E676\] hover:bg-\[#00c968\] disabled:opacity-50 text-black/g, 'className="w-full py-3.5 rounded-xl bg-[#00E676] hover:bg-[#00c968] disabled:opacity-50 text-black'); // primary button

// Registration role buttons
content = content.replace(/bg-slate-800 text-slate-400 border-slate-200 hover:text-white/g, 'bg-white text-slate-500 border-slate-300 hover:text-slate-900 shadow-sm');

// Fix focus styles
content = content.replace(/className="w-full bg-white border border-transparent rounded-lg px-3 py-2 text-xs text-slate-900 focus:border-\[#00E676\] focus:ring-1 focus:ring-\[#00E676\] focus:bg-slate-50 focus:outline-none"/g, 'className="w-full bg-white border border-slate-300 rounded-lg shadow-sm px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-slate-50 focus:outline-none"');
content = content.replace(/className="w-full bg-white border border-transparent rounded-lg px-3 py-2 text-xs text-slate-900 focus:border-\[#00E676\] focus:ring-1 focus:ring-\[#00E676\] focus:bg-slate-50 focus:outline-none font-mono"/g, 'className="w-full bg-white border border-slate-300 rounded-lg shadow-sm px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-slate-50 focus:outline-none font-mono"');
content = content.replace(/className="w-full bg-white border border-transparent rounded-lg px-3 py-2 text-xs text-slate-900 focus:border-\[#00E676\] focus:ring-1 focus:ring-\[#00E676\] focus:bg-slate-50 focus:outline-none font-medium"/g, 'className="w-full bg-white border border-slate-300 rounded-lg shadow-sm px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-slate-50 focus:outline-none font-medium"');

fs.writeFileSync('src/components/auth/LoginPage.tsx', content);
