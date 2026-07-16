const fs = require("fs");
const path = require("path");

const srcDir = path.join(__dirname, "..", "src");

const img = (n) => `assets/images/img (${n}).jpg`;
const vid = (name) => `assets/video/${name}`;

const pages = [
  "index.html",
  "home-2.html",
  "home-3.html",
  "home-4.html",
  "about.html",
  "service.html",
  "service-details.html",
  "blog.html",
  "blog-details.html",
  "work.html",
  "work-masonry.html",
  "work-details.html",
  "team-details.html",
  "404.html",
  "components.html",
  "contact.html"
];

const navGroups = [
  ["Page List 1", [["Home 1", "index.html"], ["Home 2", "home-2.html"], ["Home 3", "home-3.html"], ["Home 4", "home-4.html"], ["About", "about.html"]]],
  ["Page List 2", [["Service", "service.html"], ["Service Details", "service-details.html"], ["Blog", "blog.html"], ["Blog Details", "blog-details.html"]]],
  ["Page List 3", [["Work", "work.html"], ["Work Masonry", "work-masonry.html"], ["Work Details", "work-details.html"], ["Team Details", "team-details.html"]]],
  ["Page List 4", [["404 Error", "404.html"], ["Components", "components.html"], ["Contact Us", "contact.html"]]]
];

const works = [
  ["Signal Theory", "Brand system for a consulting lab", img(1), "brand"],
  ["Atlas Mode", "Portfolio platform with editorial case studies", img(2), "web"],
  ["Northline", "Launch system for a B2B product team", img(4), "product"],
  ["Studio Loop", "Motion-led landing page for a creative studio", img(6), "motion"],
  ["Field Notes", "Content hub for an independent publisher", img(8), "web"],
  ["Bright Index", "Identity refresh and static website kit", img(10), "brand"]
];

const services = [
  ["Brand systems", "Identity foundations, visual language, messaging blocks and repeatable digital rules."],
  ["Website design", "Premium page systems with strong hierarchy, conversion paths and editorial rhythm."],
  ["Frontend build", "Clean static HTML, scalable CSS, responsive sections and interaction patterns."],
  ["Content structure", "Page architecture, service copy, case study formats and launch-ready content maps."],
  ["Portfolio systems", "Work grids, project detail pages, filters, masonry views and proof-led layouts."],
  ["Launch support", "Final QA, deployment guidance, asset organization and practical handoff notes."]
];

const faqs = [
  ["Can I use this for client projects?", "Yes. The source is structured as an editable static template so it can be adapted for agency, portfolio and service websites."],
  ["Does it include multiple pages?", "Yes. The package includes three home variants plus internal pages for services, work, blog, team, contact and error states."],
  ["Can I replace images and video?", "Yes. All visual media is referenced from src/assets/images and src/assets/video so replacements are straightforward."],
  ["Is it easy to customize?", "The color tokens, typography scale and reusable components live in style.css, with section comments in every HTML page."],
  ["Can I deploy only static files?", "Yes. The build script copies the static src folder into dist, ready for any static hosting provider."]
];

function comment(title) {
  return `<!-- ================================\n  ${title}\n================================ -->`;
}

function header(options = {}) {
  const headerClass = options.transparentHeader ? " site-header-transparent" : "";
  const mega = navGroups.map(([title, links]) => `
              <div>
                <div class="mega-title">${title}</div>
                ${links.map(([label, href]) => `<a href="${href}">${label}</a>`).join("\n                ")}
              </div>`).join("");

  return `${comment("HEADER")}
      <header class="site-header${headerClass}">
        <div class="container-wide">
          <div class="header-inner">
            <a class="brand" href="index.html" aria-label="db7 Template home">
              <span class="brand-mark">7</span>
              <span>db7 Template</span>
            </a>

            <nav class="main-nav" id="mobile-menu" aria-label="Main navigation">
              <ul class="nav-list">
                <li class="nav-item">
                  <a class="nav-link" href="index.html" data-dropdown-toggle>Home</a>
                  <div class="dropdown">
                    <a href="index.html">Home 1</a>
                    <a href="home-2.html">Home 2</a>
                    <a href="home-3.html">Home 3</a>
                    <a href="home-4.html">Home 4</a>
                  </div>
                </li>
                <li class="nav-item"><a class="nav-link" href="about.html">About</a></li>
                <li class="nav-item">
                  <a class="nav-link" href="service.html" data-dropdown-toggle>Pages</a>
                  <div class="mega-menu">
                    <div class="mega-grid">${mega}
                    </div>
                  </div>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="blog.html" data-dropdown-toggle>Blog</a>
                  <div class="dropdown">
                    <a href="blog.html">Blog</a>
                    <a href="blog-details.html">Blog Details</a>
                  </div>
                </li>
                <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
              </ul>
            </nav>

            <div class="header-actions">
              <button class="icon-button" type="button" data-search-open aria-label="Open search">Search</button>
              <a class="button button-primary" href="contact.html">Start project</a>
              <button class="menu-toggle" type="button" data-menu-toggle aria-label="Toggle menu">Menu</button>
            </div>
          </div>
        </div>
      </header>`;
}

function footer() {
  return `${comment("FOOTER")}
      <footer class="site-footer">
        <div class="container">
          <div class="footer-top">
            <h2>Ready to shape a sharper digital presence?</h2>
            <a class="button button-primary" href="contact.html">Let's talk</a>
          </div>

          <div class="footer-grid">
            <div>
              <a class="brand" href="index.html">
                <span class="brand-mark">7</span>
                <span>db7 Template</span>
              </a>
              <p>A premium HTML template for agencies, portfolios and service businesses.</p>
            </div>
            <div>
              <div class="footer-title">Pages</div>
              <a href="about.html">About</a><br>
              <a href="service.html">Services</a><br>
              <a href="work.html">Work</a><br>
              <a href="blog.html">Blog</a>
            </div>
            <div>
              <div class="footer-title">Contact</div>
              <a href="mailto:hello@db7template.test">hello@db7template.test</a><br>
              <a href="tel:+59800000000">+598 0000 0000</a><br>
              <span>Montevideo, Uruguay</span>
            </div>
            <div>
              <div class="footer-title">Social</div>
              <a href="#">Dribbble</a><br>
              <a href="#">Behance</a><br>
              <a href="#">LinkedIn</a><br>
              <a href="#">Instagram</a>
            </div>
          </div>

          <div class="footer-bottom">
            <span>&copy; 2026 db7 Template. All rights reserved.</span>
            <span>By: <a href="https://nathandebarros.com" target="_blank" rel="noopener">Nathan de Barros</a> made in <span class="fi fi-uy db7-flag" aria-label="Uruguay"></span></span>
          </div>
        </div>
      </footer>

      <button class="scroll-top" type="button" data-scroll-top aria-label="Scroll to top">Top</button>

      <div class="search-overlay" data-search-overlay>
        <div class="search-box">
          <button class="icon-button" type="button" data-search-close aria-label="Close search">Close</button>
          <label class="sr-only" for="site-search">Search</label>
          <input id="site-search" type="search" placeholder="Search pages, services or case studies">
        </div>
      </div>

      <div class="video-modal" data-video-modal>
        <div class="modal-box">
          <button class="icon-button" type="button" data-video-close aria-label="Close video">Close</button>
          <video controls playsinline></video>
        </div>
      </div>`;
}

function shell(title, body, options = {}) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${title} | db7 Template - A premium HTML template for agencies, portfolios and service businesses.">
    <title>${title} | db7 Template</title>
    <link rel="icon" href="favicon.svg" type="image/svg+xml">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.3.2/css/flag-icons.min.css">
    <link rel="stylesheet" href="assets/css/plugins.css">
    <link rel="stylesheet" href="assets/css/style.css">
  </head>
  <body>
    <div class="site-shell">
      ${header(options)}

${body}

      ${footer()}
    </div>

    <script src="assets/js/plugins.js"></script>
    <script src="assets/js/modules/scroll-reveal.js"></script>
    <script src="assets/js/modules/scroll-parallax.js"></script>
    <script src="assets/js/modules/counter.js"></script>
    <script src="assets/js/main.js"></script>
  </body>
</html>
`;
}

function decorateMotion(html) {
  return html
    .replace(/<div class="hero-grid">/g, '<div class="hero-grid">')
    .replace(/<div class="hero-bg-content">/g, '<div class="hero-bg-content">')
    .replace(/<div class="page-hero-grid">/g, '<div class="page-hero-grid">')
    .replace(/<div>\n(\s+)<span class="eyebrow">Digital studio template/g, '<div data-animate="fade-up" data-initial>\n$1<span class="eyebrow">Digital studio template')
    .replace(/<div>\n(\s+)<span class="eyebrow">([^<]+)<\/span>\n(\s+)<h1>/g, '<div data-animate="fade-up" data-initial>\n$1<span class="eyebrow">$2</span>\n$3<h1>')
    .replace(/<div class="section-heading">/g, '<div class="section-heading" data-animate="fade-up">')
    .replace(/<div class="hero-media">/g, '<div class="hero-media" data-parallax data-parallax-speed="0.08">')
    .replace(/<div class="video-showcase">/g, '<div class="video-showcase image-reveal" data-animate="image-reveal" data-parallax data-parallax-speed="0.06">')
    .replace(/<div class="logo-strip">/g, '<div class="logo-strip" data-stagger>')
    .replace(/<div class="work-grid">/g, '<div class="work-grid" data-stagger>')
    .replace(/<div class="blog-grid">/g, '<div class="blog-grid" data-stagger>')
    .replace(/<div class="service-grid">/g, '<div class="service-grid" data-stagger>')
    .replace(/<div class="pricing-grid">/g, '<div class="pricing-grid" data-stagger>')
    .replace(/<div class="team-grid">/g, '<div class="team-grid" data-stagger>')
    .replace(/<div class="stats-band">/g, '<div class="stats-band" data-stagger>')
    .replace(/<div class="faq-list">/g, '<div class="faq-list" data-stagger>')
    .replace(/<article class="work-card"/g, '<article class="work-card" data-animate="scale-in"')
    .replace(/<article class="blog-card"/g, '<article class="blog-card" data-animate="fade-up"')
    .replace(/<article class="service-card"/g, '<article class="service-card" data-animate="fade-up"')
    .replace(/<article class="pricing-card/g, '<article data-animate="scale-in" class="pricing-card')
    .replace(/<article class="team-card"/g, '<article class="team-card" data-animate="fade-up"')
    .replace(/<div class="logo-item">/g, '<div class="logo-item" data-animate="scale-in">')
    .replace(/<div class="stat-card">/g, '<div class="stat-card" data-animate="fade-up">')
    .replace(/<div class="faq-item/g, '<div data-animate="fade-up" class="faq-item')
    .replace(/<div class="testimonial panel">/g, '<div class="testimonial panel" data-animate="fade-up">')
    .replace(/<div class="footer-top">/g, '<div class="footer-top" data-animate="fade-up">')
    .replace(/<div class="footer-grid">/g, '<div class="footer-grid" data-animate="fade-up">')
    .replace(/<aside class="sidebar-widget">/g, '<aside class="sidebar-widget" data-animate="fade-up">')
    .replace(/<div class="contact-card">/g, '<div class="contact-card" data-animate="fade-up">')
    .replace(/<div class="quote-card">/g, '<div class="quote-card" data-animate="blur-in">')
    .replace(/<div class="map-placeholder">/g, '<div class="map-placeholder" data-animate="fade-up">')
    .replace(/<form class="form-grid"/g, '<form class="form-grid" data-animate="fade-up"')
    .replace(/<div class="error-code">/g, '<div class="error-code" data-animate="blur-in">');
}

function sectionHeading(kicker, title, text) {
  return `<div class="section-heading">
            <div>
              <span class="eyebrow">${kicker}</span>
              <h2>${title}</h2>
            </div>
            <p>${text}</p>
          </div>`;
}

function heroHome() {
  return `${comment("HERO SECTION")}
      <main>
        <section class="hero">
          <div class="container-wide">
            <div class="hero-grid">
              <div>
                <span class="eyebrow">Digital studio template</span>
                <h1 class="hero-title">Build premium websites with rhythm, motion and structure.</h1>
                <p class="hero-text">A dark editorial website template for studios, freelancers and digital brands that need a sharp online presence.</p>
                <div class="hero-actions">
                  <a class="button button-primary" href="contact.html">Start project</a>
                  <a class="button button-secondary" href="work.html">View works</a>
                </div>
                <div class="hero-note">
                  <img src="${img(3)}" alt="Editorial portrait crop">
                  <p>Built for clean source editing, premium visual rhythm and fast static deployment.</p>
                </div>
              </div>

              <div class="hero-media">
                <video src="${vid("hero.mp4")}" autoplay muted loop playsinline poster="${img(5)}"></video>
                <div class="media-badge">
                  <strong>15</strong>
                  <span>complete pages, dark sections and reusable components.</span>
                </div>
              </div>
            </div>
          </div>
        </section>`;
}

function heroHomeVideoBg() {
  return `${comment("HERO SECTION")}
      <main>
        <section class="hero hero-video-bg">
          <video class="hero-bg-video" src="${vid("16079850_3840_2160_30fps.mp4")}" autoplay muted loop playsinline poster="${img(12)}"></video>
          <div class="hero-bg-overlay"></div>
          <div class="container-wide hero-bg-content">
            <div>
              <span class="eyebrow">Digital studio template</span>
              <h1 class="hero-title">Build premium websites with rhythm, motion and structure.</h1>
              <p class="hero-text">A cinematic dark homepage for studios, freelancers and digital brands that want the story to start in motion.</p>
              <div class="hero-actions">
                <a class="button button-primary" href="contact.html">Start project</a>
                <a class="button button-secondary" href="work.html">View works</a>
              </div>
            </div>
            <div class="hero-bg-card">
              <span class="eyebrow">Home 4</span>
              <strong>100vh</strong>
              <p>Full-screen video hero, overlay layer and transparent header before scroll.</p>
            </div>
          </div>
        </section>`;
}

function keywordRail() {
  const words = ["Strategy", "Design", "Websites", "Branding", "Motion", "Portfolio", "Services", "Creative", "Professional", "Responsive"];
  const line = words.concat(words).map((word) => `<span class="rail-word">${word}</span>`).join("");
  return `${comment("KEYWORD RAIL")}
        <section class="keyword-rail" aria-label="Template keywords">
          <div class="rail-track">${line}</div>
        </section>`;
}

function aboutTabs() {
  const tabs = [
    ["About", "A flexible website system for agencies, creators and service businesses.", "Use the template as a polished base for portfolio launches, studio pages and client-ready digital presentations.", img(7)],
    ["Experience", "Designed for fast production without flattening the brand.", "Each section keeps a clear purpose: introduce, prove, sell, answer and convert.", img(8)],
    ["Process", "Structure first, visuals second, handoff always.", "The page rhythm supports discovery, case studies, service detail and contact flows.", img(9)],
    ["Skills", "Brand, web, content and launch patterns in one static package.", "Use cards, grids, tabs, filters and accordions as simple reusable building blocks.", img(10)],
    ["Awards", "Premium enough for public work, readable enough for daily editing.", "Source comments keep every page easy to scan, modify and extend.", img(11)]
  ];

  return `${comment("ABOUT TABS")}
        <section class="section">
          <div class="container" data-tabs>
            ${sectionHeading("Work together", "A flexible website system for agencies, creators and service businesses.", "Tabs keep the story compact while giving visitors a quick way to understand the offer.")}
            <div class="about-tabs">
              <div class="tab-buttons">
                ${tabs.map(([label], index) => `<button class="tab-button ${index === 0 ? "is-active" : ""}" type="button" data-tab-target="tab-${index}">${label}</button>`).join("\n                ")}
              </div>
              ${tabs.map(([label, title, text, image], index) => `
              <div class="tab-panel panel ${index === 0 ? "is-active" : ""}" id="tab-${index}" data-tab-panel>
                <div>
                  <span class="eyebrow">${label}</span>
                  <h3>${title}</h3>
                  <p>${text}</p>
                </div>
                <img src="${image}" alt="${label} visual">
              </div>`).join("")}
            </div>
          </div>
        </section>`;
}

function videoShowcase() {
  return `${comment("VIDEO SHOWCASE")}
        <section class="section-sm">
          <div class="container-wide">
            <div class="video-showcase">
              <video src="${vid("18120715-hd_1920_1080_60fps.mp4")}" autoplay muted loop playsinline poster="${img(12)}"></video>
              <div class="video-overlay">
                <div>
                  <span class="eyebrow">Motion preview</span>
                  <h2>Use video to make the first impression feel alive.</h2>
                </div>
                <button class="play-button" type="button" data-video-open="${vid("18120715-hd_1920_1080_60fps.mp4")}" aria-label="Play video">Play</button>
              </div>
            </div>
          </div>
        </section>`;
}

function logos() {
  return `${comment("CLIENT LOGO STRIP")}
        <section class="section-sm">
          <div class="container">
            <div class="logo-strip">
              ${["NOVA", "ARC", "SHIFT", "MODO", "FRAME", "KIN"].map((logo) => `<div class="logo-item">${logo}</div>`).join("\n              ")}
            </div>
          </div>
        </section>`;
}

function worksSection({ masonry = false } = {}) {
  return `${comment("WORKS SECTION")}
        <section class="section" data-filter-scope>
          <div class="container">
            ${sectionHeading("Selected work", "Case-study layouts for brands, products and editorial launches.", "Show the work with clear categories, strong imagery and concise project context.")}
            <div class="filter-row" style="margin-bottom: 28px;">
              ${["all", "brand", "web", "product", "motion"].map((item, index) => `<button class="filter-button ${index === 0 ? "is-active" : ""}" type="button" data-filter="${item}">${item}</button>`).join("\n              ")}
            </div>
            <div class="${masonry ? "masonry-grid" : "work-grid"}">
              ${works.map(([title, text, image, category]) => `
              <article class="work-card" data-category="${category}">
                <a href="work-details.html"><img src="${image}" alt="${title} project image"></a>
                <div class="work-card-body">
                  <div class="tag-row"><span class="tag">${category}</span><span class="tag tag-hot">db7</span></div>
                  <h3><a href="work-details.html">${title}</a></h3>
                  <p>${text}</p>
                </div>
              </article>`).join("")}
            </div>
          </div>
        </section>`;
}

function testimonial() {
  return `${comment("TESTIMONIALS")}
        <section class="section-sm">
          <div class="container">
            <div class="testimonial panel">
              <img src="${img(4)}" alt="Studio work environment">
              <div class="testimonial-quote">
                <span class="eyebrow">Client words</span>
                <blockquote>"The template gave our launch the polish of a custom studio site while staying simple enough for our team to maintain."</blockquote>
                <cite>Mara Voss, founder at Northline</cite>
              </div>
            </div>
          </div>
        </section>`;
}

function stats() {
  return `${comment("STATS BAND")}
        <section class="section-sm">
          <div class="container">
            <div class="stats-band">
              ${[["16", "", "HTML pages"], ["36", "+", "Reusable blocks"], ["4", "", "Home variants"], ["100", "%", "Static source"]].map(([num, suffix, label]) => `
              <div class="stat-card">
                <div class="stat-number" data-counter-target="${num}"${suffix ? ` data-counter-suffix="${suffix}"` : ""}>${num}${suffix}</div>
                <div class="stat-label">${label}</div>
              </div>`).join("")}
            </div>
          </div>
        </section>`;
}

function servicesSection() {
  return `${comment("SERVICES SECTION")}
        <section class="section">
          <div class="container">
            ${sectionHeading("Services", "Everything a modern studio template needs to present a serious offer.", "Use these cards for services, capabilities, departments or productized packages.")}
            <div class="service-grid">
              ${services.map(([title, text], index) => `
              <article class="service-card">
                <span class="service-index">${String(index + 1).padStart(2, "0")}</span>
                <h3>${title}</h3>
                <p>${text}</p>
              </article>`).join("")}
            </div>
          </div>
        </section>`;
}

function pricing() {
  const plans = [
    ["Starter", "$49", "For solo launches", "Start with this", ["Core pages", "Editable sections", "Responsive CSS"]],
    ["Professional", "$129", "For client-ready sites", "Build professional", ["All pages", "Work and blog systems", "Interaction JS"]],
    ["Studio", "$249", "For repeatable delivery", "Scale the system", ["All components", "Advanced page variants", "Launch checklist"]]
  ];

  return `${comment("PRICING SECTION")}
        <section class="section paper-section">
          <div class="container">
            ${sectionHeading("Pricing", "Simple package cards with a premium static-template feel.", "The layout supports subscriptions, one-time packages or service tiers.")}
            <div class="pricing-grid">
              ${plans.map(([name, price, note, button, items], index) => `
              <article class="pricing-card ${index === 1 ? "featured" : ""}">
                <h3>${name}</h3>
                <div class="price">${price}</div>
                <div class="price-note">${note}</div>
                <ul>
                  ${items.map((item) => `<li>- ${item}</li>`).join("\n                  ")}
                </ul>
                <a class="button ${index === 1 ? "button-dark" : "button-primary"}" href="contact.html">${button}</a>
              </article>`).join("")}
            </div>
          </div>
        </section>`;
}

function faqSection() {
  return `${comment("FAQ SECTION")}
        <section class="section">
          <div class="container">
            ${sectionHeading("FAQ", "Direct answers for buyers, clients and internal teams.", "Keep the final decision points visible before the footer CTA.")}
            <div class="faq-list">
              ${faqs.map(([question, answer], index) => `
              <div class="faq-item ${index === 0 ? "is-open" : ""}">
                <button class="faq-question" type="button" data-faq-question>
                  <span>${question}</span>
                  <span>+</span>
                </button>
                <div class="faq-answer">${answer}</div>
              </div>`).join("")}
            </div>
          </div>
        </section>`;
}

function pageHero(kicker, title, text, image = img(6)) {
  return `${comment("PAGE HERO")}
      <main>
        <section class="page-hero">
          <div class="container">
            <div class="page-hero-grid">
              <div>
                <span class="eyebrow">${kicker}</span>
                <h1>${title}</h1>
              </div>
              <div>
                <p>${text}</p>
                <img class="rounded-media" src="${image}" alt="${title}" style="margin-top: 24px; aspect-ratio: 4 / 3;">
              </div>
            </div>
          </div>
        </section>`;
}

function blogCards() {
  const posts = [
    ["How to structure a premium agency homepage", "A practical look at hierarchy, rhythm and proof-led sections.", img(5)],
    ["Building a better project detail page", "Turn process, visuals and results into a compact story.", img(7)],
    ["Why static templates still matter", "Fast hosting, clean editing and fewer moving parts for teams.", img(9)]
  ];

  return posts.map(([title, text, image]) => `
              <article class="blog-card">
                <a href="blog-details.html"><img src="${image}" alt="${title}"></a>
                <div class="blog-card-body">
                  <div class="tag-row"><span class="tag">Insight</span><span class="tag">Design</span></div>
                  <h3><a href="blog-details.html">${title}</a></h3>
                  <p>${text}</p>
                </div>
              </article>`).join("");
}

function sidebar() {
  return `<aside class="grid">
            <div class="sidebar-widget">
              <h3>Categories</h3>
              <p>Brand strategy<br>Website systems<br>Creative process<br>Launch notes</p>
            </div>
            <div class="sidebar-widget">
              <h3>Recent posts</h3>
              <p>Portfolio pages that sell<br>Writing better service copy<br>Simple static deployment</p>
            </div>
            <div class="sidebar-widget">
              <h3>Tags</h3>
              <div class="tag-row" style="margin-top: 14px;">
                <span class="tag">Design</span><span class="tag">HTML</span><span class="tag">Launch</span><span class="tag">Studio</span>
              </div>
            </div>
          </aside>`;
}

function codeBlock(source) {
  const lines = source.replace(/^\n+|\n+$/g, "").split("\n");
  const indent = lines
    .filter((line) => line.trim())
    .reduce((min, line) => {
      const match = line.match(/^\s*/);
      return Math.min(min, match ? match[0].length : 0);
    }, Infinity);

  return lines
    .map((line) => line.slice(Number.isFinite(indent) ? indent : 0))
    .join("\n")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function componentBlock(title, group, preview, source, options = {}) {
  const cardClass = options.wide ? " component-card-wide" : "";
  const previewClass = options.previewClass ? ` ${options.previewClass}` : "";
  return `
              <article class="component-card${cardClass}" data-animate="fade-up">
                <div class="component-card-head">
                  <div>
                    <span class="tag">${group}</span>
                    <h3>${title}</h3>
                  </div>
                  <button class="component-copy" type="button" data-copy-code>Copy code</button>
                </div>
                <div class="component-preview${previewClass}">
                  ${preview}
                </div>
                <pre><code>${codeBlock(source)}</code></pre>
              </article>`;
}

function componentsSection(title, text, blocks) {
  return `${comment(title.toUpperCase())}
        <section class="section-sm component-group">
          <div class="container">
            ${sectionHeading("Components", title, text)}
            <div class="component-list">
              ${blocks.join("")}
            </div>
          </div>
        </section>`;
}

function componentsPageContent() {
  const foundation = [
    componentBlock("Section heading", "Foundation", `<div class="section-heading component-mini-heading"><div><span class="eyebrow">Kicker</span><h2>Reusable heading block.</h2></div><p>Short support copy for any section.</p></div>`, `<!-- SECTION HEADING -->
<div class="section-heading">
  <div>
    <span class="eyebrow">Kicker</span>
    <h2>Reusable heading block.</h2>
  </div>
  <p>Short support copy for any section.</p>
</div>`),
    componentBlock("Eyebrow label", "Foundation", `<span class="eyebrow">Digital studio template</span>`, `<!-- EYEBROW -->
<span class="eyebrow">Digital studio template</span>`),
    componentBlock("Button row", "Foundation", `<div class="hero-actions"><a class="button button-primary" href="#">Start project</a><a class="button button-secondary" href="#">View works</a></div>`, `<!-- BUTTON ROW -->
<div class="hero-actions">
  <a class="button button-primary" href="#">Start project</a>
  <a class="button button-secondary" href="#">View works</a>
</div>`),
    componentBlock("Tag row", "Foundation", `<div class="tag-row"><span class="tag">Brand</span><span class="tag tag-hot">db7</span><span class="tag">Launch</span></div>`, `<!-- TAG ROW -->
<div class="tag-row">
  <span class="tag">Brand</span>
  <span class="tag tag-hot">db7</span>
  <span class="tag">Launch</span>
</div>`)
  ];

  const navigation = [
    componentBlock("Brand logo", "Navigation", `<a class="brand" href="#"><span class="brand-mark">7</span><span>db7 Template</span></a>`, `<!-- BRAND LOGO -->
<a class="brand" href="index.html" aria-label="db7 Template home">
  <span class="brand-mark">7</span>
  <span>db7 Template</span>
</a>`),
    componentBlock("Dropdown nav item", "Navigation", `<div class="component-nav-demo"><a class="nav-link" href="#">Home</a><div class="dropdown component-static-menu"><a href="#">Home 1</a><a href="#">Home 2</a><a href="#">Home 3</a></div></div>`, `<!-- DROPDOWN NAV ITEM -->
<li class="nav-item">
  <a class="nav-link" href="index.html" data-dropdown-toggle>Home</a>
  <div class="dropdown">
    <a href="index.html">Home 1</a>
    <a href="home-2.html">Home 2</a>
    <a href="home-3.html">Home 3</a>
  </div>
</li>`),
    componentBlock("Mega menu column", "Navigation", `<div class="mega-menu component-static-menu component-mega-preview"><div class="mega-grid"><div><div class="mega-title">Page List</div><a href="#">About</a><a href="#">Service</a><a href="#">Work</a></div></div></div>`, `<!-- MEGA MENU COLUMN -->
<div class="mega-menu">
  <div class="mega-grid">
    <div>
      <div class="mega-title">Page List</div>
      <a href="about.html">About</a>
      <a href="service.html">Service</a>
      <a href="work.html">Work</a>
    </div>
  </div>
</div>`),
    componentBlock("Search overlay trigger", "Navigation", `<button class="icon-button" type="button">Search</button>`, `<!-- SEARCH TRIGGER -->
<button class="icon-button" type="button" data-search-open aria-label="Open search">Search</button>`)
  ];

  const heroes = [
    componentBlock("Hero split", "Heroes", `<div class="component-hero-preview"><span class="eyebrow">Hero</span><h2>Build premium websites with structure.</h2><p>Split hero with content and media.</p></div>`, `<!-- HERO SPLIT -->
<section class="hero">
  <div class="container-wide">
    <div class="hero-grid">
      <div>
        <span class="eyebrow">Digital studio template</span>
        <h1 class="hero-title">Build premium websites with rhythm, motion and structure.</h1>
        <p class="hero-text">A premium HTML template for agencies and portfolios.</p>
      </div>
      <div class="hero-media">
        <video src="assets/video/hero.mp4" autoplay muted loop playsinline></video>
      </div>
    </div>
  </div>
</section>`),
    componentBlock("Hero video background", "Heroes", `<div class="component-video-hero"><video src="${vid("hero.mp4")}" autoplay muted loop playsinline></video><div><span class="eyebrow">Video</span><h2>Full-screen video hero.</h2></div></div>`, `<!-- HERO VIDEO BACKGROUND -->
<section class="hero hero-video-bg">
  <video class="hero-bg-video" src="assets/video/hero.mp4" autoplay muted loop playsinline></video>
  <div class="hero-bg-overlay"></div>
  <div class="container-wide hero-bg-content">
    <div>
      <span class="eyebrow">Digital studio template</span>
      <h1 class="hero-title">Build premium websites with rhythm, motion and structure.</h1>
    </div>
  </div>
</section>`),
    componentBlock("Inner page hero", "Heroes", `<div class="component-hero-preview"><span class="eyebrow">Page</span><h2>Inner page headline.</h2><p>Compact support text.</p></div>`, `<!-- INNER PAGE HERO -->
<section class="page-hero">
  <div class="container">
    <div class="page-hero-grid">
      <div>
        <span class="eyebrow">Page label</span>
        <h1>Inner page headline.</h1>
      </div>
      <p>Compact support text for the page.</p>
    </div>
  </div>
</section>`),
    componentBlock("Hero note", "Heroes", `<div class="hero-note"><img src="${img(3)}" alt="Note image"><p>Small proof note below a hero.</p></div>`, `<!-- HERO NOTE -->
<div class="hero-note">
  <img src="assets/images/img (3).jpg" alt="Editorial portrait crop">
  <p>Small proof note below a hero.</p>
</div>`)
  ];

  const content = [
    componentBlock("Keyword rail", "Content", `<div class="keyword-rail component-rail-preview"><div class="rail-track"><span class="rail-word">Strategy</span><span class="rail-word">Design</span><span class="rail-word">Websites</span></div></div>`, `<!-- KEYWORD RAIL -->
<section class="keyword-rail" aria-label="Template keywords">
  <div class="rail-track">
    <span class="rail-word">Strategy</span>
    <span class="rail-word">Design</span>
    <span class="rail-word">Websites</span>
  </div>
</section>`),
    componentBlock("About tabs", "Content", `<div class="about-tabs component-tabs-preview"><div class="tab-buttons"><button class="tab-button is-active">About</button><button class="tab-button">Process</button></div><div class="tab-panel panel is-active"><div><h3>Flexible website system.</h3><p>Tabs keep content compact.</p></div></div></div>`, `<!-- ABOUT TABS -->
<div class="about-tabs" data-tabs>
  <div class="tab-buttons">
    <button class="tab-button is-active" data-tab-target="tab-about">About</button>
    <button class="tab-button" data-tab-target="tab-process">Process</button>
  </div>
  <div class="tab-panel panel is-active" id="tab-about" data-tab-panel>
    <div>
      <h3>Flexible website system.</h3>
      <p>Tabs keep content compact.</p>
    </div>
  </div>
</div>`),
    componentBlock("Video showcase", "Content", `<div class="video-showcase component-video-preview"><video src="${vid("18120715-hd_1920_1080_60fps.mp4")}" autoplay muted loop playsinline></video><div class="video-overlay"><span class="eyebrow">Motion</span><button class="play-button">Play</button></div></div>`, `<!-- VIDEO SHOWCASE -->
<div class="video-showcase">
  <video src="assets/video/hero.mp4" autoplay muted loop playsinline></video>
  <div class="video-overlay">
    <span class="eyebrow">Motion preview</span>
    <button class="play-button" type="button" data-video-open="assets/video/hero.mp4">Play</button>
  </div>
</div>`),
    componentBlock("Logo strip", "Content", `<div class="logo-strip"><div class="logo-item">NOVA</div><div class="logo-item">ARC</div><div class="logo-item">SHIFT</div></div>`, `<!-- LOGO STRIP -->
<div class="logo-strip">
  <div class="logo-item">NOVA</div>
  <div class="logo-item">ARC</div>
  <div class="logo-item">SHIFT</div>
</div>`),
    componentBlock("Testimonial", "Content", `<div class="testimonial panel component-testimonial-preview"><img src="${img(4)}" alt="Testimonial"><div class="testimonial-quote"><blockquote>"A polished starting point."</blockquote><cite>Client name</cite></div></div>`, `<!-- TESTIMONIAL -->
<div class="testimonial panel">
  <img src="assets/images/img (4).jpg" alt="Studio work environment">
  <div class="testimonial-quote">
    <blockquote>"A polished starting point."</blockquote>
    <cite>Client name</cite>
  </div>
</div>`),
    componentBlock("Stats band", "Content", `<div class="stats-band"><div class="stat-card"><div class="stat-number">16</div><div class="stat-label">HTML pages</div></div><div class="stat-card"><div class="stat-number">4</div><div class="stat-label">Home variants</div></div></div>`, `<!-- STATS BAND -->
<div class="stats-band">
  <div class="stat-card">
    <div class="stat-number">16</div>
    <div class="stat-label">HTML pages</div>
  </div>
  <div class="stat-card">
    <div class="stat-number">4</div>
    <div class="stat-label">Home variants</div>
  </div>
</div>`)
  ];

  const cards = [
    componentBlock("Work card", "Cards", `<article class="work-card"><img src="${img(1)}" alt="Work"><div class="work-card-body"><h3>Signal Theory</h3><p>Brand system preview.</p></div></article>`, `<!-- WORK CARD -->
<article class="work-card" data-category="brand">
  <a href="work-details.html"><img src="assets/images/img (1).jpg" alt="Project image"></a>
  <div class="work-card-body">
    <h3><a href="work-details.html">Signal Theory</a></h3>
    <p>Brand system preview.</p>
  </div>
</article>`),
    componentBlock("Service card", "Cards", `<article class="service-card"><span class="service-index">01</span><h3>Brand systems</h3><p>Identity foundations and visual language.</p></article>`, `<!-- SERVICE CARD -->
<article class="service-card">
  <span class="service-index">01</span>
  <h3>Brand systems</h3>
  <p>Identity foundations and visual language.</p>
</article>`),
    componentBlock("Pricing card", "Cards", `<article class="pricing-card"><h3>Starter</h3><div class="price">$49</div><div class="price-note">For solo launches</div><a class="button button-primary" href="#">Start</a></article>`, `<!-- PRICING CARD -->
<article class="pricing-card">
  <h3>Starter</h3>
  <div class="price">$49</div>
  <div class="price-note">For solo launches</div>
  <a class="button button-primary" href="#">Start with this</a>
</article>`),
    componentBlock("Featured pricing", "Cards", `<article class="pricing-card featured"><h3>Professional</h3><div class="price">$129</div><div class="price-note">For client-ready sites</div><a class="button button-dark" href="#">Build</a></article>`, `<!-- FEATURED PRICING CARD -->
<article class="pricing-card featured">
  <h3>Professional</h3>
  <div class="price">$129</div>
  <div class="price-note">For client-ready sites</div>
  <a class="button button-dark" href="#">Build professional</a>
</article>`),
    componentBlock("Blog card", "Cards", `<article class="blog-card"><img src="${img(5)}" alt="Blog"><div class="blog-card-body"><h3>Agency homepage structure</h3><p>A practical design note.</p></div></article>`, `<!-- BLOG CARD -->
<article class="blog-card">
  <a href="blog-details.html"><img src="assets/images/img (5).jpg" alt="Blog image"></a>
  <div class="blog-card-body">
    <h3><a href="blog-details.html">Agency homepage structure</a></h3>
    <p>A practical design note.</p>
  </div>
</article>`),
    componentBlock("Team card", "Cards", `<article class="team-card"><img src="${img(3)}" alt="Team"><div class="team-card-body"><h3>Creative Director</h3><p>Profile card text.</p></div></article>`, `<!-- TEAM CARD -->
<article class="team-card">
  <img src="assets/images/img (3).jpg" alt="Team member">
  <div class="team-card-body">
    <h3>Creative Director</h3>
    <p>Profile card text.</p>
  </div>
</article>`)
  ];

  const interactive = [
    componentBlock("FAQ accordion", "Interactive", `<div class="faq-list"><div class="faq-item is-open"><button class="faq-question"><span>Can I customize it?</span><span>+</span></button><div class="faq-answer">Yes, edit the HTML and CSS tokens.</div></div></div>`, `<!-- FAQ ACCORDION -->
<div class="faq-list">
  <div class="faq-item is-open">
    <button class="faq-question" type="button" data-faq-question>
      <span>Can I customize it?</span>
      <span>+</span>
    </button>
    <div class="faq-answer">Yes, edit the HTML and CSS tokens.</div>
  </div>
</div>`),
    componentBlock("Filter buttons", "Interactive", `<div class="filter-row"><button class="filter-button is-active">all</button><button class="filter-button">brand</button><button class="filter-button">web</button></div>`, `<!-- WORK FILTERS -->
<div class="filter-row">
  <button class="filter-button is-active" type="button" data-filter="all">all</button>
  <button class="filter-button" type="button" data-filter="brand">brand</button>
  <button class="filter-button" type="button" data-filter="web">web</button>
</div>`),
    componentBlock("Search overlay", "Interactive", `<div class="search-box component-search-preview"><button class="icon-button">Close</button><input type="search" placeholder="Search pages"></div>`, `<!-- SEARCH OVERLAY -->
<div class="search-overlay" data-search-overlay>
  <div class="search-box">
    <button class="icon-button" type="button" data-search-close>Close</button>
    <input type="search" placeholder="Search pages">
  </div>
</div>`),
    componentBlock("Video modal", "Interactive", `<div class="modal-box component-modal-preview"><button class="icon-button">Close</button><video src="${vid("hero.mp4")}" muted playsinline></video></div>`, `<!-- VIDEO MODAL -->
<div class="video-modal" data-video-modal>
  <div class="modal-box">
    <button class="icon-button" type="button" data-video-close>Close</button>
    <video controls playsinline></video>
  </div>
</div>`),
    componentBlock("Scroll to top", "Interactive", `<button class="scroll-top component-scroll-preview is-visible" type="button">Top</button>`, `<!-- SCROLL TO TOP -->
<button class="scroll-top" type="button" data-scroll-top aria-label="Scroll to top">Top</button>`)
  ];

  const layout = [
    componentBlock("Sidebar widget", "Layout", `<aside class="sidebar-widget"><h3>Categories</h3><p>Brand strategy<br>Website systems<br>Launch notes</p></aside>`, `<!-- SIDEBAR WIDGET -->
<aside class="sidebar-widget">
  <h3>Categories</h3>
  <p>Brand strategy<br>Website systems<br>Launch notes</p>
</aside>`),
    componentBlock("Article quote", "Layout", `<div class="quote-card">The strongest templates make each decision easier to see.</div>`, `<!-- QUOTE CARD -->
<div class="quote-card">
  The strongest templates make each decision easier to see.
</div>`),
    componentBlock("Contact card", "Layout", `<div class="contact-card"><h3>Email</h3><p>hello@db7template.test</p></div>`, `<!-- CONTACT CARD -->
<div class="contact-card">
  <h3>Email</h3>
  <p>hello@db7template.test</p>
</div>`),
    componentBlock("Contact form", "Layout", `<form class="form-grid"><input class="field" placeholder="Name"><input class="field" placeholder="Email"><textarea placeholder="Project details"></textarea><button class="button button-primary">Send</button></form>`, `<!-- CONTACT FORM -->
<form class="form-grid">
  <input class="field" placeholder="Name">
  <input class="field" placeholder="Email">
  <textarea placeholder="Project details"></textarea>
  <button class="button button-primary" type="submit">Send message</button>
</form>`),
    componentBlock("Map placeholder", "Layout", `<div class="map-placeholder"><span class="eyebrow">Location map placeholder</span></div>`, `<!-- MAP PLACEHOLDER -->
<div class="map-placeholder">
  <span class="eyebrow">Location map placeholder</span>
</div>`),
    componentBlock("Masonry item", "Layout", `<div class="masonry-grid component-masonry-preview"><article class="work-card"><img src="${img(9)}" alt="Masonry"><div class="work-card-body"><h3>Masonry card</h3></div></article></div>`, `<!-- MASONRY GRID ITEM -->
<div class="masonry-grid">
  <article class="work-card">
    <img src="assets/images/img (9).jpg" alt="Masonry work">
    <div class="work-card-body">
      <h3>Masonry card</h3>
    </div>
  </article>
</div>`)
  ];

  const pageBlocks = [
    componentBlock("Project facts band", "Page Blocks", `<div class="stats-band"><div class="stat-card"><div class="stat-label">Client</div><div class="footer-title">Atlas Mode</div></div><div class="stat-card"><div class="stat-label">Year</div><div class="footer-title">2026</div></div></div>`, `<!-- PROJECT FACTS BAND -->
<div class="stats-band">
  <div class="stat-card">
    <div class="stat-label">Client</div>
    <div class="footer-title">Atlas Mode</div>
  </div>
  <div class="stat-card">
    <div class="stat-label">Year</div>
    <div class="footer-title">2026</div>
  </div>
</div>`),
    componentBlock("Gallery grid", "Page Blocks", `<div class="grid grid-3"><img class="rounded-media" src="${img(4)}" alt="Gallery"><img class="rounded-media" src="${img(8)}" alt="Gallery"><img class="rounded-media" src="${img(12)}" alt="Gallery"></div>`, `<!-- GALLERY GRID -->
<div class="grid grid-3">
  <img class="rounded-media" src="assets/images/img (4).jpg" alt="Gallery image">
  <img class="rounded-media" src="assets/images/img (8).jpg" alt="Gallery image">
  <img class="rounded-media" src="assets/images/img (12).jpg" alt="Gallery image">
</div>`),
    componentBlock("Profile detail", "Page Blocks", `<div class="grid grid-2"><img class="rounded-media" src="${img(3)}" alt="Profile"><div class="detail-content"><h2>Bio</h2><p>Profile text for a specialist.</p></div></div>`, `<!-- PROFILE DETAIL -->
<div class="grid grid-2">
  <img class="rounded-media" src="assets/images/img (3).jpg" alt="Profile">
  <div class="detail-content">
    <h2>Bio</h2>
    <p>Profile text for a specialist.</p>
  </div>
</div>`),
    componentBlock("Error hero", "Page Blocks", `<div><div class="error-code">404</div><h3>This page stepped outside the grid.</h3></div>`, `<!-- ERROR HERO -->
<section class="page-hero">
  <div class="container">
    <div class="error-code">404</div>
    <h1>This page stepped outside the grid.</h1>
    <a class="button button-primary" href="index.html">Back home</a>
  </div>
</section>`),
    componentBlock("Footer CTA", "Page Blocks", `<div class="footer-top component-footer-preview"><h2>Ready to shape a sharper digital presence?</h2><a class="button button-primary" href="#">Let's talk</a></div>`, `<!-- FOOTER CTA -->
<div class="footer-top">
  <h2>Ready to shape a sharper digital presence?</h2>
  <a class="button button-primary" href="contact.html">Let's talk</a>
</div>`),
    componentBlock("Footer columns", "Page Blocks", `<div class="footer-grid component-footer-grid-preview"><div><div class="footer-title">Pages</div><p>About<br>Services<br>Work</p></div><div><div class="footer-title">Contact</div><p>hello@db7template.test</p></div></div>`, `<!-- FOOTER COLUMNS -->
<div class="footer-grid">
  <div>
    <div class="footer-title">Pages</div>
    <a href="about.html">About</a>
    <a href="service.html">Services</a>
  </div>
  <div>
    <div class="footer-title">Contact</div>
    <a href="mailto:hello@db7template.test">hello@db7template.test</a>
  </div>
</div>`)
  ];

  const pageSections = [
    componentBlock("Works section", "Page Sections", `<div class="filter-row" style="margin-bottom: 18px;"><button class="filter-button is-active">all</button><button class="filter-button">brand</button><button class="filter-button">web</button></div><div class="work-grid component-section-grid">${works.slice(0, 3).map(([title, text, image, category]) => `<article class="work-card" data-category="${category}"><a href="work-details.html"><img src="${image}" alt="${title}"></a><div class="work-card-body"><div class="tag-row"><span class="tag">${category}</span><span class="tag tag-hot">db7</span></div><h3><a href="work-details.html">${title}</a></h3><p>${text}</p></div></article>`).join("")}</div>`, `<!-- WORKS SECTION -->
<section class="section" data-filter-scope>
  <div class="container">
    <div class="section-heading">
      <div>
        <span class="eyebrow">Selected work</span>
        <h2>Case-study layouts for brands, products and editorial launches.</h2>
      </div>
      <p>Show the work with clear categories, strong imagery and concise project context.</p>
    </div>
    <div class="filter-row">
      <button class="filter-button is-active" type="button" data-filter="all">all</button>
      <button class="filter-button" type="button" data-filter="brand">brand</button>
      <button class="filter-button" type="button" data-filter="web">web</button>
      <button class="filter-button" type="button" data-filter="product">product</button>
    </div>
    <div class="work-grid" data-stagger>
      <article class="work-card" data-category="brand" data-animate="scale-in">
        <a href="work-details.html"><img src="assets/images/img (1).jpg" alt="Signal Theory project"></a>
        <div class="work-card-body">
          <div class="tag-row">
            <span class="tag">brand</span>
            <span class="tag tag-hot">db7</span>
          </div>
          <h3><a href="work-details.html">Signal Theory</a></h3>
          <p>Brand system for a consulting lab.</p>
        </div>
      </article>
      <article class="work-card" data-category="web" data-animate="scale-in">
        <a href="work-details.html"><img src="assets/images/img (2).jpg" alt="Atlas Mode project"></a>
        <div class="work-card-body">
          <div class="tag-row">
            <span class="tag">web</span>
            <span class="tag tag-hot">db7</span>
          </div>
          <h3><a href="work-details.html">Atlas Mode</a></h3>
          <p>Portfolio platform with editorial case studies.</p>
        </div>
      </article>
      <article class="work-card" data-category="product" data-animate="scale-in">
        <a href="work-details.html"><img src="assets/images/img (4).jpg" alt="Northline project"></a>
        <div class="work-card-body">
          <div class="tag-row">
            <span class="tag">product</span>
            <span class="tag tag-hot">db7</span>
          </div>
          <h3><a href="work-details.html">Northline</a></h3>
          <p>Launch system for a B2B product team.</p>
        </div>
      </article>
    </div>
  </div>
</section>`, { wide: true, previewClass: "component-real-preview" }),
    componentBlock("Services section", "Page Sections", `<div class="service-grid component-section-grid">${services.slice(0, 3).map(([title, text], index) => `<article class="service-card"><span class="service-index">${String(index + 1).padStart(2, "0")}</span><h3>${title}</h3><p>${text}</p></article>`).join("")}</div>`, `<!-- SERVICES SECTION -->
<section class="section">
  <div class="container">
    <div class="section-heading">
      <div>
        <span class="eyebrow">Services</span>
        <h2>Everything a modern studio template needs to present a serious offer.</h2>
      </div>
      <p>Use these cards for services, capabilities, departments or productized packages.</p>
    </div>
<div class="service-grid" data-stagger>
  <article class="service-card" data-animate="fade-up">
    <span class="service-index">01</span>
    <h3>Brand systems</h3>
    <p>Identity foundations and visual language.</p>
  </article>
  <article class="service-card" data-animate="fade-up">
    <span class="service-index">02</span>
    <h3>Website design</h3>
    <p>Premium page systems with strong hierarchy, conversion paths and editorial rhythm.</p>
  </article>
  <article class="service-card" data-animate="fade-up">
    <span class="service-index">03</span>
    <h3>Frontend build</h3>
    <p>Clean static HTML, scalable CSS, responsive sections and interaction patterns.</p>
  </article>
</div>
  </div>
</section>`, { wide: true, previewClass: "component-real-preview" }),
    componentBlock("Pricing section", "Page Sections", `<div class="pricing-grid component-section-grid"><article class="pricing-card"><h3>Starter</h3><div class="price">$49</div><div class="price-note">For solo launches</div><a class="button button-primary" href="#">Start with this</a></article><article class="pricing-card featured"><h3>Professional</h3><div class="price">$129</div><div class="price-note">For client-ready sites</div><a class="button button-dark" href="#">Build professional</a></article><article class="pricing-card"><h3>Studio</h3><div class="price">$249</div><div class="price-note">For repeatable delivery</div><a class="button button-primary" href="#">Scale the system</a></article></div>`, `<!-- PRICING SECTION -->
<section class="section">
  <div class="container">
    <div class="section-heading">
      <div>
        <span class="eyebrow">Pricing</span>
        <h2>Simple package cards with a premium static-template feel.</h2>
      </div>
      <p>The layout supports subscriptions, one-time packages or service tiers.</p>
    </div>
<div class="pricing-grid" data-stagger>
  <article class="pricing-card" data-animate="scale-in">
    <h3>Starter</h3>
    <div class="price">$49</div>
    <div class="price-note">For solo launches</div>
    <a class="button button-primary" href="contact.html">Start with this</a>
  </article>
  <article class="pricing-card featured" data-animate="scale-in">
    <h3>Professional</h3>
    <div class="price">$129</div>
    <div class="price-note">For client-ready sites</div>
    <a class="button button-dark" href="contact.html">Build professional</a>
  </article>
  <article class="pricing-card" data-animate="scale-in">
    <h3>Studio</h3>
    <div class="price">$249</div>
    <div class="price-note">For repeatable delivery</div>
    <a class="button button-primary" href="contact.html">Scale the system</a>
  </article>
</div>
  </div>
</section>`, { wide: true, previewClass: "component-real-preview" }),
    componentBlock("FAQ section", "Page Sections", `<div class="faq-list">${faqs.slice(0, 3).map(([question, answer], index) => `<div class="faq-item ${index === 0 ? "is-open" : ""}"><button class="faq-question" type="button"><span>${question}</span><span>+</span></button><div class="faq-answer">${answer}</div></div>`).join("")}</div>`, `<!-- FAQ SECTION -->
<section class="section">
  <div class="container">
    <div class="section-heading">
      <div>
        <span class="eyebrow">FAQ</span>
        <h2>Direct answers for buyers, clients and internal teams.</h2>
      </div>
      <p>Keep the final decision points visible before the footer CTA.</p>
    </div>
<div class="faq-list" data-stagger>
  <div class="faq-item is-open" data-animate="fade-up">
    <button class="faq-question" type="button" data-faq-question>
      <span>Can I use this for client projects?</span>
      <span>+</span>
    </button>
    <div class="faq-answer">Yes, edit and adapt it for client work.</div>
  </div>
  <div class="faq-item" data-animate="fade-up">
    <button class="faq-question" type="button" data-faq-question>
      <span>Does it include multiple pages?</span>
      <span>+</span>
    </button>
    <div class="faq-answer">Yes. The package includes home variants plus internal pages.</div>
  </div>
</div>
  </div>
</section>`, { wide: true, previewClass: "component-real-preview" }),
    componentBlock("Footer section", "Page Sections", `<div class="footer-top component-footer-preview"><h2>Ready to shape a sharper digital presence?</h2><a class="button button-primary" href="#">Let's talk</a></div><div class="footer-grid component-footer-grid-preview"><div><a class="brand" href="#"><span class="brand-mark">7</span><span>db7 Template</span></a><p>A premium HTML template for agencies, portfolios and service businesses.</p></div><div><div class="footer-title">Pages</div><a href="#">About</a><br><a href="#">Services</a></div></div>`, `<!-- FOOTER SECTION -->
<footer class="site-footer">
  <div class="container">
    <div class="footer-top" data-animate="fade-up">
      <h2>Ready to shape a sharper digital presence?</h2>
      <a class="button button-primary" href="contact.html">Let's talk</a>
    </div>
    <div class="footer-grid" data-animate="fade-up">
      <div>
        <a class="brand" href="index.html">
          <span class="brand-mark">7</span>
          <span>db7 Template</span>
        </a>
        <p>A premium HTML template for agencies, portfolios and service businesses.</p>
      </div>
      <div>
        <div class="footer-title">Pages</div>
        <a href="about.html">About</a><br>
        <a href="service.html">Services</a><br>
        <a href="work.html">Work</a>
      </div>
      <div>
        <div class="footer-title">Contact</div>
        <a href="mailto:hello@db7template.test">hello@db7template.test</a><br>
        <span>Montevideo, Uruguay</span>
      </div>
    </div>
  </div>
</footer>`, { wide: true, previewClass: "component-real-preview" })
  ];

  const animationGuide = [
    componentBlock("Initial hero animation", "Animation API", `<div class="component-code-note"><h3>First viewport</h3><p>Use <code>data-initial</code> only for the first visible hero/page title. It runs once on load and does not wait for scroll.</p></div>`, `<!-- INITIAL LOAD ANIMATION -->
<div data-animate="fade-up" data-initial>
  <span class="eyebrow">Digital studio template</span>
  <h1 class="hero-title">Build premium websites with rhythm, motion and structure.</h1>
</div>`),
    componentBlock("Scroll reveal", "Animation API", `<div class="component-code-note"><h3>Scroll reveal</h3><p>Use <code>data-animate</code> below the fold. Supported values: <code>fade-up</code>, <code>fade-down</code>, <code>fade-left</code>, <code>fade-right</code>, <code>scale-in</code>, <code>blur-in</code>, <code>clip-up</code>, <code>rotate-in</code>, <code>image-reveal</code>.</p></div>`, `<!-- SCROLL REVEAL -->
<article class="service-card" data-animate="fade-up">
  <span class="service-index">01</span>
  <h3>Brand systems</h3>
  <p>Identity foundations and visual language for a polished website launch.</p>
</article>`),
    componentBlock("Stagger groups", "Animation API", `<div class="component-code-note"><h3>Stagger</h3><p>Add <code>data-stagger</code> to a grid. Children with <code>data-animate</code> receive automatic delays.</p></div>`, `<!-- STAGGER GROUP -->
<div class="service-grid" data-stagger>
  <article class="service-card" data-animate="fade-up">
    <span class="service-index">01</span>
    <h3>Brand systems</h3>
    <p>Identity foundations and visual language.</p>
  </article>
  <article class="service-card" data-animate="fade-up">
    <span class="service-index">02</span>
    <h3>Website design</h3>
    <p>Premium page systems with strong hierarchy.</p>
  </article>
</div>`),
    componentBlock("Animated counters", "Animation API", `<div class="stats-band"><div class="stat-card"><div class="stat-number" data-counter-target="36" data-counter-suffix="+">36+</div><div class="stat-label">Reusable blocks</div></div></div>`, `<!-- COUNTER -->
<div class="stat-number" data-counter-target="36" data-counter-suffix="+">36+</div>
<div class="stat-number" data-counter-target="100" data-counter-suffix="%">100%</div>`),
    componentBlock("Soft parallax", "Animation API", `<div class="component-code-note"><h3>Parallax</h3><p>Use sparingly on large media only. It is disabled on small screens and with reduced motion.</p></div>`, `<!-- SOFT PARALLAX -->
<div class="video-showcase" data-parallax data-parallax-speed="0.06">
  <video src="assets/video/hero.mp4" autoplay muted loop playsinline></video>
</div>`),
    componentBlock("Reduced motion", "Animation API", `<div class="component-code-note"><h3>Accessibility</h3><p>The system respects <code>prefers-reduced-motion</code>. Content remains visible if JavaScript fails.</p></div>`, `/* REDUCED MOTION */
@media (prefers-reduced-motion: reduce) {
  [data-animate],
  [data-parallax] {
    animation: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}`)
  ];

  return `${pageHero("Components", "36+ reusable blocks in one organized copy-and-paste library.", "Use this page as a component index for db7 Template. Each block includes a compact preview and editable HTML with section comments.", img(6))}
${componentsSection("Foundation Blocks", "Small primitives used across headings, labels, actions and tags.", foundation)}
${componentsSection("Navigation Blocks", "Header, dropdown, mega menu and overlay triggers.", navigation)}
${componentsSection("Hero Blocks", "Homepage and inner page hero patterns.", heroes)}
${componentsSection("Content Blocks", "Motion, tabs, logos, testimonials and stats.", content)}
${componentsSection("Page Section Previews", "Larger copy-ready sections shown closer to how they appear across template pages.", pageSections)}
${componentsSection("Card Blocks", "Portfolio, services, pricing, blog and team cards.", cards)}
${componentsSection("Interactive Blocks", "JavaScript-ready accordions, filters, modals and utility controls.", interactive)}
${componentsSection("Layout Blocks", "Sidebars, forms, contact cards and layout helpers.", layout)}
${componentsSection("Page Blocks", "Larger page-specific sections for details, footer and error states.", pageBlocks)}
${componentsSection("Animation API", "Animation attributes and helper classes used by the template.", animationGuide)}
      </main>`;
}

const home1 = shell("Home 1", `${heroHome()}
${keywordRail()}
${aboutTabs()}
${videoShowcase()}
${logos()}
${worksSection()}
${testimonial()}
${stats()}
${servicesSection()}
${pricing()}
${faqSection()}
      </main>`);

const home4 = shell("Home 4", `${heroHomeVideoBg()}
${keywordRail()}
${aboutTabs()}
${videoShowcase()}
${logos()}
${worksSection()}
${testimonial()}
${stats()}
${servicesSection()}
${pricing()}
${faqSection()}
      </main>`, { transparentHeader: true });

const home2 = shell("Home 2", `${pageHero("Company home", "A stronger digital presence for companies that need clarity and trust.", "A corporate home variant for advisory teams, professional services and organizations that need calm authority.", img(2))}
${stats()}
${servicesSection()}
        <section class="section paper-section">
          <div class="container">
            ${sectionHeading("Values", "Clarity, momentum and proof across every page.", "Use this section for company principles, culture statements or delivery standards.")}
            <div class="grid grid-3">
              ${["Clear positioning", "Reliable delivery", "Measured growth"].map((item) => `<div class="contact-card"><h3>${item}</h3><p>Focused copy and visual hierarchy help visitors understand the company faster.</p></div>`).join("")}
            </div>
          </div>
        </section>
${worksSection()}
        <section class="section">
          <div class="container">
            ${sectionHeading("Team preview", "A compact team area for trust and personality.", "Swap these profiles with leadership, founders or delivery teams.")}
            <div class="team-grid">
              ${["Creative Director", "Frontend Lead", "Strategy Partner"].map((role, i) => `<article class="team-card"><img src="${img(i + 3)}" alt="${role}"><div class="team-card-body"><h3>${role}</h3><p>db7 Template collaborator focused on practical, polished digital work.</p></div></article>`).join("")}
            </div>
          </div>
        </section>
        <section class="section-sm"><div class="container"><div class="blog-grid">${blogCards()}</div></div></section>
      </main>`);

const home3 = shell("Home 3", `${pageHero("Product home", "Launch product pages with speed, structure and visual impact.", "A tech and SaaS variant with feature cards, pricing, social proof and a motion-forward first impression.", img(12))}
${videoShowcase()}
        <section class="section">
          <div class="container">
            ${sectionHeading("Features", "Product storytelling blocks for launches and SaaS pages.", "Use compact cards to describe benefits without overwhelming the first viewport.")}
            <div class="service-grid">
              ${["Conversion sections", "Feature cards", "Integration strip", "Pricing preview", "FAQ logic", "Launch CTA"].map((item, i) => `<article class="service-card"><span class="service-index">${String(i + 1).padStart(2, "0")}</span><h3>${item}</h3><p>Reusable content block designed for clean editing and responsive presentation.</p></article>`).join("")}
            </div>
          </div>
        </section>
${logos()}
${pricing()}
${testimonial()}
${faqSection()}
      </main>`);

const about = shell("About", `${pageHero("About db7 Template", "Build premium websites with db7 Template.", "Use db7 Template as a polished starting point for agency, portfolio and service websites.", img(1))}
        <section class="section"><div class="container"><div class="grid grid-2"><img class="rounded-media" src="${img(4)}" alt="Studio detail"><div class="detail-content"><h2>A template system for serious creative work.</h2><p>The structure supports agency portfolios, independent consultants and service businesses that need substance beyond a one-page landing site.</p><p>Every page is static, readable and designed around reusable blocks.</p></div></div></div></section>
${stats()}
${servicesSection()}
${faqSection()}
      </main>`);

const service = shell("Service", `${pageHero("Services", "Digital services presented with strong hierarchy and clear outcomes.", "Use this page to explain capabilities, packages and the way your team moves from idea to launch.", img(8))}
${servicesSection()}
        <section class="section paper-section"><div class="container">${sectionHeading("Process", "Discover, design, build and launch without losing momentum.", "A simple process area gives visitors confidence before they contact you.")}<div class="grid grid-4">${["Discover", "Design", "Build", "Launch"].map((step) => `<div class="contact-card"><h3>${step}</h3><p>Focused work phase with clear decisions and practical deliverables.</p></div>`).join("")}</div></div></section>
${pricing()}
${faqSection()}
      </main>`);

const serviceDetails = shell("Service Details", `${pageHero("Service details", "Website design systems for teams that need polish and speed.", "A detail page for one core service, including deliverables, process, related proof and a direct CTA.", img(10))}
        <section class="section"><div class="container split-layout"><div class="detail-content"><h2>What this service covers</h2><p>We map the site structure, design the visual system, build responsive HTML and prepare clean launch files for static hosting.</p><div class="quote-card">Good design makes the offer easier to understand before it makes anything look expensive.</div><h2>Deliverables</h2><p>Homepage, internal page patterns, CSS tokens, interaction scripts, asset map and handoff notes.</p><h2>Process</h2><p>Discovery, wire direction, visual pass, production build, QA and deployment support.</p></div>${sidebar()}</div></section>
${worksSection()}
      </main>`);

const blog = shell("Blog", `${pageHero("Blog", "Notes on design systems, launch pages and premium static websites.", "Use the blog list with sidebar widgets for categories, recent posts and compact discovery.", img(11))}
        <section class="section"><div class="container split-layout"><div class="blog-grid">${blogCards()}${blogCards()}</div>${sidebar()}</div></section>
      </main>`);

const blogDetails = shell("Blog Details", `${pageHero("Blog details", "How to structure a premium agency homepage.", "A complete article layout with imagery, quote, author card, comments and sidebar content.", img(5))}
        <section class="section"><div class="container split-layout"><article class="article-content"><img class="rounded-media" src="${img(7)}" alt="Article visual" style="aspect-ratio: 16 / 9;"><h2>Start with the promise, then prove it.</h2><p>A premium homepage works best when every section has a job. The hero introduces the offer, the rail creates energy, the work section builds trust and the FAQ removes friction.</p><div class="quote-card">The strongest templates do not add more noise. They make each decision easier to see.</div><h2>Design for maintenance.</h2><p>Clean HTML comments, predictable classes and centralized color tokens make the source easier to adapt for future clients.</p><div class="contact-card"><h3>Author: db7 Template</h3><p>Design notes from the team behind this static template system.</p></div><div class="contact-card"><h3>Comments</h3><p>No comments yet. Start the conversation with a practical launch question.</p></div><form class="form-grid"><input class="field" placeholder="Name"><input class="field" placeholder="Email"><textarea placeholder="Comment"></textarea><button class="button button-primary" type="submit">Post comment</button></form></article>${sidebar()}</div></section>
      </main>`);

const work = shell("Work", `${pageHero("Work", "A polished portfolio grid for case studies and launch stories.", "Filter projects by discipline and send visitors into complete work detail pages.", img(6))}
${worksSection()}
      </main>`);

const workMasonry = shell("Work Masonry", `${pageHero("Work masonry", "A masonry portfolio variant for visual-heavy studios.", "Use this page when image rhythm matters more than strict card alignment.", img(9))}
${worksSection({ masonry: true })}
      </main>`);

const workDetails = shell("Work Details", `${pageHero("Work details", "Atlas Mode: an editorial portfolio system for a growing studio.", "A case study page with project facts, challenge, solution, gallery and next-project CTA.", img(2))}
        <section class="section"><div class="container"><img class="rounded-media" src="${img(1)}" alt="Atlas Mode project" style="aspect-ratio: 16 / 9;"><div class="stats-band" style="margin-top: 24px;"><div class="stat-card"><div class="stat-label">Client</div><div class="footer-title">Atlas Mode</div></div><div class="stat-card"><div class="stat-label">Service</div><div class="footer-title">Website system</div></div><div class="stat-card"><div class="stat-label">Year</div><div class="footer-title">2026</div></div><div class="stat-card"><div class="stat-label">Result</div><div class="footer-title">Launch-ready</div></div></div></div></section>
        <section class="section"><div class="container detail-content"><h2>Challenge</h2><p>The studio needed a page system that could present strategy, visuals and measurable outcomes without becoming hard to maintain.</p><h2>Solution</h2><p>We used dark editorial sections, concise project cards, strong media crops and a simple structure for future case studies.</p><h2>Results</h2><p>The final template gives the brand a premium presence while keeping the source easy for non-technical edits.</p><div class="grid grid-3"><img class="rounded-media" src="${img(4)}" alt="Gallery image"><img class="rounded-media" src="${img(8)}" alt="Gallery image"><img class="rounded-media" src="${img(12)}" alt="Gallery image"></div><a class="button button-primary" href="work.html">Next project</a></div></section>
      </main>`);

const teamDetails = shell("Team Details", `${pageHero("Team details", "Mara Kline, creative systems director.", "A profile layout for leadership, partners, specialists or featured collaborators.", img(3))}
        <section class="section"><div class="container grid grid-2"><img class="rounded-media" src="${img(3)}" alt="Mara Kline"><div class="detail-content"><h2>Bio</h2><p>Mara shapes the strategic and visual direction for digital studio systems, bringing structure to brand-led websites and launch pages.</p><h2>Skills</h2><p>Creative direction, information architecture, visual systems, client workshops and content design.</p><div class="tag-row"><span class="tag">Strategy</span><span class="tag">Design</span><span class="tag">Frontend</span><span class="tag">Leadership</span></div><h2>Social links</h2><p>LinkedIn / Behance / Dribbble / Instagram</p></div></div></section>
${worksSection()}
      </main>`);

const errorPage = shell("404 Error", `${comment("ERROR HERO")}
      <main>
        <section class="page-hero">
          <div class="container">
            <div class="error-code">404</div>
            <h1 style="font-family: var(--font-display); font-size: var(--fs-page-hero); line-height: 1;">This page stepped outside the grid.</h1>
            <p class="hero-text">The page you are looking for is unavailable, moved or still waiting to be designed.</p>
            <div class="hero-actions">
              <a class="button button-primary" href="index.html">Back home</a>
              <a class="button button-secondary" href="contact.html">Contact us</a>
            </div>
          </div>
        </section>
      </main>`);

const contact = shell("Contact", `${pageHero("Contact", "Tell us what you want to launch, refine or rebuild.", "Use the contact layout for project inquiries, support requests or discovery calls.", img(12))}
        <section class="section"><div class="container split-layout"><div class="contact-card"><h2 style="font-family: var(--font-display); font-size: var(--fs-subsection);">Start a project</h2><p>Share a few details and the db7 Template flow will make the next step clear.</p><form class="form-grid" style="margin-top: 24px;"><input class="field" placeholder="Name"><input class="field" placeholder="Email"><input class="field" placeholder="Company"><input class="field" placeholder="Budget"><textarea placeholder="Project details"></textarea><button class="button button-primary" type="submit">Send message</button></form></div><div class="grid"><div class="contact-card"><h3>Email</h3><p>hello@db7template.test</p></div><div class="contact-card"><h3>Studio</h3><p>Montevideo, Uruguay<br>Remote-ready worldwide</p></div><div class="contact-card"><h3>Hours</h3><p>Monday to Friday<br>09:00 to 18:00</p></div></div></div></section>
        <section class="section-sm"><div class="container"><div class="map-placeholder"><span class="eyebrow">Location map placeholder</span></div></div></section>
      </main>`);

const components = shell("Components", componentsPageContent());

const output = {
  "index.html": home1,
  "home-2.html": home2,
  "home-3.html": home3,
  "home-4.html": home4,
  "about.html": about,
  "service.html": service,
  "service-details.html": serviceDetails,
  "blog.html": blog,
  "blog-details.html": blogDetails,
  "work.html": work,
  "work-masonry.html": workMasonry,
  "work-details.html": workDetails,
  "team-details.html": teamDetails,
  "404.html": errorPage,
  "components.html": components,
  "contact.html": contact
};

for (const page of pages) {
  fs.writeFileSync(path.join(srcDir, page), decorateMotion(output[page]), "utf8");
}

console.log(`Generated ${pages.length} pages in src/`);
