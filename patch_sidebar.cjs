const fs = require('fs');
let code = fs.readFileSync('src/components/layout/Sidebar.tsx', 'utf8');

// Add to props
code = code.replace(/onSignOut: \(\) => void;/, 'onSignOut: () => void;\n  onDeleteAccount: () => void;');
code = code.replace(/onSignOut,/, 'onSignOut,\n  onDeleteAccount,');

// Add the button
const buttonHtml = `
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete your account? All personal data will be anonymized and removed.")) {
                onDeleteAccount();
              }
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-silver hover:text-red-500 hover:bg-red-500/10 transition cursor-pointer mt-1"
          >
            <span className="font-body text-xs text-red-500/70">Delete Account</span>
          </button>
`;

code = code.replace(/<span className="font-body">Sign Out<\/span>\s*<\/button>/, '<span className="font-body">Sign Out</span>\n          </button>' + buttonHtml);

fs.writeFileSync('src/components/layout/Sidebar.tsx', code);
