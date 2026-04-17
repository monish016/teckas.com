// === Mobile Menu Toggle ===
var mobileMenuBtn = document.getElementById('mobileMenuBtn');
var navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', function() {
    navLinks.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() { navLinks.classList.remove('active'); });
  });
}

// === Scroll Progress Bar ===
(function() {
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);
  window.addEventListener('scroll', function() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  });
})();

// === Navbar Scroll Effect (transparent → solid) ===
var navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
  // Trigger on load in case already scrolled
  if (window.scrollY > 20) navbar.classList.add('scrolled');
}

// === Staggered Scroll Animations ===
var fadeObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

// Apply fade-in to animatable elements
document.querySelectorAll('.card, .testimonial-card, .role-card, .service-detail-card, .pricing-tier, .industry-card, .industry-tag, .case-card, .blog-card, .value-card, .feature-item, .process-step, .timeline-item, .faq-item, .section-header, .guarantee-card, .landing-pain, .landing-sol-item').forEach(function(el) {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});

// Apply slide animations to specific elements
document.querySelectorAll('.hero-content').forEach(function(el) {
  el.classList.add('slide-left');
  fadeObserver.observe(el);
});
document.querySelectorAll('.hero-image').forEach(function(el) {
  el.classList.add('slide-right');
  fadeObserver.observe(el);
});

// Apply scale-in to certain elements
document.querySelectorAll('.pricing-table-wrap, .calculator-widget, .landing-price, .landing-testimonial').forEach(function(el) {
  el.classList.add('scale-in');
  fadeObserver.observe(el);
});

// Add stagger class to grid parents
document.querySelectorAll('.grid-2, .grid-3, .grid-4, .process-steps, .industry-tags, .feature-grid, .landing-pains, .landing-solution').forEach(function(el) {
  el.classList.add('stagger');
});

// === Hero Mouse-Follow Glow ===
(function() {
  var hero = document.querySelector('.hero');
  if (!hero) return;
  var glow = document.createElement('div');
  glow.className = 'hero-glow';
  hero.appendChild(glow);
  hero.addEventListener('mousemove', function(e) {
    var rect = hero.getBoundingClientRect();
    glow.style.left = (e.clientX - rect.left) + 'px';
    glow.style.top = (e.clientY - rect.top) + 'px';
  });
})();

// === Parallax on Hero Image ===
(function() {
  var heroImg = document.querySelector('.hero-image');
  if (!heroImg) return;
  window.addEventListener('scroll', function() {
    var scrolled = window.scrollY;
    if (scrolled < 800) {
      heroImg.style.transform = 'translateY(' + (scrolled * 0.08) + 'px)';
    }
  });
})();

// === Active Nav Highlight on Scroll ===
(function() {
  var sections = document.querySelectorAll('section[id]');
  var navLinksAll = document.querySelectorAll('.nav-links a');
  if (sections.length === 0 || navLinksAll.length === 0) return;

  window.addEventListener('scroll', function() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function(section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinksAll.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') && link.getAttribute('href').includes('#' + id)) {
            link.classList.add('active');
          }
        });
      }
    });
  });
})();

// === FAQ Accordion ===
document.querySelectorAll('.faq-question').forEach(function(q) {
  q.addEventListener('click', function() {
    var item = q.parentElement;
    var answer = item.querySelector('.faq-answer');
    var isActive = item.classList.contains('active');

    // Close all
    document.querySelectorAll('.faq-item.active').forEach(function(openItem) {
      openItem.classList.remove('active');
      openItem.querySelector('.faq-answer').style.maxHeight = '0';
    });

    // Open clicked (if wasn't already open)
    if (!isActive) {
      item.classList.add('active');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// === Smooth Scroll for Anchor Links ===
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var href = this.getAttribute('href');
    if (href === '#') return;
    var target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

// === Google Analytics Custom Event Tracking ===
function gaTrack(eventName, params) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params || {});
  }
}

// Track CTA button clicks (Book a Call, Discovery Call, etc.)
document.querySelectorAll('a.btn, a.nav-cta').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var label = (btn.textContent || '').replace(/[^\x20-\x7E]/g, '').trim();
    var href = btn.getAttribute('href') || '';
    gaTrack('cta_click', {
      button_text: label.substring(0, 80),
      destination: href,
      page: window.location.pathname
    });
  });
});

// Track PDF downloads (Salary Guide)
document.querySelectorAll('a[href$=".pdf"]').forEach(function(link) {
  link.addEventListener('click', function() {
    gaTrack('file_download', {
      file_name: link.getAttribute('href'),
      file_type: 'pdf',
      link_text: (link.textContent || '').trim().substring(0, 80)
    });
  });
});

// Track Calendly clicks (outbound + inline widget)
document.querySelectorAll('a[href*="calendly.com"]').forEach(function(link) {
  link.addEventListener('click', function() {
    gaTrack('calendly_click', {
      destination: link.getAttribute('href'),
      page: window.location.pathname
    });
  });
});

// Track Calendly booking completion (when user actually books via inline widget)
window.addEventListener('message', function(e) {
  if (e.data && e.data.event && e.data.event.indexOf('calendly') === 0) {
    if (e.data.event === 'calendly.event_scheduled') {
      gaTrack('booking_completed', {
        source: 'calendly_inline',
        page: window.location.pathname
      });
    }
  }
});

// Track contact form submission
var contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function() {
    var roleEl = document.getElementById('role');
    gaTrack('form_submit', {
      form_name: 'contact_form',
      role_selected: roleEl ? roleEl.value : '',
      page: window.location.pathname
    });
  });
}

// Track ROI calculator usage
var calcBtn = document.querySelector('button[onclick*="calculateSavings"]');
if (calcBtn) {
  calcBtn.addEventListener('click', function() {
    var roleEl = document.getElementById('calcRole');
    var salaryEl = document.getElementById('calcSalary');
    gaTrack('roi_calculated', {
      role: roleEl ? roleEl.value : '',
      local_salary: salaryEl ? salaryEl.value : ''
    });
  });
}

// Track scroll depth (25%, 50%, 75%, 100%)
var scrollMarks = { 25: false, 50: false, 75: false, 100: false };
window.addEventListener('scroll', function() {
  var docHeight = document.documentElement.scrollHeight - window.innerHeight;
  if (docHeight <= 0) return;
  var pct = Math.round((window.scrollY / docHeight) * 100);
  [25, 50, 75, 100].forEach(function(mark) {
    if (pct >= mark && !scrollMarks[mark]) {
      scrollMarks[mark] = true;
      gaTrack('scroll_depth', { percent: mark, page: window.location.pathname });
    }
  });
});

// Track industry card clicks (homepage + industries page)
document.querySelectorAll('.industry-card, .industry-tag').forEach(function(card) {
  card.addEventListener('click', function() {
    var name = (card.querySelector('h3') || card).textContent.trim();
    gaTrack('industry_click', { industry: name.substring(0, 60) });
  });
});

// === Animated Counters (if any remain) ===
function animateCounter(el) {
  var target = parseFloat(el.getAttribute('data-target'));
  var suffix = el.getAttribute('data-suffix') || '';
  var duration = 2000;
  var start = performance.now();

  function update(now) {
    var elapsed = now - start;
    var progress = Math.min(elapsed / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

var counterObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.dataset.animated = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(function(el) { counterObserver.observe(el); });
