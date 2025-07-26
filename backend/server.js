// backend/backend.js
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware to enable Cross-Origin Resource Sharing and parse JSON
app.use(cors());
app.use(express.json());

// Your secret API key. Keep this on the server.
const apiKey = "v1-Z0FBQUFBQm5HUEtMSjJkakVjcF9IQ0M0VFhRQ0FmSnNDSHNYTlJSblE0UXo1Q3RBcjFPcl9YYy1OZUhteDZWekxHdWRLM1M1alNZTkJMWEhNOWd4S1NPSDBTWC12M0U2UGc9PQ=="; // Stays in the backend
const llmApiUrl = `https://backend.buildpicoapps.com/aero/run/llm-api?pk=${apiKey}`;

// Define a route to handle chat requests
app.post('/chat', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
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