const MongoClient = require('mongodb').MongoClient;
let url = "mongodb://localhost:27017/seattleCrime";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("seattleCrime");
  dbo.createCollection("discussion", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});