const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('src/components').concat(walk('src/lib'), ['src/App.tsx']);
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/hover:bg-slate-50/g, 'hover:bg-white/5');
    content = content.replace(/text-emerald-800/g, 'text-emerald-400');
    content = content.replace(/border-emerald-300/g, 'border-emerald-500/30');
    content = content.replace(/shadow-blue-600\/20/g, 'shadow-none');
    fs.writeFileSync(file, content);
});
console.log('Fixed slate-50');
