const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');

const guard = `
    if (activeRole.role === "guest" || activeRole.id === "guest") {
      showToast("Action Forbidden: Guest mode is read-only.");
      return;
    }
`;

// Inject into handlers
app = app.replace(
  'const handleRealTimeEntryCreated = (\n    newPassport: MaterialPassport, \n    newListing: MarketplaceListing, \n    newEvent: OwnershipEvent\n  ) => {',
  `const handleRealTimeEntryCreated = (\n    newPassport: MaterialPassport, \n    newListing: MarketplaceListing, \n    newEvent: OwnershipEvent\n  ) => {${guard}`
);

app = app.replace(
  'const handlePassportCreated = (newPassport: MaterialPassport) => {',
  `const handlePassportCreated = (newPassport: MaterialPassport) => {${guard}`
);

app = app.replace(
  'const handleAddLedgerEvent = (event: OwnershipEvent) => {',
  `const handleAddLedgerEvent = (event: OwnershipEvent) => {${guard}`
);

app = app.replace(
  'const handleSubmitOffer = (listingId: string, offerDetails: any) => {',
  `const handleSubmitOffer = (listingId: string, offerDetails: any) => {${guard}`
);

fs.writeFileSync('src/App.tsx', app);
