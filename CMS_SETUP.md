# IOMARS News CMS Setup Guide

This guide explains how to set up and use the Decap CMS for managing news articles on the IOMARS website.

> **Which guide applies?** `public/admin/config.yml` uses `backend: git-gateway`, so logins go
> through Netlify Identity and content commits land on the `main` branch. This document covers
> that setup. `AUTH0_SETUP.md` covers adding Auth0 as an optional external login provider on top
> of the same Netlify Identity backend, it is not a replacement for this.

## What is Decap CMS?

Decap CMS (formerly Netlify CMS) is a free, open-source content management system that:
- Provides a user-friendly admin interface for non-technical users
- Uses secure GitHub authentication
- Stores content as markdown files in your GitHub repository
- Requires no separate database or backend hosting
- Works seamlessly with your existing Netlify deployment

## Setup Steps

### 1. Enable Netlify OAuth for GitHub

1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your IOMARS site
3. Go to **Site settings** → **Access control** → **OAuth**
4. Under **Authentication providers**, click **Install provider**
5. Select **GitHub**
6. Click **Install**

### 2. Configure GitHub Access

The CMS uses GitHub authentication, which means:
- Only GitHub users with access to the repository can edit content
- No need for separate user management
- Secure OAuth flow managed by Netlify

### 3. Grant Repository Access

To allow someone to edit news:
1. Go to your GitHub repository: https://github.com/JavierIOM/iomars
2. Click **Settings** → **Collaborators**
3. Click **Add people**
4. Enter their GitHub username
5. Select **Write** access level

### 4. Access the CMS

Users can access the admin panel at: `https://www.iomars.im/admin/`
- Click "Login with GitHub"
- Authorize the application
- Start adding news articles

## How to Add News Articles

### For Administrators:

1. Go to `https://www.iomars.im/admin/`
2. Click "Login with GitHub"
3. Authorize the application (first time only)
4. Click "News" in the sidebar
5. Click "New News"
6. Fill in:
   - **Title**: The headline of your news article
   - **Publish Date**: When the article should be dated
   - **Body**: The main content (supports markdown formatting)
   - **Featured Image** (optional): Upload an image if needed
7. Click **Publish** → **Publish now**

The article will be automatically:
- Saved as a markdown file in the `content/news` folder
- Committed to your GitHub repository
- Processed by the build script to generate HTML
- Deployed to your live site (takes ~1-2 minutes)

## Security Features

- **Invite-only**: Only people you invite can access the CMS
- **Git Gateway**: All changes go through Git, providing full audit trail
- **OAuth Authentication**: Secure authentication via Netlify Identity
- **No direct code access**: Users can only add/edit news, not modify site code
- **Automatic backups**: All content is version-controlled in Git

## Troubleshooting

### "Unable to login"
- Make sure you've clicked the invitation link and set up your password
- Try the "Forgot password" option
- Ensure Netlify Identity is enabled in your Netlify dashboard

### "Git Gateway not enabled"
- Go to Site Settings → Identity → Services → Git Gateway
- Click "Enable Git Gateway"

### News not appearing on site
- Wait 1-2 minutes for Netlify to rebuild and deploy
- Check the Netlify build logs for any errors
- Ensure the markdown file was created in `content/news/`
- Verify the build script ran successfully in the build logs (you should see "✓ Successfully built X news article(s)")

## Managing Users

### Add a new editor:
1. Netlify Dashboard → Identity tab
2. Click "Invite users"
3. Enter their email

### Remove access:
1. Netlify Dashboard → Identity tab
2. Find the user
3. Click the "..." menu → "Delete user"

## How It Works Behind the Scenes

When you publish a news article:

1. **Markdown Storage**: The article is saved as a `.md` file in `content/news/`
2. **Build Script**: The `build-news.js` script runs automatically before each build:
   - Reads all markdown files from `content/news/`
   - Parses frontmatter (title, date) using gray-matter
   - Converts markdown content to HTML using marked
   - Sorts articles by date (newest first)
   - Injects the HTML into the news page
3. **GitHub Commit**: The markdown file is committed to the repository
4. **Netlify Deploy**: The site rebuilds and deploys with the new article

This automated process means you never need to manually update HTML - just create articles via the CMS and they appear automatically!

## Content Format

News articles are stored as markdown files in `content/news/` with this format:

```markdown
---
title: "Article Title"
date: 2025-12-14T10:00:00.000Z
---

Article content goes here. You can use **bold**, *italic*, links, etc.
```

The filename follows the pattern: `YYYY-MM-DD-article-slug.md`

## Local Development

To test the CMS locally:

1. Uncomment `local_backend: true` in `public/admin/config.yml`
2. Run: `npx decap-server`
3. In another terminal: `npm run dev`
4. Access CMS at: `http://localhost:3000/admin/`

## Support

For issues with:
- **Netlify Identity**: Check Netlify documentation at https://docs.netlify.com/visitor-access/identity/
- **Decap CMS**: Visit https://decapcms.org/docs/
- **Site issues**: Contact 2D0PEY@qsl.net
