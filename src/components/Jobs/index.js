import React, { Component } from 'react';
import classnames from 'classnames';
import CurrentJobs from './CurrentJobs';
import JobsHistory from './JobsHistory';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import CreateWorkflowStepper from '../CreateWorkflowStepper';

export default class Jobs extends Component {

  render() {
    const createNewWorkflowTrigger = (
      <Button color='secondary'>
        <AddIcon />
        Create a New Workflow        
      </Button>
    )
    return (
      <div className={classnames('jobs-root')}> 
        <CreateWorkflowStepper
          trigger={createNewWorkflowTrigger}
        />
        <CurrentJobs />
        <JobsHistory />
      </div>
    );
  }
}
