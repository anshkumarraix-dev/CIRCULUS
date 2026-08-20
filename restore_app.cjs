const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf-8');

app = app.replace(
  /  \/\/ If user is not authenticated, render Login Page\n  if \(\!isAuthenticated\) \{\n        <div className="h-screen bg-primary text-ink flex overflow-hidden font-sans">/,
  `  // If user is not authenticated, render Login Page
  if (!isAuthenticated) {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onExploreAsGuest={() => setIsAuthenticated(true)}
      />
    );
  }

  const currentPassport = activePassportId
    ? passports.find((p) => p.id === activePassportId)
    : null;

  return (
    <div className="h-screen bg-primary text-ink flex overflow-hidden font-sans">`
);

fs.writeFileSync('src/App.tsx', app);
