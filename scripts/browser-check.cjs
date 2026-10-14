// Optional browser QA: install playwright and @axe-core/playwright outside the site build.
const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const fs = require("node:fs/promises");
const base = process.env.SITE_URL || "http://127.0.0.1:4321";
const routes = [
  "/",
  "/projects/",
  "/about/",
  "/resume/",
  "/projects/ducktop2/",
  "/projects/stm32-devboard/",
  "/projects/battery-management/",
  "/projects/bldc-controller/",
];
(async () => {
  await fs.mkdir("work/screenshots", { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const failures = [],
    report = [];
  for (const [device, width, height] of [
    ["desktop", 1440, 1000],
    ["mobile", 390, 844],
    ["small-mobile", 320, 740],
  ]) {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
      acceptDownloads: true,
    });
    const page = await context.newPage();
    page.on("pageerror", (error) =>
      failures.push(`${device}: ${error.message}`),
    );
    page.on("console", (msg) => {
      if (msg.type() === "error") failures.push(`${device}: ${msg.text()}`);
    });
    for (const route of routes) {
      const response = await page.goto(base + route, {
        waitUntil: "networkidle",
      });
      if (response.status() !== 200)
        failures.push(`${route}: HTTP ${response.status()}`);
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          [...document.images].map((im) => {
            im.loading = "eager";
            return im.decode().catch(() => {});
          }),
        );
      });
      const metrics = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth,
        brokenImages: [...document.images]
          .filter((im) => !im.complete || im.naturalWidth === 0)
          .map((im) => im.src),
        font: document.fonts.check("16px Inter"),
        dimensions: [...document.images]
          .filter(
            (im) =>
              Math.abs(
                Number(im.getAttribute("width")) /
                  Number(im.getAttribute("height")) -
                  im.naturalWidth / im.naturalHeight,
              ) > 0.01,
          )
          .map((im) => im.src),
      }));
      if (
        metrics.overflow ||
        metrics.brokenImages.length ||
        !metrics.font ||
        metrics.dimensions.length
      )
        failures.push(`${device} ${route}: ${JSON.stringify(metrics)}`);
      let violations = [];
      if (device !== "small-mobile")
        violations = (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
            .analyze()
        ).violations;
      for (const v of violations)
        failures.push(
          `${device} ${route}: ${v.id} ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`,
        );
      report.push({
        device,
        route,
        ...metrics,
        accessibilityViolations: violations.length,
      });
      if (
        (route === "/" && device !== "small-mobile") ||
        (route === "/projects/bldc-controller/" && device === "mobile") ||
        (route === "/resume/" && device === "desktop")
      )
        await page.screenshot({
          path: `work/screenshots/${device}-${route.replaceAll("/", "_") || "home"}.png`,
          fullPage: true,
        });
    }
    await page.goto(base + "/");
    await page.keyboard.press("Tab");
    if ((await page.locator(":focus").innerText()) !== "Skip to content")
      failures.push(`${device}: skip link is not first keyboard stop`);
    await page.keyboard.press("Enter");
    if (!page.url().endsWith("#main"))
      failures.push(`${device}: skip navigation failed`);
    await page.goto(base + "/resume/");
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.getByRole("link", { name: /Download PDF/ }).click(),
    ]);
    await download.saveAs(`work/${device}-resume-download.pdf`);
    if (await download.failure())
      failures.push(`${device}: resume download failed`);
    await context.close();
  }
  await browser.close();
  await fs.writeFile(
    "work/browser-report.json",
    JSON.stringify({ base, checks: report, failures }, null, 2),
  );
  console.log(
    JSON.stringify(
      { pageViewportChecks: report.length, accessibilityAudits: 16, failures },
      null,
      2,
    ),
  );
  if (failures.length) process.exitCode = 1;
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
