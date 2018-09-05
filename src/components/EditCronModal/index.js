import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Fade from '@material-ui/core/Fade';
import { initialize } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import ScheduleField from './ScheduleField';
import SelectWorkflow from './SelectWorkflow';
import { reduxForm } from 'redux-form';
import submitForm from './handleSubmit';

const styles = {
  paper: {
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
    marginRight: 24,
    width: 96,
    justifyContent: 'space-between'
  },
  gridContainer: {
    justifyContent: 'center',
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Fade {...props} timeout={{ enter: 100, exit: 500 }} />;
}

class EditCronModal extends Component {

  state = {
    open: false,
  };

  constructor(props) {
    super(props);
    const { schedule, dispatch } = this.props;
    dispatch(initialize('editSchedule', {
      id: schedule.id,
      workflowId: schedule.workflowId,
      cron: schedule.cron,
    }));
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { handleCloseCallback } = this.props;
    handleCloseCallback()
    this.setState({ open: false });
  };

  handleSubmit = () => {
    const { handleSubmit } = this.props;
    const submitter = handleSubmit(submitForm.bind(this));
    submitter();
    this.handleClose();
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {
          // Necessary to add props to an element passed as a prop
          React.cloneElement(this.props.trigger, { onClick: this.handleClickOpen })
        }
        <Dialog
          open={this.state.open}
          style={{ minWidth: 800 }}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          classes={{
            paper: classes.paper
          }}
        >
          <Grid
            container
            direction='column'
            style={{ padding: "32px 32px 0" }}
          >
            <ScheduleField
              label='Enter a cron expression'
              name='cron'
              style={{ width: 128 }}
            />
            <SelectWorkflow />
          </Grid>


          <Button onClick={this.handleSubmit} className={classes.button} color='secondary'>
            <SaveIcon />
            SAVE
        </Button>

        </Dialog>
      </React.Fragment>
    );
  }
}

EditCronModal.propTypes = {
  handleCloseCallback: PropTypes.func,
};

EditCronModal.defaultProps = {
  handleCloseCallback: () => null,
};

export default reduxForm({
  form: 'editSchedule',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
})(withStyles(styles)(EditCronModal));