import React, { Component } from 'react';
import { connect } from 'react-redux'
import PerformanceChart from '../PerformanceChart';

class Test extends Component {

  render() {
    const { data, fetching, fetched } = this.props.jobPerformance
    if (fetching) {
      return null
    }
    if (!fetched) {
      return <div>unable to get results</div>
    }

    return (
      <div>
        {
          data.map((chart, i) => 
            <PerformanceChart key={`chart-${i}`} chart={chart} />  
          )
        }
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