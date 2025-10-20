const form = document.querySelector('[data-search-form]');
const input = document.querySelector('[data-search-input]');
const resultsContainer = document.querySelector('[data-search-results]');
let index;
let documents = [];

const renderResults = (items) => {
  resultsContainer.innerHTML = '';
  if (!items.length) {
    resultsContainer.innerHTML = '<p>No results yet. Try another keyword like "skilled nursing" or "Medicare".</p>';
    return;
  }
  const list = document.createElement('ul');
  list.className = 'search-results';
  items.forEach((item) => {
    const doc = documents.find((docItem) => docItem.url === item.ref);
    if (!doc) return;
    const li = document.createElement('li');
    li.innerHTML = `<a href="${doc.url}"><strong>${doc.title}</strong></a><p>${doc.excerpt}</p>`;
    list.appendChild(li);
  });
  resultsContainer.appendChild(list);
};

const loadIndex = async () => {
  const response = await fetch('/search-index.json');
  const payload = await response.json();
  documents = payload.documents;
  index = window.lunr.Index.load(payload.index);
};

const handleSearch = async (event) => {
  event.preventDefault();
  const query = input.value.trim();
  if (!query) {
    renderResults([]);
    return;
  }
  if (!index) {
    await loadIndex();
  }
  const matches = index.search(query);
  renderResults(matches);
};

if (form && input && resultsContainer) {
  form.addEventListener('submit', handleSearch);
}
