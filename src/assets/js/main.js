(function () {
  "use strict";

  const body = document.body;
  const scrollProgress = document.createElement("div");
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const dropdownToggles = document.querySelectorAll("[data-dropdown-toggle]");
  const searchOpen = document.querySelector("[data-search-open]");
  const searchClose = document.querySelector("[data-search-close]");
  const searchOverlay = document.querySelector("[data-search-overlay]");
  const scrollTop = document.querySelector("[data-scroll-top]");
  const modal = document.querySelector("[data-video-modal]");
  const modalVideo = modal ? modal.querySelector("video") : null;

  function closeOverlays() {
    body.classList.remove("menu-open", "search-open", "modal-open");
    document.querySelectorAll(".nav-item.is-open").forEach((item) => item.classList.remove("is-open"));
    if (searchOverlay) searchOverlay.classList.remove("is-open");
    if (modal) modal.classList.remove("is-open");
    if (modalVideo) modalVideo.pause();
  }

  scrollProgress.className = "scroll-progress";
  scrollProgress.setAttribute("aria-hidden", "true");
  document.body.appendChild(scrollProgress);

  function syncHeader() {
    if (!header) return;
    header.classList.toggle("is-sticky", window.scrollY > 20);
    if (scrollTop) scrollTop.classList.toggle("is-visible", window.scrollY > 500);

    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    scrollProgress.style.setProperty("--scroll-progress", `${Math.min(progress, 100)}%`);
  }

  menuToggle?.addEventListener("click", () => {
    body.classList.toggle("menu-open");
  });

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      if (window.matchMedia("(max-width: 1120px)").matches) {
        event.preventDefault();
        toggle.closest(".nav-item")?.classList.toggle("is-open");
      }
    });
  });

  searchOpen?.addEventListener("click", () => {
    body.classList.add("search-open");
    searchOverlay?.classList.add("is-open");
    searchOverlay?.querySelector("input")?.focus();
  });

  searchClose?.addEventListener("click", closeOverlays);
  searchOverlay?.addEventListener("click", (event) => {
    if (event.target === searchOverlay) closeOverlays();
  });

  document.querySelectorAll("[data-tabs]").forEach((tabs) => {
    const buttons = tabs.querySelectorAll("[data-tab-target]");
    const panels = tabs.querySelectorAll("[data-tab-panel]");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-tab-target");
        buttons.forEach((item) => item.classList.toggle("is-active", item === button));
        panels.forEach((panel) => panel.classList.toggle("is-active", panel.id === target));
      });
    });
  });

  document.querySelectorAll("[data-faq-question]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      const list = button.closest(".faq-list");
      list?.querySelectorAll(".faq-item.is-open").forEach((openItem) => {
        if (openItem !== item) openItem.classList.remove("is-open");
      });
      item?.classList.toggle("is-open");
    });
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");
      const scope = button.closest("[data-filter-scope]");
      if (!scope) return;

      scope.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");

      scope.querySelectorAll("[data-category]").forEach((card) => {
        const category = card.getAttribute("data-category");
        card.hidden = filter !== "all" && category !== filter;
      });
    });
  });

  document.querySelectorAll("[data-copy-code]").forEach((button) => {
    button.addEventListener("click", async () => {
      const card = button.closest(".component-card");
      const code = card?.querySelector("pre code")?.textContent || "";
      if (!code.trim()) return;

      try {
        await navigator.clipboard.writeText(code);
        button.textContent = "Copied";
      } catch (_) {
        const textarea = document.createElement("textarea");
        textarea.value = code;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
        button.textContent = "Copied";
      }

      window.setTimeout(() => {
        button.textContent = "Copy code";
      }, 1600);
    });
  });

  document.querySelectorAll("[data-video-open]").forEach((button) => {
    button.addEventListener("click", () => {
      const source = button.getAttribute("data-video-open");
      if (modalVideo && source) {
        modalVideo.src = source;
        modalVideo.play().catch(() => {});
      }
      body.classList.add("modal-open");
      modal?.classList.add("is-open");
    });
  });

  document.querySelectorAll("[data-video-close]").forEach((button) => {
    button.addEventListener("click", closeOverlays);
  });

  modal?.addEventListener("click", (event) => {
    if (event.target === modal) closeOverlays();
  });

  scrollTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeOverlays();
  });

  window.addEventListener("scroll", syncHeader, { passive: true });
  syncHeader();
  window.db7Motion?.initScrollReveal?.();
  window.db7Motion?.initScrollParallax?.();
  window.db7Motion?.initCounters?.();
})();
