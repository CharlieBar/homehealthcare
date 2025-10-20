export default {
  layout: 'layouts/category.njk',
  pagination: {
    data: 'collections.posts',
    size: 10,
    alias: 'posts',
    before: (items) => items.filter((item) => item.data.category === 'Care Planning & Medicare')
  },
  eleventyComputed: {
    title: () => 'Care Planning & Medicare',
    description: () => 'Understand Medicare rules, paperwork, and scheduling so services start fast and stay active.'
  },
  permalink: (data) => {
    const pageNumber = data.pagination.pageNumber;
    if (pageNumber === 0) return '/category/care-planning-medicare/';
    return `/category/care-planning-medicare/page/${pageNumber + 1}/`;
  }
};
