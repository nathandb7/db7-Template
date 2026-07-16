(function () {
  "use strict";

  window.db7Motion = window.db7Motion || {};

  window.db7Motion.initCounters = function initCounters() {
    const counters = Array.from(document.querySelectorAll("[data-counter-target]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!counters.length) return;

    function render(counter, value) {
      const prefix = counter.getAttribute("data-counter-prefix") || "";
      const suffix = counter.getAttribute("data-counter-suffix") || "";
      counter.textContent = `${prefix}${Math.round(value)}${suffix}`;
    }

    function animate(counter) {
      if (counter.dataset.counterDone === "true") return;
      counter.dataset.counterDone = "true";

      const target = Number(counter.getAttribute("data-counter-target") || 0);
      const duration = Number(counter.getAttribute("data-counter-duration") || 1400);
      const start = performance.now();

      function tick(now) {
        const elapsed = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - elapsed, 3);
        render(counter, target * eased);

        if (elapsed < 1) {
          window.requestAnimationFrame(tick);
        } else {
          render(counter, target);
        }
      }

      window.requestAnimationFrame(tick);
    }

    counters.forEach((counter) => {
      const target = Number(counter.getAttribute("data-counter-target") || 0);

      if (reduceMotion || !("IntersectionObserver" in window)) {
        render(counter, target);
      } else {
        render(counter, 0);
      }
    });

    if (reduceMotion || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate(entry.target);
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -10% 0px"
      }
    );

    counters.forEach((counter) => observer.observe(counter));
  };
})();
