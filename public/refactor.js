const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

// Find all index.html files in public subdirectories
const folders = fs.readdirSync(publicDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const htmlFiles = folders.map(folder => path.join(publicDir, folder, 'index.html')).filter(file => fs.existsSync(file));

if (htmlFiles.length === 0) {
    console.log("No files found!");
    process.exit(1);
}

// Extract header and footer from public/index/index.html
const indexHtmlContent = fs.readFileSync(path.join(publicDir, 'index', 'index.html'), 'utf8');

// The header starts with <header id="masthead" and ends with </header>
// The footer starts with <footer id="colophon" and ends with </footer>

const headerMatch = indexHtmlContent.match(/(<header id="masthead"[\s\S]*?<\/header>)/);
const footerMatch = indexHtmlContent.match(/(<footer id="colophon"[\s\S]*?<\/footer>)/);

if (!headerMatch || !footerMatch) {
    console.error("Could not find header or footer in public/index/index.html");
    process.exit(1);
}

let headerHTML = headerMatch[1];
let footerHTML = footerMatch[1];

// Update Links in Header
headerHTML = headerHTML.replace(/href="https:\/\/lpl-holdings\.com\/"/g, 'href="../index/"');
headerHTML = headerHTML.replace(/href="https:\/\/lpl-holdings\.com\/pricing\/"/g, 'href="../pricing/"');
headerHTML = headerHTML.replace(/href="https:\/\/lpl-holdings\.com\/platform\/"/g, 'href="../platform/"');
headerHTML = headerHTML.replace(/href="https:\/\/lpl-holdings\.com\/about\/"/g, 'href="../about/"');
headerHTML = headerHTML.replace(/href="https:\/\/lpl-holdings\.com\/trade\/"/g, 'href="../trade/"');
headerHTML = headerHTML.replace(/href="https:\/\/lpl-holdings\.com\/to-platform\/"/g, 'href="../../dashboard/"');
// Logo link
headerHTML = headerHTML.replace(/href="https:\/\/lpl-holdings\.com"/g, 'href="../index/"');

// Update Links in Footer
footerHTML = footerHTML.replace(/href="\/privacy-policy\/"/g, 'href="../privacy-policy/"');
footerHTML = footerHTML.replace(/href="\/warnings-document\/"/g, 'href="../warnings-document/"');
footerHTML = footerHTML.replace(/href="\/terms-and-conditions\/"/g, 'href="../terms-and-conditions/"');
footerHTML = footerHTML.replace(/href="\/investment-agreement\/"/g, 'href="../investment-agreement/"');
footerHTML = footerHTML.replace(/href="\/pricing\/#pricing-table-title"/g, 'href="../pricing/#pricing-table-title"');
footerHTML = footerHTML.replace(/href="\/pricing\/#pricing-table"/g, 'href="../pricing/#pricing-table"');
footerHTML = footerHTML.replace(/href="\/pricing\/#pricing-sub-table"/g, 'href="../pricing/#pricing-sub-table"');
footerHTML = footerHTML.replace(/href="\/platform\/"/g, 'href="../platform/"');
footerHTML = footerHTML.replace(/href="\/trade\/"/g, 'href="../trade/"');
// Logo link in footer
footerHTML = footerHTML.replace(/href="https:\/\/lpl-holdings\.com"/g, 'href="../index/"');


// Create the shared JS content
const sharedJS = `
document.addEventListener('DOMContentLoaded', () => {
    // Inject header
    const headerEl = document.getElementById('masthead');
    if (headerEl) {
        headerEl.outerHTML = \`${headerHTML.replace(/`/g, '\\`')}\`;
    }

    // Inject footer
    const footerEl = document.getElementById('colophon');
    if (footerEl) {
        footerEl.outerHTML = \`${footerHTML.replace(/`/g, '\\`')}\`;
    }

    // Global click interceptor for login/trading buttons
    // The requirement says: "when the login button or start trading button, or open web trading button from any page inside the public pages is clicked redirect to the dashboard login page"
    document.addEventListener('click', (e) => {
        let anchor = e.target.closest('a');
        if (anchor) {
            const text = anchor.innerText.trim().toLowerCase();
            const href = anchor.getAttribute('href') || '';
            const shouldRedirect = 
                href.includes('/to-platform/') ||
                href.includes('dashboard') ||
                text === 'login' || 
                text === 'start trading' || 
                text === 'open web trading';
                
            if (shouldRedirect) {
                e.preventDefault();
                window.location.href = '../../dashboard/';
            }
        }
    });
});
`;

fs.mkdirSync(path.join(publicDir, 'shared'), { recursive: true });
fs.writeFileSync(path.join(publicDir, 'shared', 'shared.js'), sharedJS);

// Replace header and footer in all HTML files
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if the script is already added, if not add it before </body>
    if (!content.includes('shared.js')) {
        content = content.replace('</body>', '<script src="../shared/shared.js"></script>\n</body>');
    }
    
    // We optionally CAN remove the innerHTML of masthead and colophon to reduce file size, leaving them as stubs.
    // The JS will replace the outerHTML when it loads. So:
    content = content.replace(/(<header id="masthead"[^>]*>)([\s\S]*?)(<\/header>)/, '$1$3');
    content = content.replace(/(<footer id="colophon"[^>]*>)([\s\S]*?)(<\/footer>)/, '$1$3');

    // Also remove any other /to-platform/ hrefs inside the remaining content (if not caught by interceptor)
    content = content.replace(/href="\/to-platform\/"/g, 'href="../../dashboard/"');
    
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
});

console.log('Refactor complete.');
