import fs from 'fs';
import { projects } from './src/data/projects';
import { resources } from './src/data/resources';

const baseUrl = 'https://www.chiangning.net';

const staticRoutes = [
  '',
  '/architecture',
  '/project-management',
  '/ai-expert',
  '/resources',
  '/contact'
];

const urls = [];

for (const route of staticRoutes) {
  urls.push(route === '' ? `${baseUrl}/` : `${baseUrl}${route}`);
}

for (const project of projects) {
  urls.push(`${baseUrl}/project/${project.id}`);
}

for (const resource of resources) {
  urls.push(`${baseUrl}/resources/${resource.id}`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${url === baseUrl + '/' ? 'monthly' : 'yearly'}</changefreq>
    <priority>${url === baseUrl + '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.mkdirSync('./public', { recursive: true });
fs.writeFileSync('./public/sitemap.xml', sitemap);

console.log('Sitemap generated!');
