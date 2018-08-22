import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CreateWorkflowStepper from '../CreateWorkflowStepper';

export default class TemplateWorkflows extends Component {

  render() {
    const { workflow } = this.props;

    return (
      <CreateWorkflowStepper
        workflow={workflow}
        trigger={(
          <Grid item xs={12} md={6} lg={4} xl={3} >
            <Card elevation={1} >
              <CardContent>
                <div className='workflow-title-container'>
                  <Typography color='secondary' gutterBottom variant="title">
                    {workflow.name}
                  </Typography>
                  <img className='workflow-logo' src={workflow.image} />
                </div>
                <Divider />
                <Typography className='template-metadata-subheading' variant='subheading'>
                  Presets:
                </Typography>
                <Grid className='card-metadata' container spacing={8} >
                  <Grid item xs={4} >
                    {`v${workflow.version}`}
                  </Grid>
                  <Grid item xs={4} >
                    {`${workflow.resources.nodes} nodes`}
                  </Grid>
                  <Grid item xs={4} >
                    {workflow.resources.compute}
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

TemplateWorkflows.defaultProps = {
  workflows: [],
}

TemplateWorkflows.propTypes = {
  workflows: PropTypes.array,
}