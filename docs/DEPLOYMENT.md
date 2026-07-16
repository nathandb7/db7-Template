# Deployment Guide

db7 Template is a static HTML project. It can be deployed to any host that serves static files.

## Build

```bash
npm run build
```

The build output is created in:

```txt
dist/
```

## GitHub Pages

Recommended options:

- Deploy from a GitHub Actions workflow that runs `npm install` and `npm run build`.
- Publish the `dist/` folder as the Pages artifact.

If you prefer a simpler setup, you can also publish the static source from `src/`, but `dist/` is recommended for production output.

## Netlify

Build command:

```bash
npm run build
```

Publish directory:

```txt
dist
```

## Vercel

Build command:

```bash
npm run build
```

Output directory:

```txt
dist
```

## Cloudflare Pages

Build command:

```bash
npm run build
```

Build output directory:

```txt
dist
```

## Traditional Hosting

Run:

```bash
npm run build
```

Upload the contents of `dist/` to your hosting provider.
