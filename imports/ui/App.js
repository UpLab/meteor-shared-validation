import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ToastContainer } from 'react-toastify';
import ApolloClient from '/imports/apollo/client';
import Home from './pages/Home';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function App() {
  return (
    <ApolloProvider client={ApolloClient}>
      <Home />
      <ToastContainer />
    </ApolloProvider>
  );
}
