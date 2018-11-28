import React, { Component } from 'react';

export default class Tick extends Component {
  render () {
    const { x, y, payload, start, end } = this.props;

    if(payload.index === 0) {
      return null
    }

    const date = payload.value.split(/\s|:/);
    const MINUTE = 60;
    let label = ''
    const timeElapsed = end - start;

    let time = (new Date().setHours(parseInt(date[0],10) + (date[3] === 'PM' ? 12 : 0 ), date[1], date[2]))  / 1000;
    time = time - (time % 15);

    let secondsIn = end - time;
    let minutesIn = (secondsIn / MINUTE);

    //let minutesIn = Math.floor(secondsIn / MINUTE)

    //secondsIn = secondsIn - minutesIn * MINUTE

    //minutesIn = minutesIn ? `${minutesIn}m` : ``

    //secondsIn = secondsIn > 1 ? `${secondsIn}s` : ``

    if (timeElapsed < 6 * MINUTE ) {
      if(!secondsIn) {
        label = '0s'
      } else {
        label = `${minutesIn}m`
      }
    } else {
      label = `${date[0]}:${date[1]} ${date[3]} `
    }    

   	return (
    	<g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dx={-4} dy={16} textAnchor="middle" fill="#666" transform="rotate(-0)" fontWeight={100} >{label}</text>
      </g>
    );
  }
}
