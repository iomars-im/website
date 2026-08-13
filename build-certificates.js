import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certificatesDir = path.join(__dirname, 'content', 'certificates');
const contestsHtmlPath = path.join(__dirname, 'contests.html');

console.log('Building contest certificates...');

// Check if certificates directory exists
if (!fs.existsSync(certificatesDir)) {
  fs.mkdirSync(certificatesDir, { recursive: true });
}

// Get all markdown files from certificates directory
const files = fs.readdirSync(certificatesDir).filter(file => file.endsWith('.md'));

if (files.length === 0) {
  console.log('⚠ No certificates found, keeping existing static certificates');
  process.exit(0);
}

// Parse and process each file
const certificates = files.map(file => {
  const content = fs.readFileSync(path.join(certificatesDir, file), 'utf-8');
  const { data } = matter(content);

  // Warn if required fields are missing
  if (!data.title) {
    console.warn(`⚠ Warning: Certificate "${file}" is missing a title field`);
  }
  if (!data.pdf) {
    console.warn(`⚠ Warning: Certificate "${file}" is missing a PDF field`);
  }

  return {
    title: data.title || 'Untitled Contest',
    date: new Date(data.date),
    pdf: data.pdf,
    achievement: data.achievement || '',
    operators: data.operators || '',
    order: data.order || 0,
    uploaded_by: data.uploaded_by || 'Unknown',
    contest_type: data.contest_type || '',
    position: data.position || null,
    total_entries: data.total_entries || null,
    filename: file
  };
});

// Sort by order (lower numbers first, then by date newest first)
certificates.sort((a, b) => {
  if (a.order !== b.order) {
    return a.order - b.order;
  }
  return b.date - a.date;
});

// Generate summary section
const contestsByType = {};
certificates.forEach(cert => {
  if (cert.contest_type && cert.position && cert.total_entries) {
    if (!contestsByType[cert.contest_type]) {
      contestsByType[cert.contest_type] = [];
    }
    contestsByType[cert.contest_type].push({
      position: cert.position,
      total_entries: cert.total_entries,
      date: cert.date
    });
  }
});

// Get the latest year from certificates
const latestYear = certificates.length > 0
  ? certificates.reduce((latest, cert) => cert.date > latest ? cert.date : latest, certificates[0].date).getFullYear()
  : new Date().getFullYear();

// Generate summary cards HTML
const summaryCardsHtml = Object.entries(contestsByType).map(([contestType, results]) => {
  // Get the most recent result for this contest type
  const latestResult = results.sort((a, b) => b.date - a.date)[0];

  return `
                    <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
                        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${contestType}</h3>
                        <p class="text-3xl font-bold text-red-600 dark:text-red-400">${latestResult.position}${getOrdinalSuffix(latestResult.position)} out of ${latestResult.total_entries}</p>
                    </div>`;
}).join('\n');

// Helper function for ordinal suffixes
function getOrdinalSuffix(num) {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
}

const summaryHtml = summaryCardsHtml ? `
            <div class="mb-16 bg-gray-50 dark:bg-gray-900 rounded-lg p-8">
                <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Results</h2>
                <p class="text-gray-700 dark:text-gray-300 mb-6">Club members regularly participate in VHF RSGB contests each year, achieving excellent results in the Local Club's section. We're always looking for more operators to join our contest team!</p>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
${summaryCardsHtml}
                </div>

                <div class="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Interested in Operating?</h3>
                    <p class="text-gray-700 dark:text-gray-300 mb-4">We're always looking for more operators to join our contest efforts! Whether you're new to contesting or an experienced operator, you're welcome to participate.</p>
                    <p class="text-gray-700 dark:text-gray-300">Contact us at <a href="mailto:info@iomars.im" class="text-red-600 dark:text-red-400 hover:underline">info@iomars.im</a> to get involved.</p>
                </div>
            </div>
` : '';

// Generate HTML for certificates
const certificatesHtml = certificates.map(cert => {
  const achievementHtml = cert.achievement
    ? `<p class="text-lg text-red-600 dark:text-red-400 font-semibold mb-4">${cert.achievement}</p>`
    : '';

  const operatorsHtml = cert.operators
    ? `<p class="text-gray-600 dark:text-gray-400 mb-4">Operators: ${cert.operators}</p>`
    : '';

  return `
                <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                    <div class="p-6">
                        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">${cert.title}</h3>
                        ${achievementHtml}
                        ${operatorsHtml}
                        <div class="border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden" style="height: 600px;">
                            <iframe
                                src="${cert.pdf}"
                                class="w-full h-full"
                                title="${cert.title} Certificate"
                            ></iframe>
                        </div>
                    </div>
                </div>`;
}).join('\n\n');

// Read the current contests.html
let htmlContent = fs.readFileSync(contestsHtmlPath, 'utf-8');

// Replace summary section between markers
const summaryStartMarker = '<!-- SUMMARY_START -->';
const summaryEndMarker = '<!-- SUMMARY_END -->';
const summaryStartIndex = htmlContent.indexOf(summaryStartMarker);
const summaryEndIndex = htmlContent.indexOf(summaryEndMarker);

if (summaryStartIndex !== -1 && summaryEndIndex !== -1) {
  htmlContent = htmlContent.substring(0, summaryStartIndex + summaryStartMarker.length) +
    '\n' + summaryHtml +
    '            ' + htmlContent.substring(summaryEndIndex);
  console.log('✓ Summary section updated');
} else {
  console.warn('⚠ Warning: Could not find summary markers in contests.html');
}

// Find the certificates section and replace content between markers
const certsStartMarker = '<!-- CERTIFICATES_START -->';
const certsEndMarker = '<!-- CERTIFICATES_END -->';
const certsStartIndex = htmlContent.indexOf(certsStartMarker);
const certsEndIndex = htmlContent.indexOf(certsEndMarker);

if (certsStartIndex === -1 || certsEndIndex === -1) {
  console.error('Error: Could not find certificate markers in contests.html');
  process.exit(1);
}

// Replace the content between markers
htmlContent = htmlContent.substring(0, certsStartIndex + certsStartMarker.length) +
  '\n' + certificatesHtml + '\n            ' +
  htmlContent.substring(certsEndIndex);

// Write back to contests.html
fs.writeFileSync(contestsHtmlPath, htmlContent);

console.log(`✓ Successfully built ${certificates.length} certificate(s)`);
