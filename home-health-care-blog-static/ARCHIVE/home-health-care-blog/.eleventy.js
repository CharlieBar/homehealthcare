import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginSitemap from "@11ty/eleventy-plugin-sitemap";
import pluginNavigation from "@11ty/eleventy-navigation";
import markdownIt from "markdown-it";
import { DateTime } from "luxon";

const siteUrl = "https://example.com";

const slugifyString = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginSitemap, {
    sitemap: {
      hostname: siteUrl,
    },
  });

  eleventyConfig.addFilter("readableDate", (dateObj) =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("MMMM d, yyyy")
  );

  eleventyConfig.addFilter("isoDate", (dateObj) =>
    DateTime.fromJSDate(dateObj, { zone: "utc" }).toISODate()
  );

  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));

  eleventyConfig.addFilter("intersect", (a = [], b = []) => a.filter((item) => b.includes(item)));

  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi
      .getFilteredByGlob("./src/posts/**/*.md")
      .sort((a, b) => (a.date > b.date ? -1 : 1))
  );

  eleventyConfig.addCollection("byCategory", (collectionApi) => {
    const posts = collectionApi.getFilteredByGlob("./src/posts/**/*.md");
    const categories = {};
    posts.forEach((post) => {
      const category = post.data.category || "uncategorized";
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(post);
    });
    Object.keys(categories).forEach((cat) => {
      categories[cat].sort((a, b) => (a.date > b.date ? -1 : 1));
    });
    return categories;
  });

  eleventyConfig.addCollection("tagsList", function (collectionApi) {
    const posts = collectionApi.getFilteredByGlob("./src/posts/**/*.md");
    const tagSet = new Set();
    posts.forEach((item) => {
      (item.data.tags || []).forEach((tag) => {
        if (tag !== "posts") {
          tagSet.add(tag);
        }
      });
    });
    return [...tagSet].sort();
  });

  eleventyConfig.addCollection("tagPages", (collectionApi) => {
    const posts = collectionApi.getFilteredByGlob("./src/posts/**/*.md");
    const tagMap = new Map();
    posts.forEach((post) => {
      (post.data.tags || []).forEach((tag) => {
        if (tag === 'posts') return;
        if (!tagMap.has(tag)) tagMap.set(tag, []);
        tagMap.get(tag).push(post);
      });
    });
    const pages = [];
    tagMap.forEach((tagPosts, tag) => {
      tagPosts.sort((a, b) => (a.date > b.date ? -1 : 1));
      const chunkSize = 10;
      const totalPages = Math.ceil(tagPosts.length / chunkSize) || 1;
      for (let page = 0; page < totalPages; page += 1) {
        const start = page * chunkSize;
        pages.push({
          tag,
          slug: slugifyString(tag),
          pageNumber: page,
          totalPages,
          posts: tagPosts.slice(start, start + chunkSize),
        });
      }
    });
    return pages;
  });
  eleventyConfig.addTransform("linkShortcode", function (content) {
    if (!content) return content;
    const posts = this.ctx?.collections?.posts || [];
    return content.replace(/\[\[([a-z0-9-]+)\]\]/gi, (match, slug) => {
      const target = posts.find(
        (post) => post.data.slug === slug || post.fileSlug === slug
      );
      if (target) {
        const title = target.data.title || target.fileSlug;
        return `<a href="${target.url}">${title}</a>`;
      }
      return match;
    });
  });

  const mdLib = markdownIt({ html: true, linkify: true, typographer: true });
  mdLib.core.ruler.push('heading_ids', (state) => {
    state.tokens.forEach((token, idx) => {
      if (token.type === 'heading_open') {
        const next = state.tokens[idx + 1];
        const text = next && next.children ? next.children.map((child) => child.content).join('') : (next ? next.content : '');
        if (text) {
          token.attrSet('id', slugifyString(text));
        }
      }
    });
  });
  eleventyConfig.setLibrary('md', mdLib);

  eleventyConfig.addShortcode("year", () => new Date().getFullYear());
  eleventyConfig.addShortcode("slugify", slugifyString);

  eleventyConfig.addPassthroughCopy({ "static": "." });
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "node_modules/lunr/lunr.js": "assets/js/vendor/lunr.js" });

  eleventyConfig.setServerOptions({
    port: 8080,
    showVersion: true,
    domDiff: false,
  });

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_alias: "excerpt",
    excerpt_separator: "<!--more-->",
  });

  eleventyConfig.addGlobalData("siteUrl", siteUrl);

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware("/health", (_, res) => {
          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end("ok");
        });
      },
    },
  });

  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
  });

  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: false,
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    templateFormats: ["njk", "md", "11ty.js"],
  };
}
