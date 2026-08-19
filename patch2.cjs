const fs = require('fs');
const content = fs.readFileSync('./src/components/auth/LoginPage.tsx', 'utf-8');

const newContent = content
  .replace(
    /<div className="lg:col-span-5 bg-\[#12181F\] rounded-3xl border border-emerald-200 overflow-hidden flex flex-col justify-between shadow-md">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<div className="lg:col-span-7 bg-[#12181F] p-8 sm:p-10 rounded-3xl border border-slate-700 shadow-md">/,
    `<div className="lg:col-span-5 relative overflow-hidden flex flex-col justify-between p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-white/10">
            {/* Abstract CSS Pattern */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00E676]/10 to-transparent"></div>
            
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30 text-[10px] font-mono font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse"></span>
                Secure Enterprise Portal
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl font-black text-white tracking-tight leading-none font-sans">
                  Industrial Material<br /><span className="text-[#00E676]">Intelligence.</span>
                </h1>
                <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-sm">
                  Access the premier decentralized marketplace for certified metallurgical and polymer scrap. Authenticated via physical IoT nodes.
                </p>
              </div>
            </div>

            <div className="relative z-10 space-y-6 mt-12 lg:mt-0">
              {/* Security Badge */}
              <div className="p-4 rounded-xl bg-black/40 border border-[#00E676]/50 shadow-[0_0_15px_rgba(0,230,118,0.15)] flex items-start gap-3 backdrop-blur-sm">
                <div className="p-2 rounded-lg bg-[#00E676]/20 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#00E676]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">No Hardcoded Accounts</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Demo credentials are mathematically synthesized on-the-fly. No static databases or pre-filled forms. 
                  </p>
                </div>
              </div>

              {/* Live Ticker */}
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#00E676] bg-[#00E676]/10 border border-[#00E676]/20 px-3 py-2 rounded-lg overflow-hidden whitespace-nowrap">
                 <span className="font-bold text-white shrink-0">[LIVE]</span>
                 <div className="animate-[ticker_15s_linear_infinite] inline-block">
                    Aluminium 6063 T6: ₹242/kg &nbsp;&bull;&nbsp; R-PET Flakes: ₹45/kg &nbsp;&bull;&nbsp; CRGO Steel: ₹180/kg &nbsp;&bull;&nbsp; Copper Millberry: ₹750/kg
                 </div>
              </div>

              {/* Compliance Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="text-[9px] font-mono font-bold text-slate-500 border border-slate-700 px-2 py-1 rounded bg-black/20">[ GSTIN VALIDATED ]</span>
                <span className="text-[9px] font-mono font-bold text-slate-500 border border-slate-700 px-2 py-1 rounded bg-black/20">[ SPCB RECOGNIZED ]</span>
                <span className="text-[9px] font-mono font-bold text-slate-500 border border-slate-700 px-2 py-1 rounded bg-black/20">[ BRSR READY ]</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">`
  );

fs.writeFileSync('./src/components/auth/LoginPage.tsx', newContent);
