import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MoreIcon from '@material-ui/icons/MoreVert';
import { terminateJob, getJobs } from '../../actions/jobActions';
import ConfirmActionModal from '../ConfirmActionModal';
import { getStandardOut, getStandardError, showStandardError, showStandardOut } from '../../actions/jobActions';
import RepeatIcon from '@material-ui/icons/Loop';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tooltip from '@material-ui/core/Tooltip';


class JobsRunningTableRow extends Component {

  handlePopoverOpen = event => {
    const { getStandardOut, getStandardError, job } = this.props;
    getStandardError(job.job_id);
    getStandardOut(job.job_id);
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };


  handleCopyTextClick = () => {
    this.setState({ message: 'Copied!' })
  }

  handleCopyTextMouseOut = () => {
    const { message } = this.state;
    if (message !== 'Click to copy Job ID') {
      setTimeout(() => this.setState({ message: 'Click to copy Job ID' }), 700)  // TODO
    }
  }


  state = {
    anchorEl: null,
    open: false,
    job: null,
    message: 'Click to copy Job ID',
  }

  render() {
    const { openPerformanceDrawer, handleTerminateClick, history, job, showStandardOut, showStandardError } = this.props;
    const { anchorEl } = this.state
    const open = Boolean(anchorEl);

    return (

      <TableRow
        className='flex'
        hover={job.status === "RUNNING"}
        onClick={job.status === "RUNNING" ? openPerformanceDrawer(job, true) : undefined}
        key={job.id}
      >
        <TableCell className='flex' component="th" scope="row">
              <Tooltip title={ this.state.message }  >
                <CopyToClipboard text={job.job_id}>
                  <div onClick={this.handleCopyTextClick} onMouseOut={this.handleCopyTextMouseOut} >
                    {job.name}
                  </div>
                </CopyToClipboard>
              </Tooltip>
        </TableCell>
        <TableCell className='flex'>
          {job.user_id}
        </TableCell>
        <TableCell className='flex'>
          {job.hasResults ? 'Yes' : 'No'}
        </TableCell>
        <TableCell className='flex'>
          <span style={{ marginRight: 6 }}>{ job.status }</span>
          {
            job.status !== 'RUNNING' && <RepeatIcon color='action' className='rotate' />
          }

        </TableCell>
        <TableCell className='flex'>
          {job.created.toLocaleString()}
        </TableCell>
        <TableCell className='flex'>
          {job.modified.toLocaleString()}
        </TableCell>
        <TableCell className='flex'>
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
        <TableCell className='flex'>
          <IconButton
            onClick={this.handlePopoverOpen}
            disabled={job.status !== 'RUNNING'}
            key="close"
            aria-label="Close"
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
          <Menu onClose={this.handlePopoverClose} id="render-props-menu" anchorEl={anchorEl} open={open} >
            <MenuItem onClick={() => { history.push(`/files#/jobs/${job.job_id}`) }}>Files</MenuItem>
            <MenuItem onClick={showStandardOut} >Standard Out</MenuItem>
            <MenuItem onClick={showStandardError}>Standard Error</MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getJobs: () => dispatch(getJobs()),
    handleTerminateClick: (uuid) => () => dispatch(terminateJob(uuid)),
    getStandardOut: (id) => dispatch(getStandardOut(id)),
    getStandardError: (id) => dispatch(getStandardError(id)),
    showStandardError: () => dispatch(showStandardError()),
    showStandardOut: () => dispatch(showStandardOut()),
  }
}

export default connect(undefined, mapDispatchToProps)(withRouter(JobsRunningTableRow));