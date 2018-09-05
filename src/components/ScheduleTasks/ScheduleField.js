import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { reduxForm } from 'redux-form';

class ScheduleField extends Component {

  render() {
    const { title, children} = this.props
    return (
      <Grid item className='create-schedule-field'>
        <Typography color='secondary' variant='subheading' className='create-schedule-field-title'>
          { title }
        </Typography>
        { children }
      </Grid>
    );
  }
}


export default reduxForm({
  form: 'createSchedule',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(ScheduleField);