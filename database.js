const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

const client = new MongoClient(url);
const db = client.db('wordblitz');
const users = db.collection('users');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
    console.log('Connected to database');
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function createUser(username, password) {
  if (await getUser(username)) { 
    return { success: false };
  } else {
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = {
      username: username,
      password: passwordHash,
      authToken: uuid.v4(),
      highScore: 0,
      numWins: 0
    };
    await users.insertOne(user);
    return { success: true, authToken: user.authToken, id: user._id };
  }
}

async function getUser(username) {
  return await users.findOne({ username: username });
}

// TODO: add function to get logged in user info by username (highScore, numWins, etc.)

// TODO: add function to get logged in user info by authToken (username, highScore, numWins, etc.)

// TODO: add function to delete user

module.exports = { createUser };
