const fs = require('fs');

function replaceColors(file) {
  let code = fs.readFileSync(file, 'utf8');
  code = code.replace(/bg-blue-600/g, 'bg-accent-cyan text-primary');
  code = code.replace(/hover:bg-blue-700/g, 'hover:bg-accent-cyan/80');
  code = code.replace(/text-blue-600/g, 'text-accent-cyan');
  code = code.replace(/shadow-blue-600\/20/g, 'shadow-accent-cyan/20');
  code = code.replace(/bg-blue-500\/5/g, 'bg-accent-cyan/5');
  code = code.replace(/bg-blue-500\/10/g, 'bg-accent-cyan/10');
  code = code.replace(/bg-blue-500\/20/g, 'bg-accent-cyan/20');
  code = code.replace(/border-blue-500\/20/g, 'border-accent-cyan/20');
  code = code.replace(/border-blue-500\/30/g, 'border-accent-cyan/30');
  code = code.replace(/border-blue-500\/40/g, 'border-accent-cyan/40');
  code = code.replace(/text-blue-400/g, 'text-accent-cyan');
  code = code.replace(/text-blue-300/g, 'text-accent-cyan/80');
  code = code.replace(/bg-blue-50 /g, 'bg-accent-cyan/10 '); 
  code = code.replace(/bg-blue-100/g, 'bg-accent-cyan/20');
  code = code.replace(/text-blue-800/g, 'text-accent-cyan');
  
  // also fix copper in ledger
  code = code.replace(/text-copper/g, 'text-accent-gold');
  code = code.replace(/bg-copper/g, 'bg-accent-gold');
  code = code.replace(/border-copper/g, 'border-accent-gold');
  
  fs.writeFileSync(file, code);
}

replaceColors('src/components/scanner/MaterialScanner.tsx');
replaceColors('src/components/ledger/OwnershipLedgerView.tsx');
replaceColors('src/components/passport/PassportList.tsx');
replaceColors('src/components/matches/MatchRecommendations.tsx');
replaceColors('src/components/compliance/IndiaComplianceHub.tsx');
replaceColors('src/components/impact/ImpactAnalyticsDashboard.tsx');

