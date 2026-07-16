(function () {
  "use strict";

  window.db7Motion = window.db7Motion || {};

  window.db7Motion.initScrollReveal = function initScrollReveal() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = document.querySelectorAll("[data-animate]");

    if (!elements.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    document.documentElement.classList.add("motion-ready");

    document.querySelectorAll("[data-stagger]").forEach((group) => {
      const children = group.querySelectorAll("[data-animate]");

      children.forEach((child, index) => {
        const existingDelay = child.getAttribute("data-delay");
        const delay = existingDelay ? Number(existingDelay) : Math.min(index * 140, 700);
        child.style.setProperty("--motion-delay", `${delay}ms`);
      });
    });

    elements.forEach((element) => {
      const delay = element.getAttribute("data-delay");
      if (delay) element.style.setProperty("--motion-delay", `${delay}ms`);
    });

    elements.forEach((element) => {
      if (element.hasAttribute("data-initial")) {
        window.requestAnimationFrame(() => element.classList.add("is-visible"));
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target;
          const repeat = element.dataset.once === "false";

        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          if (!repeat) observer.unobserve(element);
        }
      });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -14% 0px"
      }
    );

    elements.forEach((element) => {
      if (!element.hasAttribute("data-initial")) observer.observe(element);
    });
  };

  window.addEventListener("error", () => {
    document.querySelectorAll("[data-animate]").forEach((element) => element.classList.add("is-visible"));
  });
})();
