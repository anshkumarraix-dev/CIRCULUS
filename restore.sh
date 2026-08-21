#!/bin/bash
# Remove current components
rm -rf src/components
# Copy original components
cp -R /tmp/circulus-backup/src/components src/components

# Copy original index.css
cp /tmp/circulus-backup/src/index.css src/index.css

# Copy original App.tsx
cp /tmp/circulus-backup/src/App.tsx src/App.tsx

# Re-apply LoginPage.tsx fix
sed -i 's/\[ GSTIN VALIDATED \]/\[ GSTIN FORMAT CHECKED \]/g' src/components/auth/LoginPage.tsx
sed -i 's/Protected by 256-bit SHA state proofs./Protected by deterministic content hashes./g' src/components/auth/LoginPage.tsx

# Re-apply OwnershipLedgerView.tsx fix
sed -i 's/Generating SHA-256 state proof.../Generating SHA-256 content hash.../g' src/components/ledger/OwnershipLedgerView.tsx
sed -i 's/Standard Mode/Demo Ledger/g' src/components/ledger/OwnershipLedgerView.tsx

