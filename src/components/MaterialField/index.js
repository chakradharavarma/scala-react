import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Field } from 'redux-form';

const field = (props, children) => ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
    <TextField
      helperText={touched && error}
      {...input}
      {...custom}
      {...props}
    >
      {children}
    </TextField>
  );


export const MaterialTextField = (props) => (
  <Field name={props.name}
    component={
      field({
        margin: "normal",
        style: { width: '100%' },
        ...props
      }, props.children
      )
    }
  />
)
