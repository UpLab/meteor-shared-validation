import React from 'react';
import { toast } from 'react-toastify';
import { useMutation, gql } from '@apollo/react-hooks';
import { extractGQLErrorMessage } from '/imports/ui/utils/graphql';

const CREATE_BOOK_MUTATION = gql`
  mutation createBook($formData: CreateBookInput!) {
    createBook(formData: $formData) {
      _id
    }
  }
`;

export default function useCreateBookMutation() {
  const [mutate] = useMutation(CREATE_BOOK_MUTATION);
  const createBook = React.useCallback(
    async (formData) => {
      try {
        await mutate({ variables: { formData }, refetchQueries: ['books'] });
      } catch (error) {
        toast.error(extractGQLErrorMessage(error));
      }
    },
    [mutate],
  );

  return createBook;
}
