import { makeExecutableSchema, gql } from 'apollo-server-express';
import { merge } from 'lodash';
import { typeDefs as Book, resolvers as userResolvers } from './modules/book';
import { typeDefs as Date, resolvers as dateResolvers } from './scalars/date';

const Common = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

export const typeDefs = [Common, Date, Book];
export const resolvers = merge(dateResolvers, userResolvers);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
