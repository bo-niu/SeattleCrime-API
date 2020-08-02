const { getDb, getNextSequence } = require('./db.js');

async function addUser(_, { input }) {
  const {
    name, email
  } = input;
  const db = getDb();
  const isUserExist = await db.collection('seattleCrimeUsers').findOne({email: email});
  if(isUserExist) {
    console.log("User existed!");
    return;
  }
  const newUser = Object.assign({}, input)
  newUser.id = await getNextSequence('seattleCrimeUsers');
  newUser.comments = [];

  const result = await db.collection('seattleCrimeUsers').insertOne(newUser);
  return result;
}

async function postComment(_, { email, content }) {
  const db = getDb();
  const currentime = new Date(new Date().getTime());
  //const curComments = await db.collection('seattleCrimeUsers').findOne({email: email}).comments;
  const result = await db.collection('seattleCrimeUsers').update({email: email}, {"$push": {
    comments: {content: content, created: currentime}
  }});
  return result;
}

module.exports = {addUser, postComment};
