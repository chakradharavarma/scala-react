import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TemplateWorkflows from './TemplateWorkflows';
import CreateWorkflowStepper from '../CreateWorkflowStepper';

class CreateNewWorkflowDrawer extends Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {

    const createNewWorkflowTrigger = (
      <Button style={{ alignSelf: 'flex-start', marginLeft: 28 }} color='secondary'>
        <AddIcon />
        Create a New Workflow        
      </Button>
    )

    return (
      <div>
        <Button color='secondary' onClick={this.toggleDrawer('top', true)}>
          <AddIcon />
          Add a new workflow
        </Button>
        <Drawer
          variant='temporary'
          anchor="top"
          open={this.state.top}
          onClose={this.toggleDrawer('top', false)}>
          <div style={{ padding: 12 }} > 
            <CreateWorkflowStepper 
              trigger={createNewWorkflowTrigger}
              handleCloseCallback={this.toggleDrawer('top', false)}
            />
            <TemplateWorkflows />
          </div>
        </Drawer>
      </div>
    );
  }
}

CreateNewWorkflowDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default CreateNewWorkflowDrawer;
