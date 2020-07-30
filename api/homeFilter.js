const { getDb } = require('./db.js');

async function filtrateCrimes({
  startDate, endDate, district, beat,
}) {
  const db = getDb();
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

module.exports = filtrateCrimes;
