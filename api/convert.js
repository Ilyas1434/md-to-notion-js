const { martian } = require('@tryfabric/martian');

module.exports = (req, res) => {
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
    res.status(200).send(notionBlocks);
  } catch (error) {
    // Log the full error for debugging in Vercel's logs
    console.error('Conversion Error:', error);
    
    // Send a more informative error back to n8n
    res.status(500).json({ 
      error: 'Failed to convert markdown.',
      // Add the specific error message to the response
      details: error.message || 'No additional details available.' 
    });
  }
};