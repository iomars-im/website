import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read all markdown files from content/news
const newsDir = path.join(__dirname, 'content', 'news');
const newsHtmlPath = path.join(__dirname, 'news.html');

console.log('Building news articles...');

// Get all markdown files
const files = fs.readdirSync(newsDir).filter(file => file.endsWith('.md'));

if (files.length === 0) {
  console.log('No news articles found.');
  process.exit(0);
}

// Parse and process each file
const articles = files.map(file => {
  const content = fs.readFileSync(path.join(newsDir, file), 'utf-8');
  const { data, content: markdown } = matter(content);
  const html = marked(markdown);

  // Warn if author is missing
  if (!data.author) {
    console.warn(`⚠ Warning: Article "${data.title}" is missing an author field`);
  }

  return {
    title: data.title,
    date: new Date(data.date),
    image: data.image,
    pinned: data.pinned || false,
    author: data.author || 'Unknown',
    content: html,
    filename: file
  };
});

// Sort: pinned articles first, then by date (newest first)
articles.sort((a, b) => {
  if (a.pinned && !b.pinned) return -1;
  if (!a.pinned && b.pinned) return 1;
  return b.date - a.date;
});

// Format date helper
const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Generate HTML for articles
const articlesHtml = articles.map(article => {
  const imageHtml = article.image
    ? `<img src="${article.image}" alt="${article.title}" class="w-full h-64 object-cover rounded-lg mb-4">`
    : '';

  const pinnedBadge = article.pinned
    ? `<span class="inline-flex items-center gap-1 px-2 py-1 bg-iom-blue text-white text-xs font-semibold rounded-full">
         <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
           <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"></path>
         </svg>
         Pinned
       </span>`
    : '';

  // Author is now required, always display it
  const authorLine = `<div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400 italic">
       — ${article.author}
     </div>`;

  return `
        <!-- Article: ${article.title} -->
        <article class="card hover:shadow-xl transition${article.pinned ? ' border-2 border-iom-blue' : ''}">
          ${imageHtml}
          <div class="flex items-start justify-between mb-3">
            <div class="flex items-center gap-2">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">${article.title}</h2>
              ${pinnedBadge}
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">${formatDate(article.date)}</span>
          </div>
          <div class="text-gray-700 dark:text-gray-300">
            ${article.content}
          </div>
          ${authorLine}
        </article>`;
}).join('\n');

// Read the current news.html
let newsHtml = fs.readFileSync(newsHtmlPath, 'utf-8');

// Find the articles section and replace content between markers
const startMarker = '<!-- NEWS_ARTICLES_START -->';
const endMarker = '<!-- NEWS_ARTICLES_END -->';

const startIndex = newsHtml.indexOf(startMarker);
const endIndex = newsHtml.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Error: Could not find article markers in news.html');
  console.log('Please add <!-- NEWS_ARTICLES_START --> and <!-- NEWS_ARTICLES_END --> markers to news.html');
  process.exit(1);
}

// Replace the content between markers
newsHtml = newsHtml.substring(0, startIndex + startMarker.length) +
  '\n' + articlesHtml + '\n      ' +
  newsHtml.substring(endIndex);

// Write back to news.html
fs.writeFileSync(newsHtmlPath, newsHtml);

console.log(`✓ Successfully built ${articles.length} news article(s)`);
