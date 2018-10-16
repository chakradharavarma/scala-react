import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TemplateWorkflows from './TemplateWorkflows';
import CreateWorkflowStepper from '../CreateWorkflowStepper';

class CreateNewWorkflowDrawer extends Component {
  state = {
    open: false
  };

  toggleDrawer = (open) => () => {
    this.setState({
      open
    });
  };

  render() {
    const { open } = this.state;
    const createNewWorkflowTrigger = (
      <Button style={{ alignSelf: 'flex-start', marginLeft: 28 }} color='secondary'>
        <AddIcon />
        Create a New Workflow        
      </Button>
    )

    return (
      <div>
        <Button color='secondary' onClick={this.toggleDrawer(true)}>
          <AddIcon />
          Add a new workflow
        </Button>
        <Drawer
          variant='temporary'
          anchor="top"
          open={open}
          onClose={this.toggleDrawer(false)}>
          <div style={{ padding: 12 }} > 
            <CreateWorkflowStepper 
              trigger={createNewWorkflowTrigger}
              handleCloseCallback={this.toggleDrawer(false)}
            />
            <TemplateWorkflows />
          </div>
        </Drawer>
      </div>
    );
  }
}

export default CreateNewWorkflowDrawer;
