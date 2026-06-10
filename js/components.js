/* TravelNest — Navbar + Footer components (redesigned) */

function renderNavbar() {
  const current = location.pathname.split('/').pop() || 'index.html';
  const links = [
    ['index.html','Home'],
    ['destinations.html','Destinations'],
    ['budget.html','Budget'],
    ['generator.html','Generator'],
    ['mood.html','Mood'],
    ['feedback.html','Feedback']
  ];

  const linkHtml = links.map(([href, label]) =>
    `<a href="${href}" class="${current === href ? 'active' : ''}">${label}</a>`
  ).join('');

  const mobileHtml = links.map(([href, label]) =>
    `<a href="${href}" class="${current === href ? 'active' : ''}">${label}</a>`
  ).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <nav class="navbar">
      <a href="index.html" class="navbar-logo">Travel<em>Nest</em></a>
      <div class="navbar-links">${linkHtml}</div>
      <div class="navbar-end">Your travel companion</div>
      <button class="hamburger" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="mobile-menu">${mobileHtml}</div>
  `);
}

function renderFooter() {
  document.body.insertAdjacentHTML('beforeend', `
    <footer>
      <div class="footer-top">
        <div>
          <div class="footer-brand-name">Travel<em>Nest</em></div>
          <p style="font-size:0.88rem;max-width:280px;">A travel planning companion. Explore destinations, plan budgets, and track your dream trips.</p>
        </div>
        <div>
          <h4>Pages</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="destinations.html">Destinations</a></li>
            <li><a href="budget.html">Budget Planner</a></li>
            <li><a href="generator.html">Trip Generator</a></li>
            <li><a href="mood.html">Travel Mood</a></li>
            <li><a href="feedback.html">Feedback</a></li>
          </ul>
        </div>
        <div>
          <h4>Newsletter</h4>
          <p style="font-size:0.83rem;">Travel inspiration, delivered to your inbox.</p>
          <form class="newsletter-form" novalidate>
            <input type="email" placeholder="your@email.com" required>
            <button type="submit">Go</button>
          </form>
          <p id="nl-msg" style="font-size:0.78rem;color:#e86060;margin-top:6px;"></p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 TravelNest — Built with HTML, CSS & JavaScript</p>
        <p>Images: Unsplash · Hosted on GitHub Pages</p>
      </div>
    </footer>
  `);
}

// Shared init
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  renderFooter();
  initHamburger();
  initNewsletter();
  initNavbar();
});
