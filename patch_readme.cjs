const fs = require('fs');

let readme = fs.readFileSync('README.md', 'utf8');

const newArch = `## 🏛️ 5. Architecture

### Real / Implemented
* **AI classification:** Image-based analysis using Gemini Multimodal APIs.
* **Persistent Records:** Node.js backend acting as the primary source of truth for passports and listings (via in-memory Hackathon DB).
* **SHA-256 Hashing:** Deterministic content hashing for material passports to establish a tamper-evident baseline.
* **Custody State Machine:** Backend-enforced transitions for ownership transfer.
* **Authorization:** Server-side JWT/session validation preventing guest privilege escalation.
* **Evidence Management:** File and metadata tracking for verification records.

### Demo / Simulated
* **CIRCULUS Demo Ledger:** Event hashing and chaining is simulated in an internal ledger without connecting to a public blockchain.
* **Demo Market Activity:** Pricing metrics and buyers are generated from realistic seed data to demonstrate marketplace logic without relying on external real-time trading APIs.
* **Government/GSTIN Checks:** Currently limited to regex format checks, labeled as \`GSTIN_FORMAT_CHECKED\`.
* **Lab Verification:** Simulated lab statuses default to \`LAB_VERIFICATION_PENDING\` unless seeded evidence is present.

### Production Roadmap
* **Polygon Testnet/Mainnet Smart Contract:** Migrate the Demo Ledger to an actual Polygon adapter.
* **Government Verification:** Integrate with GSTN/SPCB APIs for real-time compliance validation.
* **Lab Integrations:** API partnerships with certified material testing laboratories.
* **Logistics APIs:** E-way bill and GPS tracking integration.
* **Production Identity:** OAuth/Enterprise SSO and HSM-backed digital signatures.
`;

readme = readme.replace(/## 🏛️ 5\. Architecture[\s\S]*?## 🛠️ 6\. Tech Stack/, newArch + '\n## 🛠️ 6. Tech Stack');

fs.writeFileSync('README.md', readme);
