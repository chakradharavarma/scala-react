import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IndividualJobUsage from './IndividualJobUsage';
import JobStatusPieChart from './JobStatusPieChart';

import { MONTHS } from '../../common/consts'


export default class MonthlyUsagePanel extends Component {

  render() {
    const { usage } = this.props;
    const month = usage.group ? MONTHS[usage.group] : 'No data'
    const count = {}
    usage.data.forEach((job) => {
      count[job.status] = count[job.status] + 1 || 1;
    });
    return (
      <ExpansionPanel defaultExpanded >
        <ExpansionPanelSummary className='monthly-usage-summary' expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
          <div >
            <Typography variant='subheading' className='expansion-panel-jobs-summary-title'>
              {month} 2018
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ display: 'unset' }} >
          <div style={{ margin: "0 22px" }}>
            <div className='chart-container' >
              <JobStatusPieChart usage={usage} />
            </div>
            <ExpansionPanel >
              <ExpansionPanelSummary className='expansion-panel-jobs-summary' expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
                <Typography className='expansion-panel-jobs-summary-title' variant='subheading'>
                  Individual Jobs summaries
              </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className='monthly-usage-details' >
                {
                  usage.data
                    .sort((a, b) => (b.modified - a.modified))
                    .map((job, i) =>
                    <IndividualJobUsage key={`individual-job-usage-${i}`} job={job} />
                  )
                }
              </ExpansionPanelDetails>
            </ExpansionPanel>

          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

MonthlyUsagePanel.defaultProps = {
  usage: {},
}