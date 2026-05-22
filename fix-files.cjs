const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walk(dirPath, callback);
    } else {
      callback(dirPath);
    }
  });
}

walk(path.join(process.cwd(), 'src'), filePath => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.css') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace tiny text
    content = content.replace(/text-\[10px\]/g, 'text-xs');
    content = content.replace(/text-\[11px\]/g, 'text-xs');
    content = content.replace(/text-\[9px\]/g, 'text-xs');
    
    // Replace white borders and backgrounds with cream
    content = content.replace(/border-white(\/(\[\d+\.\d+\]|\d+))?/g, (match, p1) => p1 ? 'border-cream' + p1 : 'border-cream');
    content = content.replace(/bg-white(\/(\[\d+\.\d+\]|\d+))?/g, (match, p1) => p1 ? 'bg-cream' + p1 : 'bg-cream');

    // Also change text-white to text-cream
    content = content.replace(/text-white/g, 'text-cream');

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Updated ' + filePath);
    }
  }
});
