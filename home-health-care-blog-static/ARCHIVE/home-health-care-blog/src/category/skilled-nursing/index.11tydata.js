export default {
  layout: 'layouts/category.njk',
  pagination: {
    data: 'collections.posts',
    size: 10,
    alias: 'posts',
    before: (items) => items.filter((item) => item.data.category === 'Skilled Nursing')
  },
  eleventyComputed: {
    title: () => 'Skilled Nursing',
    description: () => 'Skilled nursing care keeps healing on track at home with regular assessments, medication support, and hands-on procedures.'
  },
  permalink: (data) => {
    const pageNumber = data.pagination.pageNumber;
    if (pageNumber === 0) return '/category/skilled-nursing/';
    return `/category/skilled-nursing/page/${pageNumber + 1}/`;
  }
};
