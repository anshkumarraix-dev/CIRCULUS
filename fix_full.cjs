const fs = require('fs');

let content = fs.readFileSync('src/components/auth/LoginPage.tsx', 'utf-8');

// Reverse rewrite_login.cjs changes

content = content.replace(
  /<div className="min-h-screen flex flex-col justify-between relative overflow-hidden font-sans text-slate-900 selection:bg-\[#00E676\] selection:text-black">/,
  '<div className="min-h-screen text-white flex flex-col justify-between relative overflow-hidden font-sans selection:bg-[#00E676] selection:text-black">'
);

content = content.replace(
  /<img src="\/image_2b322b.jpg" alt="Background" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" \/>/,
  `      {/* Immersive Animated Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#12181F]/85 z-0 pointer-events-none"></div>`
);

content = content.replace(
  /<header className="px-6 py-5 flex items-center justify-between w-full relative z-10 bg-white shadow-sm">/,
  '<header className="px-6 py-5 flex items-center justify-between max-w-7xl w-full mx-auto relative z-10">'
);

content = content.replace(
  /<span className="font-bold text-2xl tracking-tight text-slate-900 font-display">CIRCULUS<\/span>/,
  '<span className="font-bold text-2xl tracking-tight text-white font-display">CIRCULUS</span>'
);

content = content.replace(
  /<main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 relative z-10 w-full">\s*<div className="max-w-md w-full mx-auto relative z-10">/,
  `<main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 relative z-10">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-stretch backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">`
);

content = content.replace(
  /<footer className="px-6 py-4 border-t border-slate-200 bg-white text-center text-xs text-slate-500 font-mono relative z-10">/,
  '<footer className="px-6 py-4 border-t border-slate-700 bg-[#12181F] text-center text-xs text-slate-500 font-mono relative z-10">'
);

// We need to insert the left column back before the right column.
const leftColumnHTML = `
          {/* Left Column: Real-Time Verification Overview & Recent Logins (5 cols) */}
          <div className="lg:col-span-5 bg-[#12181F] rounded-3xl border border-emerald-200 overflow-hidden flex flex-col justify-between shadow-md">
            {/* Visual Photo Header */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80"
                alt="Green Industrial Facility"
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
              
              {/* Badge Overlay */}
              <div className="absolute top-4 left-4">
                <span className="text-[10px] uppercase tracking-widest font-mono font-bold px-2 py-1 bg-black/60 backdrop-blur-md rounded border border-white/20 text-white flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  LIVE: CIRCULUS NETWORK
                </span>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                  Zero Trust Architecture for Industrial Material Verification
                </h3>
              </div>
            </div>

            {/* Live Data Ticker */}
            <div className="border-b border-emerald-500/20 bg-emerald-950/30 overflow-hidden relative group py-2 px-2">
              <div className="flex gap-4 animate-[scroll-x_20s_linear_infinite] whitespace-nowrap text-[10px] font-mono uppercase tracking-wider text-emerald-400/80">
                <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-500"></span> AL-SCRAP: $1,450/MT</span>
                <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-500"></span> CU-CATHODE: $8,200/MT</span>
                <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-500"></span> FE-HMS1: $380/MT</span>
                <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-500"></span> PL-PET: $850/MT</span>
                
                {/* Duplicate for seamless scrolling */}
                <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-500"></span> AL-SCRAP: $1,450/MT</span>
                <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-500"></span> CU-CATHODE: $8,200/MT</span>
                <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-500"></span> FE-HMS1: $380/MT</span>
                <span className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-emerald-500"></span> PL-PET: $850/MT</span>
              </div>
            </div>

            <style dangerouslySetInnerHTML={{__html: \`
              @keyframes scroll-x {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            \`}} />

            {/* Content Body */}
            <div className="p-6 flex flex-col justify-between flex-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]">
              <div className="space-y-4">
                <div className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Enterprise Security</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Access is restricted to authorized industrial facilities and government auditors.
                    All sessions are cryptographically signed. No hardcoded accounts permitted.
                  </p>
                </div>
                
                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                    </div>
                    <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">System Status</h4>
                  </div>
                  <p className="text-xs text-slate-300">
                    Network operations normal. Central ledger synchronizing across 14 nodes.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center pt-6 pb-6">
              <p className="text-[10px] text-center text-slate-500/80 flex items-center justify-center gap-1.5 font-mono lowercase tracking-widest pt-2">
                protected by 256-bit sha state proofs • cpcb rules 2026
              </p>
            </div>
          </div>
`;

content = content.replace(
  /<div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl flex flex-col justify-center space-y-6">/,
  leftColumnHTML + `\n<div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-black/40 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none space-y-6">`
);

// Fix colors inside the right column
content = content.replace(/bg-white text-emerald-600 shadow-sm border border-slate-200\/80/g, 'bg-[#12181F] text-[#00E676] shadow-sm border border-emerald-500/30');
content = content.replace(/text-slate-500 hover:text-slate-900/g, 'text-slate-400 hover:text-white');
content = content.replace(/bg-slate-100 rounded-xl border border-slate-200\/80/g, 'bg-slate-900/50 rounded-xl border border-white/5');

// Inputs
content = content.replace(/bg-white border border-slate-300 rounded-lg shadow-sm px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-slate-50/g, 'bg-black/40 border border-transparent rounded-lg px-3 py-2 text-xs text-white focus:border-[#00E676] focus:ring-1 focus:ring-[#00E676] focus:bg-black/60');
content = content.replace(/bg-white border border-slate-300 rounded-xl shadow-sm px-3 py-2 text-xs text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-slate-50/g, 'bg-black/40 border border-transparent rounded-xl px-3 py-2 text-xs text-white focus:border-[#00E676] focus:ring-1 focus:ring-[#00E676] focus:bg-black/60');
content = content.replace(/bg-white border border-slate-300 rounded-xl shadow-sm pl-10 pr-4 py-2\.5 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-slate-50/g, 'bg-black/40 border border-transparent rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#00E676] focus:ring-1 focus:ring-[#00E676] focus:bg-black/60');
content = content.replace(/bg-white border border-slate-300 rounded-xl shadow-sm pl-10 pr-10 py-2\.5 text-xs text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-slate-50/g, 'bg-black/40 border border-transparent rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#00E676] focus:ring-1 focus:ring-[#00E676] focus:bg-black/60');

// The OTP input
content = content.replace(/bg-white border border-slate-300 rounded-xl shadow-sm px-4 py-3 text-center text-lg tracking-\[0\.5em\] text-\[#00E676\] focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:bg-slate-50/g, 'bg-black/40 border border-transparent rounded-xl px-4 py-3 text-center text-lg tracking-[0.5em] text-[#00E676] focus:border-[#00E676] focus:ring-1 focus:ring-[#00E676] focus:bg-black/60');

// Labels
content = content.replace(/text-slate-500 font-semibold/g, 'text-slate-400 font-semibold');
content = content.replace(/text-slate-500 mb-1/g, 'text-slate-400 mb-1');

// Text
content = content.replace(/text-slate-900 text-lg/g, 'text-white text-lg');
content = content.replace(/text-slate-900 font-bold/g, 'text-white font-bold');
content = content.replace(/text-slate-500 text-xs/g, 'text-slate-400 text-xs');
content = content.replace(/text-slate-600/g, 'text-slate-300');
content = content.replace(/text-emerald-700/g, 'text-emerald-400');
content = content.replace(/text-slate-700/g, 'text-slate-300');

// Role buttons
content = content.replace(/bg-white text-slate-500 border-slate-300 hover:text-slate-900 hover:bg-slate-50/g, 'bg-slate-800/50 text-slate-400 border-white/10 hover:text-white hover:bg-slate-800');

// Headers
content = content.replace(/<h1 className="text-xl font-bold text-slate-900 tracking-tight">/g, '<h1 className="text-xl font-bold text-white tracking-tight">');
content = content.replace(/<h2 className="text-xl font-bold text-slate-900 tracking-tight">/g, '<h2 className="text-xl font-bold text-white tracking-tight">');
content = content.replace(/<h3 className="text-xl font-bold text-slate-900 tracking-tight">/g, '<h3 className="text-xl font-bold text-white tracking-tight">');

content = content.replace(/<p className="text-xs text-slate-500">/g, '<p className="text-xs text-slate-400">');

content = content.replace(/<div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">/g, '<div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">');

// Header nav button
content = content.replace(/bg-slate-100 hover:bg-slate-200\/70/g, 'bg-white/5 hover:bg-white/10 text-slate-300');


fs.writeFileSync('src/components/auth/LoginPage.tsx', content);
