const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Insert handleDeleteAccount and handleGuestLogin
const injectLogic = `
  const handleDeleteAccount = async () => {
    try {
      await fetch('/api/auth/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: activeRole.gstin })
      });
    } catch (e) {
      console.error(e);
    }
    
    setIsAuthenticated(false);
    localStorage.removeItem("circulus_auth");
    localStorage.removeItem("circulus_role");
    showToast("Account deleted and personal data anonymized.");
  };

  const handleGuestLogin = () => {
    const guestUser = USER_ROLES.find(r => r.id === "guest") || USER_ROLES[0];
    setActiveRole(guestUser);
    setIsAuthenticated(true);
    localStorage.setItem("circulus_auth", "true");
    localStorage.setItem("circulus_role", JSON.stringify(guestUser));
    showToast("Welcome! Exploring as Read-Only Guest.");
  };
`;

code = code.replace(/const \[activeRole, setActiveRole\] = useState<UserRole>\(USER_ROLES\[0\]\);/, 'const [activeRole, setActiveRole] = useState<UserRole>(USER_ROLES[0]);\n' + injectLogic);

// Replace onExploreAsGuest
code = code.replace(/onExploreAsGuest=\{\(\) \=\> setIsAuthenticated\(true\)\}/, 'onExploreAsGuest={handleGuestLogin}');

// Add guest guards
code = code.replace(/const handleRealTimeEntryCreated = \(newPassport: MaterialPassport\) => {/, 'const handleRealTimeEntryCreated = (newPassport: MaterialPassport) => {\n    if (activeRole.role === "guest" || activeRole.id === "guest") {\n      showToast("Action Forbidden: Guest mode is read-only.");\n      return;\n    }');
code = code.replace(/const handlePassportCreated = \(newPassport: MaterialPassport\) => {/, 'const handlePassportCreated = (newPassport: MaterialPassport) => {\n    if (activeRole.role === "guest" || activeRole.id === "guest") {\n      showToast("Action Forbidden: Guest mode is read-only.");\n      return;\n    }');
code = code.replace(/const handleAddLedgerEvent = \(passportId: string, e: LedgerEvent\) => {/, 'const handleAddLedgerEvent = (passportId: string, e: LedgerEvent) => {\n    if (activeRole.role === "guest" || activeRole.id === "guest") {\n      showToast("Action Forbidden: Guest mode is read-only.");\n      return;\n    }');
code = code.replace(/const handleSubmitOffer = \(passportId: string, price: number\) => {/, 'const handleSubmitOffer = (passportId: string, price: number) => {\n    if (activeRole.role === "guest" || activeRole.id === "guest") {\n      showToast("Action Forbidden: Guest mode is read-only.");\n      return;\n    }');

// Pass onDeleteAccount to Sidebar
code = code.replace(/onSignOut=\{handleSignOut\}/, 'onSignOut={handleSignOut}\n        onDeleteAccount={handleDeleteAccount}');

fs.writeFileSync('src/App.tsx', code);
