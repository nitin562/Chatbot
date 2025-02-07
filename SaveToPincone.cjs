require("dotenv").config();
const fs = require("fs").promises;
const fsSync=require("fs")
const { v4: uuidv4 } = require("uuid");
const { Pinecone } = require("@pinecone-database/pinecone");
const path = require("path");
const key = process.env.pinecone_api_key;

const client = new Pinecone({ apiKey: key });

const index = client.index("embeddings");

const checkNamespace = async (nsp) => {
  const stats = await index._describeIndexStats();
  
  if (stats.namespaces[nsp]) {
    return true;
  }
  return false;
};
const deleteNameSpaceRecords = async (nsp) => {
  await index.namespace(nsp).deleteAll();
};
const saveMetaData = async (data, url) => {
  try {
 

    let file = path.join(__dirname, "data", "data.json");
    if (!fsSync.existsSync(file)) {
      await fs.open(file, "w");
    }
    
    const text = await fs.readFile(file, "utf8");
    let dataObj={}
   
    if(text!=""){
       dataObj = JSON.parse(text); //{url:[]}

    }
    const prevData = dataObj;
    dataObj[url] = data;
    //write into file
    await fs.writeFile(file, JSON.stringify(dataObj), "utf8");
    return { success: true, error: null, prev: prevData, path: file };
  } catch (error) {
    return { success: false, error };
  }
};
const getMetaData=async(url)=>{

  const filepath=path.join(__dirname,"data","data.json")
  if (!fsSync.existsSync(filepath)) {
      return {success:false,error:"MetaData not found"}
  }
  const data=await fs.readFile(filepath,"utf8")
  const parsedData=JSON.parse(data)
  if(typeof parsedData!="object"){
    return {success:false,error:"MetaData is corrupted"}
  }
  const urlData=parsedData[url]
  if(urlData){
    return {success:true,data:urlData}
  }
  return {success:false,error:"MetaData not found"}
  
}
const addEmbedding = async (embeddings, source, url) => {
  
  const records = embeddings.map((e, i) => {
    const embeddingData = Array.from(e.data);
    const id = uuidv4();
    const metadata = { url, idx: i };
    return { id, values: embeddingData, metadata };
  });
  const { success, error, prev, path } = await saveMetaData(source, url);
  if (!success) {
    console.log("Meta Data Saving Error - ", error);
    return false;
  }

  // console.log(records)
  try {
    await index.namespace(url).upsert(records);
    return true;
  } catch (error) {
    console.log("PineCone Server issue occured - ", error);
    await fs.writeFile(path, prev, "utf8");
  }
  return false;
};

const queryToPine = async (vector, k, namespace) => {
  try {
    const queryResponse = await index.namespace(namespace).query({
      vector,
      topK: k,
      includeValues: true,
      includeMetadata: true,
    });
    return queryResponse;
  } catch (error) {
    console.log("PineCone Server issue occured - ", error);
    return null;
  }
};
module.exports = {
  addEmbedding,
  queryToPine,
  checkNamespace,
  deleteNameSpaceRecords,
  getMetaData
};
