import React, { useState, useEffect } from "react";
import { UserRole } from "../../types";

interface LoginPageProps {
  onLoginSuccess: (user: UserRole) => void;
  onExploreAsGuest?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onExploreAsGuest,
}) => {
  const [authMode, setAuthMode] = useState<"login" | "otp">("login");
  
  const [gstinOrEmail, setGstinOrEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [mobileNumber, setMobileNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (otpCountdown > 0) {
      interval = setInterval(() => {
        setOtpCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => { if(interval) clearInterval(interval); };
  }, [otpCountdown]);

  const handleGstinLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: "buyer",
        name: "Procurement Lead",
        orgName: "Mahavir PolyRecycle",
        gstin: "24AABCM1234F1Z8",
        location: "Surat, GJ",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=buyer",
        isVerified: true
      });
    }, 1500);
  };

  const handleSendOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      setOtpCountdown(120);
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    setTimeout(() => {
      setIsLoading(false);
      if (otpCode === "123456" || otpCode === "000000") {
        onLoginSuccess({
          id: "supplier",
          name: "Plant Manager",
          orgName: "AluCast Manufacturing",
          gstin: "24AAACA1234B1Z5",
          location: "Sanand, GJ",
          avatar: "https://api.dicebear.com/7.x/initials/svg?seed=supplier",
          isVerified: true
        });
      } else {
        setErrorMsg("Invalid OTP Code. Try 123456.");
      }
    }, 1000);
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden font-sans text-ink selection:bg-copper selection:text-panel bg-[#12181F]">
      
      {/* User's Uploaded Background */}
      <img 
        src="/assets/laser-bg.webp" 
        alt="Laser Scanning Industrial Metal" 
        className="absolute inset-0 w-full h-full object-cover z-0" 
      />

      <main className="flex-1 flex items-center justify-center w-full px-4 sm:px-8 py-6 relative z-10">
        
        {/* Animated Glow Wrapper */}
        <div className="relative w-full max-w-5xl group">
          {/* Glowing Border Element */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-copper/40 via-transparent to-copper/30 rounded-2xl sm:rounded-3xl blur-md opacity-60 group-hover:opacity-100 transition duration-1000 animate-pulse pointer-events-none z-0"></div>
          
          {/* Main Modal (Glassmorphism) */}
          <div className="relative w-full max-h-[95vh] lg:max-h-[90vh] overflow-y-auto overscroll-contain grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch bg-panel/20 hover:bg-panel/90 focus-within:bg-panel/90 transition-colors duration-500 border border-copper/20 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.8)] z-10 overflow-hidden">
            
            {/* Subtle Industrial Grid Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] opacity-20 pointer-events-none z-0 mix-blend-screen"></div>

            {/* Left Column (Brand & Tech Simulation) */}
            <div className="lg:col-span-6 p-8 sm:p-14 flex flex-col justify-between relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-8 rounded bg-copper flex items-center justify-center shadow-[0_0_15px_rgba(239,122,59,0.4)]">
                   <div className="w-4 h-4 border-2 border-black rounded-full border-t-transparent animate-spin"></div>
                </div>
                <span className="font-bold text-2xl tracking-widest text-ink font-display">CIRCULUS</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-ink tracking-tight leading-tight mb-8">
                Secure Enterprise Portal
              </h2>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-copper/30 bg-copper/10 shadow-[0_0_10px_rgba(239,122,59,0.1)]">
                <span className="w-2 h-2 rounded-full bg-copper animate-pulse shadow-[0_0_8px_copper]"></span>
                <span className="text-xs font-bold tracking-widest text-copper">AI SCANNER ACTIVE</span>
              </div>
            </div>

            <div className="mt-12">
              <p className="font-mono text-xs text-silver/80 flex flex-wrap gap-4">
                <span>[ GSTIN FORMAT CHECKED ]</span>
                <span>[ SPCB RECOGNIZED ]</span>
              </p>
            </div>
          </div>

          {/* Right Column (The Login Form) */}
          <div className="lg:col-span-6 bg-black/20 p-8 sm:p-14 flex flex-col justify-center relative z-10">
            
            <div className="flex items-center gap-6 border-b border-white/10 mb-8">
              <button
                type="button"
                onClick={() => { setAuthMode("login"); setErrorMsg(null); }}
                className={`pb-3 text-sm font-bold uppercase tracking-widest transition border-b-2 ${
                  authMode === "login"
                    ? "border-copper text-ink"
                    : "border-transparent text-silver/60 hover:text-silver"
                }`}
              >
                GSTIN / EMAIL
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode("otp"); setErrorMsg(null); }}
                className={`pb-3 text-sm font-bold uppercase tracking-widest transition border-b-2 ${
                  authMode === "otp"
                    ? "border-copper text-ink"
                    : "border-transparent text-silver/60 hover:text-silver"
                }`}
              >
                MOBILE OTP
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-sm text-rose-400 mb-6 flex items-center gap-2">
                <span>{errorMsg}</span>
              </div>
            )}

            {authMode === "login" && (
              <form onSubmit={handleGstinLogin} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-silver/80 font-bold mb-2">
                    Enterprise ID
                  </label>
                  <input
                    type="text"
                    value={gstinOrEmail}
                    onChange={(e) => setGstinOrEmail(e.target.value)}
                    placeholder="Enter GSTIN or Email"
                    required
                    className="w-full bg-white/5 border-none rounded-lg px-4 py-3.5 text-base text-ink placeholder-silver/40 focus:ring-1 focus:ring-copper outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-silver/80 font-bold mb-2">
                    Facility Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required
                    className="w-full bg-white/5 border-none rounded-lg px-4 py-3.5 text-base text-ink placeholder-silver/40 focus:ring-1 focus:ring-copper outline-none transition"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading || !gstinOrEmail.trim() || !password.trim()}
                  className="w-full py-4 mt-2 rounded-lg bg-copper hover:bg-copper/90 disabled:opacity-50 text-panel font-bold text-sm uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(239,122,59,0.3)]"
                >
                  {isLoading ? "Authenticating..." : "SIGN IN TO WORKSPACE"}
                </button>
                
                {onExploreAsGuest && (
                  <button
                    type="button"
                    onClick={onExploreAsGuest}
                    className="w-full py-3 mt-2 text-sm font-bold text-silver/80 hover:text-ink uppercase tracking-widest transition cursor-pointer"
                  >
                    Explore as Guest
                  </button>
                )}
              </form>
            )}

            {authMode === "otp" && (
              <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-5">
                {!otpSent ? (
                  <>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-silver/80 font-bold mb-2">
                        Registered Plant Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="Enter 10-digit mobile number"
                        required
                        className="w-full bg-white/5 border-none rounded-lg px-4 py-3.5 text-base text-ink placeholder-silver/40 focus:ring-1 focus:ring-copper outline-none transition font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || mobileNumber.length < 10}
                      className="w-full py-4 mt-2 rounded-lg bg-copper hover:bg-copper/90 disabled:opacity-50 text-panel font-bold text-sm uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(239,122,59,0.3)]"
                    >
                      {isLoading ? "Sending..." : "SEND OTP CODE"}
                    </button>
                    
                    {onExploreAsGuest && (
                      <button
                        type="button"
                        onClick={onExploreAsGuest}
                        className="w-full py-3 mt-2 text-sm font-bold text-silver/80 hover:text-ink uppercase tracking-widest transition cursor-pointer"
                      >
                        Explore as Guest
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs uppercase tracking-widest text-silver/80 font-bold">
                          Enter 6-Digit OTP
                        </label>
                        {otpCountdown > 0 && (
                          <span className="text-xs text-copper font-mono">
                            {Math.floor(otpCountdown / 60)}:{(otpCountdown % 60).toString().padStart(2, '0')}
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="000000"
                        required
                        className="w-full bg-white/5 border-none rounded-lg px-4 py-3.5 text-center text-xl tracking-[0.5em] text-copper placeholder-silver/30 focus:ring-1 focus:ring-copper outline-none transition font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || otpCode.length < 6}
                      className="w-full py-4 mt-2 rounded-lg bg-copper hover:bg-copper/90 disabled:opacity-50 text-panel font-bold text-sm uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(239,122,59,0.3)]"
                    >
                      {isLoading ? "Verifying..." : "SIGN IN TO WORKSPACE"}
                    </button>
                    {otpCountdown === 0 && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="w-full text-xs text-silver/80 hover:text-ink uppercase tracking-widest transition text-center mt-3"
                      >
                        Resend OTP Code
                      </button>
                    )}
                  </>
                )}
              </form>
            )}

            <p className="mt-10 text-[9px] uppercase tracking-widest text-silver/60 font-mono leading-relaxed relative z-10">
              Protected by deterministic content hashes.<br/>
              Compliant with MoEFCC & CPCB Digital Waste Rules 2026.
            </p>
          </div>
        </div>
      </div>
      </main>
    </div>
  );
};
