import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Fade from '@material-ui/core/Fade';
import Stepper from './Stepper';
import { connect } from 'react-redux';
import { destroy, initialize } from 'redux-form';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

const EXIT_TIMEOUT = 500;

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
        ...workflow,
        'files': [],
      }));
    } else {
      dispatch(initialize('createWorkflow', {
        resources: {
          instanceCount: 1,
          compute: 'c4.large',
        },
        files: [],
      }));
    }
  };

  handleClose = (cb) => () => {
    cb()
    this.setState({ open: false }, () => {
      setTimeout(() => {
        this.props.dispatch(destroy('createWorkflow'));
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