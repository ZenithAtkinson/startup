const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(express.static('public'));

//var apiRouter = express.Router();

let events = []; // This array will store event objects, including a 'username' property

// Existing user endpoint (unchanged)
app.get('/user/:username', (req, res) => {
  const username = req.params.username;
  res.json({ success: true, username: username });
});

// Endpoint to add a new event, now including username in the event data
app.post('/events', (req, res) => {
  const eventData = req.body; // Assumes eventData includes 'username'
  events.unshift(eventData); // Add the new event at the start of the array
  res.status(201).send('Event added successfully');
});

// Endpoint to retrieve events for a specific user
app.get('/events/:username', (req, res) => {
  const username = req.params.username;
  const userEvents = events.filter(event => event.username === username);
  res.json(userEvents);
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});