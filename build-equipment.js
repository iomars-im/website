import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Building equipment data...');

// Build equipment for sale
const forSaleDir = path.join(__dirname, 'content', 'equipment-for-sale');
const forSaleOutput = path.join(__dirname, 'public', 'equipment-for-sale.json');

let forSaleItems = [];
if (fs.existsSync(forSaleDir)) {
  const files = fs.readdirSync(forSaleDir).filter(file => file.endsWith('.md'));
  forSaleItems = files.map(file => {
    const content = fs.readFileSync(path.join(forSaleDir, file), 'utf-8');
    const { data, content: markdown } = matter(content);
    return {
      ...data,
      description: data.description || markdown.trim()
    };
  });
}

// Build equipment for loan
const forLoanDir = path.join(__dirname, 'content', 'equipment-for-loan');
const forLoanOutput = path.join(__dirname, 'public', 'equipment-for-loan.json');

let forLoanItems = [];
if (fs.existsSync(forLoanDir)) {
  const files = fs.readdirSync(forLoanDir).filter(file => file.endsWith('.md'));
  forLoanItems = files.map(file => {
    const content = fs.readFileSync(path.join(forLoanDir, file), 'utf-8');
    const { data, content: markdown } = matter(content);
    return {
      ...data,
      description: data.description || markdown.trim()
    };
  });
}

// Write JSON files
fs.writeFileSync(forSaleOutput, JSON.stringify(forSaleItems, null, 2));
fs.writeFileSync(forLoanOutput, JSON.stringify(forLoanItems, null, 2));

console.log(`✓ Successfully built ${forSaleItems.length} equipment for sale item(s)`);
console.log(`✓ Successfully built ${forLoanItems.length} equipment for loan item(s)`);
