import React, { Component } from 'react';
import { connect } from 'react-redux';
import Portal from '@material-ui/core/Portal';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from './SnackbarContent';
import { clearMessages } from '../../actions/generalActions'

class MySnackbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
    }
  }

  handleClose = (_, reason) => {
    if(reason === 'timeout') {
      debugger;
    }
    this.setState({ open: false});
  }

  componentDidUpdate(prevProps) {
    if (this.props.open !== prevProps.open || this.props.message !== prevProps.message) {
      this.setState({
        open: this.props.open
      })
    }
  }

  render() {
    return (
      <Portal>
        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          autoHideDuration={this.props.autoHideDuration}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <SnackbarContent 
            variant={this.props.variant || ''}
            message={this.props.message}
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

const mapDispatchToProps = (dispatch) => {
  return {
    clearMessages: () => dispatch(clearMessages()),
  }
}

export default connect(undefined, mapDispatchToProps)(MySnackbar);