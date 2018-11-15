import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer';
import { connect } from 'react-redux';
import { getStandardOut, getStandardError, showStandardError, showStandardOut } from '../../actions/jobActions';

const styles = theme => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    padding: '24px 72px',
  },
  modal: {
    top: '30%',
    left: '50%',
    transform: `translate(-50%, -50%)`,
    width: '38vw',
    padding: 24,
    position: 'absolute',
    minHeight: 200,
    lineHeight: 3,
  },
  modalTitle: {
    paddingBottom: 12,
    textTransform: 'uppercase',
    fontWeight: 100
  },
  outputText: {
    fontFamily: `'Ubuntu Mono', monospace`,
    padding: 8,
    border: '1px solid black'
  },
  chartTitle: {
    margin: '0 8px',
    textTransform: 'uppercase',
    letterSpacing: 2 
  },
  chartTitleContainer: {
    display: 'flex',
    paddingBottom: 18,
    justifyContent: 'center'
  }
});

class JobInfoDrawer extends Component {

  componentDidUpdate(prevProps) {
    const { getStandardOut, getStandardError, job } = this.props;
    if (job !== prevProps.job) {
      getStandardError(job.job_id);
      getStandardOut(job.job_id)
    }
  }

  render() {
    const { classes, job, onClose, showStandardOut, showStandardError, open } = this.props;
    const createdDate = new Date(job.created)
    const updatedDate = new Date(job.modified)
    return (
      <Drawer anchor="bottom"
        open={open}
        onClose={onClose}
      >
        <Card className={classes.paper}>
          <Grid container>
            <Grid item xs={12} className={classes.chartTitleContainer}>
              <Typography className={classes.chartTitle} variant='title' color='secondary'>
                Job Details
              </Typography>
            </Grid>
            <Divider />
            <Grid item xs={12} className='job-details-row'>
              <Typography variant='body2'>
                <span className='job-details-row-item-title'>UUID: </span> {job.job_id}
              </Typography>
            </Grid>
            <Grid item xs={12} className='job-details-row'>
              <Typography>
                <span className='job-details-row-item-title'>Status: </span>
                <span className={`status-${job.status && job.status.toLowerCase()}`}>{job.status}</span>
              </Typography>
            </Grid>
            <Grid item xs={12} className='job-details-row'>
              <Typography variant='body2'>
                <span className='job-details-row-item-title'>Duration: </span> {job.running_time}
              </Typography>
            </Grid>
            <Grid item xs={12} className='job-details-row'>
              <Typography variant='body2'>
                <span className='job-details-row-item-title'>Created on: </span> {`${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`}
              </Typography>
            </Grid>
            <Grid item xs={12} className='job-details-row'>
              <Typography variant='body2'>
                <span className='job-details-row-item-title'>Updated on: </span> {`${updatedDate.toLocaleDateString()} ${updatedDate.toLocaleTimeString()}`}
              </Typography>
            </Grid>
            <Grid item xs={12} className='job-details-row'>
              <Typography variant='body2' onClick={showStandardOut}>
                <span className='job-details-row-item-title link standard-out'>Standard Out</span>
              </Typography>
            </Grid>
            <Grid item xs={12} className='job-details-row'>
              <Typography variant='body2' onClick={showStandardError}>
                <span className='job-details-row-item-title link standard-error'>Standard Error</span>
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Drawer>
    );
  }
}

JobInfoDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    standardError: state.jobs.standardError,
    standardOut: state.jobs.standardOut,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    showStandardError: () => dispatch(showStandardError()),
    showStandardOut: () => dispatch(showStandardOut()),
    getStandardOut: (id) => dispatch(getStandardOut(id)),
    getStandardError: (id) => dispatch(getStandardError(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(JobInfoDrawer));