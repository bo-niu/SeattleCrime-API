const ObjectId = require('mongodb').ObjectID;
const { getDb } = require('./db.js');


async function getCrimeByID(_, { crimeID }) {
  const db = getDb();
  const result = await db.collection('crimes').findOne({
    _id: new ObjectId(crimeID),
  });
  console.log('getCrimeByID result:');
  console.log(result);
  return result;
}

async function getCommentByCrimeID(_, { input }) {
  const db = getDb();
  const result = await db.collection('seattleCrimeComments').find({
    crimeid: input,
  }).toArray();
  return result;
}

module.exports = { getCrimeByID, getCommentByCrimeID };
