import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'

function getModalStyle() {
  const top = 38;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${left}%, -${top}%)`,
    outline: 'none'
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 24,
  },
});

class JobInfoModal extends Component {

  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const { classes, children, job } = this.props;
    console.log(job);
    return (
      <Fragment>
        {React.cloneElement(children, { onClick: this.handleOpen })}
        <Modal
          aria-labelledby="job-info-modal"
          open={this.state.open}
          onClose={this.handleClose}
          className='modal'
        >
          <Card style={getModalStyle()} className={classes.paper}>
            <Grid container>
              <Grid item xs={12} style={{ display: 'flex', paddingBottom: 18, justifyContent: 'center' }}>
                <Typography style={{ margin: '0 8px', textTransform: 'uppercase', letterSpacing: 2 }} variant='title' color='secondary'>
                  Job Details
                </Typography>
              </Grid>
              <Divider />
              <Grid item xs={12} className='job-details-row'>
                <Typography variant='body2'>
                  <span className='job-details-row-item-title'>UUID: </span> {job.uuid}
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
                  <span className='job-details-row-item-title'>Created on: </span> {job.created}
                </Typography>
              </Grid>
              <Grid item xs={12} className='job-details-row'>
                <Typography variant='body2'>
                  <span className='job-details-row-item-title'>Created on: </span> {job.updated}
                </Typography>
              </Grid>

            </Grid>
          </Card>
        </Modal>
      </Fragment>
    );
  }
}

JobInfoModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(JobInfoModal);