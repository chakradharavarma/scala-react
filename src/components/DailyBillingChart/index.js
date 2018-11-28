import React, { Component, Fragment } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import CustomTooltip from './Tooltip'
import CustomTick from './Tick'
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import moment from 'moment'

class DailyBillingChart extends Component {

  state = {
    cumulative: false,
  }

  toggleCumulative = () => {
    this.setState(prevState => {
      return { cumulative: !prevState.cumulative }
    })
  }

  render() {
    let { dailyCost, toggle, month } = this.props
    let { cumulative, startDate, endDate } = this.state;

    cumulative = cumulative || toggle

    if (!dailyCost.fetched) {
      return null
    }


    const key = 1;
    let started = false;

    let data = dailyCost.data.ResultsByTime
      .map(tick => ({
        date: tick.TimePeriod.Start,
        cost: parseFloat(tick.Total.BlendedCost.Amount),
      }))
      .filter(tick => {
        return (moment(tick.date)).month() !== month || !month
      }) // if a month is given, filter the month 
      .filter(tick => {
        if (month) return true
        if (started) return true
        if (!tick.cost) return false
        started = true
        return true
      })


    const start = moment(data[0].date)
    const end = moment(data[data.length - 1].date)

    if (start - startDate !== 0 || end - endDate !== 0) {
      this.setState({
        startDate: start,
        endDate: end,
      })
    }

    data = data.filter(el => {
      const dt = moment(el.date)
      return dt >= startDate && dt <= endDate
    })

    if (cumulative) {
      let total = 0;
      data = data.map(el => {
        total = total + el.cost;
        return { ...el, cost: total }
      })
    }


    // TODO might need to make fragment a div
    return (
      <Fragment>
        <div>

          <Typography className='job-status-chart-title' component='div' color='secondary' variant='headline'>
            Overall Billing
         </Typography>


        </div>
        <div style={{ width: '100%'}}>
          <div className='date-picker-container'>
            <DateRangePicker
              startDate={this.state.startDate} // momentPropTypes.momentObj or null,
              startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
              endDate={this.state.endDate} // momentPropTypes.momentObj or null,
              endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
              onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
              focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
              onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
            />
          </div>
          {
            !this.props.cumulative &&
            <div className='toggle-cumulative-checkbox'>
              <Typography>
                Cumulative
              </Typography>
              <Checkbox
                checked={cumulative}
                style={{ alignItems: 'flex-start' }}
                onClick={this.toggleCumulative}
              />
            </div>
          }
          <ResponsiveContainer aspect={2} minWidth={300} minHeight={200} maxHeight={300}>
            <AreaChart data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 50 }}>
              <defs>
                <linearGradient id={`chart-color-${key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="50%" stopColor="#5e8dbf" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#5e8dbf" stopOpacity={0.25} />
                </linearGradient>
              </defs>
              <Tooltip content={<CustomTooltip />} />
              <YAxis width={90} type="number" tickFormatter={(val) => val ? `$${val}.00` : ''} />
              <XAxis dataKey='date' tick={<CustomTick />} />
              <Area type="linear" dataKey="cost" stroke="#FFFFFF" strokeOpacity={0} fillOpacity={1} fill={`url(#chart-color-${key})`} />
            </AreaChart>
          </ResponsiveContainer>

        </div>

      </Fragment>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    dailyCost: state.dailyCost,
  }
}

export default connect(mapStateToProps)(DailyBillingChart);