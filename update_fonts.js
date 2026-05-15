const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // We want to replace font-charter with font-sans in span and p tags, and div tags that are obviously body text.
      // E.g. <span className="font-charter...
      // <p className="font-charter...
      // <div className="text-on-surface-variant text-[18px] leading-[1.6] max-w-[640px] font-charter space-y-6">
      
      // Let's replace font-charter with font-sans where it is used for body text.
      // Body text usually has text-[16px], text-[18px], text-[19px], text-lg, text-xl, text-2xl
      content = content.replace(/className="([^"]*)font-charter([^"]*text-\[(?:16|18|19)px\](?:[^"]*))"/g, 'className="$1font-sans$2"');
      content = content.replace(/className="([^"]*text-\[(?:16|18|19)px\][^"]*)font-charter([^"]*)"/g, 'className="$1font-sans$2"');
      
      // Replace for text-lg, text-xl, text-2xl (often used for description body text)
      content = content.replace(/className="([^"]*)font-charter([^"]*text-(?:lg|xl|2xl)(?:[^"]*))"/g, 'className="$1font-sans$2"');
      content = content.replace(/className="([^"]*text-(?:lg|xl|2xl)[^"]*)font-charter([^"]*)"/g, 'className="$1font-sans$2"');
      
      // ProjectDetailContent specific
      // '<span className="font-sans text-[18px] text-white leading-tight">'
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

replaceInDir(path.join(__dirname, 'src/app'));
console.log('done');
