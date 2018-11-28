import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";


class Test extends Component {

  render() {
    return (
      <div>
        <Typography className='job-status-chart-title' color='secondary' variant='headline'>
          No Data
        </Typography>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return (
    {
      jobPerformance: state.jobPerformance,
    }
  )
};

const mapDispatchToProps = dispatch => {
  return (
    {
      getJobPerformance: () => dispatch({action: "FETCH_JOB_PERFORMANCE"})
    }
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Test);