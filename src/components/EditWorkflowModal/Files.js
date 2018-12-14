import React, { Component, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

function getModalStyle() {
    return {
        backgroundColor: '#f7f7f7',
        width: 'inherit',
    };
}

class Scripts extends Component {

    render() {

        return (

            <Card style={getModalStyle()}>
                <Typography className='edit-file-title' color='secondary' variant='subheading'>
                    {'temp'}
                </Typography>
                <CodeMirror
                    mode={'shell'}
                    value={''}
                    autoFocus
                    options={{ lineNumbers: true, lineWrapping: true }}
                />
            </Card>
        );
    }
}

Scripts.defaultProps = {
    open: false,
    content: '',
};

export default reduxForm({
    form: 'editWorkflow',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: false,
})(Scripts);