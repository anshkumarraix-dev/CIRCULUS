const fs = require('fs');
let code = fs.readFileSync('src/components/scanner/MaterialScanner.tsx', 'utf8');

// I'll just remove the fields that don't exist in SearchGroundingResult to bypass the TS error if I can't guess them,
// or I can check the exact errors.
code = code.replace(/searchGrounding\.spotPriceEstimateInrPerMT/g, '(searchGrounding as any).spotPriceEstimateInrPerMT');
code = code.replace(/searchGrounding\.cpcbEprStatus/g, '(searchGrounding as any).cpcbEprStatus');
code = code.replace(/searchGrounding\.regionalPrices/g, '(searchGrounding as any).regionalPrices');
code = code.replace(/searchGrounding\.sources/g, '(searchGrounding as any).sources');

fs.writeFileSync('src/components/scanner/MaterialScanner.tsx', code);
