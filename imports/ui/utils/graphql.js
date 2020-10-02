/* eslint-disable import/prefer-default-export */

export const extractGQLResult = (data) => (data ? Object.entries(data)[0][1] : null);

export const extractGQLErrorMessage = (error) => {
  let msg = error.message;
  if (error.graphQLErrors) {
    msg = error.graphQLErrors.map(({ message }) => message).join('\n');
  }
  return msg;
};
