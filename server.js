// server.js
const express = require('express');
const path = require('path');
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
  const delay = Math.floor(Math.random() * 20000) + 1000; // Random delay between 1-20 sec
  const startTime = Date.now() + delay; // Calculate start time after the delay
  res.json({ startTime }); // Send start time to client
});

// Route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/**
 * POST /timer; gets and updates reaction time if better
 */
app.post('/submit', (req, res) => {
  const { reactionTime, sessionId } = req.body;
  if (!reactionTime || !sessionId) return res.status(400).json({ error: 'Error' });

  if (!bestTimes[sessionId] || reactionTime < bestTimes[sessionId]) {
    bestTimes[sessionId] = reactionTime;
  }

  res.json({ bestTime: bestTimes[sessionId] }); // Send updated best time to client
});

// Define the port (default to 3000 if not specified).
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
