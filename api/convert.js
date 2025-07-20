const { martian } = require('@tryfabric/martian');

// A file at /api/convert.js creates a serverless function
// that handles requests to the /api/convert endpoint.
module.exports = (req, res) => {
  // We only want to handle POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { markdown } = req.body;

  if (!markdown || typeof markdown !== 'string') {
    return res.status(400).json({ error: 'Markdown content is missing or invalid.' });
  }

  try {
    const notionBlocks = martian.parse(markdown);
    // Send the blocks back. Vercel handles the JSON conversion.
    res.status(200).send(notionBlocks);
  } catch (error) {
    console.error('Conversion Error:', error);
    res.status(500).json({ error: 'Failed to convert markdown.' });
  }
};