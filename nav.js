/* Injects the shared site header + navbar into any element with id="site-nav" */
(function() {
  const current = location.pathname.split('/').pop() || 'index.html';

  /* Detect if we're one level deep inside board/, committees/, or events/ */
  const parts = location.pathname.split('/').filter(Boolean);
  const folder = parts.length >= 2 ? parts[parts.length - 2] : '';
  const inSub  = ['board', 'committees', 'events'].includes(folder);
  const base   = inSub ? '../' : '';
  const logoPath = `${base}assets/images/9f980d_6731e58e32eb4afbbd296f6eef0d83a1~mv2.png`;
  const faviconPath = `${base}assets/images/favicon.png`;

  function setIcon(rel) {
    let icon = document.querySelector(`link[rel="${rel}"]`);
    if (!icon) {
      icon = document.createElement('link');
      icon.rel = rel;
      document.head.appendChild(icon);
    }
    icon.type = 'image/png';
    icon.sizes = '512x512';
    icon.href = faviconPath;
  }

  setIcon('icon');
  setIcon('apple-touch-icon');

  function active(href) { return current === href ? ' class="active"' : ''; }

  const html = `
  <header class="site-header">
    <img src="${logoPath}"
         alt="TMS Logo" class="site-header-logo" />
    <span class="site-header-title">TAMS Medical Society</span>
  </header>
  <nav class="navbar">
    <div class="navbar-inner nav-links-wrap" id="navLinksWrap">
      <div class="nav-item"><a href="${base}index.html"${active('index.html')}>Home</a></div>
      <div class="nav-item">
        <a href="${base}board.html"${active('board.html')}>The Board</a>
        <div class="dropdown-menu">
          <a href="${base}board/board-president.html">President</a>
          <a href="${base}board/board-vp.html">Vice President</a>
          <a href="${base}board/board-secretary.html">Secretary</a>
          <a href="${base}board/board-social.html">Social Coordinator</a>
          <a href="${base}board/board-treasurer.html">Treasurer</a>
        </div>
      </div>
      <div class="nav-item">
        <a href="${base}events.html"${active('events.html')}>Events</a>
        <div class="dropdown-menu">
          <a href="${base}events/event-carnival.html">Committee Carnival</a>
          <a href="${base}events/event-dwd.html">Dinner With Doctors</a>
          <a href="${base}events/event-atc.html">Aid The Cause</a>
          <a href="${base}events/event-stethoscope.html">Stethoscope Launch Party</a>
          <a href="${base}events/event-shear.html">Shear Kindness</a>
          <a href="${base}events/event-spring.html">Spring Fling</a>
        </div>
      </div>
      <div class="nav-item">
        <a href="${base}committees.html"${active('committees.html')}>Committees</a>
        <div class="dropdown-menu">
          <a href="${base}committees/committee-shadows.html">TMS Shadows</a>
          <a href="${base}committees/committee-wim.html">Women in Medicine</a>
          <a href="${base}committees/committee-alzheimers.html">TAMS Alzheimer's Care</a>
          <a href="${base}committees/committee-neuroscience.html">TAMS Neuroscience Society</a>
          <a href="${base}committees/committee-dnh.html">Denton Nursing Home</a>
          <a href="${base}committees/committee-outreach.html">Outreach</a>
          <a href="${base}committees/committee-nightingale.html">Nightingale</a>
          <a href="${base}committees/committee-stethoscope.html">Stethoscope Committee</a>
          <a href="${base}committees/committee-redcross.html">Red Cross</a>
          <a href="${base}committees/committee-biomedical.html">TAMS Biomedical Engineering</a>
          <a href="${base}committees/committee-best-of-texas.html">Best of Texas</a>
          <a href="${base}committees/committee-healing-music.html">Healing With Music</a>
        </div>
      </div>
      <div class="nav-item"><a href="${base}stethoscope.html"${active('stethoscope.html')}>Stethoscope Journal</a></div>
      <div class="nav-item">
        <a href="${base}info.html"${active('info.html')}>Info</a>
        <div class="dropdown-menu">
          <a href="${base}faqs.html">FAQs</a>
          <a href="${base}calendar.html">Calendar</a>
          <a href="${base}contact.html">Contact Us</a>
        </div>
      </div>
    </div>
    <button class="nav-toggle" id="navToggle" aria-label="Toggle navigation">
      <span></span><span></span><span></span>
    </button>
  </nav>`;

  const target = document.getElementById('site-nav');
  if (target) target.innerHTML = html;
})();
