import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { uploadFiles, dropFailed } from '../../actions/fileActions'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dropzone from 'react-dropzone'

class UploadFiles extends Component {

    state = {
        files: [],
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value })
    }


    handleDrop = (accepted, rejected) => { // todo add rejected code
        const { dropFailed } = this.props
        if (rejected.length) {
            dropFailed(rejected)
        }
        this.setState({ files: accepted.concat(this.state.files) });
    }


    uploadFiles = () => {
        const { onClose, uploadFiles, path } = this.props;
        const { files } = this.state;
        uploadFiles(files, path);
        onClose();
    }

    render() {
        const { onClose } = this.props;
        return (
            <Fragment>
                <Typography style={{ margin: 8, textTransform: 'uppercase', letterSpacing: 2 }} component='div' variant='subheading' color='secondary'>
                    Upload files
                </Typography>
                <Dropzone style={{ flex: 1, border: 'unset', width: '60%' }} onDrop={this.handleDrop} >
                    {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                        return (
                            <Fragment>
                                <Button
                                    disableRipple
                                    variant='outlined'
                                    style={{ width: '100%', height: '50%', border: '1px solid #5e8dbf', backgroundColor: isDragActive ? '#78A7D9' : '#5e8dbf', color: 'white' }}
                                >
                                    Click or drop files here
                            </Button>
                                <div className='pending-uploads-container'>
                                    {
                                        this.state.files.map(file => <Typography>{file.name}</Typography>)
                                    }
                                </div>
                            </Fragment>

                        )
                    }}
                </Dropzone>

                <div className='edit-file-buttons'>
                    <Button onClick={onClose} variant="contained">
                        Cancel
                        </Button>
                    <Button onClick={this.uploadFiles} variant="contained" color="secondary">
                        Upload
                    </Button>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        path: state.folder.path
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadFiles: (files, path) => dispatch(uploadFiles(files, path)),
        dropFailed: (file) => dispatch(dropFailed(file)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadFiles);