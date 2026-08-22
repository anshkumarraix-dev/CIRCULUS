# Contributing to CIRCULUS

Thank you for contributing to **CIRCULUS** — the AI-powered circular economy marketplace for industrial materials.

---

## 🛠️ Development Standards

### 1. Code Location
- All source files belong strictly in `src/` (for frontend components, hooks, lib, and utils), `server.ts` (for Express backend routing and proxy endpoints), or `api/` (for serverless Vercel endpoints).
- **Never create or commit one-off patch/fix scripts** (`patch*.cjs`, `fix_*.cjs`) to the project root. All bugfixes and features must be applied directly to the corresponding TypeScript modules.

### 2. Component Organization
- Group components by domain within `src/components/`:
  - `auth/` — Login, OTP verification, and role state
  - `common/` — Shared widgets (Ticker, AIChatWidget, RealTimeEntryModal)
  - `compliance/` — Indian regulations (CPCB / SPCB EPR, MoEFCC Fly Ash)
  - `impact/` — Carbon avoidance metrics, BRSR compliance reports
  - `layout/` — AppHeader, Sidebar, AppFooter
  - `ledger/` — Tamper-evident custody trail and transaction records
  - `marketplace/` — Live listings, bidding, and detail modals
  - `matches/` — AI buyer proximity matching engine
  - `passport/` — Digital Product Passport (DPP) view and list
  - `scanner/` — Multimodal AI vision photo & camera scanner
  - `ui/` — Atomic UI elements (Badges, Chips)

### 3. Naming Conventions
- **Components:** PascalCase (e.g., `MaterialScanner.tsx`, `AIChatWidget.tsx`)
- **Utilities / Libraries:** kebab-case or camelCase (e.g., `carbon-engine.ts`, `aiCopilotEngine.ts`)
- **Types & Enums:** Defined centrally in `src/types.ts`

### 4. Security & Environment Keys
- The `GEMINI_API_KEY` and any third-party credentials must **never** be referenced in client-side bundles with `VITE_` prefixes.
- All AI calls are dispatched through the backend proxy (`/api/*`) or serverless functions.

### 5. Verification Checklist
Before committing:
```bash
# 1. Typecheck and lint without errors
npm run lint

# 2. Verify full production build passes
npm run build
```
