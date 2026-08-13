# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.1] - 2026-08-13

### Added
- **CLAUDE.md** - Project guidelines moved out of the untracked `.claude/` folder and into a
  tracked file, corrected and expanded: branch model, the full seven-script build chain, the
  three edits needed to add a page, colour rules, theme defaults and the asset path quirk
- Sitemap entries for the nine pages that were missing: training, contests, repeaters,
  equipment, equipment testing, links, minutes and technical

### Changed
- Merged eight content commits from `main` into `dev`. Decap CMS commits to `main`, so the
  March 2026 newsletter, Bring and Buy Sale article and RSGB 432MHz AFS certificate had never
  reached the working branch
- Regenerated all CMS-built pages, which had drifted from `content/`. News now shows 8 articles
  (was 6), minutes 24, certificates 3
- `CMS_SETUP.md` and `AUTH0_SETUP.md` now state up front which one applies. The backend is
  Netlify Identity plus Git Gateway, Auth0 is an optional login provider on top

### Fixed
- **Sitemap pointed at the retired beta domain** - all URLs now use `www.iomars.im`, matching
  the fix already applied to `robots.txt`, and `lastmod` dates refreshed
- Stale `beta.iomars.im` links in `CMS_SETUP.md`, `AUTH0_SETUP.md` and the news page
- `.claude/` is no longer committed to the repository, and is now in `.gitignore`
- Invalid JSON in `.claude/settings.local.json` (missing comma) that stopped the file parsing

### Removed
- `minutes - backup.html`, a 65 KB leftover copy of the minutes page
- `package.json.tmp`, an empty file
- `temp.txt`, a draft of the AGM meeting-format notice

## [2.1.0] - 2026-02-17

### Added
- **Equipment Testing page** - Coaxial cable loss measurements from club testing evening (21st Jan 2026)
- Loss data table for RG-213, Ultraflex 7, and LDF4-50 at 144/432/1296 MHz
- Color-coded values: green (<1dB), orange (2-3dB), red (>3dB)
- Spectrum analyser plots extracted from Signal Hound SA44B measurements
- Click-to-enlarge lightbox for plot images
- "How much loss is acceptable?" guidance section
- Link to DX Shop Coax Loss Calculator
- **Grouped dropdown navigation** - Reorganised 12 nav items into 6 top-level entries
- Club dropdown (About, Meetings, Membership)
- Radio dropdown (Training, Contests, Repeaters, Equipment, Equipment Testing)
- Resources dropdown (Minutes, Useful Links)
- Hover and click support for dropdown menus on desktop
- Collapsible groups with chevron indicators on mobile

### Changed
- Navigation restructured from flat list to categorised dropdowns for cleaner layout

### Fixed
- Dark mode table visibility on Equipment Testing page (invalid bg-gray-750 class)
- Dark mode table border contrast (borders now distinct from row backgrounds)

## [2.0.0] - 2026-02-13

### Added
- **Training page** - Dedicated page for licence training information (Foundation, Intermediate, Advanced)
- Training resource links section with curated external learning materials
- **Useful Links page** - Categorised directory of amateur radio resources
- Links organised into categories: Propagation, Technical Resources, Operating, Useful Databases, Training
- **CMS-managed links** - Links collection added to Decap CMS for easy management
- build-links.js build script to generate links from markdown content files
- 23 curated links across 5 categories
- Admin login button on Links page for authorised editors
- Links and Training pages added to Vite build configuration

### Changed
- Training section moved from index.html to dedicated training.html page
- Navigation updated with Training page link and new Links page
- Updated copyright year to 2026

### Fixed
- **404 page navigation** - Replaced outdated hardcoded navigation with shared nav component
- 404 page now uses consistent navigation matching all other pages

## [1.12.2] - 2025-12-28

### Fixed
- **Mobile menu functionality on iOS** - Added touchstart event handler and setTimeout for proper DOM initialization
- **Theme switcher icon visibility** - Icons now properly visible in dark mode with appropriate color classes
- **Monochrome mode text contrast** - Comprehensive color overrides ensure all text is readable
- Mobile menu button now has proper touch target size and touch-manipulation CSS
- Theme icons (light/dark/mono) now use text-gray-700 dark:text-gray-300 for visibility
- Monochrome theme forces light backgrounds with dark text for readability
- Dark sections (footer) in monochrome mode now have proper light text on dark background
- All gray text variations in monochrome mode mapped to appropriate contrast ratios

### Changed
- Mobile menu button now includes aria-label for accessibility
- Monochrome theme now uses consistent light theme with grayscale filter instead of preserving dark mode
- Card backgrounds in monochrome mode forced to white with dark text

## [1.12.1] - 2025-12-28

### Added
- Professional SVG icons for Training & Education section (book, document, graduation cap)
- Professional SVG icons for Equipment Loan section (desktop, WiFi signal, speaker, lightning)
- Rounded square containers for all section icons with consistent styling
- Improved dark mode support for all icon backgrounds

### Changed
- **Navigation refactored** - Centralized navigation component (src/navigation.js) eliminating code duplication across 12 HTML pages
- Training icons changed from emoji-style to education-themed SVG icons
- Equipment icons changed from emojis to radio equipment-themed SVG icons
- Icon containers changed from circular to rounded squares for visual consistency
- Navigation updates now require editing only one file instead of all pages

### Fixed
- **Equipment description display** - Build script now correctly reads description from CMS frontmatter field
- Equipment items created via CMS now display descriptions properly
- Build script falls back to markdown content if frontmatter description not present
- Applied description fix to both equipment-for-sale and equipment-for-loan

## [1.12.0] - 2025-12-28

### Added
- **Serial Number field** - Now required for all equipment listings (both sale and loan)
- **Known Defects field** - Optional text field to document issues with equipment
- Known defects display with amber-styled warning box when present
- Serial number display below item title for all equipment
- **Build-time equipment processing** - Equipment data now pre-built to JSON during deployment
- build-equipment.js script to generate equipment-for-sale.json and equipment-for-loan.json
- Equipment JSON files included in production build for reliable loading

### Changed
- Serial number changed from optional to required field in CMS
- Equipment loading switched from client-side directory parsing to JSON fetching
- Simplified equipment.js by removing custom YAML parser (now uses gray-matter in build script)
- Equipment data processing moved from runtime to build time for better performance
- Updated prebuild script to include build-equipment.js
- Equipment page pathname detection now works on both /equipment and /equipment.html

### Fixed
- 404 errors when loading equipment on production (content/ folder not deployed)
- Equipment items now display correctly on live site
- Photo arrays now properly parsed from YAML frontmatter
- Equipment availability status correctly tracked and filtered

## [1.11.0] - 2025-12-28

### Added
- **Equipment page** - New dedicated page for club equipment management
- Split into two sections: Equipment to Loan and Equipment for Sale
- **CMS backend for equipment** - Full content management for equipment listings
- Equipment for Sale collection with fields: title, price, description, photos, category, condition, contact, availability, date listed, display order
- Equipment for Loan collection with fields: title, description, photos, category, availability, loan duration, requirements, display order
- Photo upload support for equipment items (multiple photos per item)
- Category badges (HF Radio, VHF/UHF Radio, DMR Radio, Antenna, Power Supply, Test Equipment, Accessory, Other)
- Condition badges (New, Excellent, Good, Fair, For Parts) for sale items
- Availability status tracking (available/sold for sale items, available/on loan for loan items)
- Dynamic equipment grids that load from CMS with graceful fallback to static content
- "Manage Equipment" admin button in hero section linking to /admin/
- Equipment loader module (src/equipment.js) for fetching and rendering CMS content
- Equipment navigation link added between Repeaters and Minutes on all pages
- Custom repeater banner image (repeater-banner.jpg) for Repeaters page
- Kent Engineers telegraph key banner image for Equipment page

### Changed
- Updated version to 1.11.0 across package.json, README.md, and footer
- Media folder changed from "public/images/news" to "public/images/uploads" to support multiple content types
- Added equipment.html to Vite build configuration
- Navigation order now includes Equipment between Repeaters and Minutes

### Removed
- Christmas snowfall effect (src/snow.js deleted, imports removed from main.js)
- Seasonal code cleanup after holidays

## [1.10.0] - 2025-12-20

### Added
- **Repeaters page** - New dedicated page for Isle of Man Repeater Support Group
- Information about GB3IM (70cm) and GB3GD (2m) repeaters with QRZ.com links
- Information about GB7CA and GB7BR DMR repeaters with QRZ.com links
- David Osborn (GD4HOZ) credited for maintaining repeaters with QRZ.com link
- Details about repeater infrastructure (Snaefell, Carnane, Bride locations)
- AllStar and Echolink connectivity information
- Link to www.manxrepeaters.com for updates and photos
- Support/donation information for repeater maintenance
- Repeaters navigation link added between Contests and Minutes on all pages
- **QRZ.html pages** - Created standalone pages for QRZ.com club biography
- Dark mode themed QRZ page with theme toggle (qrz.html)
- Simplified paste-ready version for QRZ.com bio editor (qrz-paste.html)
- Linked repeater callsigns (GB3GD, GB3IM) to QRZ.com on both QRZ pages
- **Christmas snowfall effect** - Festive falling snowflakes animation
- Created src/snow.js with custom SVG snowflake designs
- Three different snowflake patterns with random sizing and speeds
- Easy removal instructions for after Christmas

### Changed
- Updated version to 1.10.0 across package.json, README.md, and footer
- Added repeaters.html to Vite build configuration
- Navigation order now: Home, News, About, Meetings, Membership, Training, Contests, Repeaters, Minutes, Contact
- Improved QRZ page welcome note background to fit text better

### Fixed
- QRZ page Google Maps links updated to correct Scout Building location

## [1.9.0] - 2025-12-18

### Added
- **Contest certificates support** - Upload and display RSGB contest certificates via CMS
- Automated contest results summary with position rankings
- PDF certificate uploads to public/certs/ directory
- Build script (build-certificates.js) to generate contest results HTML
- Certificate metadata: title, date, achievement, operators, position, total entries
- Visual display of contest achievements on contests.html page
- Contest results cards showing latest achievements per contest type
- Call to action encouraging more operators to join contest team
- Added contests.html to navigation (between Training and Minutes)
- **Meeting minutes archive** - Upload and display meeting minutes PDFs via CMS
- Minutes upload support with optional summary text
- Build script (build-minutes.js) to generate minutes archive HTML
- Chronological display of all meeting minutes on minutes.html page
- PDF download links for each set of minutes
- Visual formatting for minutes display with cards
- Added minutes.html to navigation (between Contests and Contact)
- **Commit log tracking** - Automated Git commit history on Technical page
- Build script (build-commits.js) to capture last 50 commits
- Commit display showing hash, author, date, and message
- Updated prebuild script to include commit tracking

### Changed
- Updated navigation across all pages to include Contests and Minutes links
- Rearranged navigation order to better organize content
- Updated vite.config.js to include contests.html and minutes.html
- Updated version to 1.9.0

## [1.8.0] - 2025-12-16

### Added
- **Live band conditions banner** - Real-time HF/VHF/UHF propagation data from HamQSL
- Client-side JavaScript fetches fresh data on every page load
- VHF/UHF conditions including Aurora and E-Skip for Europe/North America/6m/4m
- Netlify Edge Function to proxy HamQSL XML feed (fixes CORS)
- 5-minute caching on edge function to reduce upstream requests
- **Pinned articles feature** - Pin important news to top of news page
- **Author field for news articles** - Required field with auto-fill from login
- Pin to Top checkbox in CMS for easy article pinning
- Visual pin badge and blue border for pinned articles
- Author name displays at bottom of each article
- Auto-populated author field using {{author-login}} template
- Warning in build script if author field is missing

### Changed
- Band conditions now update live instead of at build time
- Removed build-solar.js from prebuild chain (now client-side)
- Simplified inject-solar.js to insert placeholder div
- Updated site color from #396EA3 to #57a7f8 (brighter blue)
- Updated all HTML footers to show Beta 1.8.0
- Modified tailwind.config.js with inline comments for rollback capability
- News articles now sorted: pinned first, then by date (newest first)

### Fixed
- Duplicate band conditions data in footer (corrected injection script)
- CORS errors when fetching solar data from browser
- Missing VHF/UHF propagation conditions
- Author attribution for historical articles

### Security
- Git history tracking shows who created each article
- Required author field ensures accountability
- CMS enforces author field on all new articles

## [1.7.0] - 2025-12-16

### Added
- Custom live solar data banner with HF band conditions
- Day/Night band conditions display (80m-10m)
- Color-coded status: Green (Good), Yellow (Fair), Red (Poor)
- Visual indicators: ✓ for Good, ○ for Fair, ✕ for Poor
- HamQSL XML feed integration via build-solar.js
- Automated banner injection via inject-solar.js
- Solar data banner styled to match site theme

### Changed
- Replaced external solar widget with custom banner
- Updated prebuild script to include solar data generation
- Updated version to 1.7.0

## [1.6.0] - 2025-12-15

### Added
- Custom news article builder (build-news.js)
- Automated news generation from markdown files
- Support for featured images in articles
- Article sorting by date (newest first)
- Markdown to HTML conversion using marked.js

### Changed
- News articles now built from content/news/*.md files
- Added prebuild script to generate news HTML

## [1.5.0] - 2025-12-14

### Added
- **Netlify CMS (Decap CMS) integration** for secure news management
- CMS admin panel at `/admin/` with Netlify Identity authentication
- Invite-only user system - only authorized committee members can add news
- News content stored as markdown files in `content/news/` directory
- Netlify Identity widget added to all pages
- CMS configuration file (`public/admin/config.yml`)
- Comprehensive setup guide (`CMS_SETUP.md`) with authentication instructions
- Image upload support for news articles
- Git Gateway integration for automatic deployment

### Security Features
- OAuth-based authentication via Netlify Identity
- Invite-only registration (prevents unauthorized access)
- All content changes tracked in Git (full audit trail)
- Users can only manage news content (no site code access)
- Automatic version control and backups

### Changed
- Updated version to 1.5.0
- News articles can now be managed through secure admin interface

## [1.4.0] - 2025-12-14

### Added
- News page (news.html) with blog posts from IOMARS
- 10 news articles covering club updates, events, and announcements
- News navigation link added to all pages (desktop and mobile)
- Added news.html to Vite build configuration

### Changed
- Updated navigation menus across all pages to include News link
- Updated version to 1.4.0

## [1.3.1] - 2025-12-14

### Added
- Custom 404 error page with ham radio themed humor
- Radio-themed error messages ("We Can't Hear You", "Signal Lost", "QRT")
- Troubleshooting tips section with radio terminology
- Added 404.html to Vite build configuration

### Removed
- Payment information section from membership form

## [1.3.0] - 2025-12-14

### Added
- Separate membership page (membership.html) with detailed information
- Member benefits section with icons and descriptions
- Membership application form with Netlify Forms integration
- Form fields: First Name, Last Name, Callsign, Email, Address, Phone, Membership Type (radio buttons), Email opt-in (checkbox)
- Payment information section with treasurer's mailing address
- Added membership.html to Vite build configuration

### Changed
- Updated navigation links to point to new membership.html page instead of #membership anchor
- "Join Us" button in hero section now links to membership page
- Updated all page navigation menus (index, contact, success, membership)
- Replaced call-to-action section with full membership application form

## [1.2.8] - 2025-12-14

### Changed
- Updated Facebook links to point to https://www.facebook.com/groups/iomars
- Links now open in new tab with proper security attributes
- Updated footer to include "Created and maintained by 2D0PEY" with email link

### Fixed
- Changed form action from absolute path (/success.html) to relative path (success.html) for better compatibility

## [1.2.7] - 2025-12-14

### Changed
- Switched contact form from Formspree to Netlify Forms
- Contact form now uses Netlify's built-in form handling
- Form submissions will appear in Netlify dashboard
- Removed Formspree-specific field names (_replyto, _subject, _to, _next)
- Simplified form success handling

### Added
- Success page (success.html) that displays after form submission
- Spam protection using Netlify honeypot field
- Added success.html to Vite build configuration

### Fixed
- Form submission 404 error - now redirects to /success.html instead of /contact

## [1.2.6] - 2025-12-13

### Added
- QRZ.com links for all club callsigns (GT1IOM, GT3FLH, GT4IOM)
- Links added to both hero section on index page and club callsigns section on contact page
- Hover effects on callsign links (brightness change on hero, scale and shadow on contact page)

## [1.2.5] - 2025-12-13

### Fixed
- Configured Vite to build contact.html as a multi-page entry point
- This fixes 404 error on Netlify deployment for contact page
- Added rollupOptions to vite.config.js with both index.html and contact.html as inputs

## [1.2.4] - 2025-12-13

### Added
- QRZ.com links for all committee member callsigns
- Links open in new tab with proper security attributes (target="_blank" rel="noopener noreferrer")
- Hover underline effect on callsign links

## [1.2.3] - 2025-12-13

### Changed
- Reorganized committee section to display main officers (President, Chairman, Treasurer, Secretary) in first row
- General members (Stuart Hill, Keith Daniels) now displayed in separate second row

## [1.2.2] - 2025-12-13

### Fixed
- Removed Netlify redirect rule that was preventing contact.html from loading
- Updated Tailwind config to include all HTML files in content scanning

## [1.2.1] - 2025-12-13

### Added
- Stuart Hill (GD0OUD) to committee
- Keith Daniels (GD5IOM) to committee

### Changed
- Committee grid layout changed from 4 columns to 3 columns to accommodate 6 members

## [1.2.0] - 2025-12-13

### Added
- Separate contact page (contact.html) with full navigation and footer
- Contact form integration using Formspree that sends to info@iomars.im
- Form fields: name, email, callsign (optional), subject, and message
- Success message display after form submission
- Club callsigns section on contact page

### Changed
- Contact navigation link now points to /contact.html instead of #contact anchor
- "Get in Touch" button in hero section now links to contact page

## [1.1.2] - 2025-12-13

### Changed
- Updated favicon to use custom Isle of Man flag PNG image (512x512)

## [1.1.1] - 2025-12-13

### Added
- Favicon using Isle of Man flag icon from original site

## [1.1.0] - 2025-12-13

### Added
- Theme switcher with three modes: Light, Dark, and Monochrome
- Separate themes.css stylesheet for theme-specific styling
- Dark mode support across all sections
- Theme persistence using localStorage
- Active theme indicator in navigation
- Version number in footer (v1.1.0)

### Changed
- Reduced brightness of primary red color from #ED1C24 to #B91C1C for better readability
- Added darker red variant #991B1B for gradient transitions

## [1.0.0] - 2025-12-13

### Added
- Initial project setup
- README.md with installation and deployment instructions
- CHANGELOG.md
- Modern website design with Vite and Tailwind CSS
- Responsive navigation with mobile menu
- Hero section with club callsigns
- Meetings section with primary and social meeting information
- Membership pricing cards for all membership tiers
- Training section covering Foundation, Intermediate, and Advanced licenses
- Equipment loan section showcasing available equipment
- Committee section with leadership information
- Contact section with email and social media links
- Netlify deployment configuration
- .gitignore for Node.js and Netlify
