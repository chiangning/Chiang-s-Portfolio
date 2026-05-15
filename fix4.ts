import * as fs from 'fs';
import * as path from 'path';

function fixFile(filePath: string) {
  let cnt = fs.readFileSync(filePath, 'utf8');
  let original = cnt;

  // Replace font-light with font-normal for these body text cases
  cnt = cnt.replace(/font-sans text-\[18px\] text-white font-light/g, "font-sans text-[18px] text-white font-normal");
  cnt = cnt.replace(/font-sans font-light/g, "font-sans font-normal");
  cnt = cnt.replace(/text-white font-light/g, "text-white font-normal");
  
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
console.log('done fixing tsx files');
