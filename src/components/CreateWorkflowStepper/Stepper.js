import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import WorkflowProps from './WorkflowProps';
import NameYourWorkflow from './NameYourWorkflow';
import ConfirmWorkflow from './ConfirmWorkflow';
import { reduxForm, reset, submit } from 'redux-form';
import { connect } from 'react-redux';
import submitForm from './handleSubmit';

const styles = theme => ({
  root: {
    width: '90%',
    margin: '8px auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  button: {
    marginRight: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Name Your Workflow', 'Workflow Props', 'Confirm'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <NameYourWorkflow />;
    case 1:
      return <WorkflowProps />;
    case 2:
      return <ConfirmWorkflow />;
    default:
      return 'Unknown step';
  }
}

class HorizontalNonLinearStepper extends Component {
  state = {
    activeStep: 1,
    completed: {},
  };

  totalSteps = () => {
    return getSteps().length;
  };

  handleNext = () => {
    const { dispatch, handleSubmit } = this.props;
    let activeStep;
    if (this.allStepsCompleted()) {
      const submitter = handleSubmit(submitForm.bind(this));
      submitter();
      dispatch(submit('createWorkflow'));
      dispatch(reset('createWorkflow'));
      this.props.close();
    }
    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

  /* // TODO REMOVE
  handleSubmit = () => {
    this.handleComplete();
    alert('submitted');
  }*/

  submit = () => {

  }

  handleComplete = () => {
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      completed,
    });
    this.handleNext();
  };

  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }

  render() {
    const { classes, createWorkflow, close } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepButton
                  onClick={this.handleStep(index)}
                  completed={this.state.completed[index]}
                >
                  <Typography color='secondary'>{label}</Typography>
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
        <Button onClick={close} className='close-modal-button' variant="fab" color="secondary" aria-label="Close">
          <CloseIcon />
        </Button>
          
        <Divider />
        {this.allStepsCompleted() ? (
          null
        ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <div className='stepper-progress-buttons'>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classnames(classes.button, 'back-button')}
                >
                  Back
                </Button>
                {
                  this.isLastStep() ? (
                    <Button variant="contained" color="secondary"
                      onClick={this.handleComplete}
                      disabled={createWorkflow.syncErrors !== undefined}
                    >
                      Finish
                    </Button>
                  ) : (
                      <Button variant="contained" color="secondary"
                        onClick={this.handleComplete}
                        disabled={createWorkflow.syncErrors !== undefined}
                      >
                        Next
                    </Button>
                    )
                }
              </div>
            </React.Fragment>
          )}
      </div>
    );
  }
}

HorizontalNonLinearStepper.propTypes = {
  classes: PropTypes.object,
};

HorizontalNonLinearStepper.defaultProps = {
  createWorkflow: {},
};


const mapStateToProps = (state) => {
  return (
    {
      createWorkflow: state.form.createWorkflow,
    }
  )
};

export default connect(mapStateToProps)(reduxForm({
  form: 'createWorkflow',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(withStyles(styles)(HorizontalNonLinearStepper)));