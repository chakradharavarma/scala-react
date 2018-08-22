import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateWorkflowStepper from '../CreateWorkflowStepper';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
        Create a New Workfloww
      </Button>
    );

    return (
      <React.Fragment>
        <Button size='large'  variant="contained" color='secondary' onClick={this.toggleDrawer(true)}>{this.props.title}</Button>
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
                        .map((workflow, i) =>
                        <Grid key={`workflow-${i}`} item xs={6}>
                          <Card>
                            <CardMedia src=''>
                              <img src={workflow.logo} alt='workflow logo' />
                            </CardMedia>
                            <CardContent>
                              <Typography gutterBottom variant="title">
                                {workflow.name}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      )
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