import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import SelectCronType from './SelectCronType';

import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '90%',
    margin: '8px auto',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    marginRight: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Choose Expression Type', 'Build your expression', 'Confirm'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <SelectCronType />;
    case 1:
      return 'Choose expression type';
    case 2:
      return 'Choose expression type';
    default:
      return 'Unknown step';
  }
}

class HorizontalNonLinearStepper extends Component {
  state = {
    activeStep: 0,
    completed: {},
  };

  totalSteps = () => {
    return getSteps().length;
  };

  handleNext = () => {
    let activeStep;
    if(this.allStepsCompleted()) {
      this.props.close();
    }
    if (this.isLastStep() && !this.allStepsCompleted()) {
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
    const { classes, createWorkflow } = this.props;
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
  form: 'createSchedule',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(withStyles(styles)((withStyles(styles)(HorizontalNonLinearStepper)))));