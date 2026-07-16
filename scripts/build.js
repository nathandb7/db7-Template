const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const src = path.join(root, "src");
const dist = path.join(root, "dist");

function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const source = path.join(from, entry.name);
    const target = path.join(to, entry.name);

    if (entry.isDirectory()) {
      copyDir(source, target);
    } else {
      const isSourceImage = source.includes(`${path.sep}assets${path.sep}images${path.sep}`);
      const hasOptimizedWebp = /\.(jpe?g|png)$/i.test(entry.name)
        && fs.existsSync(source.replace(/\.(jpe?g|png)$/i, ".webp"));

      if (isSourceImage && hasOptimizedWebp) {
        continue;
      }

      fs.copyFileSync(source, target);
    }
  }
}

if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}

copyDir(src, dist);

const jsDir = path.join(dist, "assets", "js");
const bundleFiles = [
  "plugins.js",
  path.join("modules", "scroll-reveal.js"),
  path.join("modules", "scroll-parallax.js"),
  path.join("modules", "counter.js"),
  "main.js"
];
const bundle = bundleFiles
  .map((file) => fs.readFileSync(path.join(jsDir, file), "utf8"))
  .join("\n\n");

fs.writeFileSync(path.join(jsDir, "app.js"), bundle, "utf8");

const scriptBlock = [
  '    <script src="assets/js/plugins.js"></script>',
  '    <script src="assets/js/modules/scroll-reveal.js"></script>',
  '    <script src="assets/js/modules/scroll-parallax.js"></script>',
  '    <script src="assets/js/modules/counter.js"></script>',
  '    <script src="assets/js/main.js"></script>'
].join("\n");

const stylePath = path.join(dist, "assets", "css", "style.css");
const style = fs.readFileSync(stylePath, "utf8");
const styleTag = `    <style>\n${style}\n    </style>`;
const scriptTag = `    <script>\n${bundle}\n    </script>`;

for (const file of fs.readdirSync(dist).filter((item) => item.endsWith(".html"))) {
  const htmlPath = path.join(dist, file);
  const html = fs.readFileSync(htmlPath, "utf8");
  fs.writeFileSync(
    htmlPath,
    html
      .replace('    <link rel="stylesheet" href="assets/css/style.css">', styleTag)
      .replace(scriptBlock, scriptTag),
    "utf8"
  );
}

console.log("Built dist/ from src/");
