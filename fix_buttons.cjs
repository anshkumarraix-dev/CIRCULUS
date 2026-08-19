const fs = require('fs');

let content = fs.readFileSync('src/components/auth/LoginPage.tsx', 'utf-8');

// The active tab was a bit wrong
content = content.replace(/bg-\[#12181F\] text-\[#00E676\] shadow-sm border border-emerald-500\/30 font-bold/g, 'bg-[#12181F] text-[#00E676] shadow-sm border border-emerald-500/30 font-bold'); // Let's check it

// Check if there are any bg-white left
// We want to make sure the modal background doesn't have bg-white
// The right column is `<div className="lg:col-span-7 p-6 sm:p-10 ...">`

// Fix the role buttons
content = content.replace(/bg-slate-800\/50 text-slate-400 border-white\/10 hover:text-white hover:bg-slate-800 shadow-sm/g, 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white');

// The primary button
// Check if it's there
content = content.replace(/className="w-full py-3.5 rounded-xl bg-\[#00E676\] hover:bg-\[#00c968\] disabled:opacity-50 text-black font-bold text-xs uppercase tracking-tight transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-\[#00E676\]\/20 mt-4"/g, 'className="w-full py-3.5 rounded-xl bg-[#00E676] hover:bg-[#00c968] disabled:opacity-50 text-black font-bold text-xs uppercase tracking-tight transition flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#00E676]/20 mt-4"');

fs.writeFileSync('src/components/auth/LoginPage.tsx', content);
