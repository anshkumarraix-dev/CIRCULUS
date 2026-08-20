const fs = require('fs');

// MaterialPassportView.tsx
let passport = fs.readFileSync('src/components/passport/MaterialPassportView.tsx', 'utf-8');
passport = passport.replace(/text-blue-/g, 'text-copper/');
passport = passport.replace(/bg-blue-/g, 'bg-copper/');
passport = passport.replace(/border-blue-/g, 'border-copper/');
fs.writeFileSync('src/components/passport/MaterialPassportView.tsx', passport);

// ImpactAnalyticsDashboard.tsx
let impact = fs.readFileSync('src/components/impact/ImpactAnalyticsDashboard.tsx', 'utf-8');
impact = impact.replace(/text-blue-/g, 'text-copper/');
impact = impact.replace(/bg-blue-/g, 'bg-copper/');
impact = impact.replace(/border-blue-/g, 'border-copper/');
fs.writeFileSync('src/components/impact/ImpactAnalyticsDashboard.tsx', impact);
