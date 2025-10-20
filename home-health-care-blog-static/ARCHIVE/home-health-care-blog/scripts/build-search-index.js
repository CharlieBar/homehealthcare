import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import lunr from 'lunr';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const planPath = path.join(rootDir, 'content-plan', 'posts.json');
const postsDir = path.join(rootDir, 'src', 'posts');
const outputPath = path.join(rootDir, 'search-index.json');

const getExcerpt = (body) => {
  const clean = body
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{%.+?%\}/g, ' ')
    .replace(/\{\{.+?\}\}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return clean.split('. ').slice(0, 2).join('. ');
};

const loadBody = async (slug) => {
  const filePath = path.join(postsDir, `${slug}.md`);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    const parts = raw.split('\n---\n');
    if (parts.length > 1) {
      return parts.slice(1).join('\n---\n');
    }
    return raw;
  } catch (error) {
    return '';
  }
};

const run = async () => {
  const planRaw = await fs.readFile(planPath, 'utf-8');
  const posts = JSON.parse(planRaw);
  const documents = [];

  for (const post of posts) {
    const body = await loadBody(post.slug);
    const excerpt = getExcerpt(body);
    documents.push({
      url: `/blog/${post.slug}/`,
      title: post.title,
      excerpt,
      category: post.category,
      tags: (post.tags || []).join(' '),
      keywords: [post.targetKeyword, ...(post.secondaryKeywords || [])].join(' ')
    });
  }

  const index = lunr(function () {
    this.ref('url');
    this.field('title');
    this.field('excerpt');
    this.field('category');
    this.field('tags');
    this.field('keywords');

    documents.forEach((doc) => this.add(doc));
  });

  const payload = {
    documents,
    index: index.toJSON()
  };

  await fs.writeFile(outputPath, JSON.stringify(payload, null, 2), 'utf-8');
};

run().catch((error) => {
  console.error('Error building search index:', error);
  process.exitCode = 1;
});
