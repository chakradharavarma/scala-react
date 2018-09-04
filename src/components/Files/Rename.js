import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { createNewFolder } from '../../actions/fileActions'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class NameFolder extends Component {

    state = {
        value: ''
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value })
    }

    handleSave = () => {
        const { createNewFolder, onClose, folder } = this.props;
        const { value } = this.state;
        createNewFolder(`${folder.path}/${value}`);
        onClose();
    }

    render() {
        const { onClose } = this.props;
        return (
            <Fragment>
                <Typography style={{ flex: 1, margin: '0 8px', textTransform: 'uppercase', letterSpacing: 2 }} component='div' variant='subheading' color='secondary'>
                    Rename
                </Typography>
                <TextField style={{flex: 1}} onChange={this.handleChange} />
                <div className='edit-file-buttons'>
                    <Button onClick={onClose} variant="contained">
                        Cancel
                        </Button>
                    <Button onClick={this.handleSave} variant="contained" color="secondary">
                        Save
                    </Button>
                </div>
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createNewFolder: (path) => dispatch(createNewFolder(path))        
    }
}

const mapStateToProps = (state) => {
    return {
        folder: state.folder,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NameFolder);