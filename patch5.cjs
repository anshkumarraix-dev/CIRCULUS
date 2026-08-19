const fs = require('fs');
const content = fs.readFileSync('./src/components/auth/LoginPage.tsx', 'utf-8');

const newContent = content
  // Keep the overall page text white, only change the button text to black
  .replace(/text-black/g, 'text-white') // Revert the previous sed 
  .replace(
    /className="w-full py-3.5 sm:py-4 px-4 rounded-xl bg-\[#00E676\] hover:bg-\[#00c968\] text-white/g,
    `className="w-full py-3.5 sm:py-4 px-4 rounded-xl bg-[#00E676] hover:bg-[#00c968] text-black`
  )
  .replace(
    /className="w-full py-3.5 rounded-xl bg-\[#00E676\] hover:bg-\[#00c968\] disabled:opacity-50 text-white/g,
    `className="w-full py-3.5 rounded-xl bg-[#00E676] hover:bg-[#00c968] disabled:opacity-50 text-black`
  )
  .replace(
    /<span className="text-\[10px\] uppercase tracking-wider font-mono px-2 py-0.5 rounded-md bg-\[#00E676\]\/10 text-\[#00E676\] border border-\[#00E676\]\/30 font-semibold">/g,
    `<span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded-md bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30 font-semibold">`
  )
  .replace(
    /<Recycle className="w-5 h-5 text-white stroke-\[2.5\]" \/>/g,
    `<Recycle className="w-5 h-5 text-black stroke-[2.5]" />`
  );

fs.writeFileSync('./src/components/auth/LoginPage.tsx', newContent);
