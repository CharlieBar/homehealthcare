# Home Health Care Services Blog

A production-ready, SEO-optimized Eleventy site highlighting home health care services. Designed for Netlify deployment with a dark, accessible UI and strong internal linking to support topical authority.

## Features
- Eleventy static site generator with paginated latest articles feed
- Content plan-driven markdown generation (40+ article stubs)
- Lunr.js client-side search with pre-built index
- Accessible navigation, dark theme, and responsive layout
- Structured data (Organization, Website, Breadcrumb, BlogPosting)
- Netlify-ready deployment with security headers and forms support

## Quick Start
```bash
npm install
npm run generate   # create Markdown stubs from the content plan
npm run dev        # start Eleventy with live reload
npm run build      # build search index + Eleventy production build
```

> **Note:** Package installation requires internet access. If running in an offline environment, install dependencies when connectivity is available.

## Project Structure
```
home-health-care-blog/
├─ package.json
├─ netlify.toml
├─ .eleventy.js
├─ scripts/
│  ├─ generate-from-plan.js
│  └─ build-search-index.js
├─ content-plan/posts.json
├─ src/
│  ├─ _data/
│  ├─ _includes/
│  ├─ assets/
│  ├─ images/
│  ├─ posts/
│  └─ pages/
├─ static/
└─ images-needed.txt
```

## Editing Workflow
1. Update `content-plan/posts.json` with new topics, keywords, and internal linking targets.
2. Run `npm run generate` to scaffold new Markdown posts.
3. Fill in content within `src/posts/*.md`, ensuring at least 900 words, plain-language explanations, and three internal links using the `[[slug]]` shortcode.
4. Drop optimized images (webp preferred) into `src/images/` using filenames listed in `images-needed.txt`.
5. Run `npm run build` before deploying to regenerate the search index and production site.

## Image Guidelines
- Reference filenames exactly as listed in `images-needed.txt`.
- Provide hero images at 1600x900 (or similar 16:9) and inline graphics at 1200px width when possible.
- Use descriptive alt text focusing on patient-friendly language.

## Content & SEO Guardrails
- Keep reading level at or below 5th grade; avoid jargon without explanation.
- Include a "Key Takeaways" section near the top of every article.
- Link to pillar pages and related posts using `[[slug]]` syntax for automatic title + URL resolution.
- Ensure metadata fields (`title`, `description`, `tags`, `category`, `targetKeyword`) are accurate for search intent.

## Deployment
1. Commit changes and push to GitHub.
2. Connect the repository to Netlify.
3. Netlify will use `npm run build` and publish the `_site` directory.
4. Enable Netlify Forms for the `/contact/` page to capture inquiries.

## Accessibility Checklist
- Test keyboard navigation and focus states.
- Confirm color contrast using WCAG AA minimums.
- Provide descriptive aria labels on interactive controls (menu, search, accordions).

## Testing
- `npm run dev` for local smoke testing.
- `npm run build` for production output and search index validation.

## License
MIT License.
