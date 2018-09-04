import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IndividualJobUsage from './IndividualJobUsage';

const months = [
  'January', 'February', 'March', 'April', 'May',
  'June', 'July', 'August', 'September',
  'October', 'November', 'December'
];

export default class MonthlyUsagePanel extends Component {

  render() {
    const { usage } = this.props;
    const month = this.props.usage.group ? months[this.props.usage.group - 1] : 'No data'
    const count = {}
    usage.data.forEach((job) => {
      count[job.status] = count[job.status] + 1 || 1;
    });

    return (
        <ExpansionPanel >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <div className='monthly-usage-summary'>
              <Typography variant='subheading' style={{ color: "#696969" }}>
                {month} 2018
              </Typography>
              <Typography variant='subheading' style={{ color: "#CECECE" }} >
                Completed: { count['COMPLETED'] }
              </Typography>
              <Typography variant='subheading' style={{ color: "#CECECE" }} >
                Terminated: { count['TERMINATED'] }
              </Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ display: 'unset' }} >
            <div style={{ margin: "0 22px" }}>
              <div className='expansion-panel-jobs-summary' disabled >
                  <Typography className='expansion-panel-jobs-summary-title' variant='subheading'>
                    JOBS
                  </Typography>
              </div>
              {
                this.props.usage.data.map((data, i) =>
                  <IndividualJobUsage key={`individual-job-usage-${i}`} data={data} />
                )
              }
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
    );
  }
}

MonthlyUsagePanel.defaultProps = {
  usage: {},
}