# Handover Guide

Everything needed to take over the IOMARS website and run it on your own hosting. Work
through it in order. Nothing here needs the previous maintainer once you have the accounts
listed in step 1.

The site is a static build. There is no database and no server to maintain. Content is
markdown files in this repository, edited through a web admin panel, and the site rebuilds
itself automatically whenever content changes.

---

## 1. Accounts you need

Ask the outgoing maintainer to sort these before anything else. They cannot be done from
this repository.

| What | Why | Who actions it |
| --- | --- | --- |
| Owner or admin of the `iomars-im` GitHub organisation | To administer this repository | Outgoing maintainer invites you |
| Control of the `iomars.im` domain at the registrar | To point the domain at your hosting | Outgoing maintainer transfers or adds you |
| Access to the DNS provider for `iomars.im` (currently Cloudflare) | To change the DNS records in step 4 | Outgoing maintainer transfers or adds you |
| The `info@iomars.im` mailbox or forwarding rule | Contact and membership form notifications go here | Outgoing maintainer |
| A Netlify account of your own | Free tier is enough | You, at netlify.com |

You do **not** need access to the old Netlify account. You are building a fresh site from
this repository, not inheriting theirs.

---

## 2. Run it on your own machine first

Prove it builds before you touch hosting.

```bash
git clone https://github.com/iomars-im/website.git
cd website
npm install
npm run dev
```

Opens on http://localhost:3000.

```bash
npm run build     # production build into dist/
npm run preview   # serve that build locally
```

Node 22 or newer. The version is pinned in `.nvmrc` and `netlify.toml` so your machine and
the build server agree.

**Expected oddity:** `npm run build` modifies HTML files in the repository. That is correct,
not a bug. See [Build process](#6-build-process) below.

---

## 3. Create the Netlify site

1. Log in to Netlify, choose **Add new site**, then **Import an existing project**.
2. Connect to GitHub and authorise Netlify for the `iomars-im` organisation.
3. Pick the `website` repository.
4. Set the production branch to **`main`**.
5. Leave the build settings alone. Netlify reads them from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 22
6. Deploy.

The first deploy gives you a URL like `random-name-123.netlify.app`. Check the site loads
before moving on. Rename it to something sensible under **Site configuration, Site details,
Change site name**.

### What deploys automatically

- **All 15 pages.** Every page is listed in `vite.config.js`. Nothing extra to configure.
- **The band conditions API.** `netlify/edge-functions/solar-proxy.js` becomes `/api/solar`
  on deploy. It fetches live propagation data from HamQSL and exists only to work around
  that service not allowing browser requests directly. No setup needed.
- **The contact and membership forms.** Netlify detects them in the built HTML automatically.
  See step 5 to get the emails.

---

## 4. Point the domain at your site

Do this only once step 3 works on the `.netlify.app` URL.

1. In Netlify: **Domain management**, **Add a domain**, enter `www.iomars.im`.
2. Netlify shows the DNS records it wants. In Cloudflare, for the `iomars.im` zone:
   - `www` as a **CNAME** to your Netlify site address.
   - The apex `iomars.im` redirecting to `www`, using Cloudflare's flattening or a redirect
     rule.
   - If Cloudflare is proxying (orange cloud), set SSL/TLS encryption mode to **Full
     (strict)**. Anything less causes redirect loops.
3. Wait for Netlify to issue the HTTPS certificate. Usually minutes, occasionally an hour.

The site references `www.iomars.im` in `public/sitemap.xml` and `public/robots.txt`. If you
end up on a different domain, update both.

**Cutover note:** the old site keeps serving `www.iomars.im` until the DNS change propagates.
There is no downtime if you set your Netlify site up fully before switching DNS.

---

## 5. Turn on the content management system

This is what lets committee members add news, minutes and certificates without touching code.
The admin panel is at `https://your-site/admin/`.

1. Netlify, **Site configuration**, **Identity**, **Enable Identity**.
2. Under **Registration preferences**, choose **Invite only**. Do not leave it open.
3. Scroll to **Services**, **Git Gateway**, **Enable Git Gateway**. This is what lets the
   admin panel commit to this repository. The CMS will not work without it.
4. Go to the **Identity** tab, **Invite users**, and enter each committee member's email.
   They get an email, set a password, and can then log in at `/admin/`.

To remove someone, delete them from that same Identity tab.

`CMS_SETUP.md` covers using the CMS day to day. `AUTH0_SETUP.md` is optional and most people
will not need it.

### Form notifications

Contact and membership form submissions appear under **Forms** in the Netlify dashboard. To
get them emailed: **Forms**, **Form notifications**, **Add notification**, **Email
notification**, and set the address (currently `info@iomars.im`).

Submissions made to the old site stay on the old site. They do not transfer.

---

## 6. Build process

**The build scripts rewrite files in this repository.** Seven Node scripts run before every
build, reading markdown from `content/` and writing generated HTML back into the page files,
between marker comments like `<!-- NEWS_ARTICLES_START -->`.

So `git status` showing modified HTML after a build is correct and expected. Commit those
changes, do not revert them.

Run in this order by `npm run prebuild`:

1. `build-news.js` from `content/news/`
2. `build-minutes.js` from `content/minutes/`
3. `build-certificates.js` from `content/certificates/`
4. `build-equipment.js`, writes `public/equipment-for-*.json`
5. `build-links.js` into `links.html` and `training.html`
6. `inject-solar.js`, band conditions placeholder on the homepage
7. `build-commits.js`, recent changes list on the Technical page

`build-solar.js` is dead code, left from an older approach. Ignore it or delete it, but do
not add it back to the chain.

---

## 7. Traps worth knowing before you change anything

These will each cost you an hour if you meet them cold.

**The CMS commits to `main`, not your working branch.** `public/admin/config.yml` sets
`branch: main`. When a committee member publishes an article, it lands on `main` only. If you
work on a `dev` branch, merge `main` into it before you start, or you will overwrite their
content on your next merge. This has already happened once.

**`iom-red` is blue.** In `tailwind.config.js`, `iom-red` is `#57a7f8`. So is `iom-blue`. Both
were repointed at the same blue and the old names kept. For actual red use `red-600` and
`dark:red-400`.

**Adding a page takes three edits, not one.** Create the HTML file, add it to `vite.config.js`
as an input, and add it to `src/navigation.js`. Miss the middle one and the page works
perfectly on your machine and 404s on the live site. That bug has shipped twice.

**Asset paths look wrong but are not.** Pages reference `/public/images/...`. That looks
broken, but the build tool resolves it correctly. Do not mass-rewrite these without building
and checking the result.

**Navigation lives in one file.** `src/navigation.js` generates the menu for every page. Never
edit the nav inside an individual page.

`CLAUDE.md` in the repository root has the full set of conventions, including the writing
tone the club uses.

---

## 8. Once you are live

- Confirm the contact and membership forms arrive in your inbox. Send a test through both.
- Confirm `/admin/` logs in and that publishing a test article triggers a rebuild.
- Confirm the band conditions panel loads on the homepage. If it is stuck on "Loading band
  conditions", the edge function is not deploying.
- Delete the test article.
- Ask the outgoing maintainer to shut down the old Netlify site, so it cannot serve a stale
  copy or confuse a future search result.
