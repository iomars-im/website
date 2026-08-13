// Navigation component - shared across all pages
export function initNavigation() {
  const navContainer = document.getElementById('nav-container');
  if (!navContainer) return;

  navContainer.innerHTML = `
    <nav class="bg-white dark:bg-gray-900 shadow-lg fixed w-full top-0 z-50" role="navigation" aria-label="Main navigation">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <a href="index.html" class="flex items-center" aria-label="IOMARS Home">
                        <img src="/favicon.png" alt="IOMARS logo" class="h-10 w-10 mr-3">
                        <span class="text-xl font-bold text-gray-900 dark:text-white">IOMARS</span>
                    </a>
                </div>

                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center space-x-6" role="menubar">
                    <a href="index.html" class="nav-link text-gray-700 dark:text-gray-300 hover:text-iom-red dark:hover:text-red-400 transition">Home</a>
                    <a href="news.html" class="nav-link text-gray-700 dark:text-gray-300 hover:text-iom-red dark:hover:text-red-400 transition">News</a>

                    <!-- Club Dropdown -->
                    <div class="nav-dropdown relative" role="menuitem">
                        <button class="nav-dropdown-btn flex items-center text-gray-700 dark:text-gray-300 hover:text-iom-red dark:hover:text-red-400 transition" aria-expanded="false" aria-haspopup="true">
                            Club
                            <svg class="w-4 h-4 ml-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div class="nav-dropdown-menu hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50">
                            <a href="about.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-iom-red dark:hover:text-red-400 transition">About</a>
                            <a href="index.html#meetings" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-iom-red dark:hover:text-red-400 transition">Meetings</a>
                            <a href="membership.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-iom-red dark:hover:text-red-400 transition">Membership</a>
                        </div>
                    </div>

                    <!-- Radio Dropdown -->
                    <div class="nav-dropdown relative" role="menuitem">
                        <button class="nav-dropdown-btn flex items-center text-gray-700 dark:text-gray-300 hover:text-iom-red dark:hover:text-red-400 transition" aria-expanded="false" aria-haspopup="true">
                            Radio
                            <svg class="w-4 h-4 ml-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div class="nav-dropdown-menu hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50">
                            <a href="training.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-iom-red dark:hover:text-red-400 transition">Training</a>
                            <a href="contests.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-iom-red dark:hover:text-red-400 transition">Contests</a>
                            <a href="repeaters.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-iom-red dark:hover:text-red-400 transition">Repeaters</a>
                            <a href="equipment.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-iom-red dark:hover:text-red-400 transition">Equipment</a>
                            <a href="equipment-testing.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-iom-red dark:hover:text-red-400 transition">Equipment Testing</a>
                        </div>
                    </div>

                    <!-- Resources Dropdown -->
                    <div class="nav-dropdown relative" role="menuitem">
                        <button class="nav-dropdown-btn flex items-center text-gray-700 dark:text-gray-300 hover:text-iom-red dark:hover:text-red-400 transition" aria-expanded="false" aria-haspopup="true">
                            Resources
                            <svg class="w-4 h-4 ml-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        <div class="nav-dropdown-menu hidden absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50">
                            <a href="minutes.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-iom-red dark:hover:text-red-400 transition">Minutes</a>
                            <a href="links.html" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-iom-red dark:hover:text-red-400 transition">Useful Links</a>
                        </div>
                    </div>

                    <a href="contact.html" class="nav-link text-gray-700 dark:text-gray-300 hover:text-iom-red dark:hover:text-red-400 transition">Contact</a>
                </div>

                <!-- Theme Switcher -->
                <div class="hidden md:flex items-center space-x-2" role="group" aria-label="Theme selection">
                    <button id="theme-light" class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition" title="Light Mode" aria-label="Switch to light mode">
                        <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                    <button id="theme-dark" class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition" title="Dark Mode" aria-label="Switch to dark mode">
                        <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>
                    </button>
                    <button id="theme-mono" class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition" title="Monochrome Mode" aria-label="Switch to monochrome mode">
                        <svg class="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </div>

                <!-- Mobile Menu Button -->
                <button id="mobile-menu-btn" class="md:hidden text-gray-700 dark:text-gray-300 p-2 -mr-2 touch-manipulation" aria-label="Toggle menu">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            <!-- Mobile Navigation -->
            <div id="mobile-menu" class="hidden md:hidden pb-4" role="menu" aria-label="Mobile navigation menu">
                <a href="index.html" class="mobile-nav-link block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Home</a>
                <a href="news.html" class="mobile-nav-link block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">News</a>

                <!-- Club Group -->
                <div class="mobile-nav-group">
                    <button class="mobile-group-btn w-full flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium">
                        Club
                        <svg class="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div class="mobile-group-menu hidden pl-4 border-l-2 border-iom-red/30 ml-3">
                        <a href="about.html" class="mobile-nav-link block px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">About</a>
                        <a href="index.html#meetings" class="mobile-nav-link block px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">Meetings</a>
                        <a href="membership.html" class="mobile-nav-link block px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">Membership</a>
                    </div>
                </div>

                <!-- Radio Group -->
                <div class="mobile-nav-group">
                    <button class="mobile-group-btn w-full flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium">
                        Radio
                        <svg class="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div class="mobile-group-menu hidden pl-4 border-l-2 border-iom-red/30 ml-3">
                        <a href="training.html" class="mobile-nav-link block px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">Training</a>
                        <a href="contests.html" class="mobile-nav-link block px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">Contests</a>
                        <a href="repeaters.html" class="mobile-nav-link block px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">Repeaters</a>
                        <a href="equipment.html" class="mobile-nav-link block px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">Equipment</a>
                        <a href="equipment-testing.html" class="mobile-nav-link block px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">Equipment Testing</a>
                    </div>
                </div>

                <!-- Resources Group -->
                <div class="mobile-nav-group">
                    <button class="mobile-group-btn w-full flex items-center justify-between px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 font-medium">
                        Resources
                        <svg class="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    <div class="mobile-group-menu hidden pl-4 border-l-2 border-iom-red/30 ml-3">
                        <a href="minutes.html" class="mobile-nav-link block px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">Minutes</a>
                        <a href="links.html" class="mobile-nav-link block px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">Useful Links</a>
                    </div>
                </div>

                <a href="contact.html" class="mobile-nav-link block px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Contact</a>
            </div>
        </div>
    </nav>
  `;

  // Mobile menu toggle - use setTimeout to ensure DOM is ready
  setTimeout(() => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
      const toggleMenu = (e) => {
        e.preventDefault();
        mobileMenu.classList.toggle('hidden');
      };
      mobileMenuBtn.addEventListener('click', toggleMenu);
      mobileMenuBtn.addEventListener('touchstart', toggleMenu, { passive: false });
    }

    // Mobile group toggles
    document.querySelectorAll('.mobile-group-btn').forEach(btn => {
      const toggle = (e) => {
        e.preventDefault();
        const menu = btn.nextElementSibling;
        const chevron = btn.querySelector('svg');
        menu.classList.toggle('hidden');
        chevron.classList.toggle('rotate-180');
      };
      btn.addEventListener('click', toggle);
      btn.addEventListener('touchstart', toggle, { passive: false });
    });

    // Desktop dropdown hover + click support
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
      const btn = dropdown.querySelector('.nav-dropdown-btn');
      const menu = dropdown.querySelector('.nav-dropdown-menu');
      const chevron = btn.querySelector('svg');
      let hideTimeout;

      const show = () => {
        clearTimeout(hideTimeout);
        // Close other open dropdowns
        document.querySelectorAll('.nav-dropdown-menu').forEach(m => {
          if (m !== menu) {
            m.classList.add('hidden');
            m.closest('.nav-dropdown').querySelector('svg').classList.remove('rotate-180');
          }
        });
        menu.classList.remove('hidden');
        chevron.classList.add('rotate-180');
        btn.setAttribute('aria-expanded', 'true');
      };

      const hide = () => {
        hideTimeout = setTimeout(() => {
          menu.classList.add('hidden');
          chevron.classList.remove('rotate-180');
          btn.setAttribute('aria-expanded', 'false');
        }, 150);
      };

      dropdown.addEventListener('mouseenter', show);
      dropdown.addEventListener('mouseleave', hide);
      menu.addEventListener('mouseenter', () => clearTimeout(hideTimeout));
      menu.addEventListener('mouseleave', hide);

      // Click toggle for touch devices at desktop breakpoint
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (menu.classList.contains('hidden')) {
          show();
        } else {
          hide();
        }
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown-menu').forEach(menu => {
          menu.classList.add('hidden');
          menu.closest('.nav-dropdown').querySelector('svg').classList.remove('rotate-180');
          menu.closest('.nav-dropdown').querySelector('.nav-dropdown-btn').setAttribute('aria-expanded', 'false');
        });
      }
    });
  }, 0);
}
