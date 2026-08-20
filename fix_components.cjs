const fs = require('fs');

// MaterialPassportView.tsx
let passport = fs.readFileSync('src/components/passport/MaterialPassportView.tsx', 'utf-8');
passport = passport.replace(/bg-\[#12181F\]/g, 'bg-panel');
passport = passport.replace(/bg-slate-900/g, 'bg-panel');
passport = passport.replace(/bg-slate-800/g, 'bg-white/5');
passport = passport.replace(/border-slate-800/g, 'border-white/5');
passport = passport.replace(/border-slate-700/g, 'border-white/10');
passport = passport.replace(/text-slate-400/g, 'text-silver/80');
passport = passport.replace(/text-slate-300/g, 'text-silver');
passport = passport.replace(/text-white/g, 'text-ink');
fs.writeFileSync('src/components/passport/MaterialPassportView.tsx', passport);

// ImpactAnalyticsDashboard.tsx
let impact = fs.readFileSync('src/components/impact/ImpactAnalyticsDashboard.tsx', 'utf-8');
impact = impact.replace(/bg-\[#12181F\]/g, 'bg-panel');
impact = impact.replace(/bg-slate-900/g, 'bg-panel');
impact = impact.replace(/bg-slate-800/g, 'bg-white/5');
impact = impact.replace(/border-slate-800/g, 'border-white/5');
impact = impact.replace(/border-slate-700/g, 'border-white/10');
impact = impact.replace(/text-slate-400/g, 'text-silver/80');
impact = impact.replace(/text-slate-300/g, 'text-silver');
impact = impact.replace(/text-white/g, 'text-ink');
fs.writeFileSync('src/components/impact/ImpactAnalyticsDashboard.tsx', impact);
