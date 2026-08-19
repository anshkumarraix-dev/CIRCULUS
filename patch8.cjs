const fs = require('fs');
let content = fs.readFileSync('./src/components/auth/LoginPage.tsx', 'utf-8');

content = content.replace(
  /className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-blue-500 focus:bg-\[#12181F\] focus:outline-none"/g,
  'className="w-full bg-black/40 border border-transparent rounded-lg px-3 py-2 text-xs text-white focus:border-[#00E676] focus:ring-1 focus:ring-[#00E676] focus:bg-black/60 focus:outline-none"'
);

content = content.replace(
  /className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-blue-500 focus:bg-\[#12181F\] focus:outline-none font-mono"/g,
  'className="w-full bg-black/40 border border-transparent rounded-lg px-3 py-2 text-xs text-white focus:border-[#00E676] focus:ring-1 focus:ring-[#00E676] focus:bg-black/60 focus:outline-none font-mono"'
);

content = content.replace(
  /className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-blue-500 focus:bg-\[#12181F\] focus:outline-none font-medium"/g,
  'className="w-full bg-black/40 border border-transparent rounded-lg px-3 py-2 text-xs text-white focus:border-[#00E676] focus:ring-1 focus:ring-[#00E676] focus:bg-black/60 focus:outline-none font-medium"'
);

content = content.replace(
  /bg-slate-800 hover:bg-\[#00E676\]\/10\/60 border border-slate-700\/80 hover:border-\[#00E676\]\/50/g,
  'bg-black/40 hover:bg-[#00E676]/10 border border-transparent hover:border-[#00E676]/50'
);

content = content.replace(
  /\? "bg-\[#00E676\]\/10 text-\[#00E676\] border-\[#00E676\]\/50 font-bold"\s*: "bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500"/g,
  '? "bg-[#00E676]/10 text-[#00E676] border-[#00E676]/50 font-bold" : "bg-black/40 text-slate-400 border-transparent hover:border-slate-500"'
);


fs.writeFileSync('./src/components/auth/LoginPage.tsx', content);
