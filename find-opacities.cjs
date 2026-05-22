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

const matches = {};
walk(path.join(process.cwd(), 'src'), filePath => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.css') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    const rx = /text-[a-z]+\/\d+/g;
    let match;
    while ((match = rx.exec(content)) !== null) {
      matches[match[0]] = (matches[match[0]] || 0) + 1;
    }
  }
});
console.log(matches);
