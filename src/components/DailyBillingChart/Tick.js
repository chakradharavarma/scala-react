import React, { Component } from 'react';

export default class Tick extends Component {
  render () {
    const {x, y, payload } = this.props;
    const ticks = payload.value.split('-');
    const label = `${ticks[1]}/${ticks[2]}`
    return (
    	<g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dx={-4} dy={16} textAnchor="middle" fill="#666" transform="rotate(-0)" fontWeight={100} >{label}</text>
      </g>
    );
  }
}
