const { getDb, getNextSequence } = require('./db.js');

async function addUser(_, { input }) {
  const {
    email,
  } = input;
  const db = getDb();
  const isUserExist = await db.collection('seattleCrimeUsers').findOne({ email });
  if (isUserExist) {
    console.log('User existed!');
    return;
  }
  const newUser = Object.assign({}, input);
  newUser.id = await getNextSequence('seattleCrimeUsers');

  await db.collection('seattleCrimeUsers').insertOne(newUser);
  // const result = await db.collection('seattleCrimeUsers').insertOne(newUser);
  // return result;
}

async function postComment(_, { input }) {
  const db = getDb();
  const currentime = new Date(new Date().getTime());
  // const curComments = await db.collection('seattleCrimeUsers').findOne({email: email}).comments;
  const newComment = Object.assign({}, input);
  newComment.created = currentime;
  const result = db.collection('seattleCrimeComments').insertOne(newComment);
  return result;
}

module.exports = { addUser, postComment };
