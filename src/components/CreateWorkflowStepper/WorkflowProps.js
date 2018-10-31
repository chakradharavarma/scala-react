import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Dropzone from 'react-dropzone'
import TextField from '../TextField';
import {
  tasksPerNode,
  numberOfNodes,
  cpusPerNode,
} from '../TextField/fields';


// TODO delete
const machines = [
  "Scala Test Small",
  "Scala Test Medium",
  "Intel Xeon E5-2666 v3 2 CPUs 4GB",
  "Intel Xeon E5-2666 v3 4 CPUs 8GB",
  "Intel Xeon E5-2666 v3 8 CPUs 16GB",
  "Intel Xeon E5-2666 v3 16 CPUs 30GB",
  "Intel Xeon E5-2666 v3 36 CPUs 60GB",
  "Intel Xeon 8124m v3 2 CPUs 4GB",
  "Intel Xeon 8124m v3 4 CPUs 8GB",
  "Intel Xeon 8124m v3 8 CPUs 16GB",
  "Intel Xeon 8124m v3 16 CPUs 32GB",
  "Intel Xeon 8124m v3 36 CPUs 72GB",
  "Intel Xeon 8124m v3 72 CPUs 144GB",
  "Intel Xeon E5-2686 v4 2 CPUs 8GB",
  "Intel Xeon E5-2686 v4 4 CPUs 16GB",
  "Intel Xeon E5-2686 v4 8 CPUs 32GB",
  "Intel Xeon E5-2686 v4 16 CPUs 64GB",
  "Intel Xeon E5-2686 v4 40 CPUs 160GB",
  "Intel Xeon E5-2686 v4 64 CPUs 256GB",
  "Intel Xeon E5-2686 v4 4 CPUs 30.5GB",
  "Intel Xeon E5-2686 v4 64 CPUs 488GB",
  "Intel Xeon E5-2686 v4 128 CPUs 1952GB"
]

const clusterType = TextField({
  label: "Cluster Type",
  select: true,
  type: "number",
  margin: "normal",
  style: { width: '100%' }
},
  machines.map(machine => (
    <MenuItem key={machine} value={machine}>
      {machine}
    </MenuItem>
  ))
)

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
                component={numberOfNodes}
              />
            </Grid>
            {
              false &&
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
  forceUnregisterOnUnmount: true
})(WorkflowProps);