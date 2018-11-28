import React, { Component } from 'react';
import moment from 'moment';

export default class Tooltip extends Component {
  render() {
    const { active } = this.props;
    if (active) {
      const { payload } = this.props;
      const cost = payload[0].payload.cost
      const dt = moment(payload[0].payload.date)
      return (
        <div className="job-performace-tooltip">
          <p>{`Date ${dt.month()+1}/${dt.date()}/${dt.format('YY')}`}</p>
          <p>Cost: ${cost.toFixed(2)}</p>
        </div>
      );
    }

    return null;
  }
}
