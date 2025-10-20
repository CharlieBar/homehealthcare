```markdown
# PLAN.md — Home Health Care Services Blog (11ty + Netlify)

> Goal: Build and grow a dark-themed, SEO-optimized, accessible, and responsive blog that establishes topical authority for “home health care services,” deployed on Netlify from GitHub. The home page is a paginated Latest Articles feed. Internal linking, structured data, and performance are first-class.

---

## 0) Project Snapshot

- **Stack:** Eleventy (11ty), Vanilla CSS (CSS Custom Properties), Vanilla JS, Lunr.js search, Netlify deploy.
- **Repo Name:** `home-health-care-blog`
- **Build:** `npm run build` → `_site/`
- **Host:** Netlify (connected to GitHub main branch).
- **Design:** Dark theme by default with accessible contrast and motion-safe interactions.
- **Images:** Referenced only; actual assets added later to `/src/images/`. Auto-generate `images-needed.txt`.

---

## 1) Milestones & Deliverables

### M1 — Scaffolding & Theming (Day 1)
- [ ] Initialize repo, Node project, Eleventy basic config.
- [ ] Create directory tree (see §3).
- [ ] Dark theme variables + base, layout, components CSS.
- [ ] Base templates: `base.njk`, `home.njk`, `post.njk`, `category.njk`, `tag.njk`, `page.njk`.
- [ ] Global data files: `site.json`, `nav.json`, `categories.json`, `authors.json`.
- [ ] Netlify config (`netlify.toml`), static headers, robots, manifest.

**Acceptance:** `npm run dev` serves a responsive dark UI, home feed renders placeholder posts, no console errors, Lighthouse perf ≥ 90 on desktop.

### M2 — SEO, Structured Data, Navigation (Day 2)
- [ ] Head meta (title, description, canonical, OG/Twitter) via `base.njk`.
- [ ] JSON-LD includes: `Organization`, `WebSite+SearchAction`, `BreadcrumbList`, `BlogPosting`.
- [ ] Sitemap (plugin), RSS (plugin), robots.txt, pretty permalinks.
- [ ] Breadcrumbs, category mega menu, tags pages.

**Acceptance:** Valid JSON-LD (Rich Results Test), working sitemap.xml & feed.xml, logical breadcrumbs on posts.

### M3 — Content Plan → Generators (Day 2–3)
- [ ] Author `/content-plan/posts.json` (≥ 40 entries; see §7).
- [ ] Script `scripts/generate-from-plan.js` creates `/src/posts/*.md`.
- [ ] Script `scripts/build-search-index.js` outputs `/search-index.json` for Lunr.

**Acceptance:** Running generator produces all post stubs with correct front matter and internal `[[slug]]` links, search page returns results.

### M4 — Interactivity & Accessibility (Day 3)
- [ ] Mobile nav with focus trap & ESC to close.
- [ ] Theme toggle with `prefers-color-scheme` + `localStorage`.
- [ ] In-article TOC highlighting; FAQ accordions; scroll-to-top.
- [ ] Netlify Forms on `/contact/` with honeypot.

**Acceptance:** Keyboard-navigable UI, no a11y violations in axe run, forms submit to Netlify successfully.

### M5 — Performance & Deployment (Day 3)
- [ ] Inline critical CSS; defer JS; preconnect where helpful.
- [ ] Image placeholders with aspect-ratio boxes and gradient BGs.
- [ ] Netlify deploy from GitHub; production URL live.

**Acceptance:** CWV budget met (FID/INP friendly interactions, TBT < 200ms on test content), cache headers applied, 200/404/redirects OK.

---

## 2) Definition of Done (DoD)

- Content stubs present for ≥ 40 posts across all clusters; internal links per rules (§8).
- Home, category, tag, post, about, contact, privacy pages functional.
- JSON-LD valid, sitemap and RSS published, robots.txt present.
- Search functional on `/search/`.
- `images-needed.txt` lists all required images with names, suggested sizes, and alt prompts.
- Lighthouse (desktop): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- Netlify deploy succeeds from `main`.

---

## 3) Directory Structure

```

home-health-care-blog/
├─ package.json
├─ netlify.toml
├─ .eleventy.js
├─ README.md
├─ PLAN.md                    # this file
├─ CHANGELOG.md               # auto-appended per session (see §11)
├─ scripts/
│  ├─ generate-from-plan.js
│  └─ build-search-index.js
├─ content-plan/
│  └─ posts.json
├─ src/
│  ├─ _data/
│  │  ├─ site.json
│  │  ├─ nav.json
│  │  ├─ categories.json
│  │  └─ authors.json
│  ├─ _includes/
│  │  ├─ layouts/{base,home,post,category,tag,page}.njk
│  │  ├─ partials/
│  │  │  ├─ {header,footer,breadcrumbs,post-card,related-posts,toc,share-buttons}.njk
│  │  │  └─ schema/{org,website,breadcrumb,blogposting}.json.njk
│  ├─ assets/
│  │  ├─ css/{variables,base,layout,components,utilities}.css
│  │  └─ js/{main,search,analytics}.js
│  ├─ images/                 # user will add later
│  ├─ posts/                  # generated MD files
│  └─ pages/{about,contact,privacy}.md
├─ static/
│  ├─ robots.txt
│  ├─ _headers
│  └─ manifest.webmanifest
└─ images-needed.txt

````

---

## 4) Naming, Styling & UX Conventions

- **Slugs:** kebab-case, short, intent-driven (e.g., `medicare-home-health-eligibility`).
- **Headings:** One H1 per page; H2/H3 for hierarchy; TOC auto-generated.
- **Links:** Descriptive anchor text (no “click here”); cross-links on exact and partial keyword variants.
- **Dark Theme Tokens (example):**
  - `--bg-0:#0b0f14; --bg-1:#11161d; --card:#171e27;`
  - `--text-0:#e8eef7; --text-1:#c9d4e3;`
  - `--accent:#57a3e3; --accent-2:#6151a1; --success:#3ccf91; --warning:#f0b429;`
- **Motion:** `prefers-reduced-motion` respected; non-blocking animations only.
- **A11y:** Visible focus states, 44px targets, ARIA roles only when needed.

---

## 5) Pages & Routes

- `/` — Home (Latest Articles, category chips, featured guides)
- `/about/` — Organization overview, coverage areas, accreditation
- `/contact/` — Netlify form (name, phone, email, zip, message + honeypot)
- `/privacy-policy/`
- `/search/` — Client search (Lunr)
- `/category/{slug}/` — Paginated category listing
- `/tag/{slug}/` — Tag listing
- `/blog/{post-slug}/` — Post detail

---

## 6) Structured Data & Meta

- **Site-wide:** `Organization`, `WebSite`+`SearchAction`
- **Breadcrumbs:** `BreadcrumbList` on posts and category/tag pages
- **Posts:** `BlogPosting` with `headline`, `description`, `image`, `author`, `datePublished`, `dateModified`, `mainEntityOfPage`
- **Meta:** Unique `<title>`, meta description, canonical, OG/Twitter with default share image fallback
- **Sitemap/RSS:** 11ty plugins for `sitemap.xml` and `feed.xml`

---

## 7) Topical Map (Clusters → Pillars → Posts)

Create **≥ 40 posts** distributed across:

1. **Skilled Nursing** — wound care, IV therapy, med management, post-op
2. **Physical Therapy** — gait training, balance, fall prevention, ortho, post-stroke
3. **Occupational Therapy** — ADLs, adaptive equipment, home safety, energy conservation
4. **Speech Therapy** — aphasia, dysphagia, cognition, voice
5. **Medical Social Work** — coordination, resources, caregiver burnout, advance directives
6. **Home Health Aide** — personal care, bathing, dementia support, respite
7. **Care Planning & Medicare** — eligibility, Plan of Care, recertification, OASIS
8. **Safety & Equipment** — DME, home mods, grab bars, walkers, pressure ulcers

**Sample entries for `/content-plan/posts.json`:**
Each object must include:
```json
{
  "title": "Medicare Home Health Eligibility: The Exact Checklist (with Examples)",
  "slug": "medicare-home-health-eligibility",
  "category": "Care Planning & Medicare",
  "tags": ["medicare", "eligibility", "oasis"],
  "targetKeyword": "medicare home health eligibility",
  "secondaryKeywords": ["qualify for home health medicare", "medicare home health rules"],
  "metaDescription": "Clear checklist to understand Medicare home health eligibility, with examples and tips.",
  "readingGoal": "8–10 min",
  "heroImage": "medicare-eligibility-hero.jpg",
  "inlineImages": ["eligibility-checklist.png","episode-timeline-diagram.png"],
  "author": "Staff Clinician",
  "linksTo": ["skilled-nursing-at-home-guide","oasis-start-of-care-basics","homebound-status-explained"],
  "status": "draft"
}
````

> Populate to ≥ 40 posts. Ensure every item has 3+ `linksTo` internal targets across pillar ↔ spokes.

---

## 8) Internal Linking Rules

* Each post **must**:

  * Link to its **pillar** (category intro) in the first 30% of content.
  * Include ≥ 3 in-content links to sibling/related posts (mix exact/partial anchors).
  * End with a “Related Posts” block: 2 in same category + 2 adjacent categories.
* Category pages link down to spokes; spokes link back to category pages.
* Use the internal link shortcode `[[slug]]` to auto-resolve title + URL.

---

## 9) Interactive Features

* **Search:** Lunr index built at compile, client UI with debounce, highlights.
* **TOC:** Auto anchors; scroll spy highlights current section.
* **FAQ Accordions:** Semantic `<details>`/`<summary>` with JS enhancement.
* **Theme Toggle:** Button persists preference; respects system setting.
* **Nav:** Mobile drawer with focus trap; ESC closes.

---

## 10) Performance & Security

* Inline critical CSS; defer/minify non-critical JS.
* Set caching and security headers in `static/_headers` and `netlify.toml`:

  * `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, HSTS (Netlify managed), `Permissions-Policy` (minimal).
* Targets:

  * TTI < 2.5s (typical laptop), CLS < 0.1, INP < 200ms on content pages.

---

## 11) Session Log & Changelog

* **CHANGELOG.md** — Append per work session:

  * `## YYYY-MM-DD` — What changed, why, impacted files, next steps.
* **Auto-append script (optional):** expose `npm run log "message"` to append to CHANGELOG.
* **PLAN.md Maintenance:** Update Milestones/checkboxes as tasks complete.

---

## 12) Image Manifest Rules

* On build, generate `/images-needed.txt` containing:

  * `post-slug | heroImageName | 1600x900 | alt="..."`
  * Each `inlineImages[]` with recommended size (e.g., 1200x800 PNG/SVG) and alt text hint.
* Site-wide assets:

  * `logo.svg`, `social-share-default.jpg (1200x630)`, `favicon.ico`, `app-icon-192.png`, `app-icon-512.png`.
* Do not block build if missing; render styled placeholders with `aspect-ratio` and gradient.

---

## 13) Commands & Scripts

**Install:**

```bash
npm init -y
npm install @11ty/eleventy @11ty/eleventy-navigation @11ty/eleventy-plugin-rss @11ty/eleventy-plugin-sitemap lunr
```

**Scripts (`package.json`):**

```json
{
  "scripts": {
    "dev": "eleventy --serve",
    "build": "node scripts/build-search-index.js && eleventy",
    "generate": "node scripts/generate-from-plan.js",
    "log": "node -e \"const fs=require('fs');const m=process.argv.slice(1).join(' ')||'Update';fs.appendFileSync('CHANGELOG.md',`\\n## ${new Date().toISOString().slice(0,10)}\\n- ${m}\\n`);console.log('Logged.');\""
  }
}
```

**Workflow:**

```bash
npm run generate   # create post stubs from content plan
npm run dev        # local preview
npm run build      # production build -> _site/
```

---

## 14) Deployment (Netlify)

* Connect GitHub repo in Netlify.
* Build command: `npm run build`
* Publish directory: `_site`
* Set environment `NODE_ENV=production`
* Verify preview deploys on pull requests.

**`netlify.toml` excerpt:**

```toml
[build]
  command = "npm run build"
  publish = "_site"

[[headers]]
  for = "/*"
  [headers.values]
    Referrer-Policy = "strict-origin-when-cross-origin"
    X-Content-Type-Options = "nosniff"

# Optional: trailing slash handling, custom 404
```

---

## 15) QA Checklist

* [ ] All routes render without errors (/, /about/, /contact/, /privacy-policy/, /search/).
* [ ] Pagination works on home and category pages.
* [ ] JSON-LD validates for posts and pages.
* [ ] Sitemap, RSS accessible; robots allows crawling.
* [ ] Search returns relevant results.
* [ ] Internal linking rules satisfied on sample of ≥ 10 posts.
* [ ] Keyboard navigation passes; focus visible; no trap.
* [ ] No 404s on internal links (run link checker).
* [ ] Lighthouse: Perf ≥ 90, A11y ≥ 95, SEO ≥ 95.

---

## 16) Backlog (Future Enhancements)

* Newsletter signup with double opt-in (Netlify + Zapier/Make).
* Author pages with social links and expertise schema.
* Category “hub copy” optimization (FAQ, featured tools).
* Programmatic location pages (if relevant).
* i18n scaffolding.
* Add unit tests for generators (Jest) and link checker in CI.

---

## 17) Roles & Ownership

* **Content:** Staff Clinician (draft), Editor (review/E-E-A-T).
* **Dev:** Site scaffolding, generators, templates, build scripts.
* **SEO:** Keyword review, meta QA, internal link audits.
* **Ops:** Netlify settings, redirects/headers, monitoring.

---

### Ready-to-Start Notes

* Begin with M1 tasks. As each milestone completes, tick checkboxes here and append a concise summary to `CHANGELOG.md` (include “What’s next”).
* Do not add external UI frameworks; keep bundle minimal and fast.

```
```
