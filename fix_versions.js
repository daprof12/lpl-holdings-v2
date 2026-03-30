const fs = require('fs');
const path = require('path');
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('dist')) {
                results = results.concat(walk(file));
            }
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}
const files = walk(__dirname);
let packages = new Set();
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let changed = false;

    // Scoped packages e.g. @radix-ui/react-slot@1.1.2
    const reScoped = /(from|import)\s+['"](@[a-zA-Z0-9\.\-]+\/[a-zA-Z0-9\.\-]+)@([0-9a-zA-Z\.\-\^]+)['"]/g;
    let newContent = content.replace(reScoped, (match, p1, pkgName, version) => {
        changed = true;
        packages.add(pkgName);
        return `${p1} "${pkgName}"`;
    });

    // Normal packages e.g. class-variance-authority@0.7.1
    const reNormal = /(from|import)\s+['"]([a-zA-Z0-9\.\-]+)@([0-9a-zA-Z\.\-\^]+)['"]/g;
    newContent = newContent.replace(reNormal, (match, p1, pkgName, version) => {
        changed = true;
        packages.add(pkgName);
        return `${p1} "${pkgName}"`;
    });

    if (changed) {
        fs.writeFileSync(f, newContent, 'utf8');
        console.log('Cleaned', f);
    }
});
console.log("Packages that we may need to install:", Array.from(packages).join(" "));
