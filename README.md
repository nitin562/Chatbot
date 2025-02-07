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
## 🖥️ Example Terminal Output

```sh
PS D:\Repos\Scrap\Chatbot> node index.js
? Enter URL to scrap: (node:10472) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. 
Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
✔ Enter URL to scrap: https://k8school.com/short-story-in-english-with-moral/
✔ The URL is already Scraped, Do You Want to Scrap it again? yes

-------------------------------------------------------------------
Scraping the URL
-------------------------------------------------------------------
---------------------------------------------------------------
Chunking the Scraped Data
---------------------------------------------------------------
-----------------------------------------------------------------
Embedding the Chunks
-----------------------------------------------------------------
-----------------------------------------------------------
Storing the Embeddings externally
-----------------------------------------------------------
------------------------------------------------------------------
Scraping Completed
------------------------------------------------------------------
✔ Enter Your query related to the URL content:
✔ Enter Your query related to the URL content: tell me a story
I'd be happy to tell you a story!

Here's a classic short story in English with a moral:

The Two Frogs:

Once upon a time, in a small pond, there lived two frogs named Ravi and Rohan. They were the best of friends and would spend their days playing, swimming, and exploring the pond.

One day, while they were sitting on a lily pad, they noticed a group of frogs gathered around a small stream. The stream was calm and clear, with a few fish swimming in it. The group of frogs were having a lively discussion about something.

Ravi and Rohan curiously approached the group and listened in. They soon realized that the frogs were talking about the beauty of the stream and how it was a great place to relax.

After a while, Ravi turned to Rohan and exclaimed, "Wow, I wish we had a stream like that in our pond!"

Rohan replied, "Why don't we just go and ask the other frogs if they can help us find one?"

Ravi thought for a moment and then said, "That's a great idea! But first, let's make sure that we are not disturbing anyone."

So, they quietly approached the group and asked if they could help them find a stream like the one they saw. The group of frogs was happy to help and accompanied Ravi and Rohan back to their pond.

After searching for a while, they finally found a small stream flowing into their pond. The frogs were overjoyed and thanked Ravi and Rohan for bringing the stream to their home.

Moral: Words are powerful to motivate or demotivate someone. Choose them wisely.

And, you can read more stories like this on our official website: https://k8school.com/short-story-in-english-with-moral/

If you need more moral tales or short stories in English, I can help you with it!
Citation: https://k8school.com/short-story-in-english-with-moral/
✔ Enter Your query related to the url content: Do you know more stories
Based on the provided context, it appears that you're interested in finding more short stories in English with moral. Besides the link provided earlier, here are some additional resources and story collections that might interest you:

1. Short Stories 101: A website with a vast collection of short stories, essays, and poems from various authors. You can filter stories by genre, theme, or cultural setting.

Link: https://www.shortstories101.com/

2. Storyweaver: An online platform that offers a diverse range of short stories from around the world. You can search by theme, age group, and more.   

Link: https://www.storyweaver.org.in/

3. Lit2Go: A digital library of over 100,000 poems, short stories, and plays by various authors. You can search by genre, title, or author.

Link: https://lit2go.org/

4. Authors’ websites: Many famous authors have their own websites with free short stories and essays. Some popular ones include:

   a. Neil Gaiman: https://neilgaiman.com/short-stories/
   b. Alice Walker: https://alicewalker.com/short-stories/
   c. Chris Crutcher: https://www.chriscrutcher.com/short-stories/

5. Online educational resources: Several educational websites and platforms offer short stories and moral tales, often with accompanying lesson plans and activities. Some notable ones include:

   a. ReadWriteThink: https://www.readwritethink.org/short-stories/
   b. Scholastic: https://www.scholastic.com/teachers/storytime/
   c. PBS Kids: https://www.pbskids.org/short-stories/

Please note that some of these resources may require registration or have age-specific content. Be sure to review the content before sharing it with your students.

I hope these links and resources help you find the short stories you're looking for!
Citation: https://k8school.com/short-story-in-english-with-moral/
✔ Enter Your query related to the url content: Tell me another story
I'd be happy to tell you another story. Here's one:

**The Story of a Little Bird's Big Dreams**

Once upon a time, in a small nest on a tree branch, lived a little bird named Luna. Luna was like any other bird, who spent most of her days chirping songs and flying around. However, unlike her fellow birds, Luna had big dreams. She wanted to fly beyond the trees and explore the world beyond.        

Luna would often look up at the sky and imagine herself soaring high, feeling the wind beneath her wings, and seeing the world from a different perspective. One day, she decided to take the leap and started practicing her flying. She would flap her small wings as hard as she could, stretch her neck, and lift off the ground. But no matter how hard she tried, she couldn't seem to get higher than a few feet off the ground.

Feeling discouraged, Luna began to lose hope. She thought to herself, "I'm just a little bird, what can I do that no one else can?" Just then, an old owl perched on a nearby branch called out to her, "What are you doing, Little Bird?"

Luna looked up at the owl and explained her dream to fly high. The owl listened carefully and then said, "Ah, yes! I know just what you need." The owl taught Luna that it's not just about flapping your wings hard, but also about going with the wind and learning to glide.

With newfound determination, Luna started practicing again. This time, she focused on feeling the wind beneath her wings and learning to glide. And guess what? She started to soar higher and higher! She climbed up the sky, feeling free and empowered.

**Moral of the Story:**

Don't be afraid to chase your dreams, no matter how big or small they may seem. Believe in yourself, take calculated risks, and never give up. And most importantly, learn to adapt and go with the flow.

**Links to Help You:**

* To learn more about storytelling and its benefits for students, check out this article from BBC Bitesize: https://www.bbc.co.uk/bitesize/topics/zsbqm39/articles/zsmtn9q
* For more stories and moral tales, visit this link: https://www.shortstories63.com/
* Explore the world of online learning and discover how it can help you achieve your goals: https://k8school
Citation: https://k8school.com/short-story-in-english-with-moral/
? Enter Your query related to the url content:
```
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

