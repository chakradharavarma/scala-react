import React from 'react';
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
import { terminateJob } from '../../actions/jobActions';

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

function JobsRunningTable(props) {
  const { classes, jobs, handleTerminateClick } = props;
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Workflow Name</TableCell>
          <TableCell>User</TableCell>
          <TableCell>Results available</TableCell>
          <TableCell>Created date</TableCell>
          <TableCell>Updated date</TableCell>
          <TableCell>Job ID</TableCell>
          <TableCell>Terminate job</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {jobs.map(job => {
          return (
            <TableRow key={job.id}>
              <TableCell component="th" scope="row">
                {job.name}
              </TableCell>
              <TableCell>
                {job.user}
              </TableCell>
              <TableCell>
                {job.hasResults ? 'Yes' : 'No'}
              </TableCell>
              <TableCell>
                {job.created}
              </TableCell>
              <TableCell>
                {job.updated}
              </TableCell>
              <TableCell numeric>
                {job.id}
              </TableCell>
              <TableCell>
                  <IconButton
                    onClick={handleTerminateClick(job.uuid)}
                    disabled={!job.cancellable}
                    key="close"
                    aria-label="Close"
                    color="inherit"
                  >
                    <CloseIcon />
                  </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

JobsRunningTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleTerminateClick: (uuid) => () => dispatch(terminateJob(uuid))
  }
}

export default connect(undefined, mapDispatchToProps)(withStyles(styles)(JobsRunningTable));