const express = require('express');
const app = express();
//Just incase i run into any cors errors:
const cors = require('cors');
app.use(cors());

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.use(express.json());
app.use(express.static('public'));

var apiRouter = express.Router();

//Modify the route to match the fetch request in login.js
apiRouter.get('/user/:username', (req, res) => {
  const username = req.params.username;
  res.json({ success: true, username: username});
});

//use the modified router with the '/api' prefix?
app.use(`/api`, apiRouter);

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
