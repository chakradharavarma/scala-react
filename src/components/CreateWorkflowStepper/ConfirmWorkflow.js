import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Fade from '@material-ui/core/Fade';
import { Redirect } from 'react-router-dom';

class ConfirmWorkflow extends Component {

  render() {
    const { registeredFields, values } = this.props.workflow;
    // TODO
    if(!registeredFields || !values) {
      return (
        <Redirect to='/v2' />
      )
    }
    return (
      <div className='step-content-container'>
        <Typography variant='display1' color='secondary' component='div' className='step-title'>
          Confirm Workflow
        </Typography>
        <Fade in timeout={{enter: 200, exit: 300}}>
        <Card className='confirm-workflow-card'>
          <div className=''>
            <Typography className='confirm-workflow-field' color='secondary' variant='title'>
              Name:
            </Typography>
            <Typography className='confirm-workflow-value' variant='title'>
              {registeredFields.name && values.name}
            </Typography>
          </div>
          <div>
            <Typography className='confirm-workflow-field' color='secondary' variant='title'>
              Disk Size:
            </Typography>
            <Typography className='confirm-workflow-value' variant='title'>
              {registeredFields.diskSpace && values.diskSpace}
            </Typography>
          </div>
          <div>
            <Typography className='confirm-workflow-field' color='secondary' variant='title'>
              CPUs per node:
            </Typography>
            <Typography className='confirm-workflow-value' variant='title'>
              {registeredFields.cpusPerNode && values.cpusPerNode}
            </Typography>
          </div>
          <div>
            <Typography className='confirm-workflow-field' color='secondary' variant='title'>
              Number of nodes:
            </Typography>
            <Typography className='confirm-workflow-value' variant='title'>
              {registeredFields.numberOfNodes && values.numberOfNodes}
            </Typography>
          </div>
          <div>
            <Typography className='confirm-workflow-field' color='secondary' variant='title'>
              Tasks per Node:
            </Typography>
            <Typography className='confirm-workflow-value' variant='title'>
              {registeredFields.tasksPerNode && values.tasksPerNode}
            </Typography>
          </div>
          <div>
            <Typography className='confirm-workflow-field' color='secondary' variant='title'>
              Cluster Type:
            </Typography>
            <Typography className='confirm-workflow-value' variant='title'>
              {registeredFields.clusterType && values.clusterType}
            </Typography>
          </div>
        </Card>
        </Fade>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return (
    {
      workflow: state.form.createWorkflow
    }
  )
};


export default connect(mapStateToProps)(ConfirmWorkflow);