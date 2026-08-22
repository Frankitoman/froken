/* ==========================================================================
   FRØKEN — weave-light (the signature move)

   A fabric swatch lights from wherever the pointer rests, and holding still
   over it for a moment reads the real fibre off it. Bespoke to this page:
   plain pointer tracking plus a dwell timer, not an engine device.
   ========================================================================== */
(function () {
  'use strict';

  var mq = window.matchMedia('(hover: hover) and (pointer: fine)');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!mq.matches || reduce.matches) return;

  var DWELL_MS = 550;

  document.querySelectorAll('[data-swatch]').forEach(function (swatch) {
    var timer = null;

    function light(e) {
      var r = swatch.getBoundingClientRect();
      var fx = (e.clientX - r.left) / r.width;
      var fy = (e.clientY - r.top) / r.height;
      swatch.style.setProperty('--fx', Math.min(1, Math.max(0, fx)));
      swatch.style.setProperty('--fy', Math.min(1, Math.max(0, fy)));
      swatch.classList.add('is-lit');
      clearTimeout(timer);
      swatch.classList.remove('is-told');
      timer = setTimeout(function () { swatch.classList.add('is-told'); }, DWELL_MS);
    }

    function unlight() {
      clearTimeout(timer);
      swatch.classList.remove('is-lit', 'is-told');
    }

    swatch.addEventListener('pointermove', light);
    swatch.addEventListener('pointerenter', light);
    swatch.addEventListener('pointerleave', unlight);
  });
})();
