# Web Scraper with Chatbot CLI

## Overview
This project is a **Web Scraper with Chatbot CLI**, leveraging **RAG (Retrieval-Augmented Generation)** and an **LLM API** (such as Groq API). The application allows users to:

- Scrape content from a given URL.
- Store the scraped data efficiently.
- Uses Xenova/Transfermers.js for embedding the scraped Data.
- Interact with a chatbot that generates responses based on the scraped content.
- Chooses a **CLI interface**.
- Optimize performance using **async techniques**.
- Use a **PineCone as Vector DB** for efficient retrieval and storing embeddings.
- Providing relevant links in output if they present in query related data.

## Tech Stack
- **Backend:** Node.js, Express.js, Puppeteer/Cheerio (for scraping)
- **Database:** Pinecone 
- **CLI** - Command user interface provided for the test.
- **AI/ML:** LLM API (Groq API)
- **Model used for embedding** : **Xenova/all-MiniLM-L6-v2**

## Installation
### Prerequisites
- Node.js & npm installed
- API key for the LLM service and PineCone Db. For test and checking purpose, API Keys are provided. **Discomment the api key and use them**

### Steps to Set Up
1. **Clone the repository**
   ```sh
   git clone https://github.com/nitin562/Chatbot.git
   cd ChatBot
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file and add:
   ```ini
   pinecone_api_key=pinecone-api-key
   groq_api_key=groq-api-key
   ```

4. **Run the server**
   ```sh
    node index.js
   ```
## 🏗️ Working Mechanism

### 1️⃣ URL Validation & Web Scraping

- User inputs a URL via CLI.
- The URL is validated for correctness.
- Puppeteer loads the webpage and extracts raw HTML.
- Cheerio parses the HTML to extract readable text content.

### 2️⃣ Chunking & Embedding

- The extracted content is chunked into segments of **512 tokens** (max token limit of embedding model).
- Each chunk is embedded using an embedding model.
- Embeddings are stored in **Pinecone**.
- Instead of saving raw chunks to Pinecone, they are stored in `data.json` on the server.

### 3️⃣ Query Processing & Retrieval

- User inputs a **query** via CLI.
- The query is embedded using the same embedding model.
- Pinecone retrieves the most relevant chunks based on similarity to the query embedding.
- Each retrieved chunk contains metadata with an index reference to `data.json`.
- The raw text chunks are retrieved from `data.json` using the metadata index.

### 4️⃣ LLM Response Generation

- The retrieved chunks and user query are sent to **Groq API**.
- The chatbot processes the content and generates a meaningful response.
- The response is displayed in the CLI.
## Edge Cases that i handled
- Handles when the scraper gives 404 for the user url.
- Handles the dynamic websites scraping by using Puppeteer.
- Handles the limit of embedder model i.e 512 tokens by chunking the scraped data.
- Handles the irrelevant chunking of data by maintaining interrelation of chunks.
- Handles the pinecone metadata limit by storing raw data locally instead of storing as metadata with embeddings.
- Handles Rescraping part of program by deleting previous records to maintain consistency.
- Handles the isolation of embeddings in pinecone by using url as namespaces so that embeddings of particular url will only used in query search.

## Edge cases that i can't handled but know that it will occur in future
- Broarder Query from user without good relevant topics that can help in better searches in pinecone i.e tell me questions: User wants questions from url data but for query retrieval, it becomes irrelevant. **Solution** can be using frequent words attach with query before search so that relevant response chances can become high. 
- Chunking mechanism will fall when a chunk itself has token length greater than 512. It can be solved if we use overlapping technique to chunk data on the basis of length instead of punctuations but i dont know more about it.
- If Groq api payload limit exceeds (yet only some chunks are sent), it may cause error. Somehow, handled by limiting the topK value and removing irrelvant css, js scraping data for some extent.

## Future Improvements
- Implement **authentication & user management with a database instead of localStorage in server**.
- Add **real-time chat UI** using WebSockets.
- Add **Frontend i.e React** for better user experience.
- Improve the query management by adding **Frequent Words** to make retrieval more efficient.

## License
This project is licensed under the **MIT License**.

## Contributing
Feel free to open issues and submit pull requests to improve this project!

---
🚀 **Happy Scraping & Chatting!**

