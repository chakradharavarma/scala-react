import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import AvailableWorkflows from './AvailableWorkflows';
import TemplateWorkflows from './TemplateWorkflows';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import NewWorkflowDrawer from './NewWorkflowDrawer';

class Workflows extends Component {

  render() {
    const { availableWorkflows, templateWorkflows } = this.props;

    const createNewWorkflowTrigger = (
      <Button color='secondary'>
        <AddIcon />
        Add a New Workflow
      </Button>
    )

    return (
      <Fragment>
        <div className='workflows-root'>
          <NewWorkflowDrawer />
          <Grid container spacing={16} >
            <Grid xs={12} item>
              <Card  className='workflow-card'>
                <Typography color='secondary' variant='headline' className='workflow-card-title'>
                  Workflows
                </Typography>
                <Divider />
                <AvailableWorkflows workflows={availableWorkflows.data} />
              </Card>
            </Grid>
          </Grid>
        </div>

      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return (
    {
      availableWorkflows: state.availableWorkflows,
    }
  )
};

export default connect(mapStateToProps)(Workflows);

