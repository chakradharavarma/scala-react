import React, { Component } from 'react';

export default class Tooltip extends Component {
  render() {
    const { active } = this.props;
    if (active) {
      const { payload } = this.props;
      return (
        <div className="usage-tooltip">
          <p>{`${payload[0].name}: ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  }
}
