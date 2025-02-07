const { Groq } = require("groq-sdk");
require("dotenv").config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getResponseFromGroq(content) {
  try {
    const chatCompletion = await getGroqChatCompletion(content);
    // Print the completion returned by the LLM.
    console.log(chatCompletion.choices[0]?.message?.content || "");
  } catch (error) {
    console.log("Can't connect to GROQ LLM");
  }
}

async function getGroqChatCompletion(content) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are an AI assistant answering based on provided context.",
      },
      {
        role: "user",
        content,
      },
    ],
    model: "llama3-8b-8192",
  });
}
module.exports = getResponseFromGroq;
