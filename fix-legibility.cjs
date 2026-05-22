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
    
    // Replace font-light with font-medium for better readability
    content = content.replace(/font-light/g, 'font-medium');
    
    // Globally replace tracking-widest with tracking-wider to be slightly tighter for readability
    content = content.replace(/tracking-widest/g, 'tracking-wider');

    // Replace some opacities that might still be bad
    content = content.replace(/text-cream\/80/g, 'text-cream/90');
    content = content.replace(/text-cream\/90/g, 'text-cream');
    content = content.replace(/text-gold\/80/g, 'text-gold');
    content = content.replace(/text-gold\/90/g, 'text-gold');

    if (content !== original) {
      fs.writeFileSync(filePath, content);
      console.log('Updated ' + filePath);
    }
  }
});
