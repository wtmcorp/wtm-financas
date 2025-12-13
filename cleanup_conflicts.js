const fs = require('fs');
const path = require('path');

function cleanFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        // Regex to find conflict blocks and keep the HEAD (local) part
        // Matches <<<<<<< HEAD ... ======= ... >>>>>>> ...
        const cleaned = content.replace(/<<<<<<< HEAD[\r\n]+([\s\S]*?)[\r\n]+=======[\r\n]+[\s\S]*?[\r\n]+>>>>>>> [^\r\n]*/g, '$1');

        if (content !== cleaned) {
            fs.writeFileSync(filePath, cleaned, 'utf8');
            console.log(`Fixed: ${filePath}`);
        }
    } catch (e) {
        console.error(`Error processing ${filePath}:`, e);
    }
}

function traverseDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (file === '.git' || file === 'node_modules') continue;

        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            traverseDir(fullPath);
        } else {
            cleanFile(fullPath);
        }
    }
}

console.log('Starting cleanup...');
traverseDir(__dirname);
console.log('Cleanup complete.');
