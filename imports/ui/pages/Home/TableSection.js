import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/react-hooks';
import { extractGQLResult } from '/imports/ui/utils/graphql';
import { Button, Alert } from 'reactstrap';
import { toast } from 'react-toastify';
import BookTable from '/imports/ui/components/book/BookTable';

const BOOKS_QUERY = gql`
  query books {
    books {
      _id
      title
      author
      createdAt
    }
  }
`;

const DELETE_BOOK_MUTATION = gql`
  mutation deleteBook($_id: ID!) {
    deleteBook(_id: $_id)
  }
`;

export default function TableSection() {
  const { data, loading, error, refetch } = useQuery(BOOKS_QUERY);
  const books = extractGQLResult(data);

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

  const onDelete = React.useCallback((book) => deleteMutation({ variables: { _id: book._id } }), [deleteMutation]);

  return (
    <div>
      <h1>Books</h1>
      {loading && !data ? <h2>Loading...</h2> : null}
      {!loading && error ? (
        <Alert color="danger">
          Error fetching books.
          <br />
          <Button color="danger" outline onClick={() => refetch()}>
            Retry
          </Button>
        </Alert>
      ) : null}
      {books ? <BookTable {...{ books, onDelete }} /> : null}
    </div>
  );
}
