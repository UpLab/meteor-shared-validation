/* eslint-disable no-console */
import { Meteor } from 'meteor/meteor';
import { get, throttle } from 'lodash';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { MeteorAccountsLink } from 'meteor/apollo';

const throttledLogout = throttle(
  () => {
    // logout the UI
  },
  1000,
  { leading: true, trailing: false },
);

const link = ApolloLink.from([
  onError((error) => {
    const { graphQLErrors, networkError } = error;
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) =>
        console.log(
          '[GraphQL error]:',
          '\nMessage: ',
          message,
          '\nLocation:',
          locations,
          '\nPath: ',
          path,
          '\nExtensions: ',
          extensions,
          '\nStacktrace: ',
          get(extensions, 'exception.stacktrace', []).reduce((p, c, index) => (p || '').concat(index !== 0 ? '\n' : '', c), ''), // array to string
        ),
      );
      graphQLErrors.forEach((e) => {
        if (e?.extensions?.code === 'UNAUTHENTICATED') {
          throttledLogout();
        }
      });
    }
    if (networkError) {
      console.log(`[Network error]:`, networkError);
    }
  }),
  new MeteorAccountsLink(),
  new HttpLink({
    uri: Meteor.absoluteUrl('graphql'),
    credentials: 'same-origin',
  }),
]);

const cache = new InMemoryCache({
  freezeResults: true, // new
  dataIdFromObject: ({ _id, __typename }) => {
    return _id ? `${__typename}___${_id}` : null;
  },
});

const client = new ApolloClient({
  link,
  cache,
  assumeImmutableResults: true, // new
});

export default client;
