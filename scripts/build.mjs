import { mkdir, rm, cp, writeFile, readFile } from "node:fs/promises";
import { site, projects, skillGroups } from "../src/content.mjs";

const resume = JSON.parse(
  await readFile(new URL("../src/resume.json", import.meta.url), "utf8"),
);
const out = new URL("../dist/", import.meta.url);
const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const arrow = '<span aria-hidden="true">↗</span>';
const tags = (items) =>
  `<ul class="tags" aria-label="Technologies">${items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`;
const image = (name, alt, cls = "", eager = false) =>
  `<img src="/assets/${name}.webp" alt="${esc(alt)}" class="${cls}" loading="${eager ? "eager" : "lazy"}" ${eager ? 'fetchpriority="high"' : ""} decoding="async" width="${{ "ducktop-open": 1200, "ducktop-inside": 1400, "ducktop-routing": 1500, bms: 1200, devboard: 500, "devboard-layout": 642, esc: 1100, "esc-gate-driver": 1132, "esc-current-protection": 1600 }[name]}" height="${{ "ducktop-open": 823, "ducktop-inside": 947, "ducktop-routing": 1205, bms: 559, devboard: 900, "devboard-layout": 1100, esc: 1100, "esc-gate-driver": 1600, "esc-current-protection": 1132 }[name]}">`;

function layout(title, description, path, content, active = "") {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${site.url}${path}">
<meta name="theme-color" content="#111116"><meta name="color-scheme" content="dark light">
<meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${site.url}${path}"><meta property="og:site_name" content="Ewoud | Electronics & PCB design"><meta property="og:image" content="${site.url}/assets/og.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Ewoud, electronics and PCB design portfolio"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/style.css"></head>
<body><a class="skip" href="#main">Skip to content</a>
<header class="site-header"><div class="container header-inner"><a class="brand" href="/" aria-label="Ewoud, home"><span class="brand-mark" aria-hidden="true">e<span>.</span></span><span>Ewoud<span class="brand-sub">Electronics & PCB design</span></span></a><nav aria-label="Main navigation"><a href="/projects/" ${active === "projects" ? 'aria-current="page"' : ""}>Projects</a><a href="/about/" ${active === "about" ? 'aria-current="page"' : ""}>About</a><a href="/resume/" ${active === "resume" ? 'aria-current="page"' : ""}>Resume</a><a class="nav-github" href="${site.github}">GitHub ${arrow}</a></nav></div></header>
<main id="main" class="container">${content}</main>
<footer class="site-footer"><div class="container footer-inner"><p>Ewoud<span>Electronics projects · Massachusetts</span></p><div><a href="${site.github}">GitHub ${arrow}</a><a href="/resume/">Resume</a><span class="updated">Updated October 2026</span></div></div></footer>
</body></html>`;
}
const skills = () =>
  `<div class="skills-grid">${skillGroups.map(([heading, list]) => `<div><h3>${heading}</h3><ul>${list.map((s) => `<li>${s}</li>`).join("")}</ul></div>`).join("")}</div>`;
function card(p, featured = false) {
  return `<article class="project-card ${featured ? "featured" : ""}"><a class="card-visual visual-${p.slug}" href="/projects/${p.slug}/" aria-label="View ${esc(p.name)}">${image(p.image, p.alt, "", featured)}<span class="image-note">${p.slug === "ducktop2" ? "Case CAD" : "PCB render"} <span aria-hidden="true">↗</span></span></a><div class="card-copy"><div class="eyebrow"><span>${p.number} / ${p.category}</span></div><h3><a href="/projects/${p.slug}/">${p.name} <span class="title-arrow" aria-hidden="true">↗</span></a></h3><p>${p.summary}</p><p class="status"><span aria-hidden="true"></span>${p.status}</p>${tags(p.tags.slice(0, featured ? 5 : 3))}${featured ? '<a class="text-link" href="/projects/ducktop2/">Project details <span aria-hidden="true">→</span></a>' : ""}</div></article>`;
}
const home = `<section class="intro"><div><p class="eyebrow"><span class="accent-dot" aria-hidden="true"></span>High school student · Massachusetts</p><h1>Hi, I'm Ewoud.<br>I build electronics<span class="accent">.</span></h1></div><div class="intro-side"><p>I'm a 10th-grade student at Lincoln-Sudbury. I design PCBs, mostly for my custom laptop and other hardware projects.</p><a class="text-link" href="/about/">About me <span aria-hidden="true">→</span></a></div></section>
<section aria-labelledby="selected-heading" class="section"><div class="section-heading"><h2 id="selected-heading">My projects</h2><span class="mono">4 hardware projects</span></div>${card(projects[0], true)}<div class="project-grid">${projects
  .slice(1)
  .map((p) => card(p))
  .join(
    "",
  )}</div><p class="section-note">These are CAD renders and PCB layouts. Each project page includes its current build and testing status.</p></section>
<section class="section capabilities" aria-labelledby="skills-heading"><div class="section-heading"><h2 id="skills-heading">Tools & skills</h2><a href="/resume/" class="text-link">View resume <span aria-hidden="true">→</span></a></div>${skills()}</section>
<section class="closing"><div><p class="eyebrow">Project files</p><h2>Schematics, layouts, and code</h2><p>I keep the source files and build notes on GitHub.</p></div><a class="button" href="${site.github}">GitHub ${arrow}</a></section>`;
const projectIndex = `<section class="page-intro"><p class="eyebrow">Hardware projects</p><h1>Projects<span class="accent">.</span></h1><p>My laptop, development board, battery system, and motor controller. Each has its own design files, notes, and list of work left to do.</p></section><section aria-label="Engineering projects">${card(projects[0], true)}<div class="project-grid">${projects
  .slice(1)
  .map((p) => card(p))
  .join(
    "",
  )}</div></section><p class="section-note">Project status updated ${site.updated}.</p>`;

function detail(p) {
  const nextProject = projects[(projects.indexOf(p) + 1) % projects.length];
  return `<div class="breadcrumb"><a href="/projects/">All projects</a><span aria-hidden="true">/</span><span>${p.number}</span></div><section class="project-intro"><div><p class="eyebrow">${p.category}</p><h1>${p.name}<span class="accent">.</span></h1><p class="project-subtitle">${p.subtitle}</p>${tags(p.tags)}</div><div class="project-actions"><p class="status"><span aria-hidden="true"></span>${p.status}</p><a class="button" href="${p.repo}">View source on GitHub ${arrow}</a></div></section>
<figure class="project-hero visual-${p.slug}">${image(p.image, p.alt, "", true)}<figcaption>${p.caption}</figcaption></figure><dl class="facts">${p.facts.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join("")}</dl>
<div class="project-body"><aside class="project-sidebar"><p class="eyebrow">${p.name}</p><p><a href="${p.repo}">GitHub source ↗</a></p><p class="mono">Updated ${site.updated}</p></aside><div class="prose"><p class="lead">${p.intro}</p>${p.sections.map(([h, t]) => `<section><h2>${h}</h2><p>${t}</p></section>`).join("")}<section class="status-box"><h2>Current status</h2><p>${p.statusDetail}</p><h3>Next steps</h3><ul>${p.next.map((s) => `<li>${s}</li>`).join("")}</ul></section></div></div>
${p.gallery.length ? `<section class="gallery" aria-label="Project images">${p.gallery.map(([n, a, c]) => `<figure class="gallery-${n}"><a href="/assets/${n}.webp" aria-label="Open full image: ${esc(c)}">${image(n, a)}</a><figcaption>${c} <span class="mono">Open full image ↗</span></figcaption></figure>`).join("")}</section>` : ""}
${p.slug === "bldc-controller" ? `<section class="schematics"><div class="section-heading"><h2>Schematics</h2><a class="text-link" href="${p.repo}/blob/main/manufacturing/schematic.pdf">All schematic sheets ${arrow}</a></div><p>The gate driver and current-protection circuits are shown below. The full schematic also covers the power stage, MCU, sensors, and other protection circuits.</p><div class="schematic-grid"><figure><a href="/assets/esc-gate-driver.webp">${image("esc-gate-driver", "Published ESC schematic sheet showing the DRV8353S gate driver and its connections")}</a><figcaption>Gate driver and charge pump. Click to see the full schematic.</figcaption></figure><figure><a href="/assets/esc-current-protection.webp">${image("esc-current-protection", "Published ESC schematic sheet showing phase-current protection and comparators")}</a><figcaption>Current protection. I still need to check the trip thresholds on hardware.</figcaption></figure></div></section>` : ""}
<section class="source-links"><h2>Source files & notes</h2><ul>${p.sources.map(([label, path]) => `<li><a href="${p.repo}/${/\.(md|pdf|json)(#|$)/.test(path) ? "blob" : "tree"}/main/${path}">${label} ${arrow}</a></li>`).join("")}</ul></section><a class="next-project" href="/projects/${nextProject.slug}/"><span class="eyebrow">Next project</span><span>${nextProject.name} <span aria-hidden="true">→</span></span></a>`;
}
const about = `<section class="page-intro"><p class="eyebrow">About me</p><h1>Hi, I'm Ewoud<span class="accent">.</span></h1><p>I'm Ewoud, a 10th-grade student at Lincoln-Sudbury Regional High School in Massachusetts.</p></section><div class="about-grid"><div class="prose"><h2>What I make</h2><p>I use KiCad to draw schematics, place components, and route PCBs. My largest project is Ducktop2, a custom 16-inch laptop. Alongside it, I've been working on a small STM32 development board, battery circuits, and a brushless motor controller.</p><p>The laptop is still in progress. My development board is waiting on fabrication, and the motor controller has not been powered yet. I keep the design files and current status in the project repositories.</p><h2>School & community</h2><p>I attend Lincoln-Sudbury Regional High School and expect to graduate in 2029. I'm a Hack Club member and a Half Life hardware reviewer.</p><h2>What I want to learn next</h2><p>I'm looking for an electronics engineering internship for summer 2027. I'd like to get more experience bringing up boards, taking measurements, and debugging hardware and firmware.</p></div><aside class="about-aside"><p class="eyebrow">At a glance</p><dl><dt>Based in</dt><dd>Massachusetts</dd><dt>School</dt><dd>Lincoln-Sudbury Regional High School</dd><dt>Graduating</dt><dd>2029</dd><dt>Focus</dt><dd>Electronics & PCB design</dd></dl><a class="button" href="/resume/">View my resume <span aria-hidden="true">→</span></a><a class="text-link" href="${site.github}">Find me on GitHub ${arrow}</a></aside></div><section class="section"><div class="section-heading"><h2>Tools & skills</h2></div>${skills()}</section>`;
const resumePage = `<div class="resume-toolbar"><div><p class="eyebrow">Resume / October 2026</p><h1>My resume<span class="accent">.</span></h1></div><a class="button" href="/ewoud-resume.pdf" download="Ewoud-Resume.pdf">Download PDF <span aria-hidden="true">↓</span></a></div><article class="resume-sheet" aria-label="Ewoud's resume"><header><h2>${resume.name}</h2><p class="resume-contact">${resume.location} · <a href="mailto:${esc(resume.contactEmail)}">${esc(resume.contactEmail)}</a><br><a href="https://${resume.github}">${resume.github}</a> · <a href="https://${resume.website}">${resume.website}</a></p></header><p class="resume-summary">${resume.summary}</p><section><h3>Education</h3><p>${resume.education}</p></section><section><h3>Community & radio</h3><ul class="resume-community">${resume.community.map((t) => `<li>${t}</li>`).join("")}</ul></section><section><h3>Engineering projects</h3>${resume.projects.map((p) => `<div class="resume-project"><h4><a href="${p.url}">${p.name}</a></h4><p class="resume-status">${p.date}</p><ul>${p.bullets.map((b) => `<li>${b}</li>`).join("")}</ul></div>`).join("")}</section><section><h3>Additional projects</h3><p>${resume.additional}</p></section><section><h3>Technical skills</h3><p>${resume.skills}</p></section></article>`;

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(new URL("../public/", import.meta.url), out, { recursive: true });
const pages = [
  ["/", "Ewoud | Electronics & PCB design", site.description, home, ""],
  [
    "/projects/",
    "Projects | Ewoud",
    "Custom laptop hardware, an STM32 development board, battery protection, and a BLDC motor controller. Current design and testing status for each project.",
    projectIndex,
    "projects",
  ],
  [
    "/about/",
    "About Ewoud | Electronics & PCB design",
    "Meet Ewoud, a Lincoln-Sudbury high school student, Hack Club member, and Half Life hardware reviewer focused on electronics and PCB design.",
    about,
    "about",
  ],
  [
    "/resume/",
    "Resume | Ewoud",
    "Ewoud’s electronics engineering resume, with a one-page PDF download. Hardware projects, PCB design skills, education, and community work.",
    resumePage,
    "resume",
  ],
  ...projects.map((p) => [
    `/projects/${p.slug}/`,
    `${p.name} | Ewoud`,
    p.summary,
    detail(p),
    "projects",
  ]),
];
for (const [path, title, description, content, active] of pages) {
  const dir = new URL("." + path, out);
  await mkdir(dir, { recursive: true });
  await writeFile(
    new URL("index.html", dir),
    layout(title, description, path, content, active),
  );
}
await writeFile(
  new URL("404.html", out),
  layout(
    "Page not found | Ewoud",
    "This page could not be found. Explore Ewoud’s electronics projects.",
    "/404.html",
    `<section class="page-intro"><p class="eyebrow">404 / Page not found</p><h1>Page not found<span class="accent">.</span></h1><p>The page may have moved, or the link might be wrong.</p><a class="button" href="/">Back to home <span aria-hidden="true">→</span></a></section>`,
  ),
);
await writeFile(
  new URL("sitemap.xml", out),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(([p]) => `<url><loc>${site.url}${p}</loc></url>`).join("")}</urlset>`,
);
await writeFile(
  new URL("robots.txt", out),
  `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`,
);
await writeFile(new URL(".nojekyll", out), "");
console.log(
  `Built ${pages.length} pages, 404 page, and static assets in dist/.`,
);
