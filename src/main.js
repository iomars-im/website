import { loadSolarConditions } from './solar.js';
import { initFooter } from './footer.js';
import { initNavigation } from './navigation.js';
import { loadEquipment } from './equipment.js';

// Initialize navigation
initNavigation();

// Theme management
const themeButtons = {
  light: document.getElementById('theme-light'),
  dark: document.getElementById('theme-dark'),
  mono: document.getElementById('theme-mono')
};

function setTheme(theme) {
  const html = document.documentElement;

  // Remove all theme classes
  html.classList.remove('dark', 'mono');

  // Add the selected theme class
  if (theme === 'dark') {
    html.classList.add('dark');
  } else if (theme === 'mono') {
    html.classList.add('mono');
  }

  // Update active button state
  Object.keys(themeButtons).forEach(key => {
    if (key === theme) {
      themeButtons[key].classList.add('active');
    } else {
      themeButtons[key].classList.remove('active');
    }
  });

  // Save to localStorage
  localStorage.setItem('theme', theme);
}

// Initialize theme from localStorage or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Add click handlers to theme buttons
themeButtons.light.addEventListener('click', () => setTheme('light'));
themeButtons.dark.addEventListener('click', () => setTheme('dark'));
themeButtons.mono.addEventListener('click', () => setTheme('mono'));

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Smooth scroll offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      const offset = 64; // Height of fixed navbar
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Push the hash to the URL so the active nav can be detected, and update nav state
      try {
        history.pushState(null, '', href);
      } catch (err) {
        // Fallback to direct assignment if pushState is unavailable
        location.hash = href;
      }
      if (typeof updateActiveNav === 'function') updateActiveNav();
    }
  });
});

// Highlight active navigation item based on path and hash (supports anchors like #meetings and #training)
function updateActiveNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const links = nav.querySelectorAll('a[href]');

  // Remove previous active styles
  links.forEach(a => {
    a.classList.remove('text-iom-red', 'dark:text-red-400', 'font-semibold', 'bg-gray-100', 'dark:bg-gray-700');
  });

  const currentPath = location.pathname.replace(/\/$/, '');
  const currentHash = location.hash || '';

  links.forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;

    // Hash-only links (e.g., '#training')
    if (href.startsWith('#')) {
      if (href === currentHash || (href === '#home' && (currentHash === '' || currentHash === '#home') && (currentPath.endsWith('/index.html') || currentPath === '' || currentPath === '/'))) {
        setActive(a);
      }
      return;
    }

    // Full or relative URLs
    const url = new URL(href, location.origin);
    const path = url.pathname.replace(/\/$/, '');
    const hash = url.hash || '';

    if (path === currentPath && hash === currentHash) {
      setActive(a);
    } else if (path === currentPath && hash === '' && currentHash === '') {
      // Page-level match (no hash)
      setActive(a);
    }
  });

  function setActive(el) {
    // Mobile links use 'block' class
    if (el.classList.contains('block')) {
      el.classList.add('bg-gray-100', 'dark:bg-gray-700', 'text-iom-red', 'dark:text-red-400', 'font-semibold');
    } else {
      el.classList.add('text-iom-red', 'dark:text-red-400', 'font-semibold');
    }
  }
}

updateActiveNav();
window.addEventListener('hashchange', updateActiveNav);
window.addEventListener('popstate', updateActiveNav);
window.addEventListener('DOMContentLoaded', updateActiveNav);

// Initialize footer
initFooter();

// Load solar conditions on page load
loadSolarConditions();

// Load equipment from CMS on equipment page
loadEquipment();
