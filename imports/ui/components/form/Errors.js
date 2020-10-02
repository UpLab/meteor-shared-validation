import React from 'react';
import { isEmpty } from 'lodash';
import { Alert } from 'reactstrap';

const renderErrors = (errors) => (
  <ul className="mb-0 pl-4">
    {Object.entries(errors).map(([key, errorDescriptor]) => (
      <li key={key}>{errorDescriptor.message}</li>
    ))}
  </ul>
);

export default function Errors({ errors }) {
  return !isEmpty(errors) ? <Alert color="danger">{renderErrors(errors)}</Alert> : null;
}
