import { pipeline } from "@xenova/transformers";
export const generateEmbedding=async(tokens)=>{ //max-length = 512
    const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  
    const output = await extractor(tokens, { pooling: 'mean', normalize: true });
    return output
}
