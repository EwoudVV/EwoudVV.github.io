# checks

Checked October 14, 2026, after restoring the original layout and revising the wording.

- Production build succeeded on Node.
- Static checks covered nine HTML files, 116 local links, 17 image uses, page titles, descriptions, canonical URLs, Open Graph metadata, and the resume PDF.
- All 16 external links returned HTTP 200.
- Chromium checks covered eight pages at 1440, 390, and 320 pixels wide. No horizontal overflow, broken images, font loading errors, or browser errors were found.
- Sixteen axe accessibility audits, across desktop and mobile, found no WCAG 2 A/AA or 2.1 A/AA violations. These are automated checks, not a full accessibility certification.
- The skip link was the first keyboard stop and moved to the main content. Navigation and downloads are ordinary links and work without JavaScript.
- The resume download worked at all three viewport sizes and matched the source PDF byte for byte.
- The PDF contains one letter-sized page. Its rendered page and the desktop/mobile site screenshots were visually reviewed.
- Source and asset provenance is recorded in `sources.md`. No private project files or credentials are included.

## repeat the checks

```sh
npm run build
npm run check
python3 -m http.server 4321 --directory dist
```

For the optional browser checks, install Playwright and axe into a separate QA directory, then run `scripts/browser-check.cjs` with those packages on `NODE_PATH`. They are not needed to build or host the site. The script writes reports, screenshots, and downloaded PDFs to ignored `work/`.

Set `SITE_URL` to test a deployed copy instead of the local preview.
