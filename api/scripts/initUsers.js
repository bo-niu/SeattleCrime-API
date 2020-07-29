db.seattleCrimeUsers.remove({});

const usersDB = [
  {
    id: 1,
    name: 'Tom',
    role: 'Admin',
  },
  {
    id: 2,
    name: 'Jack',
    role: 'User',
  },
];

db.seattleCrimeUsers.insertMany(usersDB);
const count = db.seattleCrimeUsers.count();
print('Inserted', count, 'users');
