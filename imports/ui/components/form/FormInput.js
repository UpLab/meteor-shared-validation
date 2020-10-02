/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

export default function FormInput({ title, name, type = 'text', form, ...rest }) {
  return (
    <FormGroup>
      <Label for={name}>{title}</Label>
      <Input
        innerRef={form.register({ required: true })}
        type={type}
        id={name}
        name={name}
        disabled={form.formState.isSubmitting}
        invalid={!!form.errors[name]}
        {...rest}
      />
    </FormGroup>
  );
}
