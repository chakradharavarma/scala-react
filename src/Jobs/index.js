import React, { Component } from 'react';
import classnames from 'classnames';
import CurrentJobs from './CurrentJobs';
import QuickTips from './QuickTips';
import JobHistory from './JobHistory';
import NewJobModal from './NewJobModal';

export default class Jobs extends Component {

  render() {
    return (
      <div className={classnames('jobs-root')}> 
        <CurrentJobs />
        <QuickTips />
        <JobHistory />
      </div>
    );
  }
}
