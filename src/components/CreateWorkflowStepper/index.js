import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Fade from '@material-ui/core/Fade';
import Stepper from './Stepper';
import { connect } from 'react-redux';
import { reset, initialize } from 'redux-form';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Fade {...props} timeout={{enter: 1000, exit: 500}} />;
}

class CreateWorkflowStepper extends Component {

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    const { workflow } = this.props;
    if(workflow) {
      this.props.dispatch(initialize('createWorkflow', {
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
    this.props.dispatch(reset('createWorkflow'));
    this.setState({ open: false });
    this.props.handleCloseCallback()
  };

  render() {
    return (
      <React.Fragment>
        {
          // Necessary to add props to an element passed as a prop
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