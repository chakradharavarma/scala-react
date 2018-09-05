import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '../TextField';
import { reduxForm, Field } from 'redux-form';

function TabContainer({ children }) {
  return (
      {children}
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

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