require("dotenv").config()
const {v4 : uuidv4} = require("uuid")
const { Pinecone } = require('@pinecone-database/pinecone');
const key=process.env.pinecone_api_key

const client = new Pinecone({apiKey:process.env.pinecone_api_key});


const index = client.index('embeddings')

const checkNamespace=async(nsp)=>{
    const stats=await index._describeIndexStats()
    if(stats.namespaces?.nsp){
        return true;
    }
    return false;
}
const addEmbedding = async (embeddings,source,url) => {
    const records=embeddings.map((e,i)=>{
        const embeddingData=Array.from(e.data)
        const id=uuidv4()
        const metadata={source:source[i],url}
        return {id,values:embeddingData,metadata}
    })
    console.log(records)
  await index.namespace(url).upsert(records)
};

const queryToPine=async(vector,k,namespace)=>{
    const queryResponse = await index.namespace(namespace).query({
        vector,
        topK: k,
        includeValues: true,
        includeMetadata:true,
    });
    return queryResponse
}
module.exports={addEmbedding,queryToPine,checkNamespace}