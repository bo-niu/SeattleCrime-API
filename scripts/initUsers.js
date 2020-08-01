// mongo seattleCrime scripts/initUsers.js
// mongo 'mongodb+srv://groupRobot:groupRobot123@cluster0.5uweu.mongodb.net/seattleCrime?retryWrites=true&w=majority' scripts/initUsers.js
db.seattleCrimeUsers.remove({});

const usersDB = [
  {
    id: 1,
    name: 'Tom',
    email: 'test1@test.com',
    comments: {
      content: 'Lorem ipsum',
      created: new Date("2016-05-18T16:00:00Z"),
    }
  },
  {
    id: 2,
    name: 'Jack',
    email: 'test2@test.com',
    comments: {
      content: 'Lorem ipsum',
      time: new Date("2017-05-18T16:00:00Z"),
    }
  },
];

db.seattleCrimeUsers.insertMany(usersDB);
const count = db.seattleCrimeUsers.count();
print('Inserted', count, 'users');

db.counters.remove({ _id: 'seattleCrimeUsers' });
db.counters.insert({ _id: 'seattleCrimeUsers', current: count });
