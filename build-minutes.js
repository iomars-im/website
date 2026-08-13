import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const minutesDir = path.join(__dirname, 'content', 'minutes');
const minutesHtmlPath = path.join(__dirname, 'minutes.html');

console.log('Building meeting minutes...');

// Check if minutes directory exists
if (!fs.existsSync(minutesDir)) {
  fs.mkdirSync(minutesDir, { recursive: true });
}

// Get all markdown files from minutes directory
const files = fs.readdirSync(minutesDir).filter(file => file.endsWith('.md'));

if (files.length === 0) {
  console.log('⚠ No meeting minutes found');
  // Show empty state
  let minutesHtml = fs.readFileSync(minutesHtmlPath, 'utf-8');
  const startMarker = '<!-- MINUTES_START -->';
  const endMarker = '<!-- MINUTES_END -->';
  const startIndex = minutesHtml.indexOf(startMarker);
  const endIndex = minutesHtml.indexOf(endMarker);

  if (startIndex !== -1 && endIndex !== -1) {
    minutesHtml = minutesHtml.substring(0, startIndex + startMarker.length) +
      '\n                <!-- No minutes yet -->\n                ' +
      minutesHtml.substring(endIndex);
    fs.writeFileSync(minutesHtmlPath, minutesHtml);
  }

  console.log('✓ Meeting minutes page updated (empty)');
  process.exit(0);
}

// Parse and process each file
const minutes = files.map(file => {
  const content = fs.readFileSync(path.join(minutesDir, file), 'utf-8');
  const { data } = matter(content);

  // Warn if required fields are missing
  if (!data.title) {
    console.warn(`⚠ Warning: Minutes "${file}" is missing a title field`);
  }
  if (!data.pdf) {
    console.warn(`⚠ Warning: Minutes "${file}" is missing a PDF field`);
  }
  if (!data.uploaded_by) {
    console.warn(`⚠ Warning: Minutes "${file}" is missing an uploaded_by field`);
  }

  return {
    title: data.title || 'Untitled Meeting',
    date: new Date(data.date),
    pdf: data.pdf,
    summary: data.summary || '',
    uploaded_by: data.uploaded_by || 'Unknown',
    filename: file
  };
});

// Sort by date (newest first)
minutes.sort((a, b) => b.date - a.date);

// Format date helper
const formatDate = (date) => {
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Generate HTML for minutes
const minutesHtml = minutes.map(minute => {
  const summaryHtml = minute.summary
    ? `<p class="text-gray-600 dark:text-gray-400 mb-4">${minute.summary}</p>`
    : '';

  return `
                <!-- Minute: ${minute.title} -->
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                    <div class="p-6">
                        <div class="flex items-start justify-between mb-4">
                            <div>
                                <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">${minute.title}</h2>
                                <p class="text-sm text-gray-500 dark:text-gray-400">
                                    <span class="font-semibold">Date:</span> ${formatDate(minute.date)}
                                    <span class="mx-2">•</span>
                                    <span class="font-semibold">Uploaded by:</span> ${minute.uploaded_by}
                                </p>
                            </div>
                            <a href="${minute.pdf}" download class="flex items-center gap-2 bg-iom-blue hover:bg-iom-blue-dark text-white px-4 py-2 rounded-lg transition">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                Download PDF
                            </a>
                        </div>
                        ${summaryHtml}
                        <!-- PDF Viewer -->
                        <div class="border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden" style="height: 800px;">
                            <iframe
                                src="${minute.pdf}#page=1&view=FitH&toolbar=1&navpanes=1"
                                width="100%"
                                height="100%"
                                style="border: none;"
                                title="${minute.title}">
                                <p class="p-4 text-center text-gray-600 dark:text-gray-400">
                                    Your browser does not support PDF viewing.
                                    <a href="${minute.pdf}" class="text-iom-blue hover:underline">Download the PDF</a> instead.
                                </p>
                            </iframe>
                        </div>
                    </div>
                </div>`;
}).join('\n');

// Read the current minutes.html
let htmlContent = fs.readFileSync(minutesHtmlPath, 'utf-8');

// Find the minutes section and replace content between markers
const startMarker = '<!-- MINUTES_START -->';
const endMarker = '<!-- MINUTES_END -->';
const startIndex = htmlContent.indexOf(startMarker);
const endIndex = htmlContent.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.error('Error: Could not find minutes markers in minutes.html');
  process.exit(1);
}

// Replace the content between markers
htmlContent = htmlContent.substring(0, startIndex + startMarker.length) +
  '\n' + minutesHtml + '\n                ' +
  htmlContent.substring(endIndex);

// Hide empty state when we have minutes.
// Match any style attributes already present so repeated builds collapse to exactly one,
// rather than appending a fresh copy every time.
if (minutes.length > 0) {
  htmlContent = htmlContent.replace(
    /<div id="empty-state"(?:\s+style="display: none;")*/,
    '<div id="empty-state" style="display: none;"'
  );
}

// Write back to minutes.html
fs.writeFileSync(minutesHtmlPath, htmlContent);

console.log(`✓ Successfully built ${minutes.length} meeting minute(s)`);
