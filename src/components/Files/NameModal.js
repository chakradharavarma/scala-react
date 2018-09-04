import React, { Component, Fragment } from 'react';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card'
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/shell/shell';
import NameFolder from './NameFolder';
import Rename from './Rename';

function getModalStyle() {
    const top = 30;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      width: '42vh',
      height: '24vh',
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

class NameFileModal extends Component {

    state = {
        open: false,
    }
    
    handleClose = () => {
        this.setState({ open: false });
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    getModalContents = () => {
        const { type } = this.props;
        switch(type){
            case 'dir':
                return <NameFolder onClose={this.handleClose} />
            case 'rename':
                return <Rename onClose={this.handleClose} />
            default:
                break;
        }
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
                        { this.getModalContents() } 
                    </Card>
                </Modal>
            </Fragment>
        );
    }
}

export default NameFileModal;