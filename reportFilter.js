const { getDb } = require('./db.js');

async function reportFilter(_, { input }) {
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
    startDate, endDate, offensetype, district,
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
  if (offensetype) {
    console.log('enter if (offensetype)');
    andList.push({
      OffenseType: offensetype,
    });
  }
  if (district) {
    console.log('enter if (district)');
    andList.push({
      District: district,
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

module.exports = reportFilter;
