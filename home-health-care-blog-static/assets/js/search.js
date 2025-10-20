(function () {
  const input = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');
  if (!input || !resultsContainer) return;

  let index = [];
  let debounceTimer = null;

  fetch('/data/search-index.json')
    .then((response) => response.json())
    .then((data) => {
      index = Array.isArray(data) ? data : [];
    })
    .catch(() => {
      resultsContainer.innerHTML = '<p class="search-result__meta">Search is temporarily unavailable.</p>';
    });

  function highlight(text, query) {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'ig');
    return text.replace(regex, '<mark>$1</mark>');
  }

  const emptyMessage = '<p class="search-result__meta">Type at least two characters to search.</p>';

  function renderResults(items, query) {
    if (!items.length) {
      resultsContainer.innerHTML = '<p class="search-result__meta">No matches yet. Try another keyword.</p>';
      return;
    }
    const markup = items
      .map((item) => {
        const excerpt = highlight(item.excerpt, query);
        const title = highlight(item.title, query);
        return `
          <article class="search-result" role="listitem">
            <h3><a href="${item.url}">${title}</a></h3>
            <p class="search-result__meta">${item.category} • ${item.tags.slice(0, 3).join(', ')}</p>
            <p>${excerpt}</p>
          </article>
        `;
      })
      .join('');
    resultsContainer.innerHTML = markup;
  }

  function search(query) {
    if (!query || query.trim().length < 2) {
      resultsContainer.innerHTML = emptyMessage;
      return;
    }
    const lower = query.toLowerCase();
    const results = index
      .map((item) => {
        const haystack = [item.title, item.excerpt, ...(item.keywords || []), ...(item.tags || [])]
          .join(' ')
          .toLowerCase();
        const score = item.title.toLowerCase().includes(lower)
          ? 3
          : haystack.includes(lower)
          ? 1
          : 0;
        return { item, score };
      })
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score);

    renderResults(results.map((entry) => entry.item), query);
  }

  input.addEventListener('input', (event) => {
    const value = event.target.value;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => search(value), 160);
  });

  window.addEventListener('hhc-search-reset', () => {
    input.value = '';
    resultsContainer.innerHTML = emptyMessage;
  });

  resultsContainer.innerHTML = emptyMessage;
})();
