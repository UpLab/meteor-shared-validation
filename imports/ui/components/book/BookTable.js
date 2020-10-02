import React from 'react';
import { Table, Button } from 'reactstrap';
import { format } from 'date-fns';

export default function BookTable({ books, onDelete }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Created at</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book._id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{format(new Date(book.createdAt), 'Pp')}</td>
            <td>
              <Button onClick={() => onDelete(book)} color="danger">
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
