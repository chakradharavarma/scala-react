import React, { Component } from 'react';
import { connect } from 'react-redux';
import Portal from '@material-ui/core/Portal';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from './SnackbarContent';
import { closeSnackbar, processQueue } from '../../actions/snackbarActions'

class MySnackbar extends Component {

  handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      // ignore clickaway events
      return;
    }
    this.props.closeSnackbar();
  }

  render() {
    const { snackbar, autoHideDuration, handleExited } = this.props
    const { notification, open, queue } = snackbar;
    if(!notification) {
      return null;
    }
    const { key, message, type } = notification

    const duration = Math.min(autoHideDuration, queue.length ? 500 : autoHideDuration);    
    return (
      <Portal>
        <Snackbar
          open={open}
          key={key}
          onClose={this.handleClose}
          autoHideDuration={duration}
          onExited={handleExited}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
        <SnackbarContent 
          variant={type}
          message={message}
          onClose={this.handleClose}
        />
        </Snackbar>
      </Portal>
    )
  }
}

MySnackbar.defaultProps = {
  autoHideDuration: 3000,
  handleClose: () => null,
}

const mapStateToProps = (state) => {
  return (
    {
      snackbar: state.snackbar
    }
  )
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeSnackbar: () => dispatch(closeSnackbar()),
    handleExited: () => dispatch(processQueue())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MySnackbar);