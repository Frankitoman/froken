/* ==========================================================================
   FRØKEN — main.js
   ========================================================================== */
(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- nav scroll state ---------- */
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('is-scrolled', window.scrollY > 30); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById('navBurger');
  var mobileMenu = document.getElementById('navMobile');
  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- category quick-filter links scroll to shop + set filter ---------- */
  document.querySelectorAll('[data-goto-filter]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      var cat = el.getAttribute('data-goto-filter');
      var target = document.getElementById('shop');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(function () {
        var filterBtn = document.querySelector('[data-filter="' + cat + '"]');
        if (filterBtn) filterBtn.click();
      }, 300);
    });
  });

  /* ---------- feedback form -> mailto ---------- */
  var feedbackForm = document.getElementById('feedbackForm');
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var message = document.getElementById('feedbackMessage').value.trim();
      var email = document.getElementById('feedbackEmail').value.trim();
      if (!message) return;
      var subject = 'Feedback — FRØKEN site';
      var bodyLines = [message, ''];
      if (email) bodyLines.push('Contact email: ' + email);
      bodyLines.push('Page: ' + window.location.href);
      bodyLines.push('Language: ' + (window.i18n ? window.i18n.getLang() : 'en'));
      window.location.href = 'mailto:hello@froken-studio.dk?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyLines.join('\n'));
      feedbackForm.reset();
    });
  }
})();
