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

class NameModal extends Component {

    getModalContents = () => {
        const { type, onClose } = this.props;
        debugger;
        switch(type){
            case 'dir':
                return <NameFolder onClose={onClose} />
            case 'rename':
                return <Rename onClose={onClose} />
            default:
                break;
        }
    }

    render() {
        const { open, onClose } = this.props;
        debugger;
        return (
                <Modal
                    disableAutoFocus
                    aria-labelledby="file-name-modal"
                    open={open}
                    onClose={onClose}
                >
                    <Card  style={getModalStyle()}>
                        { this.getModalContents() } 
                    </Card>
                </Modal>
        );
    }
}

export default NameModal;