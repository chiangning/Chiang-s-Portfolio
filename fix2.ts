import * as fs from 'fs';
import * as path from 'path';

function fixFile(filePath: string) {
  let cnt = fs.readFileSync(filePath, 'utf8');
  let original = cnt;
  // Generic replacements for typical body-text class names using font-charter
  // (We'll leave anything with text-[36px], text-[40px], text-4xl, etc. alone since those are headings)

  cnt = cnt.replace(/font-charter text-\[18px\]/g, "font-sans font-light text-on-surface-variant text-[18px]");
  cnt = cnt.replace(/font-charter text-\[16px\]/g, "font-sans font-light text-on-surface-variant text-[16px]");
  cnt = cnt.replace(/font-charter space-y-6/g, "font-sans font-light space-y-6");
  
  // Big italic descriptions
  cnt = cnt.replace(/text-white font-charter italic/g, "text-white font-sans font-light");
  cnt = cnt.replace(/font-charter italic/g, "font-sans font-light");
  
  // Paragraphs in AIExpert, PM, Contact, Home
  cnt = cnt.replace(/font-charter italic text-lg/g, "font-sans font-light text-lg");
  cnt = cnt.replace(/font-charter font-medium/g, "font-sans font-medium");
  cnt = cnt.replace(/text-on-surface-variant font-charter/g, "text-on-surface-variant font-sans font-light");

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
