
# Home Health Care Services Blog (Static)

A fully static, dark-themed blog that shares accessible guides for families using home health care. No build tools required—drop this folder onto Netlify or GitHub Pages.

## Getting Started

1. Clone or download the repository.
2. Open `index.html` in your browser to preview locally.
3. Deploy by uploading the entire folder to Netlify, Vercel, or GitHub Pages.

## Editing Content

- **Posts:** Each article lives in `/blog/slug.html`. Copy an existing file, update the `<title>`, meta description, hero placeholder label, and body copy. Ensure breadcrumbs, internal links, and related posts are refreshed.
- **Categories:** Update `/categories/*.html` to adjust intros or add/remove post cards.
- **Search Index:** Add an entry to `/data/search-index.json` whenever you create a new article. Include `title`, `url`, `category`, `tags`, `excerpt`, and `keywords`.
- **Sitemap:** Append the new URL to `/static/sitemap.xml` so search engines find it quickly.
- **Contact Flow:** The Netlify form posts to `/thank-you.html`. Update that page if the confirmation message changes.

## Images

- Drop final artwork into `/assets/images/` with the filenames listed in `images-needed.txt`.
- Keep hero images around 1600×900 (16:9). Inline diagrams can be 1200×800 (3:2) or accessible SVGs.
- Update `alt` descriptions in posts after assets are ready.

## Accessibility Checklist

- All interactive elements are keyboard reachable and include focus states.
- Skip link jumps directly to `#main-content`.
- Color contrast follows WCAG AA for text and interactive components.

## SEO Checklist

- Unique `<title>` + `<meta name="description">` on every page.
- JSON-LD for Organization, WebSite, BreadcrumbList, and BlogPosting.
- Internal links connect posts within each category and across related categories.
- `static/sitemap.xml` and `static/robots.txt` are ready for search engine submission.

## Deployment

- **Netlify:** Drag-and-drop the folder in the dashboard or connect the Git repo. Ensure `static/` contents deploy to root (Netlify copies them automatically).
- **GitHub Pages:** Push to a repository and enable Pages from the `main` branch. All links are root-relative.
- **Custom Domains:** Update canonical URLs in each page’s `<head>` if you host on a different domain.

