const { getDb } = require('./db.js');

async function filtrateCrimes(_, { input }) {
  const {
    startDate, endDate, district, beat,
  } = input;
  const db = getDb();
  const andList = [];
  console.log('enter async function filtrateCrimes(_, args)');
  console.log(input);
  if (startDate && endDate) {
    andList.push({
      OffenseStartDate: {
        $gte: startDate,
      },
    });
  }
  if (endDate) {
    andList.push({
      OffenseStartDate: {
        $lt: endDate,
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
  console.log('andList:');
  console.log(andList);

  const result = await db.collection('crimes').find({
  // db.collection('crimes').find({
    $and: andList,
  }).toArray(
    // (err, result) => {
    //   if (err) console.log(err);
    //   console.log('result:\n', result);
    // },
  );
  console.log('result:');
  return result;

  // console.log('andList:\n', andList);
  // return null;
}

async function crimeCount(_, { input }) {
  const {
    startDate, endDate, district, beat,
  } = input;
  const db = getDb();
  const andList = [];
  if (startDate && endDate) {
    andList.push({
      OffenseStartDate: {
        $gte: startDate,
      },
    });
  }
  if (endDate) {
    andList.push({
      OffenseStartDate: {
        $lt: endDate,
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
  const result = await db.collection('crimes').find({
  // db.collection('crimes').find({
    $and: andList,
  }).count();
  console.log(`count: ${result}`);
  return result;
}

module.exports = { filtrateCrimes, crimeCount };
