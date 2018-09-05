import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton'
import LaunchOutlinedIcon from '@material-ui/icons/LaunchOutlined';
import PauseOutlinedIcon from '@material-ui/icons/PauseOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import PlayCircleOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined';
import ConfirmActionModal from '../ConfirmActionModal';
import { deleteDesktop, pauseDesktop, resumeDesktop } from '../../actions/desktopActions'

class RunningDesktopCard extends Component {

  state = {
    anchorEl: null,
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

  openSession = (url) => () => {
    window.open(url, '_blank')
    this.handleClose();
  }

  render() {

    const { desktop, desktops, handleClickDeleteDesktop, handleClickPause, handleClickResume } = this.props;

    /* TODO delete
    if (desktops.fetching) {
      return null;
    }*/ 

    const instance = desktop.Instances.find(instance => instance.InstanceId !== undefined);
    const { LaunchTime, PrivateIpAddress, InstanceId } = instance;
    
    const now = moment();
    const launch = moment(LaunchTime);
    const duration = moment.duration(now.diff(launch));

    const { serverIp, openConns, token } = desktops.data;

    const conn = openConns.find(conn => conn.hostname === PrivateIpAddress)
    if (!conn) { // todo add case for shutting down state, this currently catches and doesn't render
      return null;
    }
    const { id, protocol } = conn;
    const base = btoa([id, "c", "postgresql"].join("\x00"));

    const state = instance.State.Name;
    let connect;
    if (state === "running" && duration.asMinutes() > 2) {
      connect = `http://${serverIp}:8080/guacamole/#/client/${base}?token=${token}`
    } else if (state === "running") {
      connect = 'pending'
    } else {
      connect = 'none';
    }
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <Grid item xs={6}>
        <Card className='desktop-card' >
          <Grid container>
            <Grid item xs={12} className='menu-options-container'>
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
                  {
                    connect.length > 10 &&
                    (
                      <MenuItem onClick={this._handleClose(this.openSession(connect))}>  { /* todo */}
                        <LaunchOutlinedIcon className='menu-option-icon' />
                        Launch
                    </MenuItem>
                    )
                  }
                  <MenuItem onClick={this._handleClose(handleClickPause(InstanceId))}>
                   <PauseOutlinedIcon className='menu-option-icon' />
                    Pause
                  </MenuItem>
                  <MenuItem onClick={this._handleClose(handleClickResume(InstanceId))}>
                    <PlayCircleOutlinedIcon className='menu-option-icon' />
                    Resume
                  </MenuItem>
                  <ConfirmActionModal
                    message='Are you sure you want to delete this desktop?'
                    handleConfirm={this._handleClose(handleClickDeleteDesktop(id, InstanceId))}
                  >
                    <MenuItem>
                    <DeleteOutlinedIcon className='menu-option-icon' />
                      Delete
                    </MenuItem>
                  </ConfirmActionModal>
                </Menu>
              </div>


            </Grid>
            <Grid item xs={12} className='card-metadata'>
              Remote ID: {id}
            </Grid>
            <Grid item xs={12} className='card-metadata'>
              State: {state}
            </Grid>
            <Grid item xs={12} className='card-metadata'>
              Desktop: {protocol}
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    desktops: state.desktops
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClickDeleteDesktop: (con_id, desktop_id) => () => dispatch(deleteDesktop(desktop_id, con_id)),
    handleClickPause: (id) => () => dispatch(pauseDesktop(id)),
    handleClickResume: (id) => () => dispatch(resumeDesktop(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RunningDesktopCard);
