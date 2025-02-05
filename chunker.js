import { encoding_for_model } from "tiktoken";
const encoder = encoding_for_model("gpt-3.5-turbo");

const countTokens=(text)=>encoder.encode(text).length
export const chunker=(data,maxTokens)=>{
    let currentTokenCount=0;
    let currentChunk=""
    let finalChunks=[]
    let sentences=data.split(/(?<=\.)\s/)
    //no need to use overlap mechanism because we split the sentences into meaningfull text at every full stop.
    for (let sentence of sentences) {
        const sentenceTokens = countTokens(sentence);
    
        // If adding the sentence exceeds the max tokens, start a new chunk
        if (currentTokenCount + sentenceTokens > maxTokens) {
          if (currentChunk) {
            finalChunks.push(currentChunk);
          }
          currentChunk = sentence; // Start a new chunk with the current sentence
          currentTokenCount = sentenceTokens;
        } else {
          currentChunk += " " + sentence;  // Append sentence to the current chunk
          currentTokenCount += sentenceTokens;
        }
      }
      if(currentChunk){
        finalChunks.push(currentChunk)
      }
      return finalChunks
}