import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsPath = path.resolve(__dirname, '../src/data/products.json');
const categoriesPath = path.resolve(__dirname, '../src/data/categories.json');
const outputPath = path.resolve(__dirname, '../public/sitemap.xml');

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));

const baseUrl = 'https://plasticoimpex.com';
const currentDate = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/products', priority: '0.9', changefreq: 'daily' },
  { path: '/corporate-gifting', priority: '0.9', changefreq: 'weekly' },
  { path: '/branding', priority: '0.8', changefreq: 'monthly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' }
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

for (const r of staticRoutes) {
  xml += '  <url>\n';
  xml += `    <loc>${baseUrl}${r.path}</loc>\n`;
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += `    <changefreq>${r.changefreq}</changefreq>\n`;
  xml += `    <priority>${r.priority}</priority>\n`;
  xml += '  </url>\n';
}

for (const c of categories) {
  xml += '  <url>\n';
  xml += `    <loc>${baseUrl}/category/${c.slug}</loc>\n`;
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += '    <priority>0.85</priority>\n';
  xml += '  </url>\n';
}

for (const p of products) {
  xml += '  <url>\n';
  xml += `    <loc>${baseUrl}/product/${p.slug}</loc>\n`;
  xml += `    <lastmod>${currentDate}</lastmod>\n`;
  xml += '    <changefreq>weekly</changefreq>\n';
  xml += '    <priority>0.8</priority>\n';
  xml += '  </url>\n';
}

xml += '</urlset>\n';

fs.writeFileSync(outputPath, xml, 'utf8');
console.log(`Generated sitemap.xml with ${staticRoutes.length + categories.length + products.length} URLs at ${outputPath}`);
