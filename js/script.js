/* ============================================
   LUME LIVING CO. — script.js
   ============================================ */

(function () {
  'use strict';

  /* ---------- Header scroll behaviour ---------- */
  const header = document.querySelector('.luxury-header');

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Active nav link ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-block[data-section]');

  function highlightNav() {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.section === current);
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ---------- Smooth scroll for nav ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = header.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---------- Scroll reveal ---------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* ---------- Project card labels ---------- */
  const projectData = [
    { title: 'The Oberoi Residence', type: 'Luxury Apartment' },
    { title: 'Whitefield Villa',     type: 'Private Villa' },
    { title: 'Koramangala Penthouse', type: 'Penthouse Suite' },
    { title: 'MG Road Office',       type: 'Commercial Space' },
  ];

  document.querySelectorAll('.project-card').forEach((card, i) => {
    const data = projectData[i];
    if (!data) return;
    const overlay = card.querySelector('.project-overlay');
    if (overlay) {
      overlay.innerHTML = `
        <div>
          <span>${data.type}</span>
          <h3>${data.title}</h3>
        </div>`;
    }
  });

  /* ---------- Consultation form ---------- */
  const consultForm = document.querySelector('.consultation-card form');
  if (consultForm) {
    consultForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Request Sent ✓';
      btn.style.background = '#7A9A50';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        this.reset();
      }, 3000);
    });
  }

  /* ---------- Contact form ---------- */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('.form-submit');
      const original = btn.textContent;
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#7A9A50';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        this.reset();
      }, 3000);
    });
  }

  /* ---------- Floating label focus ---------- */
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    function checkFill() {
      const label = input.previousElementSibling;
      if (!label || label.tagName !== 'LABEL') return;
      if (input.value.trim()) {
        label.style.top = '10px';
        label.style.fontSize = '9px';
      } else {
        label.style.top = '';
        label.style.fontSize = '';
      }
    }
    input.addEventListener('input', checkFill);
    input.addEventListener('focus', () => {
      const label = input.previousElementSibling;
      if (label && label.tagName === 'LABEL') {
        label.style.top = '10px';
        label.style.fontSize = '9px';
      }
    });
    input.addEventListener('blur', checkFill);
  });

  /* ---------- Counter animation ---------- */
  function animateCounter(el, target, suffix) {
    const duration = 1800;
    const start = performance.now();
    const isFloat = target % 1 !== 0;

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = isFloat
        ? (eased * target).toFixed(1)
        : Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const stats = [
    { selector: '.stat-projects', value: 250, suffix: '+' },
    { selector: '.stat-satisfaction', value: 98, suffix: '%' },
    { selector: '.stat-years', value: 12, suffix: '+' },
  ];

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const found = stats.find(s => el.classList.contains(s.selector.slice(1)));
        if (found) animateCounter(el, found.value, found.suffix);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-projects, .stat-satisfaction, .stat-years')
    .forEach(el => statsObserver.observe(el));

})();