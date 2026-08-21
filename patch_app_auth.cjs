const fs = require('fs');

let app = fs.readFileSync('src/App.tsx', 'utf8');

// Add handleGuestLogin
app = app.replace(
  'const handleSignOut = () => {',
  `const handleGuestLogin = () => {
    const guestUser = USER_ROLES.find(r => r.id === "guest") || USER_ROLES[0];
    setActiveRole(guestUser);
    setIsAuthenticated(true);
    localStorage.setItem("circulus_auth", "true");
    localStorage.setItem("circulus_role", JSON.stringify(guestUser));
    showToast("Welcome! Exploring as Read-Only Guest.");
  };

  const handleSignOut = () => {`
);

app = app.replace(
  'onExploreAsGuest={() => setIsAuthenticated(true)}',
  'onExploreAsGuest={handleGuestLogin}'
);

fs.writeFileSync('src/App.tsx', app);
