const fs = require('fs');
let code = fs.readFileSync('src/components/auth/LoginPage.tsx', 'utf8');
let open = 0;
for(let i=0; i<code.length; i++) {
  if (code[i] === '{') open++;
  if (code[i] === '}') open--;
}
console.log("Difference:", open);
