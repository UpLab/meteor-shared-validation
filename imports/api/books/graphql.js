import { gql } from 'apollo-server-express';
import BookModel from './model';

export const typeDefs = gql`
  type Book {
    _id: ID!
    author: String!
    title: String!
    createdAt: Date!
  }

  extend type Query {
    books: [Book]!
  }

  input CreateBookInput {
    author: String!
    title: String!
  }

  extend type Mutation {
    createBook(formData: CreateBookInput!): Book!
    deleteBook(_id: ID!): ID
  }
`;

export const resolvers = {
  Query: {
    books: () => BookModel.getAll(),
  },
  Mutation: {
    createBook: async (root, { formData }) => BookModel.create(formData),
    deleteBook: async (root, { _id }) => BookModel.deleteById(_id),
  },
};
