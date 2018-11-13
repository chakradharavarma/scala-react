import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FolderIcon from '@material-ui/icons/FolderOpen';
import { terminateJob, getJobs } from '../../actions/jobActions';
import ConfirmActionModal from '../ConfirmActionModal';
import JobPerformanceDrawer from './JobPerformanceDrawer';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const formatDate = (date) => new Date(date).toLocaleString();


class JobsRunningTable extends Component {

  openPerformanceDrawer = (job, open) => (e) => {
    if (['TH', 'TD'].includes(e.target.tagName)) {
      this.setState({ job, open })
    }
  }

  closePerformanceDrawer = () => {
    this.setState({
      open: false
    })
  }

  state = {
    open: false,
    job: null,
  }


  async componentDidMount() {
    setInterval(this.fetchJobs, 10000);
  }

  fetchJobs = async () => {
    const { jobs, getJobs } = this.props;
    if (jobs.find(job => job.status !== "RUNNING")) {
      getJobs()
    }
  }

  render() {
    const { jobs, classes, handleTerminateClick, history } = this.props;
    const { job, open } = this.state
    return (
      <Fragment>

        <Table
          className={classes.table}
        >
          <TableHead>
            <TableRow>
              <TableCell>Workflow Name</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Results available</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created date</TableCell>
              <TableCell>Modified date</TableCell>
              <TableCell>Files</TableCell>
              <TableCell>Terminate job</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map(job => {
              return (
                <TableRow
                  hover={job.status === "RUNNING"}
                  onClick={job.status === "RUNNING" ? this.openPerformanceDrawer(job, true) : undefined}
                  key={job.id}
                >
                  <TableCell component="th" scope="row">
                    {job.name}
                  </TableCell>
                  <TableCell>
                    {job.user_id}
                  </TableCell>
                  <TableCell>
                    {job.hasResults ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell>
                    {job.status}
                  </TableCell>
                  <TableCell>
                    {formatDate(job.created)}
                  </TableCell>
                  <TableCell>
                    {formatDate(job.modified)}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      disabled={job.status !== 'RUNNING'}
                      onClick={() => { history.push(`/files#/jobs/${job.job_id}`) }}
                      key="close"
                      aria-label="Close"
                      color="inherit"
                    >
                      <FolderIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <ConfirmActionModal
                      message='Are you sure you want to terminate this job?'
                      handleConfirm={handleTerminateClick(job.job_id)}
                      >
                      <IconButton
                        disabled={job.status !== 'RUNNING'}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                      >
                        <CloseIcon />
                      </IconButton>
                    </ConfirmActionModal>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <JobPerformanceDrawer
          open={open}
          onClose={this.closePerformanceDrawer}
          job={job}
        />
      </Fragment>
    )
  }
}

JobsRunningTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    getJobs: () => dispatch(getJobs()),
    handleTerminateClick: (uuid) => () => dispatch(terminateJob(uuid))
  }
}

export default connect(undefined, mapDispatchToProps)(withRouter(withStyles(styles)(JobsRunningTable)));