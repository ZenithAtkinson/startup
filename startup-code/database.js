//For mango stuff:
//Look at example for Simon.
//Need functions that use mongo client, and they take paramteres that should interact with database. i.e function that takes username and password, and checks if they can login. 
//ALSO, need register functoin that will add to database.
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('Cluster0');
const userCollection = db.collection('user');


// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password, username) {
  // Check if the user or username already exists
  const emailExists = await userCollection.findOne({ email: email });
  const usernameExists = await userCollection.findOne({ username: username });
  if (emailExists || usernameExists) {
    throw new Error(emailExists ? 'Email already exists' : 'Username already exists');
  }

  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    username: username, // Include the username in the user object
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

async function loginUser(email, password) {
  const user = await userCollection.findOne({ email: email });
  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid credentials');
  }
  return user; // This returns the whole user document, which should include the username
}

async function addEventToUser(email, event) {
  // event should be an object containing event details
  const updateResult = await userCollection.updateOne(
    { email: email },
    { $push: { events: event } }
  );
  return updateResult;
}

/*
function addScore(score) {
  scoreCollection.insertOne(score);
}

function getHighScores() {
  const query = { score: { $gt: 0, $lt: 900 } };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}*/

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  loginUser,
  addEventToUser,
  //addScore,
  //getHighScores,
};

//Export object with methods like login, register. 
//https://stackoverflow.com/questions/21117160/what-is-export-default-in-javascript at the bottom of this file
//https://stackoverflow.com/questions/34714826/better-to-export-an-object-containing-function-or-just-export-multiple-function

//
