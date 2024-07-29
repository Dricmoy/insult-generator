// backend/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

const HUGGING_FACE_API_KEY = ''

// Route to fetch insults from the external API
app.get('/api/insult', async (req, res) => {
  try {
    const response = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching insult:', error);
    res.status(500).json({ error: 'Failed to fetch insult' });
  }
});

app.get('/api/llama-response', async (req, res) => {
    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/meta/llama', 
        { inputs: 'Generate a response to this insult.' }, 
        {
          headers: {
            Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching LLaMA response:', error);
      res.status(500).json({ error: 'Failed to fetch LLaMA response' });
    }
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
