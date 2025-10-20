export default {
  layout: 'layouts/category.njk',
  pagination: {
    data: 'collections.posts',
    size: 10,
    alias: 'posts',
    before: (items) => items.filter((item) => item.data.category === 'Occupational Therapy')
  },
  eleventyComputed: {
    title: () => 'Occupational Therapy',
    description: () => 'Occupational therapists rework daily routines with safer setups, smart tools, and caregiver coaching.'
  },
  permalink: (data) => {
    const pageNumber = data.pagination.pageNumber;
    if (pageNumber === 0) return '/category/occupational-therapy/';
    return `/category/occupational-therapy/page/${pageNumber + 1}/`;
  }
};
