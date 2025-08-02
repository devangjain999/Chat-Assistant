require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();

// Middleware to parse JSON and serve frontend files
app.use(express.json());
app.use(express.static('public')); // Ensure index.html and JS are in 'public'

// Load API key from .env
const apiKey = process.env.API_KEY;

// API route to proxy requests to external LLM
app.post('/api/chat', async (req, res) => {
  try {
    const response = await fetch(`https://backend.buildpicoapps.com/aero/run/llm-api?pk=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: req.body.prompt })
    });

    const data = await response.json();
    res.json({ text: data.text || "Bot error." });
  } catch (err) {
    console.error("API error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
