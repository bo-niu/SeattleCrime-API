require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

async function connectToDb() {
  const url = process.env.DB_URL || 'mongodb://localhost/SeattleCrime';
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

// async function getNextSequence(name) {
//   const result = await db.collection('crimes').findOneAndUpdate(
//     { _id: name },
//     { $inc: { current: 1 } },
//     { returnOriginal: false },
//   );
//   return result.value.current;
// }

function getDb() {
  return db;
}

async function filtrateCrimes({
  startDate, endDate, district, beat,
}) {
  const andList = [];
  if (startDate) {
    andList.push({
      OffenseStartDate: {
        $gte: startDate.toISOString(),
      },
    });
  }
  if (endDate) {
    andList.push({
      OffenseStartDate: {
        $lt: endDate.toISOString(),
      },
    });
  }
  if (district) {
    andList.push({
      District: district,
    });
  }
  if (beat) {
    andList.push({
      Beat: beat,
    });
  }
  const result = db.collection('crimes').find({
    $and: andList,
  });
  return result.value;
}

module.exports = { connectToDb, getDb, filtrateCrimes };
