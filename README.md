# ewoud's portfolio

My electronics and PCB projects, with notes on what is designed and what still needs testing.

Live site: https://ewoudvv.github.io

## run it

Requires Node 22 or newer. There are no npm dependencies.

```sh
npm run build
npm run check
python3 -m http.server 4321 --directory dist
```

Open http://localhost:4321.

## change things

- `src/content.mjs`: project descriptions, statuses, skills, and site settings
- `src/resume.json`: resume content
- `scripts/build.mjs`: page templates and static build
- `public/style.css`: layout and styling
- `public/assets/`: real project images and the self-hosted Inter font
- `docs/sources.md`: where each claim and image came from

The resume has a visible contact-email TODO in its source. Add the address I want to publish to both source files before using it for applications. Until then, the site and resume link to my GitHub profile.

To update the PDF, install ReportLab and run:

```sh
python3 scripts/resume.py
npm run build
npm run check
```

The PDF is checked in so building or deploying the site needs only Node. Check that it is still one page after editing it.

## deployment

GitHub Actions builds and checks the site, then publishes `dist/` to GitHub Pages when `main` changes. The site has no backend, API keys, analytics, or external runtime requests.

The DuckDNS hostname is not configured for this site. See `docs/deployment.md` for the DNS limitation and checks.

Keep downloaded research and browser screenshots in ignored `work/`. The project source belongs in this folder.
