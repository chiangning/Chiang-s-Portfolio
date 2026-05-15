import * as fs from 'fs';
import * as path from 'path';

function fixFile(filePath: string) {
  let cnt = fs.readFileSync(filePath, 'utf8');
  let original = cnt;

  if (cnt.startsWith("import Link from 'next/link';\n\"use client\";")) {
    cnt = cnt.replace("import Link from 'next/link';\n\"use client\";", "\"use client\";\nimport Link from 'next/link';");
    fs.writeFileSync(filePath, cnt);
  } else if (cnt.startsWith("import Link from 'next/link';\n'use client';")) {
    cnt = cnt.replace("import Link from 'next/link';\n'use client';", "'use client';\nimport Link from 'next/link';");
    fs.writeFileSync(filePath, cnt);
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
console.log('done fixing use client');
