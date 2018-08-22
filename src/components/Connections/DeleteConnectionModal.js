import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

function getModalStyle() {
  const top = 38;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    outline: 'none'
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
});

class DeleteConnectionModal extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickDelete = () => {
    this.props.handleClickDelete();
    this.handleClose();
  }

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <IconButton
          aria-label="Delete"
          aria-haspopup="true"
          onClick={this.handleOpen}
        >
          <DeleteIcon />
        </IconButton>

        <Modal
          aria-labelledby="delete-session-modal"
          open={this.state.open}
          onClose={this.handleClose}
          className='delete-session-modal'
        >
          <div style={getModalStyle()} className={classes.paper}>
            <div className='delete-session-warning-container'>
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
              className='delete-session-close-button'
            >
              <CloseIcon />
            </IconButton>
              <WarningIcon />
              <div className='delete-session-modal-title'>
              <Typography style={{ lineHeight: '1.4em'}} color='inherit' variant="title">
                Once you delete a session, you will lose all its data. Are you sure you want to continue?
            </Typography>
            </div>
            </div>
            <div className='delete-session-button-group'>
              <Button variant="outlined" size="medium" onClick={this.handleClickDelete}>Confirm</Button>
              <Button variant="outlined" size="medium" onClick={this.handleClose}>Cancel</Button>
            </div>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

DeleteConnectionModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeleteConnectionModal);