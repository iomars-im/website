import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Generating commit history...');

try {
  // Generate commit history (newest first)
  const commits = execSync('git log --pretty=format:"%h - %an, %ar : %s"', {
    encoding: 'utf-8',
    cwd: __dirname
  });

  // Write to public directory
  const outputPath = path.join(__dirname, 'public', 'commits.txt');
  fs.writeFileSync(outputPath, commits);

  console.log('✓ Commit history generated successfully');
} catch (error) {
  console.error('Error generating commit history:', error.message);
  process.exit(1);
}
