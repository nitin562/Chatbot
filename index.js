import { chunker } from "./chunker.js";
import { generateEmbedding } from "./Embedder.js";
import getResponseFromGroq from "./GroqChat.cjs";

import { addEmbedding, checkNamespace, queryToPine } from "./SaveToPincone.cjs";
import { scrapText } from "./scraper.js";

const init = async (url) => {
  const isScraped = await checkNamespace(url);
  if (!isScraped) {
    const data = await scrapText(url);
    let chunks = chunker(data.join(" "), 512);
    const embeddings = [];
    for (let chunk of chunks) {
      const embedding = await generateEmbedding(chunk);
      embeddings.push(embedding);
    }
    await addEmbedding(embeddings, chunks, url);
  }
}

const query=async(query,url)=>{
  //query
  const queryEmbedding = await generateEmbedding(query);
  console.log(queryEmbedding);
  let query_val = Array.from(queryEmbedding.data);
  const searchResponse = await queryToPine(query_val, 3,url);
  console.log(searchResponse);
  if (searchResponse.matches) {
    const sourcesArr = searchResponse.matches.map((e) => {
      // console.log(e.metadata)
      return e.metadata.source;
    });
    const context = sourcesArr.join(" ");
    const content = `Context:\n${context}\n\nUser Query: ${query}`;
    console.log(content);
    await getResponseFromGroq(content);
  }
}

// main();
