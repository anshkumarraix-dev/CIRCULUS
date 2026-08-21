const fs = require('fs');

let server = fs.readFileSync('server.ts', 'utf8');

server = server.replace(
  'const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();',
  'const generatedOtp = "123456"; // Hardcoded Demo OTP'
);

fs.writeFileSync('server.ts', server);
