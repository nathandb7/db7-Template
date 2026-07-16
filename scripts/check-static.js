const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "..", "src");
const htmlFiles = fs.readdirSync(src).filter((file) => file.endsWith(".html"));
const problems = [];

for (const file of htmlFiles) {
  const html = fs.readFileSync(path.join(src, file), "utf8");
  const matches = html.matchAll(/\b(href|src|srcset)="([^"]+)"/g);

  for (const match of matches) {
    const attr = match[1];
    const raw = match[2];
    const values =
      attr === "srcset"
        ? raw
            .split(",")
            .map((item) => item.trim().replace(/\s+\d+(?:\.\d+)?[wx]$/, ""))
            .filter(Boolean)
        : [raw];

    for (const value of values) {
      if (
        value.startsWith("http") ||
        value.startsWith("mailto:") ||
        value.startsWith("tel:") ||
        value.startsWith("#")
      ) {
        continue;
      }

      const clean = value.split("#")[0].split("?")[0];
      const target = path.join(src, clean);

      if (!fs.existsSync(target)) {
        problems.push(`${file} -> ${value}`);
      }
    }
  }
}

if (problems.length) {
  console.error("Missing local references:");
  for (const problem of problems) console.error(`- ${problem}`);
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files. All local references exist.`);
