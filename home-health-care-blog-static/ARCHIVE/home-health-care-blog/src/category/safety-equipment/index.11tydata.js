export default {
  layout: 'layouts/category.njk',
  pagination: {
    data: 'collections.posts',
    size: 10,
    alias: 'posts',
    before: (items) => items.filter((item) => item.data.category === 'Safety & Equipment')
  },
  eleventyComputed: {
    title: () => 'Safety & Equipment',
    description: () => 'Safety experts share equipment checklists and home modifications to prevent falls and protect skin.'
  },
  permalink: (data) => {
    const pageNumber = data.pagination.pageNumber;
    if (pageNumber === 0) return '/category/safety-equipment/';
    return `/category/safety-equipment/page/${pageNumber + 1}/`;
  }
};
