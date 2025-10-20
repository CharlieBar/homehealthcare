(function () {
  const root = document.documentElement;
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.getElementById('primary-nav');
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const scrollTopBtn = document.querySelector('[data-scroll-top]');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  const setTheme = (theme) => {
    root.dataset.theme = theme;
    localStorage.setItem('site-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', theme === 'light' ? 'false' : 'true');
    }
  };

  const initTheme = () => {
    const stored = localStorage.getItem('site-theme');
    if (stored) {
      setTheme(stored);
    } else {
      setTheme(prefersDark.matches ? 'dark' : 'light');
    }
  };

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.dataset.theme === 'dark' ? 'light' : 'dark';
      setTheme(current);
    });
  }

  prefersDark.addEventListener('change', (event) => {
    if (!localStorage.getItem('site-theme')) {
      setTheme(event.matches ? 'dark' : 'light');
    }
  });

  if (navToggle && nav) {
    const focusableSelectors = 'a[href], button:not([disabled])';
    const trapFocus = (event) => {
      if (!nav.classList.contains('is-open')) return;
      const focusable = nav.querySelectorAll(focusableSelectors);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
      if (event.key === 'Escape') {
        closeNav();
      }
    };

    const openNav = () => {
      nav.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
      nav.addEventListener('keydown', trapFocus);
      const firstLink = nav.querySelector('a');
      if (firstLink) firstLink.focus();
      document.body.classList.add('no-scroll');
    };

    const closeNav = () => {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      nav.removeEventListener('keydown', trapFocus);
      navToggle.focus();
      document.body.classList.remove('no-scroll');
    };

    navToggle.addEventListener('click', () => {
      if (nav.classList.contains('is-open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    nav.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
        closeNav();
      }
    });
  }

  if (scrollTopBtn) {
    scrollTopBtn.hidden = true;
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        scrollTopBtn.hidden = false;
      } else {
        scrollTopBtn.hidden = true;
      }
    };
    document.addEventListener('scroll', toggleVisibility, { passive: true });
    scrollTopBtn.addEventListener('click', () => {
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      window.scrollTo({ top: 0, behavior });
    });
  }

  const toc = document.querySelector('[data-toc]');
  if (toc) {
    const links = toc.querySelectorAll('a[href^="#"]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((link) => link.classList.remove('is-active'));
            const active = toc.querySelector(`a[href="#${entry.target.id}"]`);
            if (active) active.classList.add('is-active');
          }
        });
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    );

    links.forEach((link) => {
      const id = link.getAttribute('href').slice(1);
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    });
  }

  initTheme();
})();
