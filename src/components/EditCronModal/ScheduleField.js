import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Field, reduxForm } from 'redux-form';
import TextField from '../TextField';

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
    const { label, name, type} = this.props;
    return (
      <Grid item className='create-schedule-field'>
        <Typography color='secondary' variant='subheading' className='create-schedule-field-title'>
          { label }
        </Typography>
        <Field
          name={name}
          component={TextField({
            label: label,
            type: type,
            margin: "normal",
            style: { width: '100%' }
          })
          }
        />
      </Grid>
    );
  }
}


export default reduxForm({
  form: 'editSchedule',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(ScheduleField);