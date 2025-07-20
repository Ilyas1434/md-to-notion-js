const { markdownToBlocks } = require('@tryfabric/martian');

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
    // Use the correct function from the library
    const notionBlocks = markdownToBlocks(markdown);
    res.status(200).send(notionBlocks);
    
  } catch (error) {
    console.error('Conversion Error:', error);
    res.status(500).json({
      error: 'Failed to convert markdown.',
      details: error.message || 'No additional details available.',
    });
  }
};