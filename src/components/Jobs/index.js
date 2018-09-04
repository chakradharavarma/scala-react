import React, { Component } from 'react';
import classnames from 'classnames';
import CurrentJobs from './CurrentJobs';
import QuickTips from './QuickTips';
import JobHistory from './JobHistory';
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
    // todo delete quick tips
    return (
      <div className={classnames('jobs-root')}> 
        <CreateWorkflowStepper
          trigger={createNewWorkflowTrigger}
        />
        <CurrentJobs />
          { false && <QuickTips /> } { /* todo} */ }
        <JobHistory />
      </div>
    );
  }
}
