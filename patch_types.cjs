const fs = require('fs');

let types = fs.readFileSync('src/types.ts', 'utf8');

// Inject the detailed verification states into MaterialPassport
types = types.replace(
  'verificationStatus: "demo_ledger" | "demo_ledger_anchored" | "pending_audit";',
  `verificationStatus: "demo_ledger" | "demo_ledger_anchored" | "pending_audit";
  aiStatus?: "AI_ANALYZED" | "USER_DECLARED";
  aiSource?: string;
  documentStatus?: "DOCUMENT_SUBMITTED" | "DOCUMENT_VERIFIED" | "PENDING";
  labStatus?: "LAB_VERIFICATION_PENDING" | "LAB_VERIFIED" | "NOT_PROVIDED";
  organizationStatus?: "ORGANIZATION_VERIFIED" | "PENDING";
  gstinStatus?: "GSTIN_FORMAT_CHECKED" | "GSTIN_VERIFIED" | "PENDING";`
);

fs.writeFileSync('src/types.ts', types);

let demoData = fs.readFileSync('src/lib/demo-data.ts', 'utf8');
demoData = demoData.replace(/verificationStatus: "demo_ledger_anchored",/g, 'verificationStatus: "demo_ledger_anchored",\n    aiStatus: "AI_ANALYZED",\n    aiSource: "demo_classifier",\n    documentStatus: "DOCUMENT_VERIFIED",\n    labStatus: "LAB_VERIFICATION_PENDING",\n    organizationStatus: "ORGANIZATION_VERIFIED",\n    gstinStatus: "GSTIN_FORMAT_CHECKED",');

fs.writeFileSync('src/lib/demo-data.ts', demoData);

