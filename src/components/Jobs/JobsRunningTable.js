import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { getJobs } from '../../actions/jobActions';
import JobsRunningTableRow from './JobsRunningTableRow';
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
    setInterval(this.fetchJobs, 5000);
  }

  fetchJobs = async () => {
    const { jobs, getJobs } = this.props;
    if (jobs.find(job => job.status !== "RUNNING")) {
      getJobs()
    }
  }

  render() {
    const { jobs, classes } = this.props;
    const { job, open } = this.state

    return (
      <Fragment>

        <Table className={`${classes.table} flex`}>
          <TableHead className='flex'>
            <TableRow className='flex'> 
              <TableCell className='flex'>Workflow Name</TableCell>
              <TableCell className='flex'>User</TableCell>
              <TableCell className='flex'>Results available</TableCell>
              <TableCell className='flex'>Status</TableCell>
              <TableCell className='flex'>Created date</TableCell>
              <TableCell className='flex'>Modified date</TableCell>
              <TableCell className='flex'>Terminate job</TableCell>
              <TableCell className='flex'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className='flex'>
            {jobs.map((job, i) => {
              return (<JobsRunningTableRow
                job={job}
                key={`running-job-${i}`}
                openPerformanceDrawer={this.openPerformanceDrawer}
              />);
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
  }
}

export default connect(undefined, mapDispatchToProps)(withStyles(styles)(JobsRunningTable));