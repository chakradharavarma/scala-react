import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import {
  nameField
} from '../TextField/fields';


class NameYourWorkflow extends Component {

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
  }else if(name.length > 20 || name.length < 3) {
    errors.name = 'Name must be between 3-20 characters'
  }
  return errors;
}

export default reduxForm({
  form: 'createWorkflow',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validate,
})(NameYourWorkflow);