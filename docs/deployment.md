# hosting and DNS

The site uses GitHub Pages at https://ewoudvv.github.io. The repository is https://github.com/EwoudVV/EwoudVV.github.io.

`main` is built by `.github/workflows/pages.yml`. It checks local links, images, metadata, and the PDF before publishing `dist/`. No install step or private API key is needed.

## DuckDNS

The requested hostname is `ewoudvv.duckdns.org`. It has not been changed or added as a GitHub Pages custom domain.

On October 14, 2026, a public DNS query returned an existing A record and no CNAME. DuckDNS's documented API supports IPv4, IPv6, and TXT updates, with no CNAME control. GitHub's supported custom-subdomain setup requires a CNAME pointing directly to `ewoudvv.github.io`.

There is no documented supported DuckDNS configuration for that setup. Pointing one DuckDNS A record at a GitHub Pages address would not follow the documented subdomain configuration, so the site keeps the GitHub Pages address. No DuckDNS account token was requested, retrieved, logged, or saved.

Sources:

- [DuckDNS API specification](https://www.duckdns.org/spec.jsp)
- [GitHub Pages custom-domain configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

There is nothing to change in DuckDNS for the working fallback. A later custom hostname would need a DNS provider that supports the records GitHub requires. Keep the working URL until DNS, the HTTP response, and the HTTPS certificate have all been verified.

## updating the resume

Add the public email address to `src/content.mjs` and `src/resume.json` when one is chosen. Regenerate `public/ewoud-resume.pdf`, inspect the one-page result, then build and push. The current resume provides GitHub and portfolio links.
