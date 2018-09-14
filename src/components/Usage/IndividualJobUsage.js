import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class IndividualJobUsage extends Component {

  render() {
    const { job } = this.props;
    return (
      <ExpansionPanel >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon style={{ color: 'white'}}/>}>
          <Typography variant='subheading' style={{ color: "#696969" }} >
            {job.uuid} : { job.status }
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          fill this in with some actual data
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