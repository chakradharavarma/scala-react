import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TemplateWorkflowCard from './TemplateWorkflowsCard';

class TemplateWorkflows extends Component {

  render() {
    const { workflows } = this.props;
    if(workflows.fetching) {
      return null;
    }

    return (
        <Grid container spacing={16} className='workflow-templates section sibling-fade'>
          {
            workflows.data.map((workflow, i) =>
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

const mapStateToProps = (state) => {
  return {
    workflows: state.templateWorkflows,
  }
}

export default connect(mapStateToProps)(TemplateWorkflows);
