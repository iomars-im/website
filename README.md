# IOMARS

Isle of Man Amateur Radio Society - Modern Website

A modern, responsive website built with Vite and Tailwind CSS for the Isle of Man Amateur Radio Society.

Version: **2.1.1** | Live at [www.iomars.im](https://www.iomars.im)

> **Taking over maintenance of this site? Start with [HANDOVER.md](HANDOVER.md).** It covers
> the accounts you need, standing up hosting from scratch, enabling the content management
> system, and the handful of traps that will otherwise cost you an afternoon.
>
> Already set up and just want the conventions? See [CLAUDE.md](CLAUDE.md).

## About

This is the official website for IOMARS, showcasing:
- Club meetings and events
- Membership information and application
- News and announcements (via CMS)
- Meeting minutes archive (via CMS)
- Contest results and RSGB certificates (via CMS)
- Repeater support group information
- Training programs with curated learning resources
- Useful links directory (via CMS)
- Equipment for sale and loan (via CMS)
- Equipment testing results with spectrum analyser plots
- Committee information
- Live HF/VHF/UHF band conditions

## Key Features

- **Decap CMS Integration** - Secure content management for news articles, meeting minutes, contest certificates, equipment listings, and useful links
- **Dynamic Contest Results** - Automatically generated summary from uploaded certificates
- **Meeting Minutes Archive** - PDF upload and display system with optional summaries
- **Live Band Conditions** - Real-time propagation data from HamQSL (homepage only)
- **Pinned Articles** - Keep important announcements at the top
- **Author Attribution** - Auto-filled from logged-in user
- **Theme Switcher** - Light, Dark, and Monochrome modes
- **Grouped Navigation** - Clean dropdown menus organising pages into Club, Radio, and Resources categories
- **Responsive Design** - Works on all devices
- **Netlify Forms** - Contact and membership forms

## Tech Stack

- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - Client-side interactivity
- **Decap CMS** - Content management system
- **Netlify Identity** - User authentication
- **Netlify Edge Functions** - Serverless API proxy
- **Marked.js** - Markdown to HTML conversion
- **Gray Matter** - YAML frontmatter parsing

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

The site will be available at http://localhost:3000

### Build

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Deployment

This site is configured for deployment on Netlify. The `netlify.toml` file is already configured.

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository to Netlify
3. Netlify will automatically detect the build settings from `netlify.toml`
4. Your site will be deployed automatically

## License

Copyright 2026 Isle of Man Amateur Radio Society. All rights reserved.
