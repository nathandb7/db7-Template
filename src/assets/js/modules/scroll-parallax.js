(function () {
  "use strict";

  window.db7Motion = window.db7Motion || {};

  window.db7Motion.initScrollParallax = function initScrollParallax() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll("[data-parallax]"));

    if (reduceMotion || !elements.length || window.matchMedia("(max-width: 767px)").matches) {
      return;
    }

    let ticking = false;

    function clamp(value, min, max) {
      return Math.min(Math.max(value, min), max);
    }

    function update() {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      elements.forEach((element) => {
        const speed = Number(element.getAttribute("data-parallax-speed") || 0.12);
        const rect = element.getBoundingClientRect();
        const centerOffset = rect.top + rect.height / 2 - viewportHeight / 2;
        const movement = clamp(centerOffset * speed * -1, -40, 40);

        element.style.setProperty("--parallax-y", `${movement.toFixed(2)}px`);
      });

      ticking = false;
    }

    function requestTick() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);
    update();
  };
})();
