const fs = require('fs');

let view = fs.readFileSync('src/components/auth/LoginPage.tsx', 'utf8');

view = view.replace(
  'alert("SMS Dispatched");',
  'alert("DEMO MODE: OTP SMS Dispatch simulated. Your Demo OTP is 123456.");'
);

view = view.replace(
  '<p className="text-xs text-silver/60">',
  '<p className="text-xs text-silver/60 font-mono text-copper mb-2">DEMO OTP: 123456</p>\n                        <p className="text-xs text-silver/60">'
);

fs.writeFileSync('src/components/auth/LoginPage.tsx', view);
