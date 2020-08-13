const { MongoClient } = require('mongodb');

let url = 'mongodb://localhost:27017/seattleCrime';

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  console.log('Database created!');
  db.close();
});

url = 'mongodb://localhost:27017/';

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  const dbo = db.db('seattleCrime');
  dbo.createCollection('discussion', (error) => {
    if (error) throw error;
    console.log('Collection created!');
    db.close();
  });
});
