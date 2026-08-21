const fs = require('fs');

let view = fs.readFileSync('src/components/passport/MaterialPassportView.tsx', 'utf8');

// The hackathon prompt wants separate states for AI, Lab, Doc, GSTIN, Ledger.
// Let's replace the top right badge (usually where the main verification is).
// Let's find what badges are there.
// We'll replace the generic `demo_ledger_anchored` text (formerly `verified_onchain`).

// First, I'll inject a VerificationBadge component.
const newBadges = `
const VerificationBadge = ({ label, status, type }: { label: string, status?: string, type: 'ai' | 'lab' | 'ledger' | 'gst' | 'doc' }) => {
  let color = "bg-gray-800 text-gray-300 border-gray-600";
  if (status === "AI_ANALYZED" || status === "DOCUMENT_VERIFIED" || status === "ORGANIZATION_VERIFIED" || status === "GSTIN_FORMAT_CHECKED") color = "bg-emerald-950/50 text-emerald-400 border-emerald-800";
  if (status === "demo_ledger_anchored") color = "bg-blue-950/50 text-blue-400 border-blue-800";
  if (status === "LAB_VERIFICATION_PENDING" || status === "PENDING") color = "bg-amber-950/50 text-amber-400 border-amber-800";

  return (
    <div className={\`flex items-center gap-1.5 px-2 py-1 rounded-md border text-[10px] font-bold uppercase \${color}\`}>
      {type === 'ai' && <Sparkles className="w-3 h-3" />}
      {type === 'lab' && <ShieldCheck className="w-3 h-3" />}
      {type === 'ledger' && <Lock className="w-3 h-3" />}
      {type === 'gst' && <Building2 className="w-3 h-3" />}
      <span>{label} {status && \`• \${status.replace(/_/g, ' ')}\`}</span>
    </div>
  );
};
`;

// Insert the badges before the component definition
view = view.replace('export const MaterialPassportView', newBadges + '\nexport const MaterialPassportView');

// Find the section rendering tags and inject the new detailed badges
view = view.replace(
  '<div className="mt-4 flex flex-wrap gap-2">',
  `<div className="mt-4 flex flex-wrap gap-2">
              <VerificationBadge type="ai" label={passport.aiSource === "gemini" ? "AI (Gemini)" : "Demo Classifier"} status={passport.aiStatus || "AI_ANALYZED"} />
              <VerificationBadge type="lab" label="Lab" status={passport.labStatus || "LAB_VERIFICATION_PENDING"} />
              <VerificationBadge type="gst" label="GSTIN" status={passport.gstinStatus || "GSTIN_FORMAT_CHECKED"} />
              <VerificationBadge type="doc" label="Documents" status={passport.documentStatus || "DOCUMENT_VERIFIED"} />
              <VerificationBadge type="ledger" label="Ledger" status={passport.verificationStatus === "demo_ledger_anchored" ? "DEMO_LEDGER_ANCHORED" : passport.verificationStatus} />`
);

// We need to also fix the "Lab Verification Pending" text if it's there
view = view.replace(/<span className="text-emerald-400">Lab Verification Pending<\/span>/g, '<span className="text-amber-400">Lab Verification Pending</span>');

fs.writeFileSync('src/components/passport/MaterialPassportView.tsx', view);
