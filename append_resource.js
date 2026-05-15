const fs = require('fs');

const markdown = fs.readFileSync('clean_ncc.md', 'utf8');

let resourcesCode = fs.readFileSync('src/data/resources.ts', 'utf8');

const newResource = `
  {
    id: "ncc-2025-changes",
    title: "NCC 2025: Key Changes Architects and Project Managers Can Use Today",
    date: "8/5/2026",
    tags: ["Architecture", "Regulation"],
    summary: "A practical summary of the NCC 2025 changes, focusing on immediate impacts for architects and project managers.",
    image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?w=1800&q=85",
    content: \`` + markdown.replace(/`/g, '\\`').replace(/\$/g, '\\$') + `\`
  }`;

// Find the last item in the array or insert at the beginning
resourcesCode = resourcesCode.replace('export const resources: Resource[] = [', 'export const resources: Resource[] = [' + newResource + ',');

fs.writeFileSync('src/data/resources.ts', resourcesCode);
