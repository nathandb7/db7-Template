const fs = require("fs");
const http = require("http");
const path = require("path");

const root = path.join(__dirname, "..", "src");
const port = Number(process.env.PORT || 4173);
const host = "127.0.0.1";

const types = {
  ".css": "text/css; charset=utf-8",
  ".avif": "image/avif",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp"
};

function safePath(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  const file = clean === "/" ? "/index.html" : clean;
  const resolved = path.resolve(root, `.${file}`);
  return resolved.startsWith(root) ? resolved : null;
}

http
  .createServer((req, res) => {
    const file = safePath(req.url || "/");

    if (!file || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream"
    });
    fs.createReadStream(file).pipe(res);
  })
  .listen(port, host, () => {
    console.log(`Serving ${root} at http://${host}:${port}`);
  });
