import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import FormSection from './FormSection';
import TableSection from './TableSection';

export default function Home() {
  return (
    <Container>
      <Row>
        <Col md={6}>
          <FormSection />
        </Col>
        <Col md={6}>
          <TableSection />
        </Col>
      </Row>
    </Container>
  );
}
