# IOMARS Project Guidelines

Isle of Man Amateur Radio Society website. Vite multi-page site, Tailwind, vanilla JS,
Decap CMS, hosted on Netlify at www.iomars.im.

## Writing style and tone

This is a club site with a broad membership. Language is positive and welcoming, focused on
achievements and on inviting people to take part. Never self-deprecating or apologetic about
turnout, results or resources.

Good: "Club members regularly participate in VHF RSGB contests each year, achieving excellent
results in the Local Club's section. We're always looking for more operators to join our
contest team."

Avoid: "Despite never having enough people for a full team, we still get reasonable results in
the Local Club's section."

## Branches

- `dev` is the working branch.
- `main` is production. Netlify builds it.
- **Decap CMS commits straight to `main`** (`public/admin/config.yml` sets `branch: main`), so
  committee members adding news, minutes or certificates on the live site land on `main` only.
  **Merge `main` into `dev` before starting work**, or their content gets lost on the next merge.

Push after committing. That is the default, not something to ask about.

## Build process

`npm run build` runs `prebuild` first, which is seven Node scripts in order:

1. `build-news.js` - news articles from `content/news/`
2. `build-minutes.js` - meeting minutes from `content/minutes/`
3. `build-certificates.js` - contest certificates from `content/certificates/`
4. `build-equipment.js` - writes `public/equipment-for-*.json` from `content/equipment-*/`
5. `build-links.js` - links from `content/links/` into `links.html` and `training.html`
6. `inject-solar.js` - inserts the solar banner placeholder into `index.html`
7. `build-commits.js` - recent commit history for the Technical page

**These scripts rewrite the tracked root `.html` files in place**, between marker comments
(`<!-- NEWS_ARTICLES_START -->`, `<!-- CERTIFICATES_START -->`, `<!-- LINKS_START -->`,
`<!-- TRAINING_LINKS_START -->` and friends). A dirty working tree after a build is correct and
expected. Do not revert those diffs, they are the build output. Commit them.

`build-solar.js` is orphaned. It was dropped from the chain at v1.8.0 when band conditions moved
client-side. Do not wire it back in.

## Adding a page

Three edits, not one. Miss the second and the page works in dev but 404s on Netlify.

1. Create the `.html` file in the repo root.
2. Add it as a Rollup input in `vite.config.js`.
3. Add it to `src/navigation.js`, which is the only nav source for every page.

## Navigation

Grouped dropdowns, all defined in `src/navigation.js`:

- **Club**: About, Meetings, Membership
- **Radio**: Training, Contests, Repeaters, Equipment, Equipment Testing
- **Resources**: Minutes, Useful Links
- Plus top-level Home, News and Contact.

Hover and click on desktop, collapsible chevron groups on mobile. Never hand-edit nav in an
individual page.

## Colours

`iom-red` in `tailwind.config.js` is **`#57a7f8`, which is blue**. So is `iom-blue`. Both were
repointed at the same blue in v1.8.0 and the old names kept as aliases.

- For actual red, use `red-600` / `dark:red-400`.
- Committee callsigns: `text-red-600 dark:text-red-400`.
- All hyperlinks (mailto, external): `text-red-600 dark:text-red-400 hover:underline`.
- Anything reading `text-iom-red` renders blue, usually on purpose.

## Themes

Light, dark and mono, toggled in the nav and persisted to `localStorage`. **Light is the
default**, deliberately, for an older membership. Mono is not a greyscale filter, it forces
light backgrounds with dark text because the filter approach wrecked contrast.

## Asset paths

Pages reference `/public/favicon.png`, `/public/images/...`. That looks wrong but is not: Vite
resolves root-absolute paths against the project directory at build time and emits hashed assets.
Do not mass-rewrite these without building and checking `dist/`.

## Footer

Solar band conditions only render on the homepage. `src/footer.js` decides by checking
`location.pathname`. Every other page gets the plain footer.

## File layout

- Page HTML in the repo root.
- Markdown content in `content/<type>/`.
- Certificate and minutes PDFs in `public/certs/` and `public/minutes/`.
- CMS uploads in `public/images/uploads/`.
- Shared JS in `src/`.

## Releases

Update `CHANGELOG.md` before every commit, grouped Added / Changed / Fixed. Bump the version in
**both** `package.json` and `src/footer.js`, plus the line in `README.md`, so they never drift.
