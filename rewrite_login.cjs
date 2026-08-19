const fs = require('fs');

let content = fs.readFileSync('src/components/auth/LoginPage.tsx', 'utf-8');

// 1. Root wrapper and background
content = content.replace(
  /<div className="min-h-screen bg-slate-800 text-white flex flex-col justify-between relative overflow-hidden font-sans selection:bg-\[#00E676\] selection:text-black">([\s\S]*?)<header/m,
  `<div className="min-h-screen flex flex-col justify-between relative overflow-hidden font-sans text-slate-900 selection:bg-[#00E676] selection:text-black">
      <img src="/image_2b322b.jpg" alt="Background" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />
      <header`
);

// 2. Main structure: replace grid wrapper with max-w-md
content = content.replace(
  /<main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 relative z-10">\s*<div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-stretch backdrop-blur-xl bg-white\/5 border border-white\/10 rounded-2xl shadow-2xl overflow-hidden">/m,
  `<main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 relative z-10 w-full">
        <div className="max-w-md w-full mx-auto relative z-10">`
);

// 3. Delete the left column
content = content.replace(
  /<div className="lg:col-span-5 bg-\[#12181F\] rounded-3xl border border-emerald-200 overflow-hidden flex flex-col justify-between shadow-md">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<div className="lg:col-span-7[^"]*"[^>]*>/,
  `<div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl flex flex-col justify-center space-y-6">`
);

// 4. Fix texts inside the card to look good on white
// Turn dark borders to light
content = content.replace(/border-white\/10/g, 'border-slate-200');
content = content.replace(/border-slate-700/g, 'border-slate-200');

// Fix input backgrounds
content = content.replace(/bg-black\/40/g, 'bg-white');
content = content.replace(/bg-black\/60/g, 'bg-slate-50');
content = content.replace(/text-white/g, 'text-slate-900');
content = content.replace(/text-slate-400/g, 'text-slate-500');

// Keep buttons black/green if needed, or wait, button had `text-black` before. Let's make sure button text is readable.
// The primary button had `bg-[#00E676] text-black`. Replacing `text-white` won't break it.

// Fix the header text to be visible if the header is over an image, or give the header a white background.
// The image might be dark or light. The reference image has a white header at the top and white footer.
content = content.replace(
  /<header className="px-6 py-5 flex items-center justify-between max-w-7xl w-full mx-auto relative z-10">/,
  `<header className="px-6 py-5 flex items-center justify-between w-full relative z-10 bg-white shadow-sm">`
);

// Ensure header text is dark
content = content.replace(
  /<span className="font-bold text-2xl tracking-tight text-slate-900 font-display">CIRCULUS<\/span>/,
  `<span className="font-bold text-2xl tracking-tight text-slate-900 font-display">CIRCULUS</span>`
);

// Fix the Footer to have white background
content = content.replace(
  /<footer className="px-6 py-4 border-t border-slate-200 bg-\[#12181F\] text-center text-xs text-slate-500 font-mono">/,
  `<footer className="px-6 py-4 border-t border-slate-200 bg-white text-center text-xs text-slate-500 font-mono relative z-10">`
);

fs.writeFileSync('src/components/auth/LoginPage.tsx', content);
