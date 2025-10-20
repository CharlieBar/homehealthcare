(function () {
  const body = document.body;
  const header = document.querySelector('.site-header');
  const navToggle = header ? header.querySelector('.site-header__nav-toggle') : null;
  const navList = header ? header.querySelector('.site-header__nav-list') : null;
  const categoryToggle = header ? header.querySelector('.site-header__categories > button') : null;
  const searchModal = document.getElementById('search-modal');
  const searchOpeners = document.querySelectorAll('[data-open-search]');
  const searchClosers = document.querySelectorAll('[data-close-search]');
  const scrollTopBtn = document.querySelector('[data-scroll-top]');

  const THEME_KEY = 'hhc-theme';
  let lastFocusedElement = null;

  function toggleNav() {
    if (!navList) return;
    const isOpen = navList.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      navList.querySelector('a, button')?.focus();
    }
  }

  function closeNav() {
    if (!navList) return;
    navList.classList.remove('is-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }

  navToggle?.addEventListener('click', toggleNav);
  navList?.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      closeNav();
    }
  });

  window.addEventListener('click', (event) => {
    if (!navList || !navToggle) return;
    if (!navList.contains(event.target) && !navToggle.contains(event.target)) {
      closeNav();
    }
  });

  categoryToggle?.addEventListener('click', () => {
    const expanded = categoryToggle.getAttribute('aria-expanded') === 'true';
    categoryToggle.setAttribute('aria-expanded', String(!expanded));
  });

  function applyTheme(theme) {
    body.classList.toggle('theme-light', theme === 'light');
    localStorage.setItem(THEME_KEY, theme);
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    applyTheme(savedTheme);
  }

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const newTheme = body.classList.contains('theme-light') ? 'dark' : 'light';
      applyTheme(newTheme);
      btn.setAttribute('aria-pressed', newTheme === 'light');
    });
  });

  function openSearch() {
    if (!searchModal) return;
    lastFocusedElement = document.activeElement;
    searchModal.classList.add('is-visible');
    searchModal.setAttribute('aria-hidden', 'false');
    const release = window.RouterHelpers?.trapFocus(searchModal);
    if (release) {
      searchModal._releaseTrap = release;
    }
    const input = searchModal.querySelector('#search-input');
    requestAnimationFrame(() => input?.focus());
  }

  function closeSearch() {
    if (!searchModal || !searchModal.classList.contains('is-visible')) return;
    searchModal.classList.remove('is-visible');
    searchModal.setAttribute('aria-hidden', 'true');
    if (typeof searchModal._releaseTrap === 'function') {
      searchModal._releaseTrap();
      searchModal._releaseTrap = null;
    }
    window.dispatchEvent(new CustomEvent('hhc-search-reset'));
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  searchOpeners.forEach((btn) => btn.addEventListener('click', openSearch));
  searchClosers.forEach((btn) => btn.addEventListener('click', closeSearch));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeSearch();
      closeNav();
    }
  });

  searchModal?.addEventListener('click', (event) => {
    if (event.target.dataset.closeSearch !== undefined || event.target === searchModal) {
      closeSearch();
    }
  });

  function handleScroll() {
    if (!scrollTopBtn) return;
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('is-visible');
      scrollTopBtn.setAttribute('aria-hidden', 'false');
    } else {
      scrollTopBtn.classList.remove('is-visible');
      scrollTopBtn.setAttribute('aria-hidden', 'true');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function initToc() {
    const toc = document.querySelector('.toc');
    if (!toc) return;
    const links = Array.from(toc.querySelectorAll('a[href^="#"]'));
    if (!links.length) return;
    const sections = links
      .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
      .filter(Boolean);

    function updateActive() {
      const offset = window.scrollY + 200;
      let activeId = null;
      sections.forEach((section) => {
        if (section.offsetTop <= offset) {
          activeId = section.id;
        }
      });
      links.forEach((link) => {
        if (link.getAttribute('href').slice(1) === activeId) {
          link.classList.add('is-active');
        } else {
          link.classList.remove('is-active');
        }
      });
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
  }

  initToc();
  window.RouterHelpers?.setActiveNav();
})();
