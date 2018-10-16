import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { reduxForm, reset, submit } from 'redux-form';
import submitForm from './handleSubmit';
import WorkflowProps from './WorkflowProps';
import Files from '../Files';
import Scripts from './Scripts';
import Notifications from './Notifications';

function TabContainer({ children }) {
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
    justifyContent: 'center',
  },
});

class ViewsSwiper extends Component {

  state = {
    index: 0,
  };

  handleChange = (event, index) => {
    debugger;
    this.setState({ index });
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
    const { index } = this.state;
    return (
      <div className={classes.root}>
        <Tabs
          value={index}
          onChange={this.handleChange}
          fullWidth
          style={{ height: '5vh' }}
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab className={classes.tab} disableRipple label="Cluster" />
          <Tab className={classes.tab} disableRipple label="Files" />
          <Tab className={classes.tab} disableRipple label="Scripts" />
          <Tab className={classes.tab} disableRipple label="Notifications" />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={index}
          className='edit-workflow-swiper'
        >
          <TabContainer dir={theme.direction}>
            <WorkflowProps />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Files modal />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Scripts />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Notifications />
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