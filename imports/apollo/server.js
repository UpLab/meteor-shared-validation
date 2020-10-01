import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { getUser } from 'meteor/apollo';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';

const server = new ApolloServer({
  schema,
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization),
  }),
  playground: Meteor.isDevelopment,
  debug: Meteor.isDevelopment,
});

server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql',
  // TODO: configure CORS
  // cors: {
  //   origin: new RegExp(process.env.ROOT_URL),
  //   credentials: true,
  // },
});

WebApp.connectHandlers.use('/graphql', (req, res) => {
  if (req.method === 'GET') {
    res.end();
  }
});
