const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('src', function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Split by <div or <motion.div to find elements with overflow-y-auto
    const regex = /(<(?:[a-zA-Z0-9.]+)?\s+[^>]*class(?:Name)?=["'][^"']*overflow-y-auto)([^"']*["'][^>]*>)/g;
    content = content.replace(regex, (match, p1, p2) => {
      if (!match.includes('overscroll-contain')) {
        changed = true;
        return p1 + ' overscroll-contain' + p2;
      }
      return match;
    });

    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log('Fixed', filePath);
    }
  }
});
