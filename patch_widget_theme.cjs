const fs = require('fs');
let code = fs.readFileSync('src/components/common/AIChatWidget.tsx', 'utf8');

// The launcher button
code = code.replace(
  /className="fixed bottom-6 right-6 p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl transition-colors z-50 flex items-center justify-center cursor-pointer"/,
  'className="fixed bottom-6 right-6 p-4 rounded-full glass-panel glow-edge-cyan text-accent-cyan hover:bg-accent-cyan/10 transition-colors z-50 flex items-center justify-center cursor-pointer"'
);

// The chat container
code = code.replace(
  /className="fixed bottom-6 right-6 w-full max-w-sm sm:w-\[380px\] h-\[500px\] bg-white rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-slate-200"/,
  'className="fixed bottom-6 right-6 w-full max-w-sm sm:w-[380px] h-[500px] glass-panel glow-edge-cyan rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"'
);

// Header
code = code.replace(
  /className="bg-blue-600 p-4 flex items-center justify-between text-white"/,
  'className="bg-panel-elevated/50 border-b border-white/10 p-4 flex items-center justify-between text-ink"'
);
code = code.replace(
  /className="p-1 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"/,
  'className="p-1 hover:bg-white/10 rounded-lg transition-colors cursor-pointer text-ink-muted hover:text-ink"'
);

// Messages Area
code = code.replace(
  /className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50"/,
  'className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent"'
);
code = code.replace(
  /className="text-center text-slate-500 my-8 text-sm"/,
  'className="text-center text-ink-muted my-8 text-sm"'
);
code = code.replace(
  /className="w-12 h-12 mx-auto mb-3 text-blue-200"/,
  'className="w-12 h-12 mx-auto mb-3 text-accent-cyan/30"'
);

// Chat Bubbles
code = code.replace(
  /className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0"/g,
  'className="w-8 h-8 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center shrink-0"'
);
code = code.replace(
  /className="w-4 h-4 text-blue-600"/g,
  'className="w-4 h-4 text-accent-cyan"'
);
code = code.replace(
  /className=\{`max-w-\[75%\] p-3 rounded-2xl text-sm \$\{\s*msg\.role === "user"\s*\? "bg-blue-600 text-white rounded-br-sm"\s*: "bg-white text-slate-800 border border-slate-200 rounded-bl-sm shadow-sm"\s*\}\`\}/g,
  'className={`max-w-[75%] p-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-accent-cyan text-primary rounded-br-sm shadow-[0_0_15px_rgba(79,216,232,0.3)]" : "bg-panel border border-white/10 text-ink rounded-bl-sm"}`}'
);

// Typing indicator bubble
code = code.replace(
  /className="bg-white text-slate-800 border border-slate-200 rounded-2xl rounded-bl-sm shadow-sm p-3 flex items-center gap-2"/,
  'className="bg-panel border border-white/10 text-ink rounded-2xl rounded-bl-sm shadow-sm p-3 flex items-center gap-2"'
);
code = code.replace(
  /className="w-4 h-4 animate-spin text-blue-500"/,
  'className="w-4 h-4 animate-spin text-accent-cyan"'
);
code = code.replace(
  /className="text-xs text-slate-500 font-medium"/,
  'className="text-xs text-ink-muted font-medium"'
);

// Input Area
code = code.replace(
  /className="p-3 bg-white border-t border-slate-100"/,
  'className="p-3 bg-panel border-t border-white/10"'
);
code = code.replace(
  /className="flex-1 bg-slate-100 border-none focus:ring-2 focus:ring-blue-500 rounded-full py-2.5 pl-4 pr-12 text-sm text-slate-800 placeholder-slate-400"/,
  'className="flex-1 bg-primary border border-white/10 focus:ring-1 focus:ring-accent-cyan focus:border-accent-cyan rounded-full py-2.5 pl-4 pr-12 text-sm text-ink placeholder-ink-muted outline-none transition-all"'
);
code = code.replace(
  /className="absolute right-1 p-2 rounded-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"/,
  'className="absolute right-1 p-2 rounded-full bg-accent-cyan hover:bg-accent-cyan/80 disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed text-primary transition-colors cursor-pointer"'
);

fs.writeFileSync('src/components/common/AIChatWidget.tsx', code);
