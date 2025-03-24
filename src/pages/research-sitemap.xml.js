import { getCollection } from 'astro:content';

export async function get() {
  // Get all research publications
  const researchEntries = await getCollection('research');
  
  // Format the current date for lastmod
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Generate XML content
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${researchEntries.map(entry => {
    // Determine priority based on publication status
    const isForthcoming = entry.data.publicationDate === 'Forthcoming' || entry.data.publicationDate === 'In Review';
    const priority = isForthcoming ? '0.9' : '0.8';
    
    return `
  <url>
    <loc>https://celestialtaha.github.io/research/${entry.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('')}
</urlset>`;
  
  return {
    body: sitemap,
    encoding: 'utf-8',
    headers: {
      'Content-Type': 'application/xml'
    }
  };
}
