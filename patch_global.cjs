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

// We MUST skip LoginPage
const skipFiles = ['LoginPage.tsx'];

files.forEach(file => {
    if (skipFiles.some(skip => file.includes(skip))) {
        console.log(`Skipping ${file}`);
        return;
    }
    
    let content = fs.readFileSync(file, 'utf8');
    
    // Backgrounds & Surfaces
    content = content.replace(/bg-panel\/\[0\.xx\]/g, 'neo-glass'); // just in case
    content = content.replace(/bg-panel(\/80)?\s+border(\-[a-z]+)?\s+border-white\/(5|10)(\/60)?\s+(backdrop-blur-[a-z]+)?/g, 'neo-glass');
    content = content.replace(/bg-panel\s+border(\-[a-z]+)?\s+border-white\/(5|10)(\/60)?/g, 'neo-surface');
    content = content.replace(/bg-panel/g, 'neo-surface');
    
    // Cards/Glass
    content = content.replace(/bg-white\/(5|10|20)(\/[0-9]+)?\s+border(\-[a-z]+)?\s+border-white\/(10|20)(\/[0-9]+)?/g, 'neo-glass');
    content = content.replace(/bg-white\/5\s+hover:bg-white\/10\s+border\s+border-white\/10/g, 'neo-btn-secondary');
    
    // Inputs
    content = content.replace(/bg-white\/5\s+border\s+border-white\/10\s+rounded-[a-z0-9]+\s+px-[0-9]+\s+py-[0-9]+\s+text-[a-z]+\s+text-ink\s+(placeholder-[a-z0-9-]+\s+)?focus:border-[a-z0-9-]+\s+(focus:bg-panel\s+)?(focus:outline-none\s+)?(font-[a-z]+\s+)?/g, 'neo-input px-4 py-3 rounded-xl text-sm font-medium w-full ');
    
    // Buttons (Copper -> Primary Accent)
    content = content.replace(/bg-copper\s+hover:bg-copper\/90\s+text-white/g, 'neo-btn-primary');
    content = content.replace(/bg-moss\s+hover:bg-moss\/90\s+text-white/g, 'neo-btn-primary');
    
    // Colors
    content = content.replace(/text-copper/g, 'text-[var(--color-neo-accent)]');
    content = content.replace(/bg-copper/g, 'bg-[var(--color-neo-accent)]');
    content = content.replace(/border-copper/g, 'border-[var(--color-neo-accent)]');
    content = content.replace(/text-\[\#F97316\]/g, 'text-[var(--color-neo-accent)]');
    content = content.replace(/text-moss/g, 'text-[var(--color-neo-emerald)]');
    content = content.replace(/bg-moss/g, 'bg-[var(--color-neo-emerald)]');
    content = content.replace(/text-silver/g, 'text-[var(--color-neo-text-muted)]');
    content = content.replace(/text-ink/g, 'text-[var(--color-neo-text)]');
    
    // Fix up classes that got weird
    content = content.replace(/neo-glass\s+neo-glass/g, 'neo-glass');
    content = content.replace(/neo-surface\s+neo-surface/g, 'neo-surface');

    fs.writeFileSync(file, content);
});
console.log('Global design system applied.');
