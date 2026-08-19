const fs = require('fs');

if (fs.existsSync('./src/index.css')) {
  let content = fs.readFileSync('./src/index.css', 'utf-8');
  if (!content.includes('@keyframes ticker')) {
    content += `
@keyframes ticker {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
`;
    fs.writeFileSync('./src/index.css', content);
  }
}
