// Load and display equipment from CMS
export async function loadEquipment() {
  // Only run on equipment page
  if (!window.location.pathname.includes('equipment')) {
    return;
  }

  try {
    await Promise.all([
      loadEquipmentForSale(),
      loadEquipmentForLoan()
    ]);
  } catch (error) {
    console.error('Error loading equipment:', error);
  }
}

async function loadEquipmentForSale() {
  const container = document.getElementById('equipment-for-sale-list');
  if (!container) return;

  try {
    const response = await fetch('/equipment-for-sale.json');
    const items = await response.json();

    // Filter available items and sort by order
    const availableItems = items
      .filter(item => item && item.available !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    if (availableItems.length === 0) {
      container.innerHTML = `
        <div class="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 dark:border-amber-400 p-6">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            <strong>Currently no equipment for sale.</strong> Check back at club meetings or contact
            <a href="mailto:info@iomars.im" class="text-iom-red dark:text-red-400 hover:underline font-semibold">info@iomars.im</a>
            for updates on available equipment.
          </p>
        </div>
      `;
      return;
    }

    // Render equipment items
    container.innerHTML = availableItems.map(item => renderEquipmentForSale(item)).join('');
  } catch (error) {
    console.error('Error loading equipment for sale:', error);
    // Keep the default "no equipment" message
  }
}

async function loadEquipmentForLoan() {
  const container = document.getElementById('equipment-for-loan-list');
  if (!container) return;

  try {
    const response = await fetch('/equipment-for-loan.json');
    const items = await response.json();

    const availableItems = items
      .filter(item => item && item.available !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));

    if (availableItems.length > 0) {
      // Replace the static list with CMS content
      container.innerHTML = availableItems.map(item => renderEquipmentForLoan(item)).join('');
    }
  } catch (error) {
    console.error('Error loading equipment for loan:', error);
    // Keep the default static list
  }
}

function renderEquipmentForSale(item) {
  const photosHtml = item.photos && item.photos.length > 0
    ? `<img src="${item.photos[0].image}" alt="${item.title}" class="w-full h-48 object-cover rounded-lg mb-4">`
    : '';

  return `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition">
      ${photosHtml}
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">${item.title}</h3>
        <span class="text-2xl font-bold text-iom-red dark:text-red-400">${item.price}</span>
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-2"><strong>S/N:</strong> ${item.serial_number}</p>
      <div class="flex gap-2 mb-3">
        <span class="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded">${item.category}</span>
        <span class="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded">${item.condition}</span>
      </div>
      <div class="text-gray-700 dark:text-gray-300 prose prose-sm dark:prose-invert mb-4">
        ${item.description}
      </div>
      ${item.known_defects ? `
        <div class="bg-amber-50 dark:bg-amber-900/20 border-l-2 border-amber-500 dark:border-amber-400 p-3 mb-4">
          <p class="text-xs font-semibold text-amber-800 dark:text-amber-200 mb-1">Known Defects:</p>
          <p class="text-sm text-amber-700 dark:text-amber-300">${item.known_defects}</p>
        </div>
      ` : ''}
      <div class="border-t dark:border-gray-700 pt-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          <strong>Contact:</strong> ${item.contact}
        </p>
        ${item.date ? `<p class="text-xs text-gray-500 dark:text-gray-500 mt-1">Listed: ${new Date(item.date).toLocaleDateString()}</p>` : ''}
      </div>
    </div>
  `;
}

function renderEquipmentForLoan(item) {
  const photosHtml = item.photos && item.photos.length > 0
    ? `<img src="${item.photos[0].image}" alt="${item.title}" class="w-full h-48 object-cover rounded-lg mb-4">`
    : '';

  const statusBadge = item.available
    ? '<span class="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded">Available</span>'
    : '<span class="inline-block bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded">On Loan</span>';

  return `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition ${item.available ? '' : 'opacity-60'}">
      ${photosHtml}
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-xl font-bold text-gray-900 dark:text-white">${item.title}</h3>
        ${statusBadge}
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-2"><strong>S/N:</strong> ${item.serial_number}</p>
      <span class="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded mb-3">${item.category}</span>
      <div class="text-gray-700 dark:text-gray-300 prose prose-sm dark:prose-invert mb-4">
        ${item.description}
      </div>
      ${item.known_defects ? `
        <div class="bg-amber-50 dark:bg-amber-900/20 border-l-2 border-amber-500 dark:border-amber-400 p-3 mb-4">
          <p class="text-xs font-semibold text-amber-800 dark:text-amber-200 mb-1">Known Defects:</p>
          <p class="text-sm text-amber-700 dark:text-amber-300">${item.known_defects}</p>
        </div>
      ` : ''}
      ${item.loan_duration ? `
        <div class="border-t dark:border-gray-700 pt-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            <strong>Loan Duration:</strong> ${item.loan_duration}
          </p>
        </div>
      ` : ''}
      ${item.requirements ? `
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
          <strong>Requirements:</strong> ${item.requirements}
        </p>
      ` : ''}
    </div>
  `;
}
