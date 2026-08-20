const fs = require('fs');
let code = fs.readFileSync('src/components/auth/LoginPage.tsx', 'utf-8');

// Replace green elements in the hero text / logo if they exist
code = code.replace(/#00E676/g, 'copper'); // Just for tailwind class logic, wait, in arbitrary values like `#00E676`? 
// No, tailwind classes like `bg-[#00E676]` were replaced earlier but maybe there were ones like `#00E676` inside arbitrary values like `shadow-[0_0_40px_#00E676]`

code = code.replace(/#00E676/g, '#EF7A3B'); // Hex for copper 
code = code.replace(/from-\[#EF7A3B\]/g, 'from-copper');
code = code.replace(/to-\[#EF7A3B\]/g, 'to-copper');
code = code.replace(/bg-copper\/5/g, 'bg-copper/5');
code = code.replace(/bg-copper\/10/g, 'bg-copper/10');

// Replace selection:text-black with selection:text-panel
code = code.replace(/selection:text-black/g, 'selection:text-panel');
code = code.replace(/text-black/g, 'text-panel');
code = code.replace(/bg-\[#0a0f14\]/g, 'bg-primary');
code = code.replace(/bg-\[#12181F\]/g, 'bg-panel');
code = code.replace(/text-slate-900/g, 'text-ink');

fs.writeFileSync('src/components/auth/LoginPage.tsx', code);
