const path = require('path');
const express = require('express');
const database = require('database')
const app = express();
const cors = require('cors');
app.use(cors());

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, 'public')));
//console.log('FILES from: ', path.join(__dirname, 'public')); 

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//var apiRouter = express.Router();

let events = []; //this array will store event objects, including a 'username' property

//Existing user endpoint (unchanged)
app.get('/user/:username', (req, res) => {
  const username = req.params.username;
  res.json({ success: true, username: username });
});

//Endpoint to add a new event, now including username in the event data
app.post('/events', (req, res) => {
  const eventData = req.body; // Assumes eventData includes 'username'
  events.unshift(eventData); // Add the new event at the start of the array
  res.status(201).send('Event added successfully');
});

//ndpoint to retrieve events for user
app.get('/events/:username', (req, res) => {
  const username = req.params.username;
  const userEvents = events.filter(event => event.username === username);
  res.json(userEvents);
});

//Endpoint for updating username
app.put('/user/:oldUsername', (req, res) => {
  const oldUsername = req.params.oldUsername;
  const { newUsername } = req.body;

  /* checking for existing? see https://stackoverflow.com/questions/53715870/javascript-checking-if-username-already-existsduplicate
  const usernameExists = events.some(event => event.username === newUsername);
  if (usernameExists) {
    return res.status(400).send({ success: false, message: 'New username already exists.' });
  }*/

  //Updating Events
  events.forEach(event => {
    if (event.username === oldUsername) {
      event.username = newUsername;
    }
  });

  //Print: Sucess!
  res.send({ success: true, message: 'Username changed.' });
});

//gets every event, for main page, needs to be fully implemented with all user data
app.get('/events', (req, res) => {
  res.json(events);
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

