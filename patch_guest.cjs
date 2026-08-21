const fs = require('fs');

let types = fs.readFileSync('src/types.ts', 'utf8');

const guestRole = `
  {
    id: "guest",
    name: "Guest Explorer",
    role: "guest",
    orgName: "Public Viewer",
    gstin: "N/A"
  },`;

types = types.replace(
  'export const USER_ROLES: UserRole[] = [',
  'export const USER_ROLES: UserRole[] = [' + guestRole
);

fs.writeFileSync('src/types.ts', types);
