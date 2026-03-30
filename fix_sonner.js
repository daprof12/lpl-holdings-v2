const fs = require('fs');
const path = require('path');
function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('dist')) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}
const files = walk(__dirname);
files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    if (content.includes('sonner@2.0.3')) {
        content = content.replace(/sonner@2\.0\.3/g, 'sonner');
        fs.writeFileSync(f, content, 'utf8');
        console.log('Fixed', f);
    }
});
