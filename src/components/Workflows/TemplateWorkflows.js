import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TemplateWorkflowCard from './TemplateWorkflowsCard';

class TemplateWorkflows extends Component {

  render() {
    const { workflows, computes } = this.props;
    if(workflows.fetching || computes.fetching) {
      return null;
    }
    return (
        <Grid container spacing={16} className='workflow-templates section sibling-fade'>
          {
            workflows.data.map((workflow, i) =>
              <TemplateWorkflowCard key={`workflow-template-${i}`} computes={computes} workflow={workflow} />
            )
          }
        </Grid>
    );
  }
}


TemplateWorkflows.propTypes = {
  workflows: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    workflows: state.templateWorkflows,
    computes: state.computes,
  }
}

export default connect(mapStateToProps)(TemplateWorkflows);
