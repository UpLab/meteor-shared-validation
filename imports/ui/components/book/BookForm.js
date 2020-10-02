import React from 'react';
import { Form, Button, Spinner } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import FormInput from '/imports/ui/components/form/FormInput';
import Errors from '/imports/ui/components/form/Errors';
import { createBookSchema } from '/imports/api/books/schema';

export default function BookForm({ onSubmit, title }) {
  const form = useForm({
    mode: 'onBlur',
    resolver: yupResolver(createBookSchema),
  });

  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <h1>{title}</h1>
      <Errors {...{ errors: form.errors }} />
      <FormInput title="Title" name="title" form={form} />
      <FormInput title="Author" name="author" form={form} />
      <Button type="submit" color="primary" disabled={form.formState.isSubmitting}>
        {!form.formState.isSubmitting ? 'Create' : <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
      </Button>
    </Form>
  );
}
