/**
 * Visual QA helper. Uses the system Edge/Chrome via playwright-core
 * (no browser download).
 *
 * node scripts/qa-screenshots.mjs [--url http://localhost:3000/] [--out dir]
 *   [--sizes 1440x900,834x1112,390x844] [--tag name] [--full] [--reduced]
 *   [--selector "#section"]   (captures just that element, per size)
 *
 * Prints console errors/warnings, failed requests and horizontal overflow.
 */
import { chromium } from "playwright-core";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : (args[i + 1] ?? true);
};
const flag = (name) => args.includes(`--${name}`);

const url = opt("url", "http://localhost:3000/");
const out = path.resolve(opt("out", "qa-shots"));
const sizes = String(opt("sizes", "1440x900,390x844")).split(",");
const tag = opt("tag", "shot");
const selector = opt("selector", null);
mkdirSync(out, { recursive: true });

const candidates = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
];
const executablePath = candidates.find((p) => existsSync(p));
const browser = await chromium.launch({ executablePath, headless: true });

for (const size of sizes) {
  const [w, h] = size.split("x").map(Number);
  const ctx = await browser.newContext({
    viewport: { width: w, height: h },
    deviceScaleFactor: 1,
    reducedMotion: flag("reduced") ? "reduce" : "no-preference",
  });
  const page = await ctx.newPage();
  const problems = [];
  page.on("console", (m) => {
    if (["error", "warning"].includes(m.type()))
      problems.push(`[${m.type()}] ${m.text()}`);
  });
  page.on("pageerror", (e) => problems.push(`[pageerror] ${e.message}`));
  page.on("requestfailed", (r) => problems.push(`[requestfailed] ${r.url()}`));

  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(flag("reduced") ? 400 : 3600); // entrance + failsafe window

  // Walk the page so in-view reveals fire and lazy images load.
  const total = await page.evaluate(
    () => document.documentElement.scrollHeight,
  );
  for (let y = 0; y < total; y += Math.round(h * 0.7)) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(250);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);

  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    innerWidth: window.innerWidth,
  }));

  const base = path.join(out, `${tag}-${w}x${h}`);
  if (selector) {
    await page
      .locator(selector)
      .first()
      .screenshot({ path: `${base}.png` });
  } else if (flag("full")) {
    await page.screenshot({ path: `${base}-full.png`, fullPage: true });
  } else {
    await page.screenshot({ path: `${base}.png` });
  }

  console.log(
    `\n== ${size} ==\noverflowX: ${overflow.scrollWidth > overflow.innerWidth ? "YES" : "no"} (${overflow.scrollWidth}/${overflow.innerWidth})\nproblems: ${problems.length ? "\n  " + problems.join("\n  ") : "none"}`,
  );
  await ctx.close();
}
await browser.close();
