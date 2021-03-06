import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import MonthlyUsagePanel from './MonthlyUsagePanel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ScalaLoader from '../ScalaLoader';
import Fade from '@material-ui/core/Fade';
import DailyBillingChart from '../DailyBillingChart';

class Usage extends Component {

  render() {

    const { jobs } = this.props;
    const { fetching, data } = jobs;

    const groups = data.reduce(function (r, o) {
      if (o.modified instanceof Date) {
        var m = o.modified.getMonth()        
      } else {
        m = -1
      }
      (r[m]) ? r[m].data.push(o) : r[m] = { group: m, data: [o] };
      return r;
    }, {});

    const results = Object.keys(groups).map(function (k) { return groups[k]; });
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Card>
            <div className='usage-summary'>
              <Typography color='secondary' variant='headline'>
                Monthly Summary
              </Typography>
              <Divider />
            </div>
            <div className='chart-container' >
              <DailyBillingChart />
            </div>

            {
              fetching ? <ScalaLoader centered active /> :
              <Fade in animation={400}>
                <div className={classnames('summary-container', { 'centered with-height': !results.length })} >
                    {
                      results.length ?
                        results.map((result, i) => 
                          <MonthlyUsagePanel key={`monthly-usage-panel-${i}`} usage={result} />
                        ) :
                        <Typography variant='title'>
                          No usage yet. Run your first job to see more.
                        </Typography>
                    }
                </div>
              </Fade>
            }
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs,
  }
}

export default connect(mapStateToProps)(Usage);