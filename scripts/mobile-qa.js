const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { chromium } = require("playwright");

const root = path.join(__dirname, "..");
const outDir = path.join(root, "docs", "qa-mobile");
const baseUrl = "http://127.0.0.1:4173";

const pages = [
  ["home-1", "index.html"],
  ["home-2", "home-2.html"],
  ["home-3", "home-3.html"],
  ["home-4", "home-4.html"],
  ["about", "about.html"],
  ["service", "service.html"],
  ["service-details", "service-details.html"],
  ["blog", "blog.html"],
  ["blog-details", "blog-details.html"],
  ["work", "work.html"],
  ["work-masonry", "work-masonry.html"],
  ["work-details", "work-details.html"],
  ["team-details", "team-details.html"],
  ["error-404", "404.html"],
  ["components", "components.html"],
  ["contact", "contact.html"]
];

const viewports = [
  { label: "390", width: 390, height: 900 },
  { label: "320", width: 320, height: 740 }
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, retries = 40) {
  for (let index = 0; index < retries; index += 1) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch (_) {
      await wait(150);
    }
  }
  throw new Error(`Server did not respond at ${url}`);
}

async function auditLayout(page) {
  return page.evaluate(() => {
    const viewport = window.innerWidth;
    const documentWidth = Math.max(
      document.documentElement.scrollWidth,
      document.body ? document.body.scrollWidth : 0
    );
    const overflow = [];

    document.querySelectorAll("body *").forEach((element) => {
      if (element.closest(".keyword-rail") || element.closest("pre")) return;
      const style = window.getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden") return;
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      if (rect.right > viewport + 1 || rect.left < -1) {
        overflow.push({
          selector: `${element.tagName.toLowerCase()}${element.className ? `.${String(element.className).trim().replace(/\s+/g, ".")}` : ""}`,
          text: (element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 70),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width)
        });
      }
    });

    const tinyControls = [];
    document.querySelectorAll("button, .btn, .button, .menu-toggle, .scroll-top, input, textarea, select").forEach((element) => {
      const style = window.getComputedStyle(element);
      if (style.display === "none" || style.visibility === "hidden") return;
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      if (rect.width < 40 || rect.height < 40) {
        tinyControls.push({
          selector: `${element.tagName.toLowerCase()}${element.className ? `.${String(element.className).trim().replace(/\s+/g, ".")}` : ""}`,
          text: (element.textContent || element.getAttribute("aria-label") || "").trim().replace(/\s+/g, " ").slice(0, 70),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        });
      }
    });

    return {
      viewport,
      documentWidth,
      hasHorizontalOverflow: documentWidth > viewport + 1,
      overflow: overflow.slice(0, 12),
      tinyControls: tinyControls.slice(0, 12)
    };
  });
}

async function auditMenu(page) {
  await page.click("[data-menu-toggle]");
  await page.locator("[data-dropdown-toggle]", { hasText: "Pages" }).click();
  return page.evaluate(() => {
    const viewport = window.innerWidth;
    const nav = document.querySelector(".main-nav");
    const mega = document.querySelector(".nav-item.is-open .mega-menu");
    const navRect = nav ? nav.getBoundingClientRect() : null;
    const megaRect = mega ? mega.getBoundingClientRect() : null;
    return {
      open: document.body.classList.contains("menu-open"),
      navVisible: nav ? window.getComputedStyle(nav).display !== "none" : false,
      megaVisible: mega ? window.getComputedStyle(mega).display !== "none" : false,
      navOverflow: navRect ? navRect.left < -1 || navRect.right > viewport + 1 : true,
      megaOverflow: megaRect ? megaRect.left < -1 || megaRect.right > viewport + 1 : true,
      navRect: navRect
        ? { left: Math.round(navRect.left), right: Math.round(navRect.right), width: Math.round(navRect.width) }
        : null,
      megaRect: megaRect
        ? { left: Math.round(megaRect.left), right: Math.round(megaRect.right), width: Math.round(megaRect.width) }
        : null
    };
  });
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  const server = spawn(process.execPath, [path.join(root, "scripts", "dev-server.js")], {
    stdio: "ignore",
    env: { ...process.env, PORT: "4173" }
  });

  let browser;
  try {
    await waitForServer(`${baseUrl}/index.html`);
    browser = await chromium.launch({ channel: "msedge", headless: true });
    const failures = [];
    const screenshots = [];

    for (const viewport of viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: 1,
        isMobile: true
      });

      for (const [slug, fileName] of pages) {
        const page = await context.newPage();
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        page.on("console", (message) => {
          const text = message.text();
          if (text.includes("ERR_NETWORK_ACCESS_DENIED")) return;
          if (message.type() === "error") errors.push(text);
        });

        await page.goto(`${baseUrl}/${fileName}`, { waitUntil: "networkidle" });
        await page.evaluate(() => document.querySelectorAll("video").forEach((video) => video.pause()));

        const layout = await auditLayout(page);
        const screenshot = path.join(outDir, `${slug}-${viewport.label}.png`);
        await page.screenshot({ path: screenshot, fullPage: false });
        screenshots.push(path.relative(root, screenshot));

        let menu = null;
        if (slug === "home-1") {
          menu = await auditMenu(page);
          const menuScreenshot = path.join(outDir, `mobile-menu-${viewport.label}.png`);
          await page.screenshot({ path: menuScreenshot, fullPage: false });
          screenshots.push(path.relative(root, menuScreenshot));
        }

        if (layout.hasHorizontalOverflow || layout.overflow.length || layout.tinyControls.length || errors.length) {
          failures.push({ page: fileName, viewport: viewport.label, layout, errors });
        }

        if (menu && (!menu.open || !menu.navVisible || !menu.megaVisible || menu.navOverflow || menu.megaOverflow)) {
          failures.push({ page: fileName, viewport: viewport.label, menu });
        }

        await page.close();
      }

      await context.close();
    }

    console.log(JSON.stringify({ screenshots, failures }, null, 2));
    if (failures.length) process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
