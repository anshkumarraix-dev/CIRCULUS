const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  /<div className="h-screen bg-primary text-ink flex overflow-hidden font-sans">[\s\n]*{\/\* Toast Notification \*\//m,
  `<div className="h-screen bg-primary text-ink flex overflow-hidden font-sans relative">
      {/* Cinematic Volumetric Background */}
      <div className="volumetric-blob-cyan top-[-100px] left-[-100px] opacity-70"></div>
      <div className="volumetric-blob-teal bottom-[-200px] right-[-100px] opacity-70"></div>
      
      {/* Toast Notification */`
);
fs.writeFileSync('src/App.tsx', code);
