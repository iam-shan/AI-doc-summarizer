const { ChatMessage } = require('../models');

exports.chatWithFile = async (req, res) => {
    try {
        const { fileId, userMessage } = req.body;
        if (!fileId || !userMessage) {
            return res.status(400).json({ error: 'File ID and user message are required.' });
        }

        // Fetch embeddings for the file
        const embeddings = await getEmbeddingsFromVectorDB(fileId);

        if (!embeddings) {
            return res.status(404).json({ error: 'Embeddings not found for this file.' });
        }

        // Call Cerebras AI with the embeddings and user query
        const aiResponse = await callCerebrasAI(embeddings, userMessage);

        // Store the chat in the database
        await ChatMessage.create({
            fileId,
            userMessage,
            aiResponse,
        });

        res.status(200).json({ aiResponse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getChatHistory = async (req, res) => {
    try {
        const { fileId } = req.params;
        if (!fileId) {
            return res.status(400).json({ error: 'File ID is required.' });
        }

        const chatHistory = await ChatMessage.findAll({
            where: { fileId },
            order: [['createdAt', 'ASC']],
        });

        res.status(200).json({ chatHistory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
