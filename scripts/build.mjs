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
<header class="site-header"><div class="container header-inner"><a class="brand" href="/" aria-label="Ewoud, home">ewoud<span class="brand-sub">hardware projects</span></a><nav aria-label="Main navigation"><a href="/projects/" ${active === "projects" ? 'aria-current="page"' : ""}>Projects</a><a href="/about/" ${active === "about" ? 'aria-current="page"' : ""}>About</a><a href="/resume/" ${active === "resume" ? 'aria-current="page"' : ""}>Resume</a><a class="nav-github" href="${site.github}">GitHub ${arrow}</a></nav></div></header>
<main id="main" class="container">${content}</main>
<footer class="site-footer"><div class="container footer-inner"><p>Ewoud<span>Massachusetts · Lincoln-Sudbury, class of 2029</span></p><div><a href="${site.github}">GitHub ${arrow}</a><a href="/resume/">Resume</a><span class="updated">Updated October 2026</span></div></div></footer>
</body></html>`;
}
const skills = () =>
  `<div class="skills-grid">${skillGroups.map(([heading, list]) => `<div><h3>${heading}</h3><ul>${list.map((s) => `<li>${s}</li>`).join("")}</ul></div>`).join("")}</div>`;
function card(p, featured = false) {
  const summaries = {
    ducktop2:
      "I'm designing a laptop around the LattePanda Mu Ultra. That means a custom eight-layer motherboard, two I/O boards, a battery system, and a case to fit it all. The main boards are still being routed.",
    "stm32-devboard":
      "A 24 × 44 mm board with an STM32F411, USB-C, microSD, and SWD. The design and manufacturing files are done. I'm waiting on funding to order assembled boards.",
    "battery-management":
      "The three-cell battery board for Ducktop2. It uses a BQ76922, separate charge and discharge protection, and a four-terminal current shunt. The BMS is routed; bench tests are next.",
    "bldc-controller":
      "An STM32G4 motor controller with a DRV8353S gate driver and phase-current sensing. The board is routed, but hasn't been built or powered. The first test motor will be a 26 V Groschopp gearmotor.",
  };
  const label = {
    ducktop2: "ducktop2",
    "stm32-devboard": "stm32 devboard",
    "battery-management": "battery management",
    "bldc-controller": "bldc motor controller",
  }[p.slug];
  const name = featured ? "ducktop-routing" : p.image;
  const alt = featured
    ? "Actual KiCad center-board routing view, with tracks, footprints, and unfinished connections visible"
    : p.alt;
  return `<article class="project-entry ${featured ? "featured-entry" : ""}"><div class="entry-copy"><h3><a href="/projects/${p.slug}/">${label}</a></h3><p>${summaries[p.slug]}</p><p class="entry-status">${p.status}</p><div class="entry-links"><a href="/projects/${p.slug}/">project notes</a><a href="${p.repo}">source on GitHub ↗</a></div></div><figure><a href="/projects/${p.slug}/" aria-label="Read about ${esc(p.name)}">${image(name, alt, "", featured)}</a><figcaption>${featured ? "KiCad routing view · September 30, 2026" : "KiCad render · not a photograph"}</figcaption></figure></article>`;
}
const home = `<section class="intro"><h1>hi, i'm ewoud.</h1><p>I'm a high school student in Massachusetts. I design PCBs and build electronics, mostly working on a custom laptop and other hardware projects.</p><p class="intro-links"><a href="/about/">about me</a><a href="/resume/">resume</a><a href="${site.github}">GitHub ↗</a></p></section>
<section class="work-list" aria-labelledby="selected-heading"><h2 id="selected-heading">what i'm working on</h2>${projects.map((p, i) => card(p, i === 0)).join("")}</section>
<section class="tools-section" aria-labelledby="skills-heading"><h2 id="skills-heading">tools & skills</h2><p>I use KiCad for schematics and multilayer PCB layout, including differential-pair routing, component selection, power electronics, and microcontroller hardware. I also use Git, GitHub, and Linux, and know basic Python and C#.</p><p>I'm at Lincoln-Sudbury Regional High School, graduating in 2029. I'm also a Hack Club member and a Half Life hardware reviewer.</p></section>`;
const projectIndex = `<section class="page-intro"><h1>projects</h1><p>Board files, schematics, and notes on the hardware I'm working on. Each page includes the current design and testing status.</p></section><section class="work-list" aria-label="Engineering projects">${projects.map((p, i) => card(p, i === 0)).join("")}</section><p class="section-note">Last checked against the public repositories: ${site.updated}.</p>`;

function detail(p) {
  const nextProject = projects[(projects.indexOf(p) + 1) % projects.length];
  return `<div class="breadcrumb"><a href="/projects/">All projects</a><span aria-hidden="true">/</span><span>${p.number}</span></div><section class="project-intro"><div><p class="eyebrow">${p.category}</p><h1>${p.name}<span class="accent">.</span></h1><p class="project-subtitle">${p.subtitle}</p>${tags(p.tags)}</div><div class="project-actions"><p class="status"><span aria-hidden="true"></span>${p.status}</p><a class="button" href="${p.repo}">View source on GitHub ${arrow}</a></div></section>
<figure class="project-hero visual-${p.slug}">${image(p.image, p.alt, "", true)}<figcaption>${p.caption}</figcaption></figure><dl class="facts">${p.facts.map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join("")}</dl>
<div class="project-body"><aside class="project-sidebar"><p class="eyebrow">${p.name}</p><p><a href="${p.repo}">GitHub source ↗</a></p><p class="mono">Updated ${site.updated}</p></aside><div class="prose"><p class="lead">${p.intro}</p>${p.sections.map(([h, t]) => `<section><h2>${h}</h2><p>${t}</p></section>`).join("")}<section class="status-box"><h2>Where it stands</h2><p>${p.statusDetail}</p><h3>Next steps</h3><ul>${p.next.map((s) => `<li>${s}</li>`).join("")}</ul></section></div></div>
${p.gallery.length ? `<section class="gallery" aria-label="Project images">${p.gallery.map(([n, a, c]) => `<figure class="gallery-${n}"><a href="/assets/${n}.webp" aria-label="Open full image: ${esc(c)}">${image(n, a)}</a><figcaption>${c} <span class="mono">Open full image ↗</span></figcaption></figure>`).join("")}</section>` : ""}
${p.slug === "bldc-controller" ? `<section class="schematics"><div class="section-heading"><h2>Inside the circuit</h2><a class="text-link" href="${p.repo}/blob/main/manufacturing/schematic.pdf">All schematic sheets ${arrow}</a></div><p>The published design separates the gate driver, bridge, current sensing, and hardware protection into individual sheets. These are source drawings, not test results.</p><div class="schematic-grid"><figure><a href="/assets/esc-gate-driver.webp">${image("esc-gate-driver", "Published ESC schematic sheet showing the DRV8353S gate driver and its connections")}</a><figcaption>Gate-driver sheet. Open the image to inspect the connections.</figcaption></figure><figure><a href="/assets/esc-current-protection.webp">${image("esc-current-protection", "Published ESC schematic sheet showing phase-current protection and comparators")}</a><figcaption>Current-protection sheet. Thresholds still need hardware verification.</figcaption></figure></div></section>` : ""}
<section class="source-links"><h2>Source files & notes</h2><ul>${p.sources.map(([label, path]) => `<li><a href="${p.repo}/${/\.(md|pdf|json)(#|$)/.test(path) ? "blob" : "tree"}/main/${path}">${label} ${arrow}</a></li>`).join("")}</ul></section><a class="next-project" href="/projects/${nextProject.slug}/"><span class="eyebrow">Next project</span><span>${nextProject.name} <span aria-hidden="true">→</span></span></a>`;
}
const about = `<section class="page-intro"><p class="eyebrow">About me</p><h1>about me</h1><p>I'm Ewoud, a 10th-grade student at Lincoln-Sudbury Regional High School in Massachusetts.</p></section><div class="about-grid"><div class="prose"><h2>What I make</h2><p>Most of my projects start with a schematic in KiCad, then a lot of time placing components and routing the board. My largest project is Ducktop2, a custom 16-inch laptop. Alongside it, I've been working on a small STM32 development board, battery circuits, and a brushless motor controller.</p><p>The laptop is still in progress. My development board is waiting on fabrication, and the motor controller has not been powered yet. I keep the design files and current status in the project repositories.</p><h2>School & community</h2><p>I attend Lincoln-Sudbury Regional High School and expect to graduate in 2029. I'm a Hack Club member and a Half Life hardware reviewer.</p><h2>What I want to learn next</h2><p>I'm interested in electronics engineering internships where I can learn from people who design and test hardware. I want more experience with board bring-up, measurement, debugging, and the connection between hardware and firmware.</p></div><aside class="about-aside"><p class="eyebrow">At a glance</p><dl><dt>Based in</dt><dd>Massachusetts</dd><dt>School</dt><dd>Lincoln-Sudbury Regional High School</dd><dt>Graduating</dt><dd>2029</dd><dt>Focus</dt><dd>Electronics & PCB design</dd></dl><a class="button" href="/resume/">View my resume <span aria-hidden="true">→</span></a><a class="text-link" href="${site.github}">Find me on GitHub ${arrow}</a></aside></div><section class="section"><div class="section-heading"><h2>Tools & skills</h2></div>${skills()}</section>`;
const resumePage = `<div class="resume-toolbar"><div><p class="eyebrow">Resume / October 2026</p><h1>My resume<span class="accent">.</span></h1></div><a class="button" href="/ewoud-resume.pdf" download="Ewoud-Resume.pdf">Download PDF <span aria-hidden="true">↓</span></a></div><article class="resume-sheet" aria-label="Ewoud's resume"><header><h2>${resume.name}</h2><p class="resume-heading">${resume.heading}</p><p class="resume-contact">${resume.location} · <a href="https://${resume.github}">${resume.github}</a> · <a href="https://${resume.website}">${resume.website}</a>${site.contactEmail ? ` · <a href="mailto:${esc(site.contactEmail)}">${esc(site.contactEmail)}</a>` : ""}</p></header><p class="resume-summary">${resume.summary}</p><section><h3>Education</h3><strong>${resume.education.school}</strong><p>${resume.education.detail}</p></section><section><h3>Engineering projects</h3>${resume.projects.map((p) => `<div class="resume-project"><h4><a href="${p.url}">${p.name}</a></h4><p class="resume-status">${p.status}</p><ul>${p.bullets.map((b) => `<li>${b}</li>`).join("")}</ul></div>`).join("")}</section><section><h3>Technical skills</h3><p>${resume.skills}</p></section><section><h3>Community</h3><p>${resume.activities}</p></section></article>`;

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
    `<section class="page-intro"><p class="eyebrow">404 / Page not found</p><h1>page not found</h1><p>The page may have moved, or the link might be wrong.</p><a class="button" href="/">Back to home <span aria-hidden="true">→</span></a></section>`,
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
