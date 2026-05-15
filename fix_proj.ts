import * as fs from 'fs';

const filePath = '/app/applet/src/app/(site)/project/[id]/ProjectDetailContent.tsx';
let cnt = fs.readFileSync(filePath, 'utf8');

cnt = cnt.replace(/font-sans text-\[18px\] text-white font-light/g, "font-sans text-[18px] text-white font-normal");

fs.writeFileSync(filePath, cnt);
console.log('Fixed ProjectDetailContent');
