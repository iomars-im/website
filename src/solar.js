// Fetch and display live solar/band conditions data
export async function loadSolarConditions() {
  const container = document.getElementById('solar-conditions');
  if (!container) return;

  // Show loading state
  container.innerHTML = `
    <div class="bg-gradient-to-r from-iom-blue-dark to-iom-blue p-6 rounded-lg shadow-xl text-white">
      <div class="flex justify-center items-center py-8">
        <div class="animate-pulse text-lg">Loading band conditions...</div>
      </div>
    </div>
  `;

  try {
    // Fetch XML data from our Netlify Edge Function proxy
    const response = await fetch('/api/solar');
    const xmlText = await response.text();

    // Parse XML
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    // Extract data
    const updated = xmlDoc.querySelector('updated').textContent.trim();

    // Get HF band conditions
    const bands = Array.from(xmlDoc.querySelectorAll('calculatedconditions band'));
    const dayBands = bands.filter(b => b.getAttribute('time') === 'day');
    const nightBands = bands.filter(b => b.getAttribute('time') === 'night');

    // Get VHF conditions
    const vhfConditions = Array.from(xmlDoc.querySelectorAll('calculatedvhfconditions phenomenon'));

    // Helper functions
    const getConditionColor = (condition) => {
      switch(condition.toLowerCase()) {
        case 'good': return 'bg-green-500';
        case 'fair': return 'bg-yellow-500';
        case 'poor': return 'bg-red-500';
        default: return 'bg-gray-500';
      }
    };

    const getConditionIcon = (condition) => {
      switch(condition.toLowerCase()) {
        case 'good': return '✓';
        case 'fair': return '○';
        case 'poor': return '✕';
        default: return '?';
      }
    };

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

    // Generate band HTML
    const generateBandHTML = (band) => {
      const name = band.getAttribute('name');
      const condition = band.textContent;
      return `
        <div class="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded p-3">
          <span class="font-medium">${name}</span>
          <div class="flex items-center gap-2">
            <span class="text-lg font-bold">${condition}</span>
            <span class="w-6 h-6 ${getConditionColor(condition)} rounded-full flex items-center justify-center text-xs font-bold">${getConditionIcon(condition)}</span>
          </div>
        </div>
      `;
    };

    const generateVHFHTML = (phenom) => {
      const name = phenom.getAttribute('name');
      const location = phenom.getAttribute('location');
      const condition = phenom.textContent;

      const displayName = name === 'vhf-aurora' ? 'Aurora' : name;
      const locationText = location !== 'northern_hemi' ? ` (${location.replace(/_/g, ' ')})` : '';

      return `
        <div class="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded p-3">
          <span class="font-medium text-sm">${displayName}${locationText}</span>
          <div class="flex items-center gap-2">
            <span class="text-sm font-bold">${condition.replace('Band ', '')}</span>
            <span class="w-6 h-6 ${getVHFConditionColor(condition)} rounded-full flex items-center justify-center text-xs font-bold">${getVHFConditionIcon(condition)}</span>
          </div>
        </div>
      `;
    };

    // Build the banner HTML
    const bannerHTML = `
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
              ${dayBands.map(generateBandHTML).join('')}
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
              ${nightBands.map(generateBandHTML).join('')}
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
              ${vhfConditions.map(generateVHFHTML).join('')}
            </div>
          </div>
        </div>

        <div class="mt-6 text-xs text-center opacity-70">
          Data courtesy of <a href="https://www.hamqsl.com/solar.html" class="underline hover:opacity-100" target="_blank" rel="noopener">HamQSL.com</a>
        </div>
      </div>
    `;

    container.innerHTML = bannerHTML;

  } catch (error) {
    console.error('Error loading solar conditions:', error);
    container.innerHTML = `
      <div class="bg-gradient-to-r from-iom-blue-dark to-iom-blue p-6 rounded-lg shadow-xl text-white">
        <div class="text-center py-4">
          <p class="text-lg mb-2">Unable to load band conditions</p>
          <p class="text-sm opacity-80">Please try refreshing the page</p>
        </div>
      </div>
    `;
  }
}
