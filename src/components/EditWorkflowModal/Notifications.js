import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { emailField } from '../TextField/fields';

class WorkflowProps extends Component {

  state = {

  }

  onFileLoad = (e, file) => alert(e.target.result, file.name);

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    return (
      <div className='edit-workflow-notification-container'>
        <Grid container justify='center'>
          <Grid container item spacing={16}>
            <Grid item xs={12} justify='center'>
            <Typography color='secondary' variant='headline'>
                Get email notifications for your workflow
              </Typography>
              <Typography variant='subheading'>
                Enter emails in semicolon separated format
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Field name="emails"
                component={emailField}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default reduxForm({
  form: 'editWorkflow',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(WorkflowProps);