const fs = require('fs');
let code = fs.readFileSync('src/components/auth/LoginPage.tsx', 'utf-8');

code = code.replace(
  /import \{ USER_ROLES \} from "\.\.\/layout\/AppHeader";/,
  'import { USER_ROLES } from "../../types";'
);

fs.writeFileSync('src/components/auth/LoginPage.tsx', code);
