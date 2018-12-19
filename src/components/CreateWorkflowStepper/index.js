import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Fade from '@material-ui/core/Fade';
import Stepper from './Stepper';
import { connect } from 'react-redux';
import { reset, initialize } from 'redux-form';
import { getComputeCost } from '../../actions/pricingActions'

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

const EXIT_TIMEOUT = 400;

function Transition(props) {
  return <Fade {...props} timeout={{enter: 1000, exit: EXIT_TIMEOUT}} />;
}

class CreateWorkflowStepper extends Component {

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    const { workflow, dispatch } = this.props;
    if(workflow) {
      dispatch(initialize('createWorkflow', {
        resources: {
          hourlyCostEstimate: 0, 
          instanceCount: 1,
        },
        ...workflow,
        files: [],
      }));
      dispatch(getComputeCost('us-east-2', workflow.resources.compute))
    } else {
      const defaultCompute = 'c4.large'
      dispatch(initialize('createWorkflow', {
        resources: {
          instanceCount: 1,
          hourlyCostEstimate: 0,
          compute: defaultCompute,
        },
        files: [],
      }));
      dispatch(getComputeCost('us-east-2', defaultCompute))
    }
  };

  handleClose = (cb) => () => {
    cb()
    this.setState({ open: false }, () => {
      setTimeout(() => {
        this.props.dispatch(reset('createWorkflow'));
      }, EXIT_TIMEOUT);
    });
  };


  render() {
    const { handleCloseCallback } = this.props;
    return (
      <React.Fragment>
        {
          // This is needed to add props to an element passed as a prop
          React.cloneElement(this.props.trigger, {onClick: this.handleClickOpen})
        }
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose(handleCloseCallback)}
          TransitionComponent={Transition}
        >
            <Stepper close={this.handleClose(handleCloseCallback)}/>
        </Dialog>
      </React.Fragment>
    );
  }
}

CreateWorkflowStepper.propTypes = {
  handleCloseCallback: PropTypes.func,
};

CreateWorkflowStepper.defaultProps = {
  handleCloseCallback: () => null,
};

export default connect()(withStyles(styles)(CreateWorkflowStepper));