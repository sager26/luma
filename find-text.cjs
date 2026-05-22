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

const matches = new Set();
walk(path.join(process.cwd(), 'src'), filePath => {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.css') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    const rx = /text-[a-zA-Z0-9-\[\]]+/g;
    let match;
    while ((match = rx.exec(content)) !== null) {
      matches.add(match[0]);
    }
  }
});
console.log(Array.from(matches).sort());
