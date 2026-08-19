const fs = require('fs');
let content = fs.readFileSync('./src/components/auth/LoginPage.tsx', 'utf-8');

// Fix the overall spacing on mobile vs desktop
content = content.replace(
  /<div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">/g,
  '<div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-black/40 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none">'
);

fs.writeFileSync('./src/components/auth/LoginPage.tsx', content);
