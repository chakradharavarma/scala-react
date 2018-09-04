import React from 'react';
import TextField from '@material-ui/core/TextField';

const textField = (props, children) => ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
    <TextField
      error={error}
      helperText={touched && error !== undefined && `* ${error}`}    
      {...input}
      {...custom}
      {...props}
    >
      {children}
    </TextField>
  );

  export default textField;
