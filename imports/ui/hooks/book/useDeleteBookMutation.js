import { useMutation, gql } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { BOOKS_QUERY } from './useBooksListQuery';

const DELETE_BOOK_MUTATION = gql`
  mutation deleteBook($_id: ID!) {
    deleteBook(_id: $_id)
  }
`;

export default function useDeleteBookMutation() {
  const [deleteMutation] = useMutation(DELETE_BOOK_MUTATION, {
    update: (cache, { data: { deleteBook: deletedBookId } }) => {
      const booksQueryData = cache.readQuery({ query: BOOKS_QUERY });
      const filteredBooks = booksQueryData.books.filter(({ _id }) => _id !== deletedBookId);
      cache.writeQuery({ query: BOOKS_QUERY, data: { books: filteredBooks } });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  return deleteMutation;
}
