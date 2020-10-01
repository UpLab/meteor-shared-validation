import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from '/imports/apollo/client';
import Home from './pages/Home';

export default function App() {
  return (
    <ApolloProvider client={ApolloClient}>
      <Home />
    </ApolloProvider>
  );
}
