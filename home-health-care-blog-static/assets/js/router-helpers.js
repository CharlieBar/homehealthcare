(function () {
  const helpers = {
    setActiveNav() {
      const header = document.querySelector('.site-header');
      if (!header) return;
      const activePath = header.getAttribute('data-active-path');
      if (!activePath) return;
      header.querySelectorAll('.site-header__nav-list a').forEach((link) => {
        if (link.getAttribute('href') === activePath) {
          link.classList.add('is-active');
        }
      });
    },
    trapFocus(container) {
      if (!container) return () => {};
      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])'
      ];
      const nodes = Array.from(container.querySelectorAll(focusableSelectors.join(',')));
      if (!nodes.length) return () => {};
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      function handle(e) {
        if (e.key !== 'Tab') return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      container.addEventListener('keydown', handle);
      return () => container.removeEventListener('keydown', handle);
    }
  };
  window.RouterHelpers = helpers;
})();
