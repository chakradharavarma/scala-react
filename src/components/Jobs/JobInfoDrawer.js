import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer';
import { connect } from 'react-redux';
import { getStandardError, getStandardOut } from '../../actions/jobActions';

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
  },
  outputText: {
    fontFamily: `'Ubuntu Mono', monospace`
  },
});

class JobInfoDrawer extends Component {

  componentDidUpdate(prevProps) {
    const { getStandardOut, getStandardError, job } = this.props;
    if (job && job !== prevProps.job) {
      getStandardError(job.uuid);
      getStandardOut(job.uuid)  
    }
  }

  toggleModal = (open, text) => () => {
    this.setState({
      open,
      text
    })
  }

  state = {
    open: false,
  }

  render() {
    const { classes, job, open, onClose, standardError, standardOut } = this.props;
    if(!job) {
      return null;
    }

    const createdDate = new Date(job.created)
    const updatedDate = new Date(job.modified)

    return (
      <Fragment>
        <Drawer anchor="bottom" 
          open={open}
          onClose={onClose}
        >
          <Card className={classes.paper}>
            <Grid container>
              <Grid item xs={12} style={{ display: 'flex', paddingBottom: 18, justifyContent: 'center' }}>
                <Typography style={{ margin: '0 8px', textTransform: 'uppercase', letterSpacing: 2 }} variant='title' color='secondary'>
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
                  <span className={`status-${job.status.toLowerCase()}`}>{job.status}</span>
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
                <Typography variant='body2' onClick={this.toggleModal(true, standardOut)}>
                  <span className='job-details-row-item-title link standard-out'>Standard Out</span>
                </Typography>
              </Grid>
              <Grid item xs={12} className='job-details-row'>
                <Typography variant='body2' onClick={this.toggleModal(true, standardError)}>
                  <span className='job-details-row-item-title link standard-error'>Standard Error</span>
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Drawer>
        <Modal
          open={this.state.open}
          onClose={this.toggleModal(false)}
        >
          <Card className={classes.modal}>
            <div className={classes.outputText} dangerouslySetInnerHTML={ {__html: this.state.text} } />
          </Card>
        </Modal>
      </Fragment>
    );
  }
}

JobInfoDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    standardError: state.jobs.standardError,
    standardOut: state.jobs.standardOut
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getStandardError: (id) => dispatch(getStandardError(id)),
    getStandardOut: (id) => dispatch(getStandardOut(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(JobInfoDrawer));