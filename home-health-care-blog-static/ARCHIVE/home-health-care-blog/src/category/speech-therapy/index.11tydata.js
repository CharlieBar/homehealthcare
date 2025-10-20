export default {
  layout: 'layouts/category.njk',
  pagination: {
    data: 'collections.posts',
    size: 10,
    alias: 'posts',
    before: (items) => items.filter((item) => item.data.category === 'Speech Therapy')
  },
  eleventyComputed: {
    title: () => 'Speech Therapy',
    description: () => 'Speech therapists guide families through clear, friendly exercises for voice, swallowing, and thinking skills.'
  },
  permalink: (data) => {
    const pageNumber = data.pagination.pageNumber;
    if (pageNumber === 0) return '/category/speech-therapy/';
    return `/category/speech-therapy/page/${pageNumber + 1}/`;
  }
};
