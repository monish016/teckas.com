// === Exit-Intent Popup (Salary Guide Lead Magnet) ===
(function() {
  // Don't show on contact, thank-you, or landing pages
  var suppressedPaths = ['/contact.html', '/get-started/'];
  var currentPath = window.location.pathname;
  for (var i = 0; i < suppressedPaths.length; i++) {
    if (currentPath.indexOf(suppressedPaths[i]) !== -1) return;
  }

  // Honor "already shown" flag (24h cookie via localStorage timestamp)
  var lastShown = localStorage.getItem('teckas_exit_popup_ts');
  if (lastShown && (Date.now() - parseInt(lastShown, 10)) < 24 * 60 * 60 * 1000) return;

  // Compute correct path to the PDF based on current page depth
  var pathDepth = (currentPath.match(/\//g) || []).length - 1;
  var pdfPath = (pathDepth > 0 ? '../'.repeat(pathDepth) : '') + 'downloads/Teckas_Salary_Guide_2026.pdf';

  // Build popup HTML
  var overlay = document.createElement('div');
  overlay.className = 'exit-popup-overlay';
  overlay.id = 'exitPopup';
  overlay.innerHTML =
    '<div class="exit-popup" role="dialog" aria-modal="true" aria-labelledby="exitPopupTitle">' +
      '<button class="close-btn" aria-label="Close popup" id="exitClose">&times;</button>' +
      '<div id="exitPopupBody">' +
        '<h2 id="exitPopupTitle">Before you go - save 60-70% on staffing</h2>' +
        '<p class="popup-lead">Get our free Remote Staffing Salary Guide with US vs India cost comparisons across 8 role categories.</p>' +
        '<ul class="popup-benefits">' +
          '<li>Cost breakdown for 8 roles (VAs, SDRs, developers, more)</li>' +
          '<li>Real salary ranges from BLS, Glassdoor, Indeed</li>' +
          '<li>Tools every remote professional should know</li>' +
        '</ul>' +
        '<form id="exitPopupForm">' +
          '<input type="email" name="email" placeholder="you@company.com" required autocomplete="email" />' +
          '<button type="submit" class="btn btn-orange popup-submit">Download Free Guide &rarr;</button>' +
          '<p class="disclaimer">No spam. Unsubscribe anytime.</p>' +
        '</form>' +
      '</div>' +
      '<div id="exitPopupSuccess" class="popup-success" style="display:none;">' +
        '<h2>Thank you!</h2>' +
        '<p>Your download is starting. Check your email for a copy.</p>' +
      '</div>' +
    '</div>';
  document.body.appendChild(overlay);

  var triggered = false;
  function show() {
    if (triggered) return;
    triggered = true;
    overlay.classList.add('active');
    if (typeof gtag === 'function') gtag('event', 'exit_popup_shown', { page: currentPath });
  }
  function dismiss() {
    overlay.classList.remove('active');
    localStorage.setItem('teckas_exit_popup_ts', Date.now().toString());
  }

  // Desktop: mouse leaves top of viewport
  document.addEventListener('mouseleave', function(e) {
    if (e.clientY < 40) show();
  });

  // Mobile/tablet: scroll up fast (back-navigation intent) + 30s fallback
  var lastScrollY = window.scrollY;
  var lastScrollTime = Date.now();
  window.addEventListener('scroll', function() {
    var now = Date.now();
    var deltaY = window.scrollY - lastScrollY;
    var deltaT = now - lastScrollTime;
    // Fast upward scroll while past fold
    if (deltaY < -200 && deltaT < 400 && window.scrollY > 400 && window.innerWidth < 768) {
      show();
    }
    lastScrollY = window.scrollY;
    lastScrollTime = now;
  });

  // Close handlers
  document.getElementById('exitClose').addEventListener('click', dismiss);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) dismiss();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) dismiss();
  });

  // Form submission
  document.getElementById('exitPopupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var emailInput = this.querySelector('input[name=email]');
    var email = emailInput.value.trim();
    if (!email) return;

    var fd = new FormData();
    fd.append('access_key', '0eba246d-5210-4e20-b7ec-823aca4a3671');
    fd.append('subject', 'Salary Guide Download - Exit Popup');
    fd.append('from_name', 'Teckas Exit Popup');
    fd.append('email', email);
    fd.append('source', 'exit_intent_popup');
    fd.append('page', currentPath);

    // Fire and forget - we do not block the download
    fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd }).catch(function() {});

    if (typeof gtag === 'function') {
      gtag('event', 'lead_capture', { source: 'exit_popup', page: currentPath });
      gtag('event', 'file_download', { file_name: 'Teckas_Salary_Guide_2026.pdf', file_type: 'pdf' });
    }

    // Show success state
    document.getElementById('exitPopupBody').style.display = 'none';
    document.getElementById('exitPopupSuccess').style.display = 'block';

    // Trigger download
    var a = document.createElement('a');
    a.href = pdfPath;
    a.download = 'Teckas_Salary_Guide_2026.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Mark as shown and auto-close after 3s
    localStorage.setItem('teckas_exit_popup_ts', Date.now().toString());
    setTimeout(function() { overlay.classList.remove('active'); }, 3000);
  });
})();

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
