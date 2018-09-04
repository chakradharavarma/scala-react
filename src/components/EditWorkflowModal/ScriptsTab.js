import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { reduxForm, reset, submit } from 'redux-form';
import submitForm from './handleSubmit';

function TabContainer({ children, dir }) {
  return (
    <Grid container direction='column' alignItems='center' >
      {children}
    </Grid>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
  },
  tab: {
    maxWidth: 140,
    minWidth: 80,
  },
  button: {
    alignSelf: 'flex-end',
    marginRight: 24,
    width: 96,
    justifyContent: 'space-between'
  },
  gridContainer: {
    justifyContent: 'flex-start',
  },
});

class ViewsSwiper extends Component {
  state = {
    value: 1,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleSubmit = () => {
    const { dispatch, handleSubmit } = this.props;
    const submitter = handleSubmit(submitForm.bind(this));
    submitter();
    dispatch(submit('editWorkflow'));
    dispatch(reset('editWorkflow'));
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="primary"
          textColor="primary"
        >
            <Tab className={classes.tab} disableRipple label="Pre" />
            <Tab className={classes.tab} disableRipple label="Run" />
            <Tab className={classes.tab} disableRipple label="Post" />
        </Tabs>
          <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            { null }
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

ViewsSwiper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default reduxForm({
    form: 'editWorkflow',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: false,
  })(withStyles(styles, { withTheme: true })(ViewsSwiper)
);