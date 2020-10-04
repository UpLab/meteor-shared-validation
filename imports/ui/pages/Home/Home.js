import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import TableSection from './TableSection';
import useCreateBookMutation from '/imports/ui/hooks/book/useCreateBookMutation';
import BookForm from '/imports/ui/components/book/BookForm';

export default function Home() {
  const createBook = useCreateBookMutation();

  return (
    <Container>
      <Row>
        <Col md={6}>
          <BookForm onSubmit={createBook} title="Create a book" />
        </Col>
        <Col md={6}>
          <TableSection />
        </Col>
      </Row>
    </Container>
  );
}
