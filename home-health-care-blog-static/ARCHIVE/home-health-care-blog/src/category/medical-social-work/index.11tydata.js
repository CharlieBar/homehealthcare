export default {
  layout: 'layouts/category.njk',
  pagination: {
    data: 'collections.posts',
    size: 10,
    alias: 'posts',
    before: (items) => items.filter((item) => item.data.category === 'Medical Social Work')
  },
  eleventyComputed: {
    title: () => 'Medical Social Work',
    description: () => 'Medical social workers organize services, lead tough talks, and connect you with financial and emotional support.'
  },
  permalink: (data) => {
    const pageNumber = data.pagination.pageNumber;
    if (pageNumber === 0) return '/category/medical-social-work/';
    return `/category/medical-social-work/page/${pageNumber + 1}/`;
  }
};
