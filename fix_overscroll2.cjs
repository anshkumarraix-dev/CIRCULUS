const fs = require('fs');
const files = [
  'src/components/common/RealTimeEntryModal.tsx',
  'src/components/impact/ImpactAnalyticsDashboard.tsx',
  'src/components/marketplace/ListingDetailModal.tsx',
  'src/components/matches/MatchRecommendations.tsx',
  'src/components/passport/MaterialPassportView.tsx'
];
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/overflow-y-auto/g, 'overflow-y-auto overscroll-contain');
  // Just in case I did it twice, replace double
  content = content.replace(/overscroll-contain overscroll-contain/g, 'overscroll-contain');
  fs.writeFileSync(f, content);
});
