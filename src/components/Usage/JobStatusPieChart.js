import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import CustomTooltip from './Tooltip';

import { STATUS_COLORS } from '../../common/consts'

export default class JobStatusPieChart extends Component {

  render() {
    const { usage } = this.props;
    const count = {}
    usage.data.forEach((job) => {
      count[job.status] = count[job.status] + 1 || 1;
    });
    const data = Object.keys(count).map((category) => ({ 'name': category.charAt(0) + category.toLowerCase().substring(1), 'value': count[category] }))

    return (
      <div className='inner-chart-container'>
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
            innerRadius={55}
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
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </div>
    );
  }
}

JobStatusPieChart.defaultProps = {
  usage: {},
}