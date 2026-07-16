# Contributing

Thanks for your interest in improving db7 Template.

## Ways to Contribute

- Report layout bugs.
- Improve accessibility.
- Improve documentation.
- Add reusable components.
- Refine responsive behavior.
- Fix broken links or missing assets.

## Local Setup

```bash
npm install
npm run dev
```

## Development Workflow

1. Create a branch for your change.
2. Edit source files in `src/` or shared generated content in `scripts/generate-pages.js`.
3. If you changed generated page content, run:

```bash
npm run generate
```

4. Validate the project:

```bash
npm run check
npm run qa:mobile
npm run build
```

## Pull Request Checklist

- The change is scoped and easy to review.
- `npm run check` passes.
- `npm run build` passes.
- Mobile layout was considered.
- Documentation was updated when behavior changed.
- No third-party assets were copied without permission.

## Code Style

- Keep HTML readable and indented.
- Keep section comments clear.
- Prefer existing CSS tokens and utilities.
- Avoid unnecessary dependencies.
- Respect `prefers-reduced-motion` for motion changes.

## License

By contributing, you agree that your contribution will be licensed under the MIT License.
