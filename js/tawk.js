// =====================================================================
// Tawk.to Live Chat - replace YOUR_PROPERTY_ID/YOUR_WIDGET_ID below
//
// Setup (one-time):
// 1. Go to https://dashboard.tawk.to and sign up (free)
// 2. Click "Create Property" and set domain to teckas.com
// 3. Go to Admin > Channels > Chat Widget > get "Direct Chat Link"
//    The URL looks like: https://tawk.to/chat/PROPERTY_ID/WIDGET_ID
// 4. Replace the two IDs in the src URL below
// 5. Commit and push
//
// Until replaced, the chat widget is disabled (no errors, just no chat).
// =====================================================================

(function() {
  var PROPERTY_ID = 'YOUR_PROPERTY_ID';
  var WIDGET_ID = 'YOUR_WIDGET_ID';

  // Do not load placeholder
  if (PROPERTY_ID === 'YOUR_PROPERTY_ID' || WIDGET_ID === 'YOUR_WIDGET_ID') return;

  var Tawk_API = window.Tawk_API || {};
  var Tawk_LoadStart = new Date();
  window.Tawk_API = Tawk_API;
  window.Tawk_LoadStart = Tawk_LoadStart;

  var s1 = document.createElement('script');
  var s0 = document.getElementsByTagName('script')[0];
  s1.async = true;
  s1.src = 'https://embed.tawk.to/' + PROPERTY_ID + '/' + WIDGET_ID;
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  s0.parentNode.insertBefore(s1, s0);

  // Track chat open in Google Analytics
  Tawk_API.onChatMaximized = function() {
    if (typeof gtag === 'function') gtag('event', 'chat_opened', { source: 'tawk' });
  };
  Tawk_API.onChatStarted = function() {
    if (typeof gtag === 'function') gtag('event', 'chat_started', { source: 'tawk' });
  };
})();
