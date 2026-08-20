const fs = require('fs');
let code = fs.readFileSync('src/components/auth/LoginPage.tsx', 'utf8');

code = code.replace(
  'bg-[#12181F]">',
  'bg-white">' // or just remove it, but bg-white might be good to ensure lightness if the image is transparent. Actually let's use 'bg-white/10">' or just '">' 
);

code = code.replace(
  'className="absolute inset-0 w-full h-full object-cover z-0 opacity-20"',
  'className="absolute inset-0 w-full h-full object-cover z-0"'
);

fs.writeFileSync('src/components/auth/LoginPage.tsx', code);
console.log("Done");
