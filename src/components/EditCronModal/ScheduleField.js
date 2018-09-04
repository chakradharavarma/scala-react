import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { reduxForm, Field } from 'redux-form';

function TabContainer({ children, dir }) {
  return (
      {children}
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};


const field = (props, children) => ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
    <TextField
      helperText={touched && error}
      {...input}
      {...custom}
      {...this.props}
    >
      {children}
    </TextField>
  );

class FullWidthTabs extends React.Component {

  render() {

    const { title, name, type} = this.props
    return (
      <Grid item className='create-schedule-field'>
        <Typography color='secondary' variant='subheading' className='create-schedule-field-title'>
          { title }
        </Typography>
        <Field name={name}
          component={field({
            type: type ,
            margin: "normal",
            style: { width: 44, textAlign: 'center' },
          })}
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