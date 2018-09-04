import React, { Component, Fragment } from 'react';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card'
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/shell/shell';
import UploadFile from './UploadFile';

function getModalStyle() {
    const top = 30;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      width: '48vh',
      height: '36vh',
      backgroundColor: 'white',
      position: 'absolute',
      transform: `translate(-${left}%, -${top}%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '20px 0 5px'
    };
  }

class UploadFileModal extends Component {

    state = {
        open: false,
    }
    
    handleClose = () => {
        this.setState({ open: false });
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    render() {
        const { trigger } = this.props;
        const { open } = this.state;

        return (
            <Fragment>
                { React.cloneElement(trigger, { onClick: this.handleOpen }) }
                <Modal
                    disableAutoFocus
                    aria-labelledby="file-editor-modal"
                    open={open}
                    onClose={this.handleClose}
                >
                    <Card  style={getModalStyle()}>
                        <UploadFile onClose={this.handleClose} />
                    </Card>
                </Modal>
            </Fragment>
        );
    }
}

export default UploadFileModal;