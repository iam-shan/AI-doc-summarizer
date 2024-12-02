const { detectContext } = require('../handlers/contextHandler');
const { createSession } = require('../handlers/vectorHandler');
const { generateEmbedding } = require('../handlers/embeddingHandler');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const Tesseract = require('tesseract.js');

const { storeEmbedding, getEmbeddings } = require('../handlers/qdrantHandler');


async function extractTextFromFile(file) {
    const mimeType = file.mimetype; // Extract MIME type from file
    switch (mimeType) {
        case 'text/plain': // Plain text files
            return file.buffer.toString('utf8');

        case 'application/pdf': // PDF files
            return await extractTextFromPDF(file.buffer);

        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': // DOCX files
            return await extractTextFromDocx(file.buffer);

        case 'image/png': // PNG images
        case 'image/jpeg': // JPEG images
            return await extractTextFromImage(file.buffer);

        default:
            throw new Error('Unsupported file format');
    }
}


/**
 * Function to extract text from PDF
 */
async function extractTextFromPDF(fileBuffer) {
    const data = await pdf(fileBuffer);
    return data.text || ''; // Return extracted text or an empty string
}

/**
 * Function to extract text from DOCX
 */
async function extractTextFromDocx(fileBuffer) {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    return result.value || ''; // Return extracted text or an empty string
}

/**
 * Function to extract text from image (OCR)
 */
async function extractTextFromImage(fileBuffer) {
    const { data: { text } } = await Tesseract.recognize(fileBuffer, 'eng');
    return text || ''; // Return extracted text or an empty string
}


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

        // processing file


        // Extract text from file based on format
        const fileContent = await extractTextFromFile(file);

        console.log(fileContent)

        // // Generate embeddings and store them
        // const embeddings = await generateEmbedding(file);
        // console.log(embeddings)
        // // await storeEmbedding(file.id, embeddings);

        // // Create a session
        // // const sessionId = await createSession(file.id);

        res.status(200).json({ message: 'File uploaded and processed successfully', sessionId });
    } catch (error) {
        console.log(error)
    }
};
