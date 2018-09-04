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
        name: workflow.name,
        numberOfNodes: workflow.resources.nodes,
        cpusPerNode: workflow.resources.nodes,
        clusterType: workflow.resources.compute,
        tasksPerNode: 1, // TODO
        diskSpace: '20 GB' // TODO
      }));
    }
  };

  handleClose = () => {
    this.props.handleCloseCallback()
    this.setState({ open: false }, () => {
      setTimeout(() => {
        this.props.dispatch(destroy('createWorkflow'));
      }, EXIT_TIMEOUT);
    });
  };

  render() {
    return (
      <React.Fragment>
        {
          // This is needed to add props to an element passed as a prop
          React.cloneElement(this.props.trigger, {onClick: this.handleClickOpen})
        }
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          style={{backgroundColor: 'aliceblue'}}
        >
            <Stepper close={this.handleClose}/>
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