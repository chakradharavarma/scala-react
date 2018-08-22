import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TemplateWorkflowCard from './TemplateWorkflowsCard';

export default class TemplateWorkflows extends Component {

  render() {
    const { workflows } = this.props;
    return (
        <Grid container spacing={16} className='workflow-templates section sibling-fade'>
          {
            workflows.map((workflow, i) =>
              <TemplateWorkflowCard key={`workflow-template-${i}`} workflow={workflow} />
            )
          }
        </Grid>
    );
  }
}

TemplateWorkflows.defaultProps = {
  workflows: [],
}

TemplateWorkflows.propTypes = {
  workflows: PropTypes.array,
}