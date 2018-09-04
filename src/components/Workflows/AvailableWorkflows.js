import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import AvailableWorkflowCard from './AvailableWorkflowCard';
import { deleteWorkflow, runWorkflow } from '../../actions/workflowActions'
import { connect } from 'react-redux';

class AvailableWorkflows extends Component {

  render() {
    const { onClickDelete, onClickRun } = this.props;
    return (
      <Grid container spacing={16} className='section sibling-fade' >
        {
          this.props.workflows
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((workflow, i) =>
              <AvailableWorkflowCard key={`workflow-template-${i}`} workflow={workflow} onClickRun={onClickRun} onClickDelete={onClickDelete} /> )
        }
      </Grid>
    );
  }
}

AvailableWorkflows.defaultProps = {
  workflows: [],
}


AvailableWorkflows.propTypes = {
  workflows: PropTypes.array,
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickRun: (id) => () => dispatch(runWorkflow(id)),
    onClickDelete: (id) => () => dispatch(deleteWorkflow(id)),
  }
};

export default connect(undefined, mapDispatchToProps)(AvailableWorkflows);
