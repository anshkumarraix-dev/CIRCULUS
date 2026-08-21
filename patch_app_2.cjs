const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

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

code = code.replace(/const handleSignOut = \(\) => {/, injectLogic + '\n  const handleSignOut = () => {');

fs.writeFileSync('src/App.tsx', code);
