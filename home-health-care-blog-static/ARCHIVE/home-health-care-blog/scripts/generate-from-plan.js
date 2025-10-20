import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const planPath = path.join(rootDir, 'content-plan', 'posts.json');
const postsDir = path.join(rootDir, 'src', 'posts');
const imagesManifestPath = path.join(rootDir, 'images-needed.txt');

const baseDate = new Date('2024-01-01T08:00:00.000Z');

const loadPlan = async () => {
  const raw = await fs.readFile(planPath, 'utf-8');
  return JSON.parse(raw);
};

const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true });
};

const buildFrontMatter = (post, index) => {
  const date = new Date(baseDate.getTime() + index * 86400000);
  const fm = {
    layout: 'post',
    title: post.title,
    description: post.metaDescription,
    tags: ['posts', ...(post.tags || [])],
    category: post.category,
    targetKeyword: post.targetKeyword,
    secondaryKeywords: post.secondaryKeywords || [],
    author: post.author || 'Staff Clinician',
    readingGoal: post.readingGoal || '8-10 min',
    date: date.toISOString(),
    updated: date.toISOString(),
    heroImage: post.heroImage,
    inlineImages: post.inlineImages || [],
    status: post.status || 'draft',
    slug: post.slug,
    clinicianReview: 'Pending clinical review for accuracy and clarity.'
  };
  const yaml = ['---'];
  for (const [key, value] of Object.entries(fm)) {
    if (Array.isArray(value)) {
      yaml.push(`${key}:`);
      value.forEach((item) => {
        yaml.push(`  - ${item}`);
      });
    } else {
      yaml.push(`${key}: ${value}`);
    }
  }
  yaml.push('permalink: /blog/{{ page.fileSlug }}/');
  yaml.push('---');
  return yaml.join('\n');
};

const buildBody = (post) => {
  const introLinks = (post.linksTo || []).slice(0, 3).map((slug) => `[[${slug}]]`).join(', ');
  return `Get to know what ${post.targetKeyword} really means with your home health team at your side. This outline keeps the language easy and action-focused so families feel ready.\n\n<!--more-->\n\n{% include "partials/toc.njk" %}\n\n> **Key Takeaways**\n> - Update this section with three short bullet points in plain language.\n> - Mention safety steps, who helps, and how progress is tracked.\n> - Include when to call the care team for extra help.\n\n## Why this topic matters\nExplain the biggest worry families have about ${post.targetKeyword} and offer one quick win. Mention related guides like ${introLinks}.\n\n## Services your care team provides\nList the core services, visits, and clinical skills that support this topic. Keep sentences short and friendly.\n\n## How to prepare the home\nShare setup ideas, equipment needs, and ways to make the environment calmer and safer.\n\n## Caregiver checklist\nUse a short list of tasks caregivers can complete each day. Mention how to document changes for the nurse or therapist.\n\n<div class="cta-panel" role="complementary" aria-label="Free in-home assessment">
  <h2>Request a Free In-Home Assessment</h2>
  <p>Our intake nurse will review needs, coordinate with your doctor, and build a personalized plan of care.</p>
  <p><a class="button" href="/contact/">Schedule your visit</a></p>
</div>
\n## Progress checkpoints\nDescribe how the team measures progress each week and what to do if goals stall. Reinforce communication with the care coordinator.\n\n## When to ask for extra help\nList red flags, who to contact first, and how after-hours support works. Include a reminder to call 911 for emergencies.\n\n## Frequently Asked Questions\n<details>
  <summary>How often will the clinician visit?</summary>
  <p>Give a ballpark visit frequency and note that the care plan may change based on progress.</p>
</details>
<details>
  <summary>What supplies should we keep stocked?</summary>
  <p>List a few common items and explain how to request more through the agency or insurance.</p>
</details>
<details>
  <summary>Who can I contact after hours?</summary>
  <p>Explain the on-call nurse or therapist process and set expectations for emergency care.</p>
</details>\n\n{% include "partials/share-buttons.njk" %}\n{% include "partials/related-posts.njk" %}\n`;
};

const generatePosts = async () => {
  await ensureDir(postsDir);
  const posts = await loadPlan();
  const manifestLines = [
    '# Image Manifest',
    '',
    '## Site Assets',
    'logo.svg — 320x80 — Alt: Wordmark for Home Health Care Services Blog',
    'social-share-default.jpg — 1200x630 — Alt: Family smiling with home health nurse',
    'favicon.ico — 32x32 — Alt: Dark background with caring hands icon',
    'icon-192.png — 192x192 — Alt: App icon featuring heart and home',
    'icon-512.png — 512x512 — Alt: Large app icon featuring heart and home',
    ''
  ];

  for (const [index, post] of posts.entries()) {
    const filePath = path.join(postsDir, `${post.slug}.md`);
    const frontMatter = buildFrontMatter(post, index);
    const body = buildBody(post);
    await fs.writeFile(filePath, `${frontMatter}\n${body}\n`, 'utf-8');

    manifestLines.push(`## ${post.title} (${post.slug})`);
    manifestLines.push(`${post.heroImage} — 1600x900 — Alt: Clinician supporting family during ${post.targetKeyword}.`);
    for (const image of post.inlineImages || []) {
      manifestLines.push(`${image} — 1200x800 — Alt: Visual aid for ${post.targetKeyword}.`);
    }
    manifestLines.push('');
  }

  await fs.writeFile(imagesManifestPath, manifestLines.join('\n'), 'utf-8');
};

generatePosts().catch((error) => {
  console.error('Error generating posts:', error);
  process.exitCode = 1;
});
