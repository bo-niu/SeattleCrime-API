// mongo seattleCrime scripts/initUsers.js
// mongo 'mongodb+srv://groupRobot:groupRobot123@cluster0.5uweu.mongodb.net/seattleCrime?retryWrites=true&w=majority' scripts/initUsers.js
db.seattleCrimeUsers.remove({});
db.seattleCrimeComments.remove({});

const usersDB = [
  {
    id: 1,
    name: 'Tom',
    email: 'test1@test.com',
  },
  {
    id: 2,
    name: 'Jack',
    email: 'test2@test.com',
  },
];

db.seattleCrimeUsers.insertMany(usersDB);
const count = db.seattleCrimeUsers.count();
print('Inserted', count, 'users');

db.counters.remove({ _id: 'seattleCrimeUsers' });
db.counters.insert({ _id: 'seattleCrimeUsers', current: count });

const commentsDB = [
  {
    email: 'test1@test.com',
    crimeid: '5f2a9f2a0c115a7bf2dc6396',
    content: 'Lorem ipsum',
    created: new Date("2016-05-18T16:00:00Z"),
  },
  {
    email: 'test2@test.com',
    crimeid: '5f2a9f2a0c115a7bf2dc6396',
    content: 'Lorem ipsum',
    created: new Date("2017-05-18T16:00:00Z"),
  },
]

db.seattleCrimeComments.insertMany(commentsDB);
