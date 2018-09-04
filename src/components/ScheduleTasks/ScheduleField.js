import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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

class FullWidthTabs extends Component {

  render() {
    const { title } = this.props
    return (
      <Grid item className='create-schedule-field'>
        <Typography color='secondary' variant='subheading' className='create-schedule-field-title'>
          { title }
        </Typography>
      </Grid>
    );
  }
}


export default reduxForm({
  form: 'createSchedule',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(FullWidthTabs);