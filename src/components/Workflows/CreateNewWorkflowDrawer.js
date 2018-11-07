import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DEFAULT_TEMPLATE } from '../../common/consts';
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
    const { data, fetched } = this.props.templateWorkflows
    const createNewWorkflowTrigger = (
      <Button style={{ alignSelf: 'flex-start', marginLeft: 28 }} color='secondary'>
        <AddIcon />
        Create a New Workflow        
      </Button>
    )
    let workflow 

    if(fetched) {
      workflow = { ...data.find(template => template.name === DEFAULT_TEMPLATE) }
    }
    if(workflow) {
      workflow.name = ""
    }

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
              workflow={workflow}
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

const mapStateToProps = state => {
  return {
    templateWorkflows: state.templateWorkflows
  }
}

export default connect(mapStateToProps)(CreateNewWorkflowDrawer)