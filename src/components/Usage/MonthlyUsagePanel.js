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
      return { 'name': category.charAt(0) + category.toLowerCase().substring(1), 'value': count[category] }
    })
    return (
      <ExpansionPanel defaultExpanded >
        <ExpansionPanelSummary className='monthly-usage-summary' expandIcon={<ExpandMoreIcon style={{ color: 'white'}} />}>
          <div >
            <Typography variant='subheading' className='expansion-panel-jobs-summary-title'>
              {month} 2018
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ display: 'unset' }} >
          <div style={{ margin: "0 22px" }}>
            <div className='job-status-chart'>
              <Typography className='job-status-chart-title' component='div' color='secondary' variant='headline'>
                Job Status
              </Typography>
              <PieChart width={300} height={240}>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  isAnimationActive
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  label
                  paddingAngle={Math.min(5, (data.length - 1) * 3)}
                  labelClassName
                >
                  {
                    data.map((entry, index) =>
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name.toUpperCase()]} />
                    )
                  }
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </div>

            <ExpansionPanel>

              <ExpansionPanelSummary className='expansion-panel-jobs-summary' expandIcon={<ExpandMoreIcon style={{ color: 'white'}} />}>
                <Typography className='expansion-panel-jobs-summary-title' variant='subheading'>
                  Individual Jobs summaries
              </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails style={{ display: 'unset' }} >
                {
                  usage.data.map((job, i) =>
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