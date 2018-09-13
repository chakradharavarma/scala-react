import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import MonthlyUsagePanel from './MonthlyUsagePanel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ScalaLoader from '../ScalaLoader';
import Fade from '@material-ui/core/Fade';

class Usage extends Component {

  render() {

    const { jobs } = this.props;
    const { fetching } = jobs;

    if (!jobs) {
      return null
    }

    const { data } = jobs;

    const groups = data.reduce(function (r, o) {
      var m = o.updated.split(('-'))[1];
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
            {
              fetching ? (
                <ScalaLoader centered active />
              ) :
              <Fade in animation={400}>
                <div className='summary-container'>
                    {
                      results.map((result, i) => 
                        <MonthlyUsagePanel key={`monthly-usage-panel-${i}`} usage={result} />
                      )}
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