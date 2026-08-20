const fs = require('fs');
let code = fs.readFileSync('src/components/auth/LoginPage.tsx', 'utf8');
let open = 0;
for(let i=0; i<code.length; i++) {
  if (code[i] === '{') open++;
  if (code[i] === '}') open--;
  if (open < 0) {
    console.log("Too many closing at:", i, code.slice(i-20, i+20));
    break;
  }
}
console.log("Final depth:", open);
