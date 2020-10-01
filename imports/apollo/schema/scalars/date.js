import { gql } from 'apollo-server-express';
import GraphQLDateTime from 'graphql-type-datetime';

export const typeDefs = gql`
  scalar Date
`;

export const resolvers = {
  Date: GraphQLDateTime,
};
