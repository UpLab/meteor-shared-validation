import React from 'react';
import { Button, Alert } from 'reactstrap';
import BookTable from '/imports/ui/components/book/BookTable';
import useBooksListQuery from '/imports/ui/hooks/book/useBooksListQuery';
import useDeleteBookMutation from '/imports/ui/hooks/book/useDeleteBookMutation';

export default function TableSection() {
  const { books, loading, refetch, error } = useBooksListQuery();

  const deleteBookMutation = useDeleteBookMutation();
  const onDelete = React.useCallback(({ _id }) => deleteBookMutation({ variables: { _id } }), [deleteBookMutation]);

  return (
    <div>
      <h1>Books</h1>
      {loading && !books ? <h2>Loading...</h2> : null}
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
