import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CodeMirror from 'react-codemirror';
import { handleClose, handleSave, updateCode } from '../../actions/fileActions'
import { getMode } from '../../common/helpers';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/shell/shell';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        width: '50vw',
        height: '94vh',
        backgroundColor: '#f7f7f7',
        position: 'absolute',
        transform: `translate(-${left}%, -${top}%)`,
    };
}

class FileModal extends Component {

    render() {
        const { file, handleClose, handleSave, updateCode } = this.props;
        const { contents, path } = file;
        const open = contents !== undefined;

        if (!open) {
            return null;
        }

        return (
            <Modal
                aria-labelledby="file-editor-modal"
                open={open}
                onClose={handleClose}
            >
                <Card style={getModalStyle()}>
                    <Typography className='edit-file-title' color='secondary' variant='subheading'>
                        { path.substring(path.lastIndexOf('/')+1) }
                    </Typography>

                    <CodeMirror
                        mode={getMode(path)}
                        value={contents}
                        onChange={updateCode}
                        autoFocus
                        options={{ lineNumbers: true }}
                    />
                    <div className='edit-file-buttons'>
                        <Button variant="contained" onClick={handleClose}>
                            Cancel
                            </Button>
                        <Button variant="contained" color="secondary" onClick={handleSave(path, contents)}>
                            Save
                        </Button>
                    </div>
                </Card>
            </Modal>
        );
    }
}

FileModal.defaultProps = {
    open: false,
    contents: '',
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleClose: () => dispatch(handleClose()),
        handleSave: (path, contents) => () => {
            dispatch(handleSave(path, contents));
            dispatch(handleClose());
        },
        updateCode: (code) => dispatch(updateCode(code)),
    }
}

const mapStateToProps = (state) => {
    return {
        file: state.file,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(FileModal);