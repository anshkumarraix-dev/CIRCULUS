const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf-8');

// Replace AppHeader import
app = app.replace(
  /import { AppHeader } from "\.\/components\/layout\/AppHeader";/,
  `import { AppHeader } from "./components/layout/AppHeader";\nimport { Sidebar } from "./components/layout/Sidebar";`
);

// Add isMobileOpen state
app = app.replace(
  /const \[isRealTimeModalOpen, setIsRealTimeModalOpen\] = useState<boolean>\(false\);/,
  `const [isRealTimeModalOpen, setIsRealTimeModalOpen] = useState<boolean>(false);\n  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);`
);

// Remove the floating copilot launcher block completely
app = app.replace(/\{\/\* Floating 1-Click AI Helper Launcher[^}]+\}\)\}/, "");

// Modify the layout wrapper
const newLayout = `
    <div className="h-screen bg-primary text-ink flex overflow-hidden font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[60] bg-panel border border-white/10 text-ink px-4 py-3 rounded-lg shadow-xl flex items-center gap-2.5 text-xs font-mono font-semibold animate-fadeIn">
          <div className="w-5 h-5 rounded-full bg-moss/20 flex items-center justify-center text-moss shrink-0 border border-moss/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        activeRole={activeRole}
        onSignOut={handleSignOut}
        onOpenRealTimeEntry={() => setIsRealTimeModalOpen(true)}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AppHeader
          activeRole={activeRole}
          onToggleCopilot={() => setIsCopilotOpen(!isCopilotOpen)}
          isCopilotOpen={isCopilotOpen}
          onOpenMobileMenu={() => setIsMobileOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-8">
          <div className="max-w-7xl mx-auto w-full">
            {/* Marketplace View */}
`;

// Replace from `return (` down to `{/* Marketplace View */}`
app = app.replace(/return \([\s\S]*?\{\/\* Marketplace View \*\/\}/, newLayout);

// Close the main and div
app = app.replace(/<\/main>[\s\S]*?\{\/\* Footer \*\/\}\s*<AppFooter \/>\s*<\/div>/, 
`          </div>
        </main>
      </div>

      {/* Real-Time Entry Modal */}
      <RealTimeEntryModal
        isOpen={isRealTimeModalOpen}
        onClose={() => setIsRealTimeModalOpen(false)}
        activeRole={activeRole}
        onEntryCreated={handleRealTimeEntryCreated}
      />

      {/* Floating CirculAI Copilot Drawer */}
      <CirculAiCopilot
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        activePassport={currentPassport || undefined}
        activeRole={activeRole}
      />

      {/* 3-Minute Judge Demo Tour Guide Modal */}
      <DemoTourGuide
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
        onNavigateStep={handleNavigateStep}
      />
    </div>`
);

fs.writeFileSync('src/App.tsx', app);
