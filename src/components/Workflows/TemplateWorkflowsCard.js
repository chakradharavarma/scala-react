import React, { Component } from 'react';
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CreateWorkflowStepper from '../CreateWorkflowStepper';

export default class TemplateWorkflowCard extends Component {

  render() {
    const { workflow, large, computes } = this.props;
    const { data, fetched } = computes;

    const instanceType = fetched && data.find(compute => compute.instanceType === workflow.resources.compute).name

    return (
      <CreateWorkflowStepper
        workflow={workflow}
        trigger={(
          <Grid item xs={large ? 10 : 3}>
          <Card elevation={1} className='workflow-template-card-container' >
              <CardContent>
                <div className='workflow-title-container'>
                  <Typography color='secondary' variant="title">
                    {workflow.name}
                  </Typography>
                  <img
                    alt='workflow'
                    className='workflow-logo'
                    src={workflow.image}
                  />
                </div>
                <Divider />
                <Typography className='template-metadata-subheading' variant='subheading'>
                  Presets:
                </Typography>
                <Grid className='card-metadata' container spacing={8} >
                  <Grid item xs={3} >
                    {`v${workflow.version}`}
                  </Grid>
                  <Grid item xs={3} >
                    {`${workflow.resources.instanceCount} nodes`}
                  </Grid>
                  <Grid item xs={6} >
                    {instanceType}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
      />
    );
  }
}
