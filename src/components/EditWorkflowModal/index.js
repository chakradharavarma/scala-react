import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Fade from '@material-ui/core/Fade';
import { initialize } from 'redux-form';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { reduxForm } from 'redux-form';
import submitForm from './handleSubmit';
import ViewSwiper from './ViewSwiper';
import { fetchFolder } from '../../actions/fileActions';
import axios from 'axios';

const styles = {
  paper: {
    display: 'flex',
    flexDirection: 'column',
    padding: 12,
    maxWidth: 748,
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

async function getFile(path) {
  const url = '/getFileContents/';
  return await axios.post(url, {path}) // TODO make this a get 
      .then(resp => resp.data.contents)
      .catch(err => `ERROR: could not resolve path: ${path}`)
}

function Transition(props) {
  return <Fade {...props} timeout={{ enter: 100, exit: 500 }} />;
}

class EditWorkflowModal extends Component {

  state = {
    open: false,
  };  

  constructor(props) {
    super(props);
    const { workflow, dispatch } = this.props;
    const prep = getFile(`/workflow/${workflow.id}/prep.sh`);
    const run = getFile(`/workflow/${workflow.id}/run.sh`);
    const post = getFile(`/workflow/${workflow.id}/post.sh`);
    Promise.all([prep, run, post])
    .then((values) => {
      dispatch(initialize('editWorkflow', {
        'scripts_prep': values[0],
        'scripts_run': values[1],
        'scripts_post': values[2],
        workflow_name: workflow.name,
        numberOfNodes: workflow.resources.nodes,
        cpusPerNode: workflow.resources.nodes,
        clusterType: workflow.resources.compute,
        workflowId: workflow.id,
        tasksPerNode: 1, // TODO
        diskSpace: '20 GB', // TODO,
        emails: workflow.notifications ? workflow.notifications.emails : '',
        }))
      dispatch(fetchFolder(`/workflows/${workflow.id}`))
    })

  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { handleCloseCallback } = this.props;
    this.setState({ open: false });
    handleCloseCallback()
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
          onClose={this.handleClose}
          TransitionComponent={Transition}
          classes={{
            paper: classes.paper
          }}
        >
          <ViewSwiper />
          <Button onClick={this.handleSubmit} className={classes.button} color='secondary'>
            <SaveIcon />
            SAVE
        </Button>

        </Dialog>
      </React.Fragment>
    );
  }
}

EditWorkflowModal.propTypes = {
  handleCloseCallback: PropTypes.func,
};

EditWorkflowModal.defaultProps = {
  handleCloseCallback: () => null,
};

export default reduxForm({
  form: 'editWorkflow',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
})(withStyles(styles)(EditWorkflowModal));