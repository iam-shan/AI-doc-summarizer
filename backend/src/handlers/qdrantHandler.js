const { QdrantClient } = require('@qdrant/qdrant-js');
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs
const axios  = require('axios')
const qdrantClient = new QdrantClient({
    url: process.env.QDRANT_URL, // Local or cloud URL
    apiKey: process.env.QDRANT_API_KEY, // Set for cloud usage
});
const collection = "vectordb"
/**
 * Initializes a collection for storing embeddings.
 * @param {string} collectionName - Name of the collection.
 */
const initializeCollection = async (collectionName) => {
    try {
        // const exists = await qdrantClient.getCollection(collectionName);
        const result = await qdrantClient.collectionExists(collectionName);
        if (!result['exists']) {
            await qdrantClient.createCollection(collectionName, {
                vectors: {
                    size: 768, // Size of embeddings (depends on your model)
                    distance: 'Cosine', // Similarity metric
                },
            });
            console.log(`Collection '${collectionName}' created.`);
        }
        else{
            console.log("collection exists")
        }
    } catch (error) {
        console.error('Error initializing Qdrant collection:', error.message);
        console.log(error)
    }
};

/**
 * Stores embeddings in the Qdrant collection.
 * @param {string} collectionName - Name of the collection.
 * @param {string} fileId - Unique ID for the file.
 * @param {Array<number>} embeddings - Generated embeddings.
 */
const storeEmbedding = async ( fileId, embeddings) => {
    try {
     const points = embeddings.map((embedding, index) => ({
        id: uuidv4(),  // Using a unique UUID as the ID for each point
        vector: embedding.embedding,  // The actual embedding vector
        payload: { session_id: fileId,index: index, "embedding": embedding},  // Optional metadata
      }));
  
        const response = await qdrantClient.upsert(collection, {
            wait:true,
            points: points
        })
        console.log(`Embeddings stored for file ID: ${response}`);

    } catch (error) {
        console.log(error)
    }
};

/**
 * Retrieves embeddings from Qdrant.
 * @param {string} collectionName - Name of the collection.
 * @param {string} fileId - File ID to retrieve embeddings for.
 * @returns {Array<number>} - Embeddings for the file.
 */
const getEmbeddings = async (collectionName, session_id) => {
    try {
        const response = await qdrantClient.scroll(collectionName, {
            filter: {
              must: [
                {
                  key: 'session_id', // The key in your payload
                  match: {
                    value: session_id, // The value you're searching for
                  },
                },
              ],
            },
            with_payload: true, // Include payload in the response
            limit: 10, // Adjust the limit as needed
          });
        if (response.length === 0) {
            throw new Error('Embeddings not found for the given file ID.');
        }
    
        return formatEmbeddings(response);

    } catch (error) {
        console.error('Error retrieving embeddings from Qdrant:', error);
        throw error;
    }
};

const formatEmbeddings = async(embeddings)=>{
    try {
        let formatedEmbeddings = []
        for(let each of embeddings['points']){
            formatedEmbeddings.push(each['payload']['embedding'])
        }
        return formatedEmbeddings;
    } catch (error) {
        
    }
}


module.exports = { qdrantClient, initializeCollection, storeEmbedding,getEmbeddings };
