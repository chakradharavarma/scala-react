import React, { Component } from 'react';

export default class Tick extends Component {
  render () {
    const {x, y, payload, seconds} = this.props;
    const ticks = payload.value.split(':');
   	return (
    	<g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dx={-4} dy={16} textAnchor="middle" fill="#666" transform="rotate(-0)" fontWeight={100} >{`${ticks[0]}:${ticks[1]} ${ seconds ? ticks[2] : ticks[2].split(" ")[1]}`}</text>
      </g>
    );
  }
}
