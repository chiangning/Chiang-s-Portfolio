import * as fs from 'fs';
import * as path from 'path';

function fixFile(filePath: string) {
  let cnt = fs.readFileSync(filePath, 'utf8');
  let original = cnt;

  // Replace leading values
  cnt = cnt.replace(/leading-\[1\.\d+\]/g, "leading-[1.0]");
  cnt = cnt.replace(/leading-tight/g, "leading-[1.0]");
  cnt = cnt.replace(/leading-relaxed/g, "leading-[1.0]");
  cnt = cnt.replace(/leading-normal/g, "leading-[1.0]");

  if (cnt !== original) {
    fs.writeFileSync(filePath, cnt);
    console.log(`Updated ${filePath}`);
  }
}

function walk(dir: string) {
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else {
      if (full.endsWith('.tsx')) {
        fixFile(full);
      }
    }
  }
}

walk(path.join(process.cwd(), 'src/app'));
walk(path.join(process.cwd(), 'src/components'));
console.log('done fixing leading');
