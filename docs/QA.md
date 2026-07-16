# QA Guide

Use this checklist before publishing or deploying db7 Template.

## Static Reference Check

```bash
npm run check
```

This verifies local static references across the HTML files.

## Mobile Responsive QA

```bash
npm run qa:mobile
```

This runs a Playwright audit at:

- 390px wide
- 320px wide

It checks:

- Horizontal overflow.
- JavaScript page errors.
- Mobile menu behavior.
- Mega menu behavior.
- Small interactive controls.

Screenshots are saved in:

```txt
docs/qa-mobile/
```

## Build Check

```bash
npm run build
```

This creates:

```txt
dist/
```

## Release Check

```bash
npm run prepare:release
```

This runs:

- clean
- generate
- build
- check

## Manual Review

Before publishing, review:

- `index.html`
- `components.html`
- `contact.html`
- Mobile menu
- Home 4 video hero
- Footer links
- README screenshots
