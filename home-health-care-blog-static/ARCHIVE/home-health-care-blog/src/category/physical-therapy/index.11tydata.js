export default {
  layout: 'layouts/category.njk',
  pagination: {
    data: 'collections.posts',
    size: 10,
    alias: 'posts',
    before: (items) => items.filter((item) => item.data.category === 'Physical Therapy')
  },
  eleventyComputed: {
    title: () => 'Physical Therapy',
    description: () => 'Our physical therapists rebuild strength and balance with simple routines that fit any living room.'
  },
  permalink: (data) => {
    const pageNumber = data.pagination.pageNumber;
    if (pageNumber === 0) return '/category/physical-therapy/';
    return `/category/physical-therapy/page/${pageNumber + 1}/`;
  }
};
