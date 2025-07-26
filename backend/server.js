// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Securely get the API key from environment variables
const apiKey = process.env.API_KEY;
const llmApiUrl = `https://backend.buildpicoapps.com/aero/run/llm-api?pk=${apiKey}`;

// Route to handle chat messages
app.post('/chat', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    // Check if the API key is loaded
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured on the server.' });
    }

    try {
        const response = await fetch(llmApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error calling LLM API:', error);
        res.status(500).json({ error: 'Failed to get response from LLM.' });
    }
});

app.listen(port, () => {
    console.log(`🚀 Backend server running at http://localhost:${port}`);
});