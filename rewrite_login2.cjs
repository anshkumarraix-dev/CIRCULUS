const fs = require('fs');

let content = fs.readFileSync('src/components/auth/LoginPage.tsx', 'utf-8');

// Find the start of lg:col-span-5
const startCol5 = content.indexOf('<div className="lg:col-span-5 bg-[#12181F]');
if (startCol5 !== -1) {
    // Find the end of it. The next sibling was the lg:col-span-7 div.
    const startCol7 = content.indexOf('<div className="lg:col-span-7');
    if (startCol7 !== -1) {
        content = content.substring(0, startCol5) + `<div className="bg-white p-8 sm:p-10 rounded-2xl shadow-2xl flex flex-col justify-center space-y-6">` + content.substring(startCol7 + content.substring(startCol7).indexOf('>') + 1);
    }
}

fs.writeFileSync('src/components/auth/LoginPage.tsx', content);
