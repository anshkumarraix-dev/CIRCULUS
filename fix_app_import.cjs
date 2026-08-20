const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf-8');
app = app.replace(
  /import \{ AppHeader, USER_ROLES \} from "\.\/components\/layout\/AppHeader";/,
  'import { AppHeader } from "./components/layout/AppHeader";\nimport { USER_ROLES } from "./types";'
);
fs.writeFileSync('src/App.tsx', app);

let types = fs.readFileSync('src/types.ts', 'utf-8');
if(!types.includes('USER_ROLES')) {
  types += `
export const USER_ROLES: UserRole[] = [
  { id: "supplier", name: "Plant Manager", orgName: "AluCast Manufacturing", gstin: "24AAACA1234B1Z5", location: "Sanand, GJ", avatar: "👤", isVerified: true },
  { id: "buyer", name: "Procurement Lead", orgName: "Mahavir PolyRecycle", gstin: "24AABCM1234F1Z8", location: "Surat, GJ", avatar: "👔", isVerified: true },
  { id: "auditor", name: "Compliance Officer", orgName: "GreenTech Audits", gstin: "27AADCG9876E1Z2", location: "Mumbai, MH", avatar: "🛡️", isVerified: true },
];
`;
  fs.writeFileSync('src/types.ts', types);
}
