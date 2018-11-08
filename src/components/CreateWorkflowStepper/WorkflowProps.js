import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone'
import {
  tasksPerNode,
  numberOfNodes,
  cpusPerNode,
  clusterType
} from '../TextField/fields';

class WorkflowProps extends Component {


  render() {
    return (
      <div className='step-content-container'>
        <Typography variant='display1' color='secondary' component='div' className='step-title'>
          Workflow Properties
        </Typography>
        <Grid container style={{ margin: 20 }} justify='center'>
          <Grid container item xs={12} lg={6} spacing={32}>
            <Grid item xs={12}>
              <Field name="resources.compute"
                component={clusterType}
              />
            </Grid>
            <Grid item xs={12} />
            <Grid item xs={12}>
              <Field name="resources.instanceCount"
                parse={val => isNaN(parseInt(val, 10)) ? null : parseInt(val, 10)}
                type='number'            
                component={numberOfNodes}
              />
            </Grid>
            {
              false && // TODO
              <Grid item xs={12} lg={6} >
                <Field name="resources.cpusPerNode"
                  component={cpusPerNode}
                />
              </Grid>
            }
            <Grid item xs={12} />
            <Grid item xs={12} lg={6} >
              {
                false &&
                <Field name="resources.tasksPerNode"
                  component={tasksPerNode}
                />
              }
            </Grid>
            <Grid item xs={12}>
              <Dropzone style={{ width: '100%' }}>
                <Button
                  disableRipple
                  style={{ width: '100%', minHeight: 62 }}
                  variant="contained"
                  color="secondary"
                >
                  Add Files
                </Button>
              </Dropzone>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default reduxForm({
  form: 'createWorkflow',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: false,
})(WorkflowProps);