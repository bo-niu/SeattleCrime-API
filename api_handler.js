const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');

const GraphQLDate = require('./graphql_date.js');
const about = require('./about.js');
const auth = require('./auth.js');
const { filtrateCrimes, crimeCount, testCount } = require('./homeFilter.js');
const { getCrimeCountEveryYear } = require('./reportFilter.js');
const { getCrimeByID } = require('./discussionFilter.js');
const user = require('./user.js');

function getContext({ req }) {
  const user = auth.getUser(req);
  return { user };
}

const resolvers = {
  Query: {
    about: about.getMessage,
    user: auth.resolveUser,
    filtrateCrimes,
    getCrimeCountEveryYear,
    crimeCount,
    testCount,
    getCrimeByID,
  },
  Mutation: {
    userAdd: user.addUser,
    postComment: user.postComment,
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  context: getContext,
  formatError: (error) => {
    console.log(error);
    return error;
  },
  playground: true,
  introspection: true,
});

function installHandler(app) {
  const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
  console.log('CORS setting:', enableCors);
  let cors;
  if (enableCors) {
    const origin = process.env.UI_SERVER_ORIGIN || 'http://localhost:8000';
    const methods = 'POST';
    cors = { origin, methods, credentials: true };
  } else {
    cors = 'false';
  }
  server.applyMiddleware({ app, path: '/graphql', cors });
}

module.exports = { installHandler };
