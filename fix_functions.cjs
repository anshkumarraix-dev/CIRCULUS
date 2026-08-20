const fs = require('fs');
let code = fs.readFileSync('src/components/auth/LoginPage.tsx', 'utf8');

const replacement = `      return () => { if(interval) clearInterval(interval); };
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
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden font-sans text-ink selection:bg-copper selection:text-panel bg-[#12181F]">`;

code = code.replace(`    }

      return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden font-sans text-ink selection:bg-copper selection:text-panel bg-[#12181F]">`, replacement);

fs.writeFileSync('src/components/auth/LoginPage.tsx', code);
