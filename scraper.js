import { load } from "cheerio";
import puppet from "puppeteer";
export const scrapText = async (url) => {
  try {
    const browser = await puppet.launch({ headless: true });
    const page = await browser.newPage();
    const response = await page.goto(url, { waitUntil: "domcontentloaded" });
    if (response.status == 404) {
      return { error: "Page Not Found" };
    }
    const content = await page.content();
    const arr = [];
    const $ = load(content);

    $("*").each((idx, element) => {
      const title = $(element).text();
      // console.log(title);
      arr.push(title);
    });
    await page.close();
    return { error: null, data: arr };
  } catch (error) {
    return { error: "Navigation Issue occurred" };
  }
};
