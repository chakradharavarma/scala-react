import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import JobsDrawer from './JobsDrawer';
import JobsRunningTable from './JobsRunningTable';
import { ACTIVE_STATUS } from '../../common/consts';
import ScalaLoader from '../ScalaLoader';
import Fade from '@material-ui/core/Fade';

const classes = {
  paper: {
    root: 'current-jobs'
  }
}

class CurrentJobs extends Component {

  render() {
    const { jobs } = this.props;
    const { data, fetching, fetched } = jobs;
    const runningJobs = data.filter(job => ACTIVE_STATUS.includes(job.status));
    return (
      <Card classes={classes.paper} >
        <div className={classnames('current-jobs-header')}>
          <Typography variant='headline' color='secondary' className={classnames('tips-title')}>
            Current Jobs
          </Typography>
        </div>
        <Divider />
        {
            fetched ?
              (
                runningJobs.length ? 
                  <JobsRunningTable jobs={runningJobs} /> :
                  <Fade in={!fetching} timeout={400} >
                    <div className='centered'>
                      <JobsDrawer title='Click to run a workflow' />
                    </div>
                  </Fade>
              )
              : (
                  <ScalaLoader active={!fetched} centered />
              )
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