const { getDb } = require('./db.js');

async function getCrimeByID(_, { crimeID }) {
  const db = getDb();
  const result = await db.collection('crimes').find({
    _id: crimeID,
  });
  return result;
}

module.exports = { getCrimeByID };
