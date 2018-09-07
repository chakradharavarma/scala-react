import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { createNewFolder } from '../../actions/fileActions'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { renameFile } from '../../actions/fileActions';
import { renameField } from '../TextField/fields';
import { reduxForm, Field } from 'redux-form';

class RenameFile extends Component {

    state = {
        value: ''
    }

    handleChange = (e) => {
        this.setState({ value: e.target.value })
    }

    handleRename = () => {
        const { handleRename, onClose, folder } = this.props;
        const { value } = this.state;
        handleRename(`${folder.path}/${value}`);
        onClose();
    }

    render() {
        const { onClose } = this.props;
        return (
            <Fragment>
                <Typography style={{ flex: 1, margin: '0 8px', textTransform: 'uppercase', letterSpacing: 2 }} component='div' variant='subheading' color='secondary'>
                    Rename
                </Typography>
                <Field name='oldName'
                    component={renameField}
                />
                <div className='edit-file-buttons'>
                    <Button onClick={onClose} variant="contained">
                        Cancel
                    </Button>
                    <Button onClick={this.handleRename} variant="contained" color="secondary">
                        Save
                    </Button>
                </div>
            </Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleRename: (oldPath, newPath) => dispatch(renameFile(oldPath, newPath))        
    }
}

const mapStateToProps = (state) => {
    return {
        folder: state.folder,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'renameFile',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
  })(RenameFile)
);