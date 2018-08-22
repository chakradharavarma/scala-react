import React, { Component } from 'react';
import classnames from 'classnames';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import JobsDrawer from './JobsDrawer';

const classes = {
  paper: {
    root: 'quick-tips'
  }
}

export default class CurrentJobs extends Component {

  render() {
    return (
      <Card classes={classes.paper} >
        <div className={classnames('tips-header')}>
          <Typography variant='headline' color='secondary' className={classnames('tips-title')}>
            Current Jobs
          </Typography>
        </div>
        <Divider />
        { this.props.jobs ?
          'has jobs, todo' : 
          <div className='no-data-message'>
            <JobsDrawer title='Click to run a workflow' />
          </div>
        }
      </Card>
    )
  }

}