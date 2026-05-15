import * as fs from 'fs';
import * as path from 'path';

const file = path.join(process.cwd(), 'src/app/(site)/project/[id]/ProjectDetailContent.tsx');
let cnt = fs.readFileSync(file, 'utf8');
cnt = cnt.replace(/text-white font-light text-on-surface-variant/g, "text-white font-light");
fs.writeFileSync(file, cnt);
console.log('done');
