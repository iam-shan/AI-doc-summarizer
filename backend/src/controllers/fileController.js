const { detectContext } = require('../handlers/contextHandler');
const { createSession } = require('../handlers/vectorHandler');
const { generateEmbedding } = require('../handlers/embeddingHandler');

const { storeEmbedding, getEmbeddings } = require('../handlers/qdrantHandler');

exports.uploadFile = async (req, res) => {
    try {
        const { file } = req;
        if (!file) return res.status(400).json({ error: 'No file uploaded' });

        // Optional: Context Detection
        // if (process.env.CONTEXT_DETECTING === 'true') {
        //     const sensitive = detectContext(file);
        //     if (sensitive) {
        //         return res.status(403).json({ error: "Unauthorized content detected. Context deleted for this file." });
        //     }
        // }

        // Generate embeddings and store them
        const embeddings = await generateEmbedding(file);
        console.log(embeddings)
        // await storeEmbedding(file.id, embeddings);

        // Create a session
        // const sessionId = await createSession(file.id);

        res.status(200).json({ message: 'File uploaded and processed successfully', sessionId });
    } catch (error) {
        console.log(error)
    }
};
