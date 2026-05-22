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
    
    // Replace text opacities < 80 with 90
    content = content.replace(/text-cream\/([2-6]0)/g, 'text-cream/90');
    content = content.replace(/text-cream\/70/g, 'text-cream/90');
    
    content = content.replace(/text-gold\/([2-6]0)/g, 'text-gold/90');
    content = content.replace(/text-gold\/70/g, 'text-gold/90');

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Updated ' + filePath);
    }
  }
});
