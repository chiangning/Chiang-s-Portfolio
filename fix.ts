import * as fs from 'fs';
import * as path from 'path';

function fixFile(filePath: string) {
  let cnt = fs.readFileSync(filePath, 'utf8');
  let original = cnt;
  // Replace in ProjectDetailContent
  if (filePath.endsWith('ProjectDetailContent.tsx')) {
    cnt = cnt.replace(/font-charter text-\[18px\] text-white/g, "font-sans text-[18px] text-white font-light text-on-surface-variant");
  }

  // Replace in ResourceDetailContent
  if (filePath.endsWith('ResourceDetailContent.tsx')) {
    cnt = cnt.replace(/className="font-charter italic text-\[24px\]/g, 'className="font-sans font-light text-[24px]');
    cnt = cnt.replace(/className="font-charter text-\[19px\]/g, 'className="font-sans font-light text-[19px]');
  }

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
