(async () => {
  const base = document.currentScript
    ? new URL('.', document.currentScript.src).href.replace(/js\/$/, '')
    : '';

  async function inject(id, file) {
    const el = document.getElementById(id);
    if (!el) return;
    const res = await fetch(base + 'includes/' + file);
    el.innerHTML = await res.text();
  }

  await Promise.all([
    inject('site-header', 'header.html'),
    inject('site-footer', 'footer.html'),
  ]);

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Hamburger menu
  const toggle = document.getElementById('navToggle');
  const nav    = document.getElementById('siteNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );

    // Highlight active nav link
    const current = window.location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('a').forEach(a => {
      if (a.getAttribute('href') === current) a.classList.add('active');
    });
  }
})();
