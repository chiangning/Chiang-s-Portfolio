import * as fs from 'fs';
import * as path from 'path';

function fixFile(filePath: string) {
  let cnt = fs.readFileSync(filePath, 'utf8');
  let original = cnt;

  // Replace Next.js internal <a> with <Link>
  cnt = cnt.replace(/<a (?:key=\{[^\}]+\} )?href="\/[^"]*"[^>]*>.*?<\/a>/gs, (match) => {
    return match.replace(/^<a/, '<Link').replace(/<\/a>$/, '</Link>');
  });

  cnt = cnt.replace(/<a (?:key=\{[^\}]+\} )?href=\{`\/[^`]+`\}[^>]*>.*?<\/a>/gs, (match) => {
    return match.replace(/^<a/, '<Link').replace(/<\/a>$/, '</Link>');
  });

  if (cnt !== original) {
    if (!cnt.includes('import Link from')) {
      cnt = `import Link from 'next/link';\n` + cnt;
    }
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
      if (full.endsWith('.tsx') && !full.includes('Sidebar.tsx')) {
        fixFile(full);
      }
    }
  }
}

walk(path.join(process.cwd(), 'src/app'));
console.log('done fixing links');
