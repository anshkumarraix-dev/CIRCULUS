const fs = require('fs');
let content = fs.readFileSync('src/components/auth/LoginPage.tsx', 'utf-8');

const bgReplacement = `
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
`;

content = content.replace(
  /<img src="\/assets\/laser-bg\.webp"[^>]+>\s*<div className="absolute inset-0 bg-\[#0a0f14\]\/80 z-0 pointer-events-none"><\/div>/,
  bgReplacement.trim()
);

fs.writeFileSync('src/components/auth/LoginPage.tsx', content);
