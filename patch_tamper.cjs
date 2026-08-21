const fs = require('fs');

let view = fs.readFileSync('src/components/passport/MaterialPassportView.tsx', 'utf8');

// Inject tamper states
view = view.replace(
  'const [copiedAadhaarText, setCopiedAadhaarText] = useState<boolean>(false);',
  `const [copiedAadhaarText, setCopiedAadhaarText] = useState<boolean>(false);
  const [tampered, setTampered] = useState<boolean>(false);
  const [integrityStatus, setIntegrityStatus] = useState<"VERIFIED" | "TAMPERED" | null>(null);

  const simulateTampering = () => {
    setTampered(true);
    setIntegrityStatus(null);
    alert("Warning: Local passport data mutated without updating the SHA-256 hash. Click Verify Integrity.");
  };

  const verifyIntegrity = () => {
    // In a real app we'd recalculate the hash from the actual data object
    // Since we simulated tampering via a boolean flag for the hackathon UI demo:
    if (tampered) {
      setIntegrityStatus("TAMPERED");
    } else {
      setIntegrityStatus("VERIFIED");
    }
  };`
);

// Add the UI buttons
const buttons = `
          {/* Integrity & Tamper Demo */}
          <div className="mt-4 p-4 border border-slate-700 bg-slate-900/50 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-bold text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-400" />
                Ledger Integrity Check
              </h4>
              <div className="flex gap-2">
                <button onClick={simulateTampering} className="px-3 py-1 bg-red-900/50 hover:bg-red-900 border border-red-800 text-red-200 text-[10px] uppercase font-bold rounded-md transition">
                  Simulate Tampering
                </button>
                <button onClick={verifyIntegrity} className="px-3 py-1 bg-blue-900/50 hover:bg-blue-900 border border-blue-800 text-blue-200 text-[10px] uppercase font-bold rounded-md transition">
                  Verify Integrity
                </button>
              </div>
            </div>
            
            {integrityStatus === "TAMPERED" && (
              <div className="p-3 bg-red-950/50 border border-red-800 rounded-lg">
                <p className="text-red-400 text-xs font-bold font-mono">❌ INTEGRITY CHECK FAILED: TAMPERED</p>
                <p className="text-red-300 text-[11px] mt-1">The current payload does not match the anchored SHA-256 Content Hash. Data modification detected.</p>
              </div>
            )}
            {integrityStatus === "VERIFIED" && (
              <div className="p-3 bg-emerald-950/50 border border-emerald-800 rounded-lg">
                <p className="text-emerald-400 text-xs font-bold font-mono">✅ INTEGRITY CHECK PASSED: VERIFIED</p>
                <p className="text-emerald-300 text-[11px] mt-1">The SHA-256 Content Hash perfectly matches the payload. No tampering detected.</p>
              </div>
            )}
          </div>
`;

view = view.replace(
  '{/* Actions Grid */}',
  buttons + '\n          {/* Actions Grid */}'
);

// Make the quantity/material show as tampered
view = view.replace(
  '<span className="text-white font-bold">{passport.quantityMT} MT</span>',
  '<span className="text-white font-bold">{tampered ? passport.quantityMT + 50 : passport.quantityMT} MT</span>'
);

fs.writeFileSync('src/components/passport/MaterialPassportView.tsx', view);
