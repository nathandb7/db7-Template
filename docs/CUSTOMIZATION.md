# Customization Guide

This guide explains how to adapt db7 Template for your own brand, agency, portfolio or service business.

## Editing Text

Shared content is generated from:

```txt
scripts/generate-pages.js
```

Use this file for navigation, footer, repeated cards, page layouts and component examples.

After editing it, run:

```bash
npm run generate
```

Direct edits in `src/*.html` are fine for one-off changes, but they may be overwritten by `npm run generate`.

## Changing Images

Place images in:

```txt
src/assets/images/
```

Then update references in `scripts/generate-pages.js` or the relevant HTML file.

Recommended:

- Use optimized JPG or WebP images.
- Keep filenames simple.
- Add meaningful `alt` text.

## Changing Video

Place videos in:

```txt
src/assets/video/
```

Then update hero or showcase video references.

Recommended:

- Use compressed MP4 files.
- Keep hero videos short and lightweight.
- Always include `muted`, `loop` and `playsinline` for background video.

## Changing Colors

The main palette is in:

```txt
src/assets/css/style.css
```

Look for the `:root` tokens:

```css
:root {
  --color-bg: #07090d;
  --color-card: #151a22;
  --color-paper: #f4efe4;
  --color-text: #fff8ec;
  --color-primary: #d8ff3e;
  --color-secondary: #37f0ff;
  --color-accent: #ff6b35;
}
```

Change those values to create a new identity while keeping the same layout system.

## Components

Open:

```txt
src/components.html
```

Each block includes a preview and copyable HTML.

## Motion

Animations use attributes such as:

```html
data-animate="fade-up"
data-stagger
data-initial
data-parallax
```

Motion is designed to respect `prefers-reduced-motion`.
