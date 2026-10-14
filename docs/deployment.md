# Hosting and DNS

The public site is https://ewoudvv.github.io. The repository is https://github.com/EwoudVV/EwoudVV.github.io.

`main` is built by `.github/workflows/pages.yml`. It checks local links, images, metadata, and the PDF before publishing `dist/`. No install step or private API key is needed.

## Domain settings

The GitHub Pages hostname is the chosen public address. HTTPS is enforced and the custom-domain field is empty. The DuckDNS hostname keeps its previous DNS configuration and is not used by this portfolio.

The earlier claim that DuckDNS necessarily could not work with Pages was too broad. GitHub's DNS checker accepts A records for a hostname with MX records, and DuckDNS provides an MX record automatically. That option was verified against an existing working site on this account, but the portfolio uses the GitHub hostname by choice.

Sources:

- [DuckDNS specification](https://www.duckdns.org/spec.jsp)
- [DuckDNS FAQ](https://www.duckdns.org/faqs.jsp)
- [GitHub Pages DNS checker](https://github.com/github/pages-health-check/blob/master/lib/github-pages-health-check/domain.rb)
- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## Updating the resume

Edit `src/resume.json`, regenerate `public/ewoud-resume.pdf` with `python3 scripts/resume.py`, inspect the one-page result, then build and push. The HTML resume and PDF use the same source content. Keep the public contact email in `src/content.mjs` consistent.

Local review drafts and research stay in the ignored `drafts/` and `work/` directories. They are not included in the site build or repository.
