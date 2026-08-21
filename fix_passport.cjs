const fs = require('fs');
let code = fs.readFileSync('src/components/passport/MaterialPassportView.tsx', 'utf8');

code = code.replace(
  /<img\s*src=\{passport\.imageUrl\}\s*alt=\{passport\.materialType\}\s*className="w-full h-full object-cover"\s*\/>/,
  '<img src={passport.imageUrl} alt={passport.materialType} className="w-full h-full object-cover" />\n              </motion.div>'
);

fs.writeFileSync('src/components/passport/MaterialPassportView.tsx', code);
