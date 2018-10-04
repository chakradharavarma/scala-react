import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Fade from '@material-ui/core/Fade';
import { formValueSelector } from 'redux-form';

class ConfirmWorkflow extends Component {

  render() {
    const { name, cpusPerNode, tasksPerNode, numberOfNodes, compute } = this.props;
    debugger;
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
              {name}
            </Typography>
          </div>
          { 
            false &&
            (<Fragment><div>
            <Typography className='confirm-workflow-field' color='secondary' variant='title'>
              CPUs per node:
            </Typography>
            <Typography className='confirm-workflow-value' variant='title'>
              { cpusPerNode }
            </Typography>
          </div>          <div>
            <Typography className='confirm-workflow-field' color='secondary' variant='title'>
              Tasks per node:
            </Typography>
            <Typography className='confirm-workflow-value' variant='title'>
            { tasksPerNode }
            </Typography>
          </div>
          </Fragment>
          )
        }

          <div>
            <Typography className='confirm-workflow-field' color='secondary' variant='title'>
              Number of nodes:
            </Typography>
            <Typography className='confirm-workflow-value' variant='title'>
              { numberOfNodes }
            </Typography>
          </div>
          <div>
            <Typography className='confirm-workflow-field' color='secondary' variant='title'>
              Cluster Type:
            </Typography>
            <Typography className='confirm-workflow-value' variant='title'>
              { compute }
            </Typography>
          </div>
        </Card>
        </Fade>
      </div>
    )
  }
}



const selector = formValueSelector('createWorkflow');

const mapStateToProps = (state) => {
  return {
    name: selector(state, 'name'),
    compute: selector(state, 'resources.compute'),
    numberOfNodes: selector(state, 'resources.nodes'),
    tasksPerNode: selector(state, 'resources.tasksPerNode'),
    cpusPerNode: selector(state, 'resources.cpusPerNode'),
  }
}

export default connect(mapStateToProps)(ConfirmWorkflow);