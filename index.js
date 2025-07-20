// Import necessary packages
const express = require('express');
const { martian } = require('@tryfabric/martian');

// Initialize the express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Define the conversion endpoint
app.post('/api/convert', (req, res) => {
  // Extract the markdown text from the request body
  const { markdown } = req.body;

  // Simple validation
  if (!markdown || typeof markdown !== 'string') {
    return res.status(400).json({ error: 'Markdown content is missing or invalid.' });
  }
  
  try {
    // Use martian to parse the markdown into Notion blocks
    const notionBlocks = martian.parse(markdown);

    // Send the resulting blocks back as a successful response
    res.status(200).json(notionBlocks);

  } catch (error) {
    console.error('Conversion Error:', error);
    res.status(500).json({ error: 'Failed to convert markdown.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app for Vercel
module.exports = app;