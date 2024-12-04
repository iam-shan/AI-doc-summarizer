require('dotenv').config();
const express = require('express');
const app = express();
const router = express.Router();
app.use(express.json())
const { models,sequelize, initializeDatabase } = require('./models');
app.set('models', models)
const fileUpload = require('./routes/fileUploadRouter')
const chat = require('./routes/chatRouter')
const user = require('./routes/userRoutes')
const cors = require('cors');
const authenticateJWT = require('./middlewares/auth')

const authRoutes = require('./routes/authRoutes')
const {initializeCollection} = require('./handlers/qdrantHandler')

app.use(cors({
  origin: 'https://main.d19opk0v2645vf.amplifyapp.com/',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/',router);
app.use('/api/auth', authRoutes);
app.use('/upload', authenticateJWT, fileUpload);
app.use('/chat', authenticateJWT, chat)
app.use('/user', user)
app.get('/health',(req,res)=>{
    res.send({"msg": "Applicaiton is working !!" ,  "date" : `${new Date()}`})
})

const multer = require('multer');

const storage = multer.memoryStorage(); // Store files in memory as buffer
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});
app.use(multer)


// Sync the database and start the server
const startServer = async () => {
    try {
        await initializeDatabase(); // Ensure DB is connected
        await sequelize.sync();    // Synchronize models
        await initializeCollection("vectordb");
        console.log('Database models synchronized.');
    } catch (error) {
        console.error('Unable to start the server:', error.message);
    }
};

const axios = require('axios');

const createOrUpdateCollection = async () => {
  try {
    const apiKey = process.env.QDRANT_API_KEY;
    const collectionName = 'vectordb';

    const response = await axios.put(
      `${process.env.QDRANT_URL}/collections/${collectionName}`,
      {
        vectors: {
          size: 1536, // Set the vector size to match OpenAI embeddings
          distance: 'Cosine', // Choose a distance metric (Cosine is recommended)
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': apiKey,
        },
      }
    );

    console.log('Collection created or updated:', response.data);
  } catch (error) {
    console.error('Error creating or updating collection:', error.response?.data || error.message);
  }
};

createOrUpdateCollection();

startServer();
// running the server
app.listen(process.env.PORT || 3000, '0.0.0.0',() => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
