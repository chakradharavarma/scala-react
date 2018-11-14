import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card'
import { connect } from 'react-redux';
import {  closeStandardModal } from '../../actions/jobActions';

const styles = theme => ({
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
});

class OutputModal extends Component {

  render() {
    const { classes, jobOutput, jobs, closeStandardModal } = this.props;
    const { standardError, standardOut, type, open, jobId} = jobOutput;
    const job = jobs.data.find(job => job.job_id === jobId)

    return (
      <Modal
        open={open}
        onClose={closeStandardModal}
      >
        <Card className={classes.modal}>
          <Typography variant='headline' className={classes.modalTitle}>
            {`Standard ${type === 'err' ? 'Error' : 'Out'} for ${job && job.name}`}
          </Typography>
          <div className={classes.outputText} dangerouslySetInnerHTML={{ __html: type === 'err' ? standardError : standardOut }} />
        </Card>
      </Modal>
    );
  }
}

OutputModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    jobOutput: state.jobOutput,
    jobs: state.jobs,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeStandardModal: () => dispatch(closeStandardModal()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OutputModal));