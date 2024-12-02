const { QdrantClient } = require('@qdrant/qdrant-js');

const qdrantClient = new QdrantClient({
    url: process.env.QDRANT_URL || 'http://localhost:6333', // Local or cloud URL
    apiKey: process.env.QDRANT_API_KEY, // Set for cloud usage
});

/**
 * Initializes a collection for storing embeddings.
 * @param {string} collectionName - Name of the collection.
 */
const initializeCollection = async (collectionName) => {
    try {
        const exists = await qdrantClient.getCollection(collectionName);
        if (!exists) {
            await qdrantClient.createCollection(collectionName, {
                vectors: {
                    size: 768, // Size of embeddings (depends on your model)
                    distance: 'Cosine', // Similarity metric
                },
            });
            console.log(`Collection '${collectionName}' created.`);
        }
    } catch (error) {
        console.error('Error initializing Qdrant collection:', error.message);
        throw error;
    }
};

/**
 * Stores embeddings in the Qdrant collection.
 * @param {string} collectionName - Name of the collection.
 * @param {string} fileId - Unique ID for the file.
 * @param {Array<number>} embeddings - Generated embeddings.
 */
const storeEmbedding = async (collectionName, fileId, embeddings) => {
    try {
        await qdrantClient.upsert(collectionName, {
            points: [
                {
                    id: fileId,
                    vector: embeddings,
                    payload: { fileId },
                },
            ],
        });
        console.log(`Embeddings stored for file ID: ${fileId}`);
    } catch (error) {
        console.error('Error storing embeddings in Qdrant:', error.message);
        throw error;
    }
};

/**
 * Retrieves embeddings from Qdrant.
 * @param {string} collectionName - Name of the collection.
 * @param {string} fileId - File ID to retrieve embeddings for.
 * @returns {Array<number>} - Embeddings for the file.
 */
const getEmbeddings = async (collectionName, fileId) => {
    try {
        const result = await qdrantClient.search(collectionName, {
            vector: [], // Leave empty; we are filtering by payload
            filter: { must: [{ key: 'fileId', match: { value: fileId } }] },
            limit: 1,
        });

        if (result.length === 0) {
            throw new Error('Embeddings not found for the given file ID.');
        }

        return result[0].vector;
    } catch (error) {
        console.error('Error retrieving embeddings from Qdrant:', error.message);
        throw error;
    }
};


module.exports = { qdrantClient, initializeCollection, storeEmbedding,getEmbeddings };
