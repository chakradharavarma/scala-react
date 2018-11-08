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
  }else if(name.length > 35 ) {
    errors.name = 'Name must be less than 35 characters'
  }
  else if(name.length < 4 ) {
    errors.name = 'Name must be more than than 4 characters'
  }
  return errors;
}

export default reduxForm({
  form: 'createWorkflow',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validate,
})(NameYourWorkflow);