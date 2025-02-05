import {load} from "cheerio";
import puppet from "puppeteer"
export const scrapText = async (url) => {
  const browser=await puppet.launch({headless:true})
  const page=await browser.newPage()
  await page.goto(url,{waitUntil:"domcontentloaded"})
  const content=await page.content()
  const arr = [];
  const $ = load(content);
    
  $("*").each((idx, element) => {
    const title = $(element).text();
    // console.log(title);
    arr.push(title);
  });
  await page.close()
  return arr
};
