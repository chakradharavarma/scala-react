import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Fade from '@material-ui/core/Fade';
import { formValueSelector } from 'redux-form';

class ConfirmWorkflow extends Component {

  render() {
    const { name, instanceCount, compute, files } = this.props;
    return (
      <div className='step-content-container'>
        <Typography variant='display1' color='secondary' component='div' className='step-title'>
          Confirm Workflow
        </Typography>
        <Fade in timeout={{ enter: 200, exit: 300 }}>
          <Card className='confirm-workflow-card'>
            <div>
              <Typography className='confirm-workflow-field' color='secondary' variant='title'>
                Name:
            </Typography>
              <Typography className='confirm-workflow-value' variant='title'>
                {name}
              </Typography>
            </div>
            <div>
              <Typography className='confirm-workflow-field' color='secondary' variant='title'>
                Number of nodes:
            </Typography>
              <Typography className='confirm-workflow-value' variant='title'>
                {instanceCount}
              </Typography>
            </div>
            <div>
              <Typography className='confirm-workflow-field' color='secondary' variant='title'>
                Cluster Type:
            </Typography>
              <Typography className='confirm-workflow-value' variant='title'>
                {compute}
              </Typography>
            </div>
            {
              files.length ?
              (
                <div>
                  <Typography className='confirm-workflow-field' color='secondary' variant='title'>
                    Files:
              </Typography>
                  <div className='confirm-workflow-files-field'>
                    {
                      files.map(file => (
                        <Typography className='confirm-workflow-value confirm-workflow-file' variant='title'>
                          {file.name}
                        </Typography>
                      ))
                    }
                  </div>
                </div>
              ) : null
            }

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
    instanceCount: selector(state, 'resources.instanceCount'),
    files: selector(state, 'files'),
    //tasksPerNode: selector(state, 'resources.tasksPerNode'), // TODO delete
    //cpusPerNode: selector(state, 'resources.cpusPerNode'),
  }
}

export default connect(mapStateToProps)(ConfirmWorkflow);