import React, { Component } from 'react';

export default class Tooltip extends Component {
  render() {
    const { active } = this.props;
    if (active) {
      const { payload, label } = this.props;
      return (
        <div className="job-performace-tooltip">
          <p>{`Time ${label}`}</p>
          <p>CPU Utilization {payload[0].value.toFixed(2)}%</p>
        </div>
      );
    }

    return null;
  }
}
