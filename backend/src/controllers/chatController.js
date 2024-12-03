const { chats } = require('../models');
const { getEmbeddings } = require('../handlers/qdrantHandler')
const {answerFromEmbeddings} = require('../handlers/embeddingHandler')

exports.chatWithFile = async (req, res) => {
    try {
        const { session_id, userMessage } = req.body;
        if (!session_id || !userMessage) {
            return res.status(400).json({ error: 'File ID and user message are required.' });
        }

        // Fetch embeddings for the file
        const embeddings = await getEmbeddings('vectordb',session_id);

        if (!embeddings) {
            return res.status(404).json({ error: 'Embeddings not found for this file.' });
        }

        console.log("embeddingsssss", embeddings)
        const aiResponse = await answerFromEmbeddings(userMessage, embeddings);

        // Store the chat in the database
        await req.app.get('models')['chats'].create({
            session_id,
            userMessage,
            aiResponse,
        });

        /** 
         * logic for mapping users and sessions
         */

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
