const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const database = require('./database');
const app = express();
const cors = require('cors');
const { addEvent, getEventsForUser } = require('./database');
const { peerProxy } = require('./peerProxy.js');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser()); // Use cookieParser middleware for handling cookies
app.set('trust proxy', true);
const port = process.argv.length > 2 ? process.argv[2] : 3000;

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

let events = []; // This array will store event objects, including a 'username' property

const authCookieName = 'token'; // Define the name of your auth cookie

function setAuthCookie(res, token) {
    res.cookie(authCookieName, token, { httpOnly: true, sameSite: 'strict' });
}

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await database.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await database.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await database.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:email', async (req, res) => {
  const user = await database.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await database.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

//adding a new event with authentication
secureApiRouter.post('/events', async (req, res) => {
  const { username, eventData } = req.body;
  try {
    await addEvent(username, eventData);
    res.status(201).send('Event added successfully');
  } catch (error) {
    res.status(500).send('Error adding event');
  }
});

//rretrieving events for a user with authentication
secureApiRouter.get('/events/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const userEvents = await getEventsForUser(username);
    res.json(userEvents);
  } catch (error) {
    res.status(500).send('Error retrieving events');
  }
});

/*//xisting endpoint to add a new event, including username in the event data
app.post('/events', (req, res) => {
  const eventData = req.body; // Assumes eventData includes 'username'
  events.unshift(eventData); // Add the new event at the start of the array
  res.status(201).send('Event added successfully');
});

// existing endpoint to retrieve events for a user
app.get('/events/:username', (req, res) => {
  const username = req.params.username;
  const userEvents = events.filter(event => event.username === username);
  res.json(userEvents);
});*/

//existing endpoint for updating username
app.put('/user/:oldUsername', (req, res) => {
  const oldUsername = req.params.oldUsername;
  const { newUsername } = req.body;
  // Updating Events
  events.forEach(event => {
    if (event.username === oldUsername) {
      event.username = newUsername;
    }
  });
  res.send({ success: true, message: 'Username changed.' });
});

// Your existing endpoint to get every event for the main page
app.get('/events', (req, res) => {
  res.json(events);
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);