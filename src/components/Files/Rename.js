import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { renameField } from '../TextField/fields';
import { reduxForm, reset, submit, Field } from 'redux-form';
import submitForm from './handleSubmit';

class RenameFile extends Component {

    handleChange = (e) => {
        this.setState({ value: e.target.value })
    }

    handleRename = () => {
        const { onClose, dispatch, handleSubmit, folder } = this.props;
        const submitter = handleSubmit(submitForm.bind(this, folder.path));
        submitter();
        dispatch(submit('renameFile'));
        dispatch(reset('renameFile'));  
        onClose();
    }

    render() {
        const { onClose } = this.props;
        return (
            <Fragment>
                <Typography style={{ flex: 1, margin: '0 8px', textTransform: 'uppercase', letterSpacing: 2 }} component='div' variant='subheading' color='secondary'>
                    Rename
                </Typography>
                <Field name='newName'
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
const mapStateToProps = (state) => {
    return {
        folder: state.folder,
    }
}

export default connect(mapStateToProps)(
  reduxForm({
    form: 'renameFile',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true
  })(RenameFile)
);