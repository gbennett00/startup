const { MongoClient } = require('mongodb');
const config = require('./config');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('rental');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
    console.log('Connected to database');
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

// TODO: add function to create user (create hash and auth token here)

// TODO: add function to get logged in user info by username (highScore, numWins, etc.)

// TODO: add function to get logged in user info by authToken (username, highScore, numWins, etc.)

// TODO: add function to delete user
