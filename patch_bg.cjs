const fs = require('fs');
let code = fs.readFileSync('src/components/auth/LoginPage.tsx', 'utf8');

const target = `  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden font-sans text-ink selection:bg-copper selection:text-panel">
      
      {/* Background Integration */}
      
      {/* CSS Fallback Animated Laser Background */}
      <div className="absolute inset-0 bg-primary z-0 overflow-hidden">
        {/* Metal Texture */}
        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,#000_2px,#000_4px)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[copper]/5 to-[#12181F]"></div>
        
        {/* Sweeping Laser Line */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-copper shadow-[0_0_20px_4px_copper,0_0_40px_copper] animate-scan z-0"></div>
        
        {/* Scanlines overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none z-0"></div>
      </div>

      {/* User's Uploaded Background (Overlays CSS if present) */}
      <img 
        src="/assets/laser-bg.webp?v=1" 
        alt="Laser Scanning Industrial Metal" 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-20" 
        onError={(e) => {
          // Hide broken image icon so the CSS animation shows beautifully underneath
          e.currentTarget.style.display = 'none';
        }}
      />
      
      {/* We removed the bg-primary/60 overlay so the 20% opacity video/image is clearly visible */}

      <main className="flex-1 flex items-center justify-center w-full px-4 sm:px-8 py-6 relative z-10">`;

const replacement = `  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden font-sans text-ink selection:bg-copper selection:text-panel bg-[#12181F]">
      
      {/* User's Uploaded Background */}
      <img 
        src="/assets/laser-bg.webp" 
        alt="Laser Scanning Industrial Metal" 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-20" 
      />

      <main className="flex-1 flex items-center justify-center w-full px-4 sm:px-8 py-6 relative z-10">`;

// Handle spaces and newlines flexibly
let regex = /return \([\s\S]*?<main className="flex-1 flex items-center justify-center w-full px-4 sm:px-8 py-6 relative z-10">/;
code = code.replace(regex, replacement);

fs.writeFileSync('src/components/auth/LoginPage.tsx', code);
console.log("Done");
