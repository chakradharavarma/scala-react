import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field } from 'redux-form';
import { MaterialTextField } from '../MaterialField';

function TabContainer({ children, dir }) {
  return (
      {children}
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

class FullWidthTabs extends React.Component {

  render() {

    const { title, name, type} = this.props
    return (
      <Grid item className='create-schedule-field'>
        <Typography color='secondary' variant='subheading' className='create-schedule-field-title'>
          { title }
        </Typography>
        <MaterialTextField
          name={name}
          type={type}
          margin="normal"
          style={{ width: 44, textAlign: 'center' }}
        />
      </Grid>
    );
  }
}


export default reduxForm({
  form: 'editSchedule',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(FullWidthTabs);