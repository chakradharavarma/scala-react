import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { reduxForm, Field } from 'redux-form';
import ViewSwiper from './ViewSwiper';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin: 20,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    marginLeft: 0
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class RadioButtonsGroup extends React.Component {
  state = {
    value: 'female',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div>
          <Typography variant='title' color='secondary'>
            Choose an expression type
          </Typography>
        </div>
        <br/>
          <Divider />
          <ViewSwiper />          
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'createSchedule',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(withStyles(styles)(RadioButtonsGroup));