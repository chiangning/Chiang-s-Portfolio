const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
        results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
    }
  });
  return results;
}

const files = walk('./src/app');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/from "\.\.\/\.\.\/\.\.\/components/g, 'from "@/components');
  content = content.replace(/from "\.\.\/\.\.\/components/g, 'from "@/components');
  content = content.replace(/from "\.\.\/components/g, 'from "@/components');
  
  content = content.replace(/from "\.\.\/\.\.\/\.\.\/data/g, 'from "@/data');
  content = content.replace(/from "\.\.\/\.\.\/data/g, 'from "@/data');
  content = content.replace(/from "\.\.\/data/g, 'from "@/data');
  
  content = content.replace(/import\("\.\.\/\.\.\/\.\.\/components/g, 'import("@/components');

  fs.writeFileSync(file, content);
});

console.log("Done");
