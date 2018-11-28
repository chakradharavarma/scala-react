import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import AvailableWorkflowCard from './AvailableWorkflowCard';
import ScalaLoader from '../ScalaLoader';

import { deleteWorkflow, runWorkflow } from '../../actions/workflowActions'

class AvailableWorkflows extends Component {

  render() {
    const { onClickDelete, onClickRun, workflows } = this.props;
    const { fetching } = workflows;
    return (
      <Fragment>
        {
          fetching ? (
            <ScalaLoader centered active />
          ) : (
              <Grid container spacing={16} className='section sibling -fade' >
                {
                  workflows.data
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((workflow, i) =>
                      <AvailableWorkflowCard key={`workflow-template-${i}`} workflow={workflow} onClickRun={onClickRun} onClickDelete={onClickDelete} />)
                }
              </Grid>
            )
        }
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    workflows: state.availableWorkflows,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickRun: (id) => () => dispatch(runWorkflow(id)),
    onClickDelete: (id) => () => dispatch(deleteWorkflow(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailableWorkflows);
