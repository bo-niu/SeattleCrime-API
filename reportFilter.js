const { getDb } = require('./db.js');

async function getCrimeCountEveryYear(_, { input }) {
  const {
    startDate, endDate, district, beat, type,
  } = input;
  const db = getDb();
  const andList = [];
  if (startDate) {
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
  if (type !== 'All') {
    andList.push({
      OffenseType: type,
    });
  }
  if (district !== 'All') {
    andList.push({
      District: district,
    });
    if (beat !== 'All') {
      andList.push({
        Beat: beat,
      });
    }
  }
  // const result = await db.collection('crimes').find({
  //   $and: andList,
  // }).aggregate([
  //   {
  //     $sort: { year: 1 },
  //   },
  //   {
  //     $group: {
  //       _id: {
  //         year: { $year: '$OffenseStartDate' },
  //       },
  //       count: { $sum: 1 },
  //     },
  //   },
  // ]).toArray();

  const result = await db.collection('crimes').aggregate([
    {
      $match: {
        $and: andList,
      },
    },
    {
      $group: {
        _id: {
          year: { $year: '$OffenseStartDate' },
        },
        year: { $first: { $year: '$OffenseStartDate' } },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { year: 1 },
    },
  ]).toArray();
  console.log('report Filter result: getCrimeCountEveryYear');
  console.log(result);
  return result;
}

module.exports = { getCrimeCountEveryYear };
