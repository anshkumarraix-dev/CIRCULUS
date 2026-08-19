const fs = require('fs');

const content = fs.readFileSync('src/components/auth/LoginPage.tsx', 'utf-8');

const returnIndex = content.indexOf('return (');
if (returnIndex === -1) {
  console.log("Could not find 'return ('");
  process.exit(1);
}

const beforeReturn = content.substring(0, returnIndex);
fs.writeFileSync('LoginPage_part1.tsx', beforeReturn);
console.log("Extracted part 1.");

