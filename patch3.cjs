const fs = require('fs');
const content = fs.readFileSync('./src/components/auth/LoginPage.tsx', 'utf-8');

const newContent = content
  .replace(
    /<div className="flex bg-slate-800 p-1\.5 rounded-2xl mb-8 border border-slate-700 shadow-sm">[\s\S]*?<\/div>\s*<\/div>\s*<form/g,
    `<div className="flex border-b border-white/10 mb-8">
              <button
                onClick={() => setAuthMode("login")}
                className={\`flex-1 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all relative \${
                  authMode === "login"
                    ? "text-[#00E676]"
                    : "text-slate-500 hover:text-slate-300"
                }\`}
              >
                GSTIN / Email
                {authMode === "login" && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00E676] shadow-[0_-2px_10px_rgba(0,230,118,0.5)]"></div>
                )}
              </button>
              <button
                onClick={() => setAuthMode("otp")}
                className={\`flex-1 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all relative \${
                  authMode === "otp"
                    ? "text-[#00E676]"
                    : "text-slate-500 hover:text-slate-300"
                }\`}
              >
                Mobile OTP
                {authMode === "otp" && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00E676] shadow-[0_-2px_10px_rgba(0,230,118,0.5)]"></div>
                )}
              </button>
              <button
                onClick={() => setAuthMode("register")}
                className={\`flex-1 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all relative \${
                  authMode === "register"
                    ? "text-[#00E676]"
                    : "text-slate-500 hover:text-slate-300"
                }\`}
              >
                Register Plant
                {authMode === "register" && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00E676] shadow-[0_-2px_10px_rgba(0,230,118,0.5)]"></div>
                )}
              </button>
            </div>
            
            <form`
  );

fs.writeFileSync('./src/components/auth/LoginPage.tsx', newContent);
