// server.js
const express = require('express');
const app = express();

// Use express.json() middleware to parse JSON bodies.
app.use(express.json());

// Serve static files (HTML, CSS, client-side JavaScript) from the "public" directory.
app.use(express.static('public'));

// In-memory storage
let bestTimes = [];

/**
 * GET /timer
 * Returns a JSON object containing the start time and sends that.
 */
app.get('/start', (req, res) => {
  const delay = Math.floor(Math.random() * 20000) + 1000;
  const startTime = Date.now() + delay; 
  res.json({ startTime }); 
});

/**
 * POST /timer; gets and updates reaction time if better
 */
app.post('/submit', (req, res) => {
  const { reactionTime, sessionId } = req.body;
  if (!reactionTime || !sessionId) return res.status(400).json({ error: 'Error, Try Again' });

  if (!bestTimes[sessionId] || reactionTime < bestTimes[sessionId]) {
    bestTimes[sessionId] = reactionTime;
  }

  res.json({ bestTime: bestTimes[sessionId] }); // Send updated best time to screen
});

// Define the port (default to 3000 if not specified).
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
