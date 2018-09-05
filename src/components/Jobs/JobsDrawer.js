import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateWorkflowStepper from '../CreateWorkflowStepper';
import JobsDrawerCard from './JobsDrawerCard';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';


class JobsDrawer extends Component {

  state = {
    open: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({
      open,
    });
  };

  render() {
    const { workflows } = this.props;

    const createNewWorkflowTrigger = (
      <Button color='secondary'>
        <AddIcon />
        Create a New Workflow
      </Button>
    );

    return (
      <React.Fragment>
        <Button size='large' variant="contained" color='secondary' onClick={this.toggleDrawer(true)}>{this.props.title}</Button>
        <Drawer
          open={this.state.open}
          onClose={this.toggleDrawer(false)}
        >
          <div
            tabIndex={0}
            role="button"
          >
            <div className='jobs-drawer-list-container'>
              <div className='jobs-drawer-top-section'>
                <Typography color='secondary' variant='display1'>
                  Available Workflows
                  </Typography>
                <div className='create-new-job-section'>
                  <CreateWorkflowStepper
                    handleCloseCallback={this.toggleDrawer(false)}
                    trigger={createNewWorkflowTrigger}
                  />
                </div>

              </div>
              <Divider />
              <List>
                <div className='jobs-drawer-workflows'>
                  <Grid container className='sibling-fade' spacing={16} >
                    {
                      workflows
                        .sort((a,b) => a.name.localeCompare(b.name))
                        .map((workflow, i) => <JobsDrawerCard closeDrawer={this.toggleDrawer(false)} workflow={workflow} key={`jobs-drawer-card-${i}`} />)
                    }
                  </Grid>
                </div>
              </List>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    );
  }
}

JobsDrawer.propTypes = {

};

const mapStateToProps = (state) => {
  return (
    {
      workflows: state.availableWorkflows.data,
    }  
  )
};

export default connect(mapStateToProps)(JobsDrawer);