import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone'
import {
  numberOfNodes,
  cpusPerNode,
  tasksPerNode,
  clusterType
} from '../TextField/fields';

class WorkflowProps extends Component {

  onFileLoad = (e, file) => alert(e.target.result, file.name);

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  render() {
    return (
      <div className='step-content-container'>
        <Grid container style={{ margin: 20 }} justify='center'>
          <Grid container item xs={12} spacing={32}>
            <Grid item xs={12}>
              <Field name="resources.compute"
                component={clusterType}
              />
            </Grid>
            <Grid item xs={12} >
              <Field name="resources.instanceCount"
                parse={val => isNaN(parseInt(val, 10)) ? null : parseInt(val, 10)}
                type='number'            
                component={numberOfNodes}
              />
            </Grid>
            {false &&
              <Grid item xs={12} lg={6} >
                <Field name="resources.cpusPerNode"
                  parse={val => isNaN(parseInt(val, 10)) ? null : parseInt(val, 10)}
                  type='number'            
                  component={cpusPerNode}
                />
              </Grid>
            }
            {
              false &&
              <Grid item xs={12} lg={6} >
                <Field name="resources.tasksPerNode"
                  component={tasksPerNode}
                />
              </Grid>
            }
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
  form: 'editWorkflow',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(WorkflowProps);