import { chromium } from "playwright";

/**
 * Options passed to chromium.launch(). Disables headless mode when DEBUG
 * environment variable's set.
 */
const browserLaunchOptions = {
  headless: process.env.DEBUG ? false : undefined,
  slowMo: process.env.DEBUG ? 50 : undefined,
};

/**
 * Load and scrape data from a CRT Notice page given it's URL.
 *
 * Example:
 *
 *    const notice = await getNotice(
 *      'https://canalrivertrust.org.uk/notices/18561-river-severn-carrington-road-bridge'
 *    );
 */
export async function getNotice(url) {
  if (!url) {
    throw new Error("Missing Notice URL");
  }

  const browser = await chromium.launch(browserLaunchOptions);

  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto(url);

  const notice = await page.evaluate(() => {
    const notice = {
      title: document.getElementsByClassName("text-header-headline")[0]
        .innerText,
      href: window.location.href,
    };

    for (const panel of document.getElementsByClassName("panel-contact")) {
      const panelHeading = panel.getElementsByClassName("heading")[0].innerText;
      const panelHeadingLower = panelHeading.toLowerCase();

      notice[panelHeadingLower] = {};

      switch (panelHeadingLower) {
        case "detail":
        case "location":
          for (const para of panel.getElementsByTagName("p")) {
            let boldText = para.children[0].innerText.trim();

            // Remove ending ':'.
            boldText = boldText.substring(0, boldText.length - 1);

            const bodyText = para.innerText.substr(boldText.length).trim();

            notice[panelHeadingLower][boldText] = bodyText;
          }

          break;

        case "updates":
        case "description":
          break;
      }
    }

    return notice;
  });

  notice.id = new URL(notice.href).pathname.split("/")[2].split("-")[0];

  await browser.close();

  return notice;
}

/**
 * Gather a list of all notice summaries from CRT Notices.
 *
 * Example:
 *
 *     (await getNotices()).forEach(notice => {
 *       console.log(`${notice.name} - ${notice.href}`)
 *     });
 *
 * Returns:
 *
 *     [
 *       {
 *         endAt: null
 *         endDate: null,
 *         headline: "Boston Lock",
 *         noticeType: 7,
 *         path: "/notices/14494-boston-lock",
 *         startAt: null,
 *         startDate: "2018-11-01T00:00:00",
 *         towpathClosed: false
 *       }
 *     ]
 *
 */
export async function getNotices() {
  const browser = await chromium.launch(browserLaunchOptions);
  const context = await browser.newContext();

  const page = await context.newPage();
  await page.goto("https://canalrivertrust.org.uk/notices");

  const notices = (
    await page.evaluate(() => {
      return window.crt.component[5].data;
    })
  ).map((notice) => {
    notice.href = new URL(
      notice.path,
      "https://canalrivertrust.org.uk/notices"
    ).href;

    return notice;
  });

  await browser.close();

  return notices;
}
