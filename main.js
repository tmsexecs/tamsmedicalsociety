/* ── Hero Carousel ── */
(function() {
  const carousel = document.getElementById('heroCarousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots   = carousel.querySelectorAll('.carousel-dot');
  let current  = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  document.getElementById('carouselNext').addEventListener('click', () => { next(); startTimer(); });
  document.getElementById('carouselPrev').addEventListener('click', () => { prev(); startTimer(); });
  dots.forEach(dot => {
    dot.addEventListener('click', () => { goTo(+dot.dataset.idx); startTimer(); });
  });

  startTimer();
})();

/* Board member photo slideshows */
document.querySelectorAll('[data-board-slideshow]').forEach(slideshow => {
  const slides = slideshow.querySelectorAll('.board-bio-photo');
  const prevBtn = slideshow.querySelector('.board-photo-arrow.prev');
  const nextBtn = slideshow.querySelector('.board-photo-arrow.next');
  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
  }

  function next() {
    goTo(current + 1);
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, 4500);
  }

  prevBtn.addEventListener('click', () => {
    goTo(current - 1);
    startTimer();
  });

  nextBtn.addEventListener('click', () => {
    next();
    startTimer();
  });

  startTimer();
});

/* ── Mobile nav toggle ── */
const navToggle = document.getElementById('navToggle');
const navLinksWrap = document.getElementById('navLinksWrap');
if (navToggle && navLinksWrap) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinksWrap.classList.toggle('open');
  });
}

/* ── Issues Carousel (Stethoscope page) ── */
(function() {
  const track  = document.getElementById('issuesTrack');
  if (!track) return;

  const cards      = track.querySelectorAll('.issue-card');
  const dotsWrap   = document.getElementById('issuesDots');
  const prevBtn    = document.getElementById('issuesPrev');
  const nextBtn    = document.getElementById('issuesNext');
  const total      = cards.length;

  /* show 4 cards on desktop, 2 on tablet, 1 on mobile */
  function visible() {
    if (window.innerWidth < 560) return 1;
    if (window.innerWidth < 900) return 2;
    return 4;
  }

  let current = 0;

  /* set each card's flex-basis dynamically */
  function setCardWidth() {
    const v = visible();
    cards.forEach(c => { c.style.flex = `0 0 calc(100% / ${v})`; });
  }

  /* build dots */
  function buildDots() {
    dotsWrap.innerHTML = '';
    const v = visible();
    const pages = Math.ceil(total / v);
    for (let i = 0; i < pages; i++) {
      const d = document.createElement('button');
      d.className = 'issues-dot' + (i === 0 ? ' active' : '');
      d.addEventListener('click', () => goTo(i * v));
      dotsWrap.appendChild(d);
    }
  }

  function updateDots() {
    const v = visible();
    const page = Math.floor(current / v);
    dotsWrap.querySelectorAll('.issues-dot').forEach((d, i) => {
      d.classList.toggle('active', i === page);
    });
  }

  function goTo(idx) {
    const v = visible();
    const maxIdx = total - v;
    current = Math.max(0, Math.min(idx, maxIdx));
    const pct = (current / v) * 100;
    track.style.transform = `translateX(-${pct}%)`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current >= maxIdx;
    updateDots();
  }

  prevBtn.addEventListener('click', () => goTo(current - visible()));
  nextBtn.addEventListener('click', () => goTo(current + visible()));

  function init() {
    setCardWidth();
    buildDots();
    goTo(0);
  }

  init();
  window.addEventListener('resize', init);
})();

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    item.classList.toggle('open');
  });
});

/* ── Contact form mock submit ── */
const cForm = document.getElementById('contactForm');
if (cForm) {
  cForm.addEventListener('submit', e => {
    e.preventDefault();
    cForm.innerHTML = '<p style="text-align:center;padding:32px;color:var(--cream);font-size:1.05rem;">Thank you for your message! The TMS exec board will be in touch soon.</p>';
  });
}

/* ── Scroll-reveal ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(
    '.home-card, .event-card, .committee-card, .board-role-card, .info-card, .faq-item, .cal-item'
  ).forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity .4s ease ${(i % 5) * .07}s, transform .4s ease ${(i % 5) * .07}s`;
    revealObserver.observe(el);
  });
});

/* Icon slide-in */
const iconRevealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      iconRevealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25, rootMargin: '0px 0px -20px 0px' });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(
    '.hfc-icon, .ic-icon, .ec-icon, .ec-icon-svg, .cc-icon, .cc-icon-img, .eh-icon, .eh-icon-svg, .ch-icon, .ch-icon-img'
  ).forEach((icon, i) => {
    icon.style.opacity = '0';
    icon.style.transform = 'translateY(-28px)';
    icon.style.transition = `opacity .45s ease ${(i % 4) * .05}s, transform .45s ease ${(i % 4) * .05}s`;
    iconRevealObserver.observe(icon);
  });
});
