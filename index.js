import { chunker } from "./chunker.js";
import { generateEmbedding } from "./Embedder.js";
import getResponseFromGroq from "./GroqChat.cjs";
import {
  addEmbedding,
  checkNamespace,
  deleteNameSpaceRecords,
  getMetaData,
  queryToPine,
} from "./SaveToPincone.cjs";
import { scrapText } from "./scraper.js";
import inquirer from "inquirer";

const consoleWithFixedWidth = (text) => {
  const width = process.stdout.columns || 80; // Get terminal width, default to 80
  const padding = "-";
  const totalSpace = width - text.length;
  const leftSpace = Math.floor(totalSpace / 2);
  const rightSpace = totalSpace - leftSpace;

  console.log(padding.repeat(leftSpace) + text + padding.repeat(rightSpace));
};

const init = async (url) => {
  const isScraped = await checkNamespace(url);
  if (isScraped) {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "ReScrap",
        message: "The url is already Scraped, Do You Want to Scrap it again?",
        choices: ["yes", "no"],
      },
    ]);
    if (answer.ReScrap == "no") {
      const { success, data } = await getMetaData(url);
      if (success) {
        console.log(data);
        return { success, data };
      }
      //if metadata is not found so scraping should begin again
      consoleWithFixedWidth("Scraping Restarted");
    }
    await deleteNameSpaceRecords(url);
  }
  consoleWithFixedWidth("Scraping the URL");
  const { error, data } = await scrapText(url);
  if (error) {
    console.log("Scraping Error Occurred - ", error);
    return { success: false };
  }
  consoleWithFixedWidth("Chunking the Scraped Data");
  let chunks = chunker(data.join(" "), 512);
  const embeddings = [];
  consoleWithFixedWidth("Embedding the Chunks");

  for (let chunk of chunks) {
    const embedding = await generateEmbedding(chunk);
    embeddings.push(embedding);
  }
  consoleWithFixedWidth("Storing the Embeddings externally");

  const success = await addEmbedding(embeddings, chunks, url);

  return { success, data: chunks };
};
const askQuery = async (url, data) => {
  const answers = await inquirer.prompt([
    {
      name: "question",
      type: "input",
      message: "Enter Your query related to the url content:",
    },
  ]);
  if (answers.question) {
    await query(answers.question, url, data);
  }
};
const query = async (query, url, data) => {
  //query
  const queryEmbedding = await generateEmbedding(query);
  // console.log(queryEmbedding);
  let query_val = Array.from(queryEmbedding.data);
  const searchResponse = await queryToPine(query_val, 10, url);
  // console.log(searchResponse);
  let context = "";

  if (searchResponse && searchResponse.matches) {
    const sourcesArr = searchResponse.matches.map((e) => {
      // console.log(e.metadata)
      // console.log(e)
      const postion = e.metadata.idx;
      return data[postion];
    });
    context = sourcesArr.join(" ");
  }
  const content = `Context:\n${context}\n\nUser Query: ${query}`;
  // console.log(content);
  await getResponseFromGroq(content);
};
const main = async () => {
  let url = "";
  let scrapedData = [];
  while (true) {
    if (!url) {
      const answer = await inquirer.prompt([
        {
          name: "url",
          type: "input",
          message: "Enter URL to scrap:",
        },
      ]);
      let { success, data } = await init(answer.url);

      if (success) {
        consoleWithFixedWidth("Scraping Completed");
        url = answer.url;
        scrapedData = data;
      } else {
        continue;
      }
    }
    await askQuery(url, scrapedData);
  }
};
main();
