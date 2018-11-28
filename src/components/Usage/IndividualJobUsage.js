import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Grid from '@material-ui/core/Grid';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getDuration } from '../../common/helpers';

export default class IndividualJobUsage extends Component {

  render() {
    const { job } = this.props;

    if (!job) {
      return null
    }

    const duration = getDuration(job.created, job.modified)

    return (
      <ExpansionPanel >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
          <Typography variant='subheading' style={{ color: "#696969" }} >
            {job.name} : <span className={`status-${job.status.toLowerCase()}`}>{job.status}</span>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12} className='job-details-row'>
              <Typography variant='body2'>
                <span className='job-details-row-item-title'>UUID: </span> {job.job_id}
              </Typography>
            </Grid>
            <Grid item xs={12} className='job-details-row'>
              <Typography variant='body2'>
                <span className='job-details-row-item-title'>Duration: </span> {duration}
              </Typography>
            </Grid>
            <Grid item xs={12} className='job-details-row'>
              <Typography variant='body2'>
                <span className='job-details-row-item-title'>Created on: </span> {`${job.created.toLocaleDateString()} ${job.created.toLocaleTimeString()}`}
              </Typography>
            </Grid>
            <Grid item xs={12} className='job-details-row'>
              <Typography variant='body2'>
                <span className='job-details-row-item-title'>Updated on: </span> {`${job.modified.toLocaleDateString()} ${job.modified.toLocaleTimeString()}`}
              </Typography>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}


/*


cancellable : true
created : "2018-09-13 12:02:32"
ganglia_url : "s3://sccp-test-scala-bucket/scala/ganglia-graphs/2d074461-1dad-434d-9a17-2205fa79b358"
has_result : false
id : 270
name : "Workflow: Basic Workflow"
result_link : null
result_size : ""
running_time : "N/A"
status : "DEPLOYED"
updated : "2018-09-13 12:02:36"
use_s3_secure_redirect : true
user : "scala"
uuid : "2d074461-1dad-434d-9a17-2205fa79b358"

*/