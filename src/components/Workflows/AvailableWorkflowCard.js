import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlayArrowOutlined from '@material-ui/icons/PlayArrowOutlined';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import EditOutlined from '@material-ui/icons/EditOutlined';
import FileCopy from '@material-ui/icons/FileCopyOutlined';
import { deleteWorkflow, runWorkflow, cloneWorkflow } from '../../actions/workflowActions'

import EditWorkflowModal from '../EditWorkflowModal';
import ConfirmActionModal from '../ConfirmActionModal';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import Tooltip from '@material-ui/core/Tooltip';

class AvailableWorkflows extends Component {

  state = {
    anchorEl: null,
    message: 'Click to copy',
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  _handleClose = (beforeClosing) => () => {
    beforeClosing();
    this.setState({ anchorEl: null });
  };


  handleCopyTextClick = () => {
    this.setState({ message: 'Copied!' })
  }

  handleCopyTextMouseOut = () => {
    const { message } = this.state;
    if (message !== 'Click to copy') {
      setTimeout(() => this.setState({ message: 'Click to copy' }), 700)  // TODO
    }
  }

  render() {
    const { onClickDelete, onClickRun, workflow, onClickCloneWorkflow, computes } = this.props;
    const { data, fetched } = computes;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const compute = fetched && data.find(compute => compute.instanceType === workflow.resources.compute)
    const instanceType = compute && compute.name

    return (
      <Grid item lg={6} xl={4} sm={12}>
        <Card className='available-workflow-card' >
          <CardContent>
            <div className='workflow-title-container'>
              <Typography color='secondary' variant="title">
                {workflow.name}
              </Typography>
              <div>
                <IconButton
                  aria-label="More"
                  aria-owns={open ? 'long-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={this.handleClose}
                  PaperProps={{
                    style: {
                      width: 120,
                      boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                    }
                  }}
                >
                  <MenuItem onClick={this._handleClose(onClickRun(workflow.id))}>
                    <PlayArrowOutlined className='menu-option-icon' />
                    Run
                  </MenuItem>
                  <EditWorkflowModal handleCloseCallback={this.handleClose} workflow={workflow} trigger={
                    <MenuItem onClick={this.handleClose}>
                      <EditOutlined className='menu-option-icon' />
                      Edit
                    </MenuItem>
                  } />
                  <ConfirmActionModal
                    message='Are you sure you want to delete this workflow?'
                    handleConfirm={this._handleClose(onClickDelete(workflow.id))}
                  >
                    <MenuItem>
                      <DeleteOutlined className='menu-option-icon' />
                      Delete
                    </MenuItem>
                  </ConfirmActionModal>
                  <MenuItem onClick={this._handleClose(onClickCloneWorkflow(workflow.id))}>
                    <FileCopy className='menu-option-icon' />
                    Clone
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <Divider />

            <Grid className='card-metadata' container spacing={0} >
              <Grid item xs={3} >
                {`v${workflow.version}`}
              </Grid>
              <Grid item xs={3} >
                {`${workflow.resources.instanceCount} nodes`}
              </Grid>
              <Grid item xs={6} >
                {instanceType}
              </Grid>
            </Grid>
            <Grid className='card-metadata' container spacing={8} >
              <Grid item xs={8} >
                WORKFLOW ID:
              </Grid>
              <Grid item xs={4} >
                {`STATUS: ${workflow.status}`}
              </Grid>
              <Grid item xs={12} >
              <Tooltip title={ this.state.message } >
                <CopyToClipboard text={workflow.id}>
                <span className='connection-string' onClick={this.handleCopyTextClick} onMouseOut={this.handleCopyTextMouseOut} >
                  {workflow.id}                  
                </span>
                </CopyToClipboard>
              </Tooltip>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    computes: state.computes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClickRun: (id) => () => dispatch(runWorkflow(id)),
    onClickDelete: (id) => () => dispatch(deleteWorkflow(id)),
    onClickCloneWorkflow: (id) => () => dispatch(cloneWorkflow(id)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailableWorkflows);
