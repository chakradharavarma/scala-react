import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import AvailableWorkflows from './AvailableWorkflows';
import TemplateWorkflows from './TemplateWorkflows';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import CreateWorkflowStepper from '../CreateWorkflowStepper';
import Snackbar from '../Snackbar';
import { clearMessages } from '../../actions/generalActions';

class Workflows extends Component {

  render() {
    const { availableWorkflows, templateWorkflows, error } = this.props;
    const { notification } = availableWorkflows;
    
    const createNewWorkflowTrigger = (
      <Button color='secondary'>
        <AddIcon />
        Create a New Workflow        
      </Button>
    )

    return (
      <Fragment>
      <div className='workflows-root'>
        <CreateWorkflowStepper
          trigger={createNewWorkflowTrigger}
        />

        <Card className='workflow-card'>
          <Typography color='secondary' variant='headline' className='workflow-card-title'>
            Workflows
          </Typography>
          <Divider />
          <AvailableWorkflows workflows={availableWorkflows.data} />
        </Card>
        <Card elevation={4} className='workflow-card'>
          <Typography color='secondary' variant='headline' className='workflow-card-title'>
            Templates
          </Typography>
          <Divider />
          <TemplateWorkflows workflows={templateWorkflows} />

        </Card>
      </div>
      <Snackbar
          variant={notification ? notification.type : 'default'}
          message={notification ? notification.message : ''}
          open={notification !== undefined}
          handleClose={clearMessages}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return (
    {
      availableWorkflows: state.availableWorkflows,
      templateWorkflows: state.templateWorkflows.data,
      error: state.templateWorkflows.error || state.availableWorkflows.error,
    }
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearMessages: () => dispatch(clearMessages()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workflows);

