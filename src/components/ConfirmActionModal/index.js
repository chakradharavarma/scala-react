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
  },
});

class ConfirmActionModal extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleConfirm = () => {
    this.props.handleConfirm();
    debugger;
    this.handleClose();
  }

  render() {
    const { classes, message, } = this.props;
    return (
      <Fragment>
        {
          React.cloneElement(this.props.children, { onClick: this.handleOpen })
        }
        <Modal
          aria-labelledby="delete-session-modal"
          open={this.state.open}
          onClose={this.handleClose}
          className='modal'
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
              <div className='modal-title'>
              <Typography style={{ lineHeight: '1.4em'}} color='inherit' variant="title">
                { message }
            </Typography>
            </div>
            </div>
            <div className='delete-session-button-group'>
              <Button variant="outlined" size="medium" onClick={this.handleConfirm}>Confirm</Button>
              <Button variant="outlined" size="medium" onClick={this.handleClose}>Cancel</Button>
            </div>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

ConfirmActionModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfirmActionModal);