import React from 'react';
import BookForm from '/imports/ui/components/book/BookForm';
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

export default function FormSection() {
  const [mutate] = useMutation(CREATE_BOOK_MUTATION);
  const handleSubmit = React.useCallback(async (formData) => {
    try {
      await mutate({ variables: { formData }, refetchQueries: ['books'] });
    } catch (error) {
      toast.error(extractGQLErrorMessage(error));
    }
  }, []);

  return <BookForm onSubmit={handleSubmit} title="Create a book" />;
}
