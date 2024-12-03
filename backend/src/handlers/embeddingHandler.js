const axios = require('axios');
const fs = require('fs');
require('dotenv').config();
const{ Cerebras}  = require('@cerebras/cerebras_cloud_sdk');
const { OpenAI } = require("openai");
const cosineSimilarity = require("cosine-similarity");



/**
 * Generates embeddings for the given file content using the Cerebras API.
 * @param {Object} file - The uploaded file object.
 * @returns {Array<number>} - The embeddings for the file content.
 */
// exports.generateEmbedding = async (file) => {
//     // try {
//     //     // Read file content
//     //     const fileContent = file.buffer.toString('utf8');
//     //     if (!fileContent) throw new Error('File content is empty.');

//     //     // Make API request to Cerebras
//     //     const response = await axios.post(
//     //         process.env.CEREBRAS_API_URL,
//     //         {
//     //             text: fileContent, // File content to generate embeddings for
//     //         },
//     //         {
//     //             headers: {
//     //                 'Authorization': `Bearer ${process.env.CEREBRAS_API_KEY}`,
//     //                 'Content-Type': 'application/json',
//     //             },
//     //         }
//     //     );

//     //     if (response.status !== 200 || !response.data.embeddings) {
//     //         throw new Error('Failed to generate embeddings from Cerebras API.');
//     //     }

//     //     return response.data.embeddings;
//     // } catch (error) {
//     //     console.error('Error generating embeddings:', error.message);
//     //     throw error;
//     // }

//     const cerebrasClient = new Cerebras({
//         apiKey: 'csk-92tmr4kjyffhkj8fmt62vm5xf38y3j9j4j9rcwn2n5p9tmfp', // Use your real API key here
//       });
      
//       const textToEmbed = "This is a sample text for embedding.";
      
//       async function getEmbeddings() {
//         try {
//           // Example of querying for embeddings (adjust to the API you're using)
//           const embeddingsResponse = await cerebrasClient.embeddings.create({
//             model: 'llama3.1-8b', // or whatever model is suitable
//             input: textToEmbed,
//           });
//           console.log("Embeddings Response:", embeddingsResponse);
//         } catch (error) {
//           console.error("Error fetching embeddings:", error);
//         }
//       }
      
//       getEmbeddings();
// };
// Initialize OpenAI client

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Replace with your OpenAI API key
});

async function generateEmbedding(file) {
    try {
      let fileEmbeddings = [];
        // const fileContent = fs.readFileSync(filePath, "utf-8");
        const chunks = splitText(file, 2000);

        try{
          fileEmbeddings = await Promise.all(
            chunks.map(async (chunk) => {
              const response = await openai.embeddings.create({
                model: "text-embedding-ada-002",
                input: chunk,
              });
      
              // Log the full response for debugging
      
              return {
                text: chunk,
                embedding: response.data[0]?.embedding, // Ensure this path is valid
              };
            })
          );
      
          console.log("File embeddings generated.");
          return fileEmbeddings;
          // let tex= await answerFromEmbeddings("when is the final exam", fileEmbeddings);
          // return tex;
        } catch (error) {
          console.error("Error generating embeddings:", error);
        }

        // const apiKey = process.env.OPENAI_API_KEY;
        // const response = await axios.post(
        //     'https://api.openai.com/v1/embeddings',
        //     {
        //         model: 'text-embedding-ada-002',
        //         input: content,
        //     },
        //     {
        //         headers: { Authorization: `Bearer ${apiKey}` },
        //     }
        // );
        // return response.data.data[0].embedding;
    } catch (error) {
        console.log(error.response)
    }

}

function splitText(text, maxTokens) {
  const chunks = [];
  let currentChunk = "";
  const sentences = text.split(/(?<=[.?!])\s+/); // Split by sentences

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > maxTokens) {
      chunks.push(currentChunk);
      currentChunk = sentence;
    } else {
      currentChunk += ` ${sentence}`;
    }
  }
  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
}

async function answerFromEmbeddings(prompt,fileEmbeddings) {
  try {
    // Embed the user query
    const queryResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: prompt,
    });

    // Log the query response for debugging
    console.log("Query API Response:", JSON.stringify(queryResponse, null, 2));

    const queryEmbedding = queryResponse.data[0]?.embedding;

    // Check if queryEmbedding is undefined
    if (!queryEmbedding) {
      console.error("Error: queryEmbedding is undefined");
      return;
    }

    // Find the most similar chunk using cosine similarity
    let bestMatch = { text: "", similarity: -1 };
    for (const { text, embedding } of fileEmbeddings) {
      const similarity = cosineSimilarity(queryEmbedding, embedding);
      if (similarity > bestMatch.similarity) {
        bestMatch = { text, similarity };
      }
    }
     // Use the best matching chunk to generate an answer
     const answerResponse = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct", // You can use a different model for generation
      prompt: `Answer the following question based on the content:\n\n${bestMatch.text}\n\nQuestion: ${prompt}`,
      max_tokens: 100,
    });

    // Format the response to ensure proper spacing
    const rawAnswer = answerResponse.choices[0]?.text.trim();
    
    if (rawAnswer) {
      // Replace newline characters or fix spacing if necessary
      const formattedAnswer = rawAnswer.replace(/(\r\n|\n|\r)/g, " ").replace(/\s+/g, " ").trim();
      return formattedAnswer;
    } else {
      return "Sorry, I couldn't generate an answer.";
    }
  } catch (error) {
    console.error("Error answering from embeddings:", error);
  }
}

module.exports = { generateEmbedding, answerFromEmbeddings};