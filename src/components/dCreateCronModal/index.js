import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux';
import { destroy, initialize } from 'redux-form';
import ViewSwiper from './ViewSwiper';

const styles = {
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Fade {...props} timeout={{enter: 100, exit: 500}} />;
}

class CreateCronModal extends Component {

  state = {
    open: true,
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
          open={this.state.open}
          style={{ minWidth: 800}}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
            <ViewSwiper/>
        </Dialog>
      </React.Fragment>
    );
  }
}

CreateCronModal.propTypes = {
  handleCloseCallback: PropTypes.func,
};

CreateCronModal.defaultProps = {
  handleCloseCallback: () => null,
};

export default connect()(withStyles(styles)(CreateCronModal));