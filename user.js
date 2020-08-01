const { getDb, getNextSequence } = require('./db.js');

async function addUser(_, { input }) {
  const {
    name, email
  } = input;
  const db = getDb();
  const newUser = Object.assign({}, input)
  newUser.id = await getNextSequence('seattleCrimeUsers');
  newUser.comments = {};

  const result = await db.collection('seattleCrimeUsers').insertOne(newUser);
  return result;
}

module.exports = addUser;
