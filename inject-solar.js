import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Only inject solar banner into index.html
const indexFile = 'index.html';

// Placeholder div that will be populated by JavaScript
const solarPlaceholder = '<div id="solar-conditions"></div>';

// Process index.html to add solar banner
const indexPath = path.join(__dirname, indexFile);
let indexHtml = fs.readFileSync(indexPath, 'utf-8');

// Find markers in the footer
const mbDivStart = indexHtml.lastIndexOf('<div class="mb-4">');
const copyrightLine = '<p>&copy; 2025 Isle of Man Amateur Radio Society. All rights reserved.</p>';
const copyrightStart = indexHtml.indexOf(copyrightLine);

if (mbDivStart !== -1 && copyrightStart !== -1) {
  // Replace from <div class="mb-4"> through to just before copyright
  const beforeBanner = indexHtml.substring(0, mbDivStart);
  const afterBanner = indexHtml.substring(copyrightStart);

  indexHtml = beforeBanner + `<div class="mb-4">\n                ${solarPlaceholder}\n            </div>\n            ` + afterBanner;
  fs.writeFileSync(indexPath, indexHtml);
}

// Remove solar banner from all other pages
const otherFiles = ['news.html', 'about.html', 'contact.html', 'membership.html', 'success.html', '404.html', 'minutes.html'];

otherFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  let html = fs.readFileSync(filePath, 'utf-8');

  // Remove the solar-conditions div if it exists
  html = html.replace(/<div class="mb-4">\s*<div id="solar-conditions"><\/div>\s*<\/div>\s*/g, '');

  fs.writeFileSync(filePath, html);
});

console.log('✓ Solar banner injected into index.html only');
