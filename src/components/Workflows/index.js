import React, { Component, Fragment } from 'react';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import AvailableWorkflows from './AvailableWorkflows';
import CreateNewWorkflowDrawer from './CreateNewWorkflowDrawer';

class Workflows extends Component {

  render() {
    return (
      <Fragment>
        <div className='workflows-root'>
          <CreateNewWorkflowDrawer />
          <Grid container spacing={16} >
            <Grid xs={12} item>
              <Card  className='workflow-card'>
                <Typography color='secondary' variant='headline' className='workflow-card-title'>
                  Workflows
                </Typography>
                <Divider />
                <AvailableWorkflows />
              </Card>
            </Grid>
          </Grid>
        </div>

      </Fragment>
    );
  }
}

export default Workflows;