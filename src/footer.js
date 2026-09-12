// Footer component - shared across all pages
export function initFooter() {
  const footerContainer = document.getElementById('footer-container');
  if (!footerContainer) return;

  // Check if we should include solar conditions (only on index page)
  const includeSolarConditions = window.location.pathname.endsWith('index.html') ||
                                  window.location.pathname === '/' ||
                                  window.location.pathname === '';

  const solarConditionsHTML = includeSolarConditions ? `
            <div class="mb-4">
                <div id="solar-conditions"></div>
            </div>` : '';

  footerContainer.innerHTML = `
    <footer class="bg-gray-900 dark:bg-black text-white py-8" role="contentinfo">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">${solarConditionsHTML}
            <p>&copy; 2026 Isle of Man Amateur Radio Society. All rights reserved.</p>
            <p class="text-sm text-gray-400 mt-2">Created and maintained by <a href="mailto:info@iomars.im" class="text-iom-red hover:text-red-400 transition">IOMARS Committee</a></p>
            <p class="text-sm text-gray-400 mt-1">Version 2.1.2</p>
        </div>
    </footer>
  `;
}
