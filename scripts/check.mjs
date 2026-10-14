import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../dist/", import.meta.url));
let errors = [],
  links = 0,
  images = 0;
const files = [];
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else files.push(p);
  }
}
await walk(root);
for (const file of files.filter((f) => f.endsWith(".html"))) {
  const html = await readFile(file, "utf8");
  const label = path.relative(root, file);
  for (const pattern of [
    /<html lang="en">/,
    /<title>[^<]+<\/title>/,
    /<meta name="description" content="[^"]+"/,
    /<meta property="og:image"/,
    /<link rel="canonical"/,
    /<main id="main"/,
    /class="skip"/,
  ])
    if (!pattern.test(html)) errors.push(`${label}: missing ${pattern}`);
  if ((html.match(/<h1[ >]/g) || []).length !== 1)
    errors.push(`${label}: expected one h1`);
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    images++;
    if (
      !/alt="[^"]+"/.test(m[0]) ||
      !/width="\d+"/.test(m[0]) ||
      !/height="\d+"/.test(m[0])
    )
      errors.push(`${label}: image attributes missing`);
  }
  for (const m of html.matchAll(/(?:href|src)="([^"#]+)(?:#[^"]*)?"/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|data:)/.test(url)) continue;
    links++;
    let target = path.join(
      root,
      url.startsWith("/")
        ? url.slice(1)
        : path.relative(root, path.resolve(path.dirname(file), url)),
    );
    try {
      if ((await stat(target)).isDirectory())
        target = path.join(target, "index.html");
      await stat(target);
    } catch {
      errors.push(`${label}: broken link ${url}`);
    }
  }
  for (const fragment of html.matchAll(/href="#([^"]+)"/g))
    if (!html.includes(`id="${fragment[1]}"`))
      errors.push(`${label}: missing fragment ${fragment[1]}`);
  if (/spy-camera|passionate innovator|pushing the boundaries|—/.test(html))
    errors.push(`${label}: excluded copy`);
}
const pdf = await readFile(path.join(root, "ewoud-resume.pdf"));
if (pdf.subarray(0, 5).toString() !== "%PDF-")
  errors.push("Resume PDF is invalid");
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(
  `Checked ${files.filter((f) => f.endsWith(".html")).length} HTML pages, ${links} local links, ${images} images, metadata, headings, and resume PDF.`,
);
