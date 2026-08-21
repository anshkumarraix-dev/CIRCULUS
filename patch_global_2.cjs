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
const skipFiles = ['LoginPage.tsx'];

files.forEach(file => {
    if (skipFiles.some(skip => file.includes(skip))) {
        return;
    }
    
    let content = fs.readFileSync(file, 'utf8');
    
    // Convert generic bg-white/5 + border-white/10 into neo-surface or neo-glass
    content = content.replace(/bg-white\/5\s+p-([0-9]+)\s+rounded-[a-z0-9]+\s+border\s+border-white\/10/g, 'neo-surface p-$1 rounded-2xl');
    content = content.replace(/bg-white\/5\s+border\s+border-white\/10/g, 'neo-surface');
    content = content.replace(/border-white\/5/g, 'border-[var(--color-neo-border)]');
    content = content.replace(/border-white\/10/g, 'border-[var(--color-neo-border-strong)]');
    
    // Checkboxes & Small buttons
    content = content.replace(/bg-white\/5\s+hover:bg-white\/10\s+text-\[var\(--color-neo-text-muted\)\]/g, 'neo-btn-secondary');
    
    // Accent colors
    content = content.replace(/accent-\[\#FF6D00\]/g, 'accent-[var(--color-neo-accent)]');
    content = content.replace(/text-\[\#FF6D00\]/g, 'text-[var(--color-neo-accent)]');
    content = content.replace(/bg-\[\#FF6D00\]/g, 'bg-[var(--color-neo-accent)]');

    fs.writeFileSync(file, content);
});
console.log('Global design system cleanup applied.');
