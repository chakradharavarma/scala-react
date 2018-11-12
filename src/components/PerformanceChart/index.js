import React, { Component } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import CustomTooltip from './Tooltip';
import CustomTick from './Tick';

export default class PerformanceChart extends Component {

  render() {
    const { chart, key } = this.props
    if(!chart) {
      return null
    } 
    const data = chart.values.map(el => {
      const date = new Date(el[0] * 1000);
      const hours = date.getHours();
      const minutes = "0" + date.getMinutes();
      const seconds = "0" + date.getSeconds();
      const suffix = hours > 11 ? ' PM' : ' AM'
      const formattedTime = `${hours > 12 ? hours % 12 : hours }:${minutes.substr(-2)}:${seconds.substr(-2)}${suffix}`;
      return {
        time: formattedTime,
        percent: parseFloat(el[1])
      }
    })
    const start = chart.values[0][0]
    const end = chart.values[chart.values.length-1][0]
    let seconds = false;
    if ((end - start) < (60 * 12)) {
      seconds = true;
    }
    return (
      <AreaChart style={{ margin: 'auto'}} width={730} height={200} data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 50 }}>
        <defs>
          <linearGradient id={`chart-color-${key}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5e8dbf" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#5e8dbf" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis tickCount={5} dataKey="time" tick={<CustomTick seconds={seconds} />}/>
        <YAxis  type="number" unit="%" />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="percent" stroke="#5e8dbf" fillOpacity={1} fill={`url(#chart-color-${key})`} />
      </AreaChart>
    );
  }
}
