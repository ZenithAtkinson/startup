//For mango stuff:
//Look at example for Simon.
//Need functions that use mongo client, and they take paramteres that should interact with database. i.e function that takes username and password, and checks if they can login. 
//ALSO, need register functoin that will add to database.
const { MongoClient } = require('mongodb'); //gives object, only takes the mongodb. Key-value pair.


const userName = 'holowaychuk';
const password = 'express';
const hostname = 'mongodb.com';

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);

const collection = client.db('rental').collection('house'); //EXAMPLE

const house = { //EXAMPLE
  name: 'Beachfront views',
  summary: 'From your bedroom to the beach, no shoes required',
  property_type: 'Condo',
  beds: 1,
};
await collection.insertOne(house);

const cursor = collection.find();
const rentals = await cursor.toArray();
rentals.forEach((i) => console.log(i));

//Export object with methods like login, register. 
//https://stackoverflow.com/questions/21117160/what-is-export-default-in-javascript at the bottom of this file
//https://stackoverflow.com/questions/34714826/better-to-export-an-object-containing-function-or-just-export-multiple-function

//