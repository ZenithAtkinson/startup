//For mango stuff:
//Look at example for Simon.
//Need functions that use mongo client, and they take paramteres that should interact with database. i.e function that takes username and password, and checks if they can login. 
//ALSO, need register functoin that will add to database.
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

// Construct the MongoDB connection URL from dbConfig.json
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

// Connect to MongoDB and get the database object
async function connectDB() {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    // Replace 'YourDatabaseName' with the actual name of your database
    return client.db('YourDatabaseName');
}

async function getUser(email) {
    const db = await connectDB();
    return db.collection('users').findOne({ email: email });
}

async function getUserByToken(token) {
    const db = await connectDB();
    return db.collection('users').findOne({ token: token });
}

async function createUser(email, password) {
    const db = await connectDB();
    const userCollection = db.collection('users');

    // Check if the email already exists
    const emailExists = await userCollection.findOne({ email: email });
    if (emailExists) {
        throw new Error('Email already exists');
    }

    // Hash the password before storing it
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };

    await userCollection.insertOne(user);
    return { success: true, message: 'User created successfully', user: { email: user.email, token: user.token } };
}

async function loginUser(email, password) {
    const db = await connectDB();
    const userCollection = db.collection('users');
    const user = await userCollection.findOne({ email: email });

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Invalid credentials');
    }

    return { success: true, message: 'User logged in successfully', user: { email: user.email, token: user.token } };
}

async function addEvent(username, eventData) {
    const db = await connectDB();
    const eventCollection = db.collection('events');
    eventData.username = username;
    await eventCollection.insertOne(eventData);
    return { success: true, message: 'Event added successfully' };
}

async function getEventsForUser(username) {
    const db = await connectDB();
    const eventCollection = db.collection('events');
    const events = await eventCollection.find({ username: username }).toArray();
    return events;
}

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    loginUser,
    addEvent,
    getEventsForUser,
};


//Export object with methods like login, register. 
//https://stackoverflow.com/questions/21117160/what-is-export-default-in-javascript at the bottom of this file
//https://stackoverflow.com/questions/34714826/better-to-export-an-object-containing-function-or-just-export-multiple-function

//
