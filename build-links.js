import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linksDir = path.join(__dirname, 'content', 'links');
const linksHtmlPath = path.join(__dirname, 'links.html');
const trainingHtmlPath = path.join(__dirname, 'training.html');

console.log('Building links...');

// Get all markdown files
const files = fs.readdirSync(linksDir).filter(file => file.endsWith('.md'));

if (files.length === 0) {
  console.log('No links found.');
  process.exit(0);
}

// Parse each file
const links = files.map(file => {
  const content = fs.readFileSync(path.join(linksDir, file), 'utf-8');
  const { data } = matter(content);

  return {
    title: data.title,
    url: data.url,
    description: data.description,
    category: data.category,
    order: data.order || 0,
    filename: file
  };
});

// Sort by order within each category
links.sort((a, b) => a.order - b.order);

// Group by category
const categories = {};
links.forEach(link => {
  if (!categories[link.category]) {
    categories[link.category] = [];
  }
  categories[link.category].push(link);
});

// Category display order and background styles
const categoryConfig = [
  { name: 'Propagation', bg: 'bg-white dark:bg-gray-800' },
  { name: 'Technical Resources', bg: 'bg-gray-50 dark:bg-gray-900' },
  { name: 'Operating', bg: 'bg-white dark:bg-gray-800' },
  { name: 'Useful Databases', bg: 'bg-gray-50 dark:bg-gray-900' }
];

// Generate a single link card
const linkCard = (link) => `
                <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="card group hover:shadow-lg transition">
                    <div class="flex items-start gap-4">
                        <div class="bg-iom-red/10 dark:bg-red-900/30 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg class="w-6 h-6 text-iom-red dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-bold text-lg dark:text-white group-hover:text-iom-red dark:group-hover:text-red-400 transition">${link.title}</h3>
                            <p class="text-gray-600 dark:text-gray-400 text-sm">${link.description}</p>
                        </div>
                    </div>
                </a>`;

// Generate HTML for all category sections
const sectionsHtml = categoryConfig
  .filter(cat => categories[cat.name])
  .map(cat => {
    const cardsHtml = categories[cat.name].map(linkCard).join('\n');
    return `
    <!-- ${cat.name} -->
    <section class="py-20 ${cat.bg}">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="section-heading text-center dark:text-white">${cat.name}</h2>
            <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
${cardsHtml}
            </div>
        </div>
    </section>`;
  }).join('\n');

// --- Update links.html ---
let linksHtml = fs.readFileSync(linksHtmlPath, 'utf-8');

const startMarker = '<!-- LINKS_START -->';
const endMarker = '<!-- LINKS_END -->';

const startIndex = linksHtml.indexOf(startMarker);
const endIndex = linksHtml.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Error: Could not find link markers in links.html');
  console.log('Please add <!-- LINKS_START --> and <!-- LINKS_END --> markers to links.html');
  process.exit(1);
}

linksHtml = linksHtml.substring(0, startIndex + startMarker.length) +
  '\n' + sectionsHtml + '\n    ' +
  linksHtml.substring(endIndex);

fs.writeFileSync(linksHtmlPath, linksHtml);

// --- Update training.html with Training category links ---
const trainingLinks = categories['Training'];
if (trainingLinks && fs.existsSync(trainingHtmlPath)) {
  let trainingHtml = fs.readFileSync(trainingHtmlPath, 'utf-8');

  const tStartMarker = '<!-- TRAINING_LINKS_START -->';
  const tEndMarker = '<!-- TRAINING_LINKS_END -->';

  const tStartIndex = trainingHtml.indexOf(tStartMarker);
  const tEndIndex = trainingHtml.indexOf(tEndMarker);

  if (tStartIndex !== -1 && tEndIndex !== -1) {
    const trainingCardsHtml = trainingLinks.map(linkCard).join('\n');
    trainingHtml = trainingHtml.substring(0, tStartIndex + tStartMarker.length) +
      '\n' + trainingCardsHtml + '\n            ' +
      trainingHtml.substring(tEndIndex);

    fs.writeFileSync(trainingHtmlPath, trainingHtml);
    console.log(`  Updated training.html with ${trainingLinks.length} training link(s)`);
  }
}

const totalLinks = Object.values(categories).reduce((sum, cat) => sum + cat.length, 0);
console.log(`Successfully built ${totalLinks} link(s) across ${Object.keys(categories).length} categories`);
