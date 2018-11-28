import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import ScheduleField from './ScheduleField';
import SelectWorkflow from './SelectWorkflow';
import { reduxForm, reset, submit, Field } from 'redux-form';
import CronInfoPopover from './CronInfoPopover';
import submitForm from './handleSubmit';
import { cronField } from '../TextField/fields';

function TabContainer({ children, dir }) {
  return (
    <Grid container direction='column' alignItems='flex-start' className='create-schedule-tab-container' >
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
    padding: 12,
  },
  tab: {
    maxWidth: 140,
    minWidth: 80,
  },
  button: {
    alignSelf: 'flex-end',
    marginBottom: 8,
    width: 96,
    justifyContent: 'space-between',
  },
  gridContainer: {
    justifyContent: 'center',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  }
});

class ViewsSwiper extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  handleSubmit = () => {
    const { dispatch, handleSubmit, handleClose } = this.props;

    const submitter = handleSubmit(submitForm.bind(this));
    submitter();
    dispatch(submit('createSchedule'));
    dispatch(reset('createSchedule'));
    handleClose();
  }
  l
  render() {
    const { classes, theme, handleClose } = this.props;
    return (
      <div className={classes.root}>
        {
          false && (
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              fullWidth
              indicatorColor="secondary"
              textColor="secondary"
            >
              <Fragment>
                <Tab className={classes.tab} disableRipple label="Custom CRON" />
                <Tab className={classes.tab} disableRipple label="Minutes" />
                <Tab className={classes.tab} disableRipple label="Hourly" />
                <Tab className={classes.tab} disableRipple label="Daily" />
                <Tab className={classes.tab} disableRipple label="Weekly" />
              </Fragment>
            </Tabs>
            // todo
          )
        }
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <ScheduleField
              title='Enter a cron expression'
            >
              <Field
                name='cron'
                component={cronField}
              />
              <CronInfoPopover />
            </ScheduleField>
            <SelectWorkflow />
          </TabContainer>
        </SwipeableViews>
        <div className={classes.buttonGroup}>
          <Button onClick={this.handleSubmit} className={classes.button} color='secondary'>
            <SaveIcon />
            SAVE
          </Button>
          <Button onClick={handleClose} className={classes.button} color='secondary'>
            <CloseIcon />
            CLOSE
          </Button>
        </div>

      </div>
    );
  }
}

ViewsSwiper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'createSchedule',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
})(withStyles(styles, { withTheme: true })(ViewsSwiper)
);