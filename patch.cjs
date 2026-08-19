const fs = require('fs');
const content = fs.readFileSync('./src/components/auth/LoginPage.tsx', 'utf-8');

const newContent = content
  .replace(
    /<div className="min-h-screen bg-slate-800 text-white flex flex-col justify-between relative overflow-hidden font-sans selection:bg-blue-600 selection:text-white">\s*<div className="absolute top-0 right-0 w-\[550px\] h-\[550px\] bg-blue-100\/50 rounded-full blur-\[140px\] pointer-events-none"><\/div>\s*<div className="absolute bottom-0 left-0 w-\[450px\] h-\[450px\] bg-emerald-100\/40 rounded-full blur-\[120px\] pointer-events-none"><\/div>/,
    `<div className="min-h-screen text-white flex flex-col justify-between relative overflow-hidden font-sans selection:bg-[#00E676] selection:text-black">
      {/* Immersive Animated Background */}
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
  )
  .replace(
    /<header className="px-6 py-5 border-b border-slate-700\/80 bg-\[#12181F\]\/80 backdrop-blur-md flex items-center justify-between max-w-7xl w-full mx-auto relative z-10">/,
    `<header className="px-6 py-5 flex items-center justify-between max-w-7xl w-full mx-auto relative z-10">`
  )
  .replace(
    /<main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 relative z-10">\s*<div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">/,
    `<main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 relative z-10">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-stretch backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">`
  );

fs.writeFileSync('./src/components/auth/LoginPage.tsx', newContent);
