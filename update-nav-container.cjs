const fs = require('fs');
const path = require('path');

console.log('Updating navigation to use nav-container...');

// Get all HTML files in the root directory
const htmlFiles = fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.html') && file !== '404.html');

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  let html = fs.readFileSync(filePath, 'utf-8');

  // Find the nav section
  const navStart = html.indexOf('<nav class=');
  if (navStart === -1) {
    console.log(`⚠ No nav found in ${file}`);
    return;
  }

  // Find the end of the nav (</nav>)
  const navEnd = html.indexOf('</nav>', navStart) + 6;

  if (navEnd === 5) { // indexOf returned -1
    console.log(`⚠ Could not find closing </nav> in ${file}`);
    return;
  }

  // Replace the entire nav section with a container div
  const beforeNav = html.substring(0, navStart);
  const afterNav = html.substring(navEnd);

  const newHtml = beforeNav + '<!-- Navigation -->\n    <div id="nav-container"></div>\n' + afterNav;

  fs.writeFileSync(filePath, newHtml);
  console.log(`✓ Updated ${file}`);
});

console.log('Navigation update complete!');
