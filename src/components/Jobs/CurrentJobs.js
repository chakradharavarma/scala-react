import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import JobsDrawer from './JobsDrawer';
import JobsRunningTable from './JobsRunningTable';

const classes = {
  paper: {
    root: 'current-jobs'
  }
}

class CurrentJobs extends Component {

  render() {
    const { jobs } = this.props;
    const { data, fetching } = jobs;
    const validStatuses = ['DEPLOYING', 'DEPLOYED', 'RUNNING', 'PENDING' ]
    const runningJobs = data.filter(job => validStatuses.includes(job.status));
    if(!runningJobs.length) {
      // todo
    }
    return (
      <Card classes={classes.paper} >
        <div className={classnames('current-jobs-header')}>
          <Typography variant='headline' color='secondary' className={classnames('tips-title')}>
            Current Jobs
          </Typography>
        </div>
        <Divider />
        { runningJobs.length ?
          <JobsRunningTable jobs={runningJobs} /> : 
          <div className='no-data-message'>
            { !fetching && <JobsDrawer title='Click to run a workflow' />} { /* TODO add loading state */}
          </div>
        }
      </Card>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs,
  }
}

export default connect(mapStateToProps)(CurrentJobs);