import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const nameField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
  const hasError = touched && error !== undefined;
  return (
      <TextField
        autoComplete="off"
        error={hasError}
        helperText={touched && error !== undefined && `* ${error}`}
        margin="normal"
        placeholder={'ex: test-water-300'}
        style={{ width: 300 }}
        {...input}
        {...custom}
      />
  )
}

class NameYourWorkflow extends Component {

  submit = () => {
        
  }

  state = {
    name: ''
  }

  render(){
    return (
      <div className='step-content-container'>
        <Typography variant='display1' color='secondary' component='div' className='step-title'>
          Name your workflow
        </Typography>
        <Field name="name"
          component={nameField}
        />
     </div>
    )
  }
}


const validate = ({ name }) => {
  const errors = {};
  if(!name || name.trim() === '') {
    errors.name = 'Workflow must have a name'
  }else if(name.length > 15 || name.length < 3) {
    errors.name = 'Name must be between 3-14 characters'
  }
  return errors;
}

export default reduxForm({
  form: 'createWorkflow',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validate,
})(NameYourWorkflow);