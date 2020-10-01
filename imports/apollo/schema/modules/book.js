import { gql } from 'apollo-server-express';

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

export const typeDefs = gql`
  type Book {
    title: String
  }
  extend type Query {
    books: [Book]
  }
`;

export const resolvers = {
  Query: {
    books: () => books,
  },
};
