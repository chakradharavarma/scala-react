import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IndividualJobUsage from './IndividualJobUsage';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import {
  STATUS_COLORS,
  MONTHS,
} from '../../common/consts'


export default class MonthlyUsagePanel extends Component {

  render() {
    const { usage } = this.props;
    const month = usage.group ? MONTHS[usage.group - 1] : 'No data'
    const count = {}
    usage.data.forEach((job) => {
      count[job.status] = count[job.status] + 1 || 1;
    });
    const data = Object.keys(count).map(function (category) {
      return { 'name': category, 'value': count[category] }
    })
    return (
      <ExpansionPanel defaultExpanded >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className='monthly-usage-summary'>
            <Typography variant='subheading' style={{ color: "#696969" }}>
              {month} 2018
              </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ display: 'unset' }} >
          <div style={{ margin: "0 22px" }}>
            <Typography variant='body2' className='status-completed' >
              Completed: {count['COMPLETED'] || 0}
            </Typography>
            <Typography variant='body2' className='status-failed' >
              Failed: {count['FAILED'] || 0}
            </Typography>
            <Typography variant='body2' className='status-terminated' >
              Terminated: {count['TERMINATED'] || 0}
            </Typography>

    	<PieChart width={800} height={400}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                label
              >
                {
                  data.map((entry, index) =>
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name]} />
                  )
                }
              </Pie>
              <Tooltip
              />
            </PieChart>
            <div className='expansion-panel-jobs-summary' disabled >
              <Typography className='expansion-panel-jobs-summary-title' variant='subheading'>
                JOBS
                  </Typography>
            </div>
            {
              usage.data.map((job, i) =>
                <IndividualJobUsage key={`individual-job-usage-${i}`} job={job} />
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