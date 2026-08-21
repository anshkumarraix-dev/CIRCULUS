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
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    let original = content;
    // Replace carefully in reverse order of size to prevent double-bumping
    content = content.replace(/\btext-lg\b/g, 'text-xl');
    content = content.replace(/\btext-base\b/g, 'text-lg');
    content = content.replace(/\btext-sm\b/g, 'text-base');
    content = content.replace(/\btext-xs\b/g, 'text-sm');
    content = content.replace(/text-\[10px\]/g, 'text-xs');
    content = content.replace(/text-\[11px\]/g, 'text-sm');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Updated typography in', filePath);
    }
  }
});
