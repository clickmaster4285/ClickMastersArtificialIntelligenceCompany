const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

function walk(dir) {
  let out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(walk(p));
    else out.push(p);
  }
  return out;
}

const files = walk(publicDir)
  .filter(f => f.toLowerCase().endsWith('.mp4'))
  .map(f => path.relative(publicDir, f).replace(/\\/g,'/'));

console.log('MP4 files in public/:');
console.log(files.join('\n'));

