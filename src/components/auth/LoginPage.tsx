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
    return () => clearInterval(interval);
  }, [otpCountdown]);

  const handleGstinLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      if (password === "wrong") {
        setErrorMsg("Invalid credentials. Please try again.");
        return;
      }
      onLoginSuccess({
        id: "buyer",
        name: "Enterprise Admin",
        orgName: "Mahavir PolyRecycle",
        gstin: gstinOrEmail || "24AABCM1234F1Z8",
        avatar: "https://i.pravatar.cc/150?u=buyer",
        isVerified: true
      });
    }, 1200);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      if (mobileNumber.length < 10) {
        setErrorMsg("Invalid mobile number format.");
        return;
      }
      setOtpSent(true);
      setOtpCountdown(60);
    }, 1000);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      if (otpCode.length < 6) {
        setErrorMsg("Invalid OTP Code.");
        return;
      }
      onLoginSuccess({
        id: "buyer",
        name: "Enterprise Admin",
        orgName: "Mahavir PolyRecycle",
        gstin: "24AABCM1234F1Z8",
        avatar: "https://i.pravatar.cc/150?u=buyer",
        isVerified: true
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative overflow-hidden font-sans text-slate-900 selection:bg-[#00E676] selection:text-black">
      {/* Background Integration */}
      {/* CSS Fallback Animated Laser Background */}
      <div className="absolute inset-0 bg-[#0a0f14] z-0 overflow-hidden">
        {/* Metal Texture */}
        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#000_2px,#000_4px)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00E676]/5 to-[#12181F]"></div>
        
        {/* Sweeping Laser Line */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-[#00E676] shadow-[0_0_20px_4px_#00E676,0_0_40px_#00E676] animate-scan z-0"></div>
        
        {/* Scanlines overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none z-0"></div>
      </div>

      {/* User's Uploaded Background (Overlays CSS if present) */}
      <img 
        src="/assets/laser-bg.webp" 
        alt="Laser Scanning Industrial Metal" 
        className="absolute inset-0 w-full h-full object-cover z-0" 
        onError={(e) => {
          // Hide broken image icon so the CSS animation shows beautifully underneath
          e.currentTarget.style.display = 'none';
        }}
      />
      <div className="absolute inset-0 bg-[#0a0f14]/80 z-0 pointer-events-none"></div>

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 relative z-10 w-full">
        {/* Main Modal (Glassmorphism) */}
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden">
          
          {/* Left Column (Brand & Tech Simulation) */}
          <div className="lg:col-span-6 p-8 sm:p-14 flex flex-col justify-between relative">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-8 rounded bg-[#00E676] flex items-center justify-center shadow-[0_0_15px_rgba(0,230,118,0.4)]">
                   <div className="w-4 h-4 border-2 border-black rounded-full border-t-transparent animate-spin"></div>
                </div>
                <span className="font-bold text-2xl tracking-widest text-white font-display">CIRCULUS</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-8">
                Secure Enterprise Portal
              </h2>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00E676]/30 bg-[#00E676]/10 shadow-[0_0_10px_rgba(0,230,118,0.1)]">
                <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse shadow-[0_0_8px_#00E676]"></span>
                <span className="text-[10px] font-bold tracking-widest text-[#00E676]">AI SCANNER ACTIVE</span>
              </div>
            </div>

            <div className="mt-12">
              <p className="font-mono text-[10px] text-slate-400 flex flex-wrap gap-4">
                <span>[ GSTIN VALIDATED ]</span>
                <span>[ SPCB RECOGNIZED ]</span>
              </p>
            </div>
          </div>

          {/* Right Column (The Login Form) */}
          <div className="lg:col-span-6 bg-[#12181F]/80 p-8 sm:p-14 flex flex-col justify-center relative">
            
            <div className="flex items-center gap-6 border-b border-white/10 mb-8">
              <button
                type="button"
                onClick={() => { setAuthMode("login"); setErrorMsg(null); }}
                className={`pb-3 text-[11px] font-bold uppercase tracking-widest transition border-b-2 ${
                  authMode === "login"
                    ? "border-[#00E676] text-white"
                    : "border-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                GSTIN / EMAIL
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode("otp"); setErrorMsg(null); }}
                className={`pb-3 text-[11px] font-bold uppercase tracking-widest transition border-b-2 ${
                  authMode === "otp"
                    ? "border-[#00E676] text-white"
                    : "border-transparent text-slate-500 hover:text-slate-300"
                }`}
              >
                MOBILE OTP
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 mb-6 flex items-center gap-2">
                <span>{errorMsg}</span>
              </div>
            )}

            {authMode === "login" && (
              <form onSubmit={handleGstinLogin} className="space-y-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">
                    Enterprise ID
                  </label>
                  <input
                    type="text"
                    value={gstinOrEmail}
                    onChange={(e) => setGstinOrEmail(e.target.value)}
                    placeholder="Enter GSTIN or Email"
                    required
                    className="w-full bg-black/40 border-none rounded-lg px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:ring-1 focus:ring-[#00E676] outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">
                    Facility Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    required
                    className="w-full bg-black/40 border-none rounded-lg px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:ring-1 focus:ring-[#00E676] outline-none transition"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading || !gstinOrEmail.trim() || !password.trim()}
                  className="w-full py-4 mt-2 rounded-lg bg-[#00E676] hover:bg-[#00c968] disabled:opacity-50 text-black font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(0,230,118,0.3)]"
                >
                  {isLoading ? "Authenticating..." : "SIGN IN TO WORKSPACE"}
                </button>
                
                {onExploreAsGuest && (
                  <button
                    type="button"
                    onClick={onExploreAsGuest}
                    className="w-full py-3 mt-2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition cursor-pointer"
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
                      <label className="block text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">
                        Registered Plant Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        placeholder="Enter 10-digit mobile number"
                        required
                        className="w-full bg-black/40 border-none rounded-lg px-4 py-3.5 text-sm text-white placeholder-slate-600 focus:ring-1 focus:ring-[#00E676] outline-none transition font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || mobileNumber.length < 10}
                      className="w-full py-4 mt-2 rounded-lg bg-[#00E676] hover:bg-[#00c968] disabled:opacity-50 text-black font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(0,230,118,0.3)]"
                    >
                      {isLoading ? "Sending..." : "SEND OTP CODE"}
                    </button>
                    
                    {onExploreAsGuest && (
                      <button
                        type="button"
                        onClick={onExploreAsGuest}
                        className="w-full py-3 mt-2 text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition cursor-pointer"
                      >
                        Explore as Guest
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                          Enter 6-Digit OTP
                        </label>
                        {otpCountdown > 0 && (
                          <span className="text-[10px] text-[#00E676] font-mono">
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
                        className="w-full bg-black/40 border-none rounded-lg px-4 py-3.5 text-center text-xl tracking-[0.5em] text-[#00E676] placeholder-slate-700 focus:ring-1 focus:ring-[#00E676] outline-none transition font-mono"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading || otpCode.length < 6}
                      className="w-full py-4 mt-2 rounded-lg bg-[#00E676] hover:bg-[#00c968] disabled:opacity-50 text-black font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_15px_rgba(0,230,118,0.3)]"
                    >
                      {isLoading ? "Verifying..." : "SIGN IN TO WORKSPACE"}
                    </button>
                    {otpCountdown === 0 && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="w-full text-[10px] text-slate-400 hover:text-white uppercase tracking-widest transition text-center mt-3"
                      >
                        Resend OTP Code
                      </button>
                    )}
                  </>
                )}
              </form>
            )}

            <p className="mt-10 text-[9px] uppercase tracking-widest text-slate-500 font-mono leading-relaxed">
              Protected by 256-bit SHA state proofs.<br/>
              Compliant with MoEFCC & CPCB Digital Waste Rules 2026.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
