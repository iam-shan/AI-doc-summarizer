const axios = require('axios');
const fs = require('fs');
require('dotenv').config();
const{ Cerebras}  = require('@cerebras/cerebras_cloud_sdk');

/**
 * Generates embeddings for the given file content using the Cerebras API.
 * @param {Object} file - The uploaded file object.
 * @returns {Array<number>} - The embeddings for the file content.
 */
exports.generateEmbedding = async (file) => {
    // try {
    //     // Read file content
    //     const fileContent = file.buffer.toString('utf8');
    //     if (!fileContent) throw new Error('File content is empty.');

    //     // Make API request to Cerebras
    //     const response = await axios.post(
    //         process.env.CEREBRAS_API_URL,
    //         {
    //             text: fileContent, // File content to generate embeddings for
    //         },
    //         {
    //             headers: {
    //                 'Authorization': `Bearer ${process.env.CEREBRAS_API_KEY}`,
    //                 'Content-Type': 'application/json',
    //             },
    //         }
    //     );

    //     if (response.status !== 200 || !response.data.embeddings) {
    //         throw new Error('Failed to generate embeddings from Cerebras API.');
    //     }

    //     return response.data.embeddings;
    // } catch (error) {
    //     console.error('Error generating embeddings:', error.message);
    //     throw error;
    // }

    const cerebrasClient = new Cerebras({
        apiKey: 'csk-92tmr4kjyffhkj8fmt62vm5xf38y3j9j4j9rcwn2n5p9tmfp', // Use your real API key here
      });
      
      const textToEmbed = "This is a sample text for embedding.";
      
      async function getEmbeddings() {
        try {
          // Example of querying for embeddings (adjust to the API you're using)
          const embeddingsResponse = await cerebrasClient.embeddings.create({
            model: 'llama3.1-8b', // or whatever model is suitable
            input: textToEmbed,
          });
          console.log("Embeddings Response:", embeddingsResponse);
        } catch (error) {
          console.error("Error fetching embeddings:", error);
        }
      }
      
      getEmbeddings();
};
