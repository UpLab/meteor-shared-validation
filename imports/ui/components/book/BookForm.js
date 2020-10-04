import React from 'react';
import { Form, Button, Spinner } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import FormInput from '/imports/ui/components/form/FormInput';
import Errors from '/imports/ui/components/form/Errors';
import { createBookSchema } from '/imports/api/books/schema';

export default function BookForm({ onSubmit, title }) {
  const form = useForm({
    defaultValues: {
      title: '',
      author: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(createBookSchema),
  });

  const { reset } = form;
  const submit = React.useCallback(
    async (...args) => {
      try {
        await onSubmit(...args);
        reset();
      } catch (error) {
        // noop
      }
    },
    [onSubmit, reset],
  );

  return (
    <Form onSubmit={form.handleSubmit(submit)}>
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
