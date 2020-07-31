const { getDb } = require('./db.js');

async function filtrateCrimes(_, { input }) {
  // const {
  //   startDate, endDate, district, beat,
  // } = args;
  // const { endDate } = args;
  // const {district} = args;
  // const {beat} = args;
  // const startDate = input.startDate;
  // const endDate = input.endDate;
  // const district = input.district;
  // const beat = input.beat;
  const {
    startDate, endDate, district, beat,
  } = input;
  const db = getDb();
  const andList = [];
  console.log('enter async function filtrateCrimes(_, args)');
  console.log(input);
  if (startDate && endDate) {
    console.log('enter if (startDate)');
    andList.push({
      OffenseStartDate: {
        $gte: startDate,
      },
    });
  }
  if (endDate) {
    console.log('enter if (endDate)');
    andList.push({
      OffenseStartDate: {
        $lt: endDate,
      },
    });
  }
  if (district) {
    console.log('enter if (district)');
    andList.push({
      District: district,
    });
  }
  if (beat) {
    console.log('enter if (beat)');
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

module.exports = filtrateCrimes;
