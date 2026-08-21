const fs = require('fs');

let server = fs.readFileSync('server.ts', 'utf8');
server = server.replace('req.user = { id: token };', '(req as any).user = { id: token };');
fs.writeFileSync('server.ts', server);

let types = fs.readFileSync('src/types.ts', 'utf8');
types = types.replace(
  'id: "guest",\n    name: "Guest Explorer",\n    role: "guest",\n    orgName: "Public Viewer",\n    gstin: "N/A"',
  'id: "guest",\n    name: "Guest Explorer",\n    orgName: "Public Viewer",\n    gstin: "N/A",\n    location: "N/A",\n    avatar: "👁️",\n    isVerified: false'
);
fs.writeFileSync('src/types.ts', types);

let demoData = fs.readFileSync('src/lib/demo-data.ts', 'utf8');
demoData = demoData.replace(/    aiStatus: "AI_ANALYZED",\n    aiSource: "demo_classifier",\n    documentStatus: "DOCUMENT_VERIFIED",\n    labStatus: "LAB_VERIFICATION_PENDING",\n    organizationStatus: "ORGANIZATION_VERIFIED",\n    gstinStatus: "GSTIN_FORMAT_CHECKED",\n/g, '');

// Re-add to Passports (only the ones matching CUS-)
// It's probably easier to just ignore the MarketplaceListing aiStatus for now, let's fix it properly
// The replacement above removes ALL of them. Let's write a targeted replace for MaterialPassport items:
