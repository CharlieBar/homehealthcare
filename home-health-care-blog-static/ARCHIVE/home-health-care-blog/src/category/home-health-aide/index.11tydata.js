export default {
  layout: 'layouts/category.njk',
  pagination: {
    data: 'collections.posts',
    size: 10,
    alias: 'posts',
    before: (items) => items.filter((item) => item.data.category === 'Home Health Aide')
  },
  eleventyComputed: {
    title: () => 'Home Health Aide',
    description: () => 'Home health aides bring calm, respectful support for personal care and daily routines.'
  },
  permalink: (data) => {
    const pageNumber = data.pagination.pageNumber;
    if (pageNumber === 0) return '/category/home-health-aide/';
    return `/category/home-health-aide/page/${pageNumber + 1}/`;
  }
};
