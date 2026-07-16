const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const imagesDir = path.join(__dirname, "..", "src", "assets", "images");
const maxWidth = 1440;

async function optimizeImage(file) {
  const source = path.join(imagesDir, file);
  const webpTarget = path.join(imagesDir, file.replace(/\.(jpe?g|png)$/i, ".webp"));
  const avifTarget = path.join(imagesDir, file.replace(/\.(jpe?g|png)$/i, ".avif"));
  const fallbackTarget = path.join(imagesDir, file.replace(/\.(jpe?g|png)$/i, "-fallback.jpg"));
  const image = sharp(source);
  const metadata = await image.metadata();
  const resize = metadata.width && metadata.width > maxWidth ? { width: maxWidth } : {};

  await image
    .clone()
    .resize(resize)
    .webp({
      quality: 72,
      effort: 6,
      smartSubsample: true
    })
    .toFile(webpTarget);

  await image
    .clone()
    .resize(resize)
    .avif({
      quality: 48,
      effort: 6
    })
    .toFile(avifTarget);

  await image
    .clone()
    .resize(resize)
    .jpeg({
      quality: 76,
      progressive: true,
      mozjpeg: true
    })
    .toFile(fallbackTarget);

  const original = fs.statSync(source).size;
  const webp = fs.statSync(webpTarget).size;
  const avif = fs.statSync(avifTarget).size;
  const fallback = fs.statSync(fallbackTarget).size;
  console.log(
    `${path.basename(file)} ${Math.round(original / 1024)}KB -> avif ${Math.round(avif / 1024)}KB, webp ${Math.round(webp / 1024)}KB, jpg ${Math.round(fallback / 1024)}KB`
  );
}

async function main() {
  const files = fs
    .readdirSync(imagesDir)
    .filter((file) => /\.(jpe?g|png)$/i.test(file) && !/-fallback\.jpg$/i.test(file));

  for (const file of files) {
    await optimizeImage(file);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
