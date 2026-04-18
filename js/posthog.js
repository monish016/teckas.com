// =====================================================================
// PostHog Analytics - replace YOUR_POSTHOG_API_KEY below
//
// Setup (one-time):
// 1. Go to https://app.posthog.com (or your self-hosted URL)
// 2. Create a project if needed. Domain: teckas.com
// 3. Settings > Project > copy your "Project API Key" (starts with phc_)
// 4. Replace POSTHOG_API_KEY and POSTHOG_HOST constants below
// 5. Commit and push
//
// Until the API key is replaced, PostHog is disabled (no errors, no events).
// =====================================================================

(function() {
  var POSTHOG_API_KEY = 'YOUR_POSTHOG_API_KEY';
  var POSTHOG_HOST = 'https://us.i.posthog.com'; // change to https://eu.i.posthog.com for EU cloud

  // Do not load placeholder
  if (POSTHOG_API_KEY === 'YOUR_POSTHOG_API_KEY') return;

  // PostHog official install snippet
  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);

  posthog.init(POSTHOG_API_KEY, {
    api_host: POSTHOG_HOST,
    person_profiles: 'identified_only', // only create profiles for identified users (privacy-friendly)
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: {
      dom_event_allowlist: ['click', 'submit'],
      url_allowlist: [], // empty = all URLs
    }
  });

  // Custom event tracking (mirrors our Google Analytics setup)
  document.addEventListener('DOMContentLoaded', function() {

    // Track CTA button clicks
    document.querySelectorAll('a.btn, a.nav-cta').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var label = (btn.textContent || '').replace(/[^\x20-\x7E]/g, '').trim();
        posthog.capture('cta_click', {
          button_text: label.substring(0, 80),
          destination: btn.getAttribute('href') || '',
          page: window.location.pathname
        });
      });
    });

    // Track PDF downloads
    document.querySelectorAll('a[href$=".pdf"]').forEach(function(link) {
      link.addEventListener('click', function() {
        posthog.capture('file_download', {
          file_name: link.getAttribute('href'),
          file_type: 'pdf'
        });
      });
    });

    // Track Calendly clicks
    document.querySelectorAll('a[href*="calendly.com"]').forEach(function(link) {
      link.addEventListener('click', function() {
        posthog.capture('calendly_click', {
          page: window.location.pathname
        });
      });
    });

    // Track Calendly booking completion
    window.addEventListener('message', function(e) {
      if (e.data && e.data.event && e.data.event.indexOf('calendly') === 0) {
        if (e.data.event === 'calendly.event_scheduled') {
          posthog.capture('booking_completed', { source: 'calendly_inline' });
        }
      }
    });

    // Track contact form submission
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function() {
        var roleEl = document.getElementById('role');
        posthog.capture('form_submit', {
          form_name: 'contact_form',
          role_selected: roleEl ? roleEl.value : ''
        });
      });
    }

    // Track careers form submission
    var careersForm = document.getElementById('careersForm');
    if (careersForm) {
      careersForm.addEventListener('submit', function() {
        posthog.capture('form_submit', { form_name: 'careers_application' });
      });
    }

    // Track ROI calculator usage
    var calcBtn = document.querySelector('button[onclick*="calculateSavings"]');
    if (calcBtn) {
      calcBtn.addEventListener('click', function() {
        var roleEl = document.getElementById('calcRole');
        var salaryEl = document.getElementById('calcSalary');
        posthog.capture('roi_calculated', {
          role: roleEl ? roleEl.value : '',
          local_salary: salaryEl ? salaryEl.value : ''
        });
      });
    }

    // Track exit-intent popup
    var exitForm = document.getElementById('exitPopupForm');
    if (exitForm) {
      exitForm.addEventListener('submit', function() {
        posthog.capture('lead_capture', { source: 'exit_popup' });
      });
    }
  });
})();
