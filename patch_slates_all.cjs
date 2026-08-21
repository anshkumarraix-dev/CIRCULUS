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

    // General surfaces
    content = content.replace(/bg-slate-800\s+p-[0-9]+\s+rounded-[a-z0-9]+\s+border\s+border-slate-700(\/60)?/g, 'neo-surface p-4 rounded-2xl');
    content = content.replace(/bg-slate-50\s+p-[0-9]+\s+rounded-[a-z0-9]+\s+border\s+border-\[var\(--color-neo-border-strong\)\]/g, 'neo-surface p-4 rounded-2xl');
    
    // Generic elements
    content = content.replace(/bg-slate-800(\/80)?\s+border(-dashed)?\s+border-slate-[0-9]+/g, 'neo-surface border-[var(--color-neo-border)]');
    content = content.replace(/bg-slate-800/g, 'neo-surface');
    content = content.replace(/bg-slate-900\/80 backdrop-blur-md/g, 'neo-glass');
    content = content.replace(/bg-slate-100(\s+hover:bg-slate-200)?/g, 'bg-white/5 hover:bg-white/10');
    content = content.replace(/bg-slate-200/g, 'bg-white/10');
    content = content.replace(/bg-slate-[0-9]+/g, 'neo-surface'); // Catch remaining like bg-slate-900
    
    // Progress / Accents
    content = content.replace(/accent-\[\#00E676\]/g, 'accent-[var(--color-neo-accent)]');
    content = content.replace(/border-slate-[0-9]+/g, 'border-[var(--color-neo-border)]');
    content = content.replace(/text-slate-[2345]00/g, 'text-[var(--color-neo-text-muted)]');
    content = content.replace(/text-slate-[78]00/g, 'text-[var(--color-neo-text)]');
    
    // Inputs (catch any left behind)
    content = content.replace(/w-full\s+neo-surface\s+border\s+border-\[var\(--color-neo-border\)\]\s+rounded-xl\s+px-3(\.5)?\s+py-2(\.5)?\s+(text-\[var\(--color-neo-text-muted\)\]|text-white|text-[a-z-]+)\s+(placeholder-[a-z0-9-]+\s+)?font-medium\s+focus:border-[a-z0-9-]+\s+focus:neo-surface\s+focus:outline-none/g, 'neo-input w-full px-4 py-3 rounded-xl text-sm font-medium');

    fs.writeFileSync(file, content);
});
console.log('Fixed all slates');
