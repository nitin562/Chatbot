import { load } from "cheerio";
import puppet from "puppeteer";
export const scrapText = async (url) => {
  try {
    const browser = await puppet.launch({ headless: true });
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (
        req.resourceType() === "script" ||
        req.resourceType() === "stylesheet" ||
        req.resourceType() === "font"
      ) {
        req.abort(); // Block JS, CSS, and fonts
      } else {
        req.continue();
      }
    });
    const response = await page.goto(url, { waitUntil: "domcontentloaded" });

    if (response.status == 404) {
      return { error: "Page Not Found" };
    }
    const content = await page.content();
    const arr = [];
    const $ = load(content);
    const allowedTags = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "li", "a", "div", "span"];

    $(allowedTags.join(",")).each((idx, element) => {
      const tag = element.tagName.toLowerCase();
      const text = $(element).text().trim();

      // ✅ Skip divs/spans that are empty or contain only spaces
      if (!text || text.length < 3) return;

      // ✅ Skip divs/spans that are only structural (like wrappers)
      if (tag === "div" || tag === "span") {
        // Check if the div/span has meaningful content (not just nested containers)
        const hasChildElements = $(element).children().length > 0;
        if (hasChildElements) return; // Skip if it's just a container
      }

      if (tag === "a") {
        const link = $(element).attr("href");
        if (link) {
          const linkContent = `The article discusses ${text}. You can read more here: ${link}`;
          arr.push(linkContent);
        }
      } else {
        arr.push(text);
      }
    });
    await page.close();
    return { error: null, data: arr };
  } catch (error) {
    console.log(error)
    return { error: "Navigation Issue occurred" };
  }
};
