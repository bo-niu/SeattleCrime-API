/* eslint no-restricted-globals: "off" */
const { MongoClient } = require('mongodb');

async function createIndex() {
  const uri = 'mongodb+srv://groupRobot:groupRobot123@cluster0.5uweu.mongodb.net/seattleCrime?retryWrites=true&w=majority';
  // const uri = 'mongodb://localhost:27017/seattleCrime';
  const client = new MongoClient(uri, { useNewUrlParser: true });
  let db;
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log('Connected to MongoDB at', uri);
    db = client.db();

    db.collection('crimes').dropIndexes();

    db.collection('crimes').createIndex({ OffenseType: 1 });
    db.collection('crimes').createIndex({ ReportDate: 1 });
    db.collection('crimes').createIndex({ OffenseStartDate: 1 });
    db.collection('crimes').createIndex({ OffenseEndDate: 1 });
    db.collection('crimes').createIndex({ Block: 1 });
    db.collection('crimes').createIndex({ District: 1 });
    db.collection('crimes').createIndex({ Beat: 1 });
    db.collection('crimes').createIndex({ CensusTract: 1 });
    db.collection('crimes').createIndex({ Longitude: 1 });
    db.collection('crimes').createIndex({ Latitude: 1 });
  } catch (e) {
    console.log('error occured! They are:');
    console.error(e);
  } finally {
    client.close();
    console.log('db closed.');
  }
}

createIndex();
