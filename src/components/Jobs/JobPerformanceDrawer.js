import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Drawer from '@material-ui/core/Drawer';
import PerformanceChart from '../PerformanceChart';
import { getPerformance } from '../../actions/jobActions';
import { connect } from 'react-redux';
import { JOB_PERFORMANCE_RESOLUTION } from '../../common/consts'

class JobPerformanceDrawer extends Component {

  async componentDidMount() {
    setInterval(this.getData, (JOB_PERFORMANCE_RESOLUTION) * 1000);
  }

  getData = async () => {
    const { getPerformance, open } = this.props;
    if (open) {
      getPerformance()
    }
  }

  render() {
    const { onClose, open, job, jobs, jobPerformance } = this.props
    const { data } = jobPerformance;

    if (!job ) {
      return null
    }

    const jobHeadData = data.find(chart => chart.metric.jobId === job.job_id && chart.metric.resourceType === 'ClusterHead')
    const jobComputeData = data.find(chart => chart.metric.jobId === job.job_id && chart.metric.resourceType === 'ClusterCompute')
    const jobData = jobHeadData && jobs.data.find(job => job.job_id === jobHeadData.metric.jobId)

    return (
      <Drawer anchor="bottom"
        open={open}
        onClose={onClose}
        classes={{
          paper: 'job-performance-drawer-card'
        }}
      >
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography style={{ textTransform: 'uppercase', fontWeight: '100', paddingBottom: 16 }} variant='display1' color='secondary'>
              CPU usage: {jobData && jobData.name}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color='secondary' style={{ textTransform: 'uppercase', fontWeight: '100' }} variant='headline'>
              Head Node
            </Typography>
            <PerformanceChart chart={jobHeadData} />
          </Grid>
          <Grid item xs={12}>
            <Typography color='secondary' style={{ textTransform: 'uppercase', fontWeight: '100' }} variant='headline'>
              Compute Nodes
            </Typography>
            <PerformanceChart chart={jobComputeData} />
          </Grid>
        </Grid>
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jobPerformance: state.jobPerformance,
    jobs: state.jobs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPerformance: () => dispatch(getPerformance())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(JobPerformanceDrawer);