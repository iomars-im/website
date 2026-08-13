import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseString } from 'xml2js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Fetching solar data...');

// Fetch XML data from HamQSL
https.get('https://www.hamqsl.com/solarxml.php', (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    // Parse XML
    parseString(data, (err, result) => {
      if (err) {
        console.error('Error parsing XML:', err);
        process.exit(1);
      }

      const solar = result.solar.solardata[0];

      // Extract band conditions
      const bands = solar.calculatedconditions[0].band;
      const updated = solar.updated[0].trim();

      // Extract VHF conditions
      const vhfConditions = solar.calculatedvhfconditions[0].phenomenon;

      // Helper function to get color class based on condition
      const getConditionColor = (condition) => {
        switch(condition.toLowerCase()) {
          case 'good': return 'bg-green-500';
          case 'fair': return 'bg-yellow-500';
          case 'poor': return 'bg-red-500';
          default: return 'bg-gray-500';
        }
      };

      // Helper function to get icon based on condition
      const getConditionIcon = (condition) => {
        switch(condition.toLowerCase()) {
          case 'good': return '✓';
          case 'fair': return '○';
          case 'poor': return '✕';
          default: return '?';
        }
      };

      // Helper function for VHF conditions (Band Open/Closed)
      const getVHFConditionColor = (condition) => {
        const text = condition.toLowerCase();
        if (text.includes('band open')) return 'bg-green-500';
        if (text.includes('band closed')) return 'bg-red-500';
        return 'bg-gray-500';
      };

      const getVHFConditionIcon = (condition) => {
        const text = condition.toLowerCase();
        if (text.includes('band open')) return '✓';
        if (text.includes('band closed')) return '✕';
        return '?';
      };

      // Organize bands by time period
      const dayBands = bands.filter(b => b.$.time === 'day');
      const nightBands = bands.filter(b => b.$.time === 'night');

      // Generate HTML banner
      const banner = `
      <div class="bg-gradient-to-r from-iom-blue-dark to-iom-blue p-6 rounded-lg shadow-xl text-white">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-2xl font-bold">Band Conditions</h3>
          <span class="text-sm opacity-80">Updated: ${updated}</span>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Day Conditions -->
          <div>
            <h4 class="text-lg font-semibold mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
              </svg>
              HF Day
            </h4>
            <div class="space-y-2">
              ${dayBands.map(band => `
              <div class="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded p-3">
                <span class="font-medium">${band.$.name}</span>
                <div class="flex items-center gap-2">
                  <span class="text-lg font-bold">${band._}</span>
                  <span class="w-6 h-6 ${getConditionColor(band._)} rounded-full flex items-center justify-center text-xs font-bold">${getConditionIcon(band._)}</span>
                </div>
              </div>
              `).join('')}
            </div>
          </div>

          <!-- Night Conditions -->
          <div>
            <h4 class="text-lg font-semibold mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
              HF Night
            </h4>
            <div class="space-y-2">
              ${nightBands.map(band => `
              <div class="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded p-3">
                <span class="font-medium">${band.$.name}</span>
                <div class="flex items-center gap-2">
                  <span class="text-lg font-bold">${band._}</span>
                  <span class="w-6 h-6 ${getConditionColor(band._)} rounded-full flex items-center justify-center text-xs font-bold">${getConditionIcon(band._)}</span>
                </div>
              </div>
              `).join('')}
            </div>
          </div>

          <!-- VHF/UHF Conditions -->
          <div>
            <h4 class="text-lg font-semibold mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6z"></path>
              </svg>
              VHF/UHF
            </h4>
            <div class="space-y-2">
              ${vhfConditions.map(phenom => `
              <div class="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded p-3">
                <span class="font-medium text-sm">${phenom.$.name === 'vhf-aurora' ? 'Aurora' : phenom.$.name} ${phenom.$.location !== 'northern_hemi' ? `(${phenom.$.location.replace(/_/g, ' ')})` : ''}</span>
                <div class="flex items-center gap-2">
                  <span class="text-sm font-bold">${phenom._.replace('Band ', '')}</span>
                  <span class="w-6 h-6 ${getVHFConditionColor(phenom._)} rounded-full flex items-center justify-center text-xs font-bold">${getVHFConditionIcon(phenom._)}</span>
                </div>
              </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="mt-6 text-xs text-center opacity-70">
          Data courtesy of <a href="https://www.hamqsl.com/solar.html" class="underline hover:opacity-100" target="_blank" rel="noopener">HamQSL.com</a>
        </div>
      </div>`;

      // Save to file
      fs.writeFileSync(path.join(__dirname, 'solar-banner.html'), banner.trim());
      console.log('✓ Solar banner generated successfully');
    });
  });
}).on('error', (err) => {
  console.error('Error fetching solar data:', err);
  process.exit(1);
});
