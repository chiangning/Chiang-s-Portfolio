import fs from 'fs';
import path from 'path';

const directory = 'src/components/GanttChartTool';

const replacements = [
  { regex: /neo-bg/g, replacement: 'bg-transparent' },
  { regex: /neo-raised-sm/g, replacement: 'bg-surface border border-white/5' },
  { regex: /neo-raised/g, replacement: 'bg-surface py-1 border border-white/10' }, // added py-1 to ensure padding isn't lost if applied
  { regex: /neo-inset/g, replacement: 'bg-black/20 border border-white/10' },
  { regex: /neo-button/g, replacement: 'bg-surface hover:bg-white/5 border border-white/10 transition-colors' },
  { regex: /neo-input/g, replacement: 'bg-black/20 border border-white/10 focus:border-primary transition-colors text-white' },
  { regex: /text-neo-text\/70/g, replacement: 'text-white/70' },
  { regex: /text-neo-text/g, replacement: 'text-white' },
  { regex: /border-gray-100/g, replacement: 'border-white/10' },
  { regex: /border-gray-200\/50/g, replacement: 'border-white/5' },
  { regex: /border-gray-300\/30/g, replacement: 'border-white/5' },
  { regex: /shadow-\[.*?\]/g, replacement: 'shadow-lg shadow-black/20' },
  { regex: /bg-white/g, replacement: 'bg-surface' }, // For generic white backgrounds in dragging
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      replacements.forEach(({ regex, replacement }) => {
        content = content.replace(regex, replacement);
      });
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

processDirectory(directory);
console.log('Done replacing styles.');
