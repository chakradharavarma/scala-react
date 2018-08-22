import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

const field = (props, children) => ({
    input,
    label,
    meta: { touched, error },
    ...custom
}) => (
        <TextField
            helperText={touched && error}
            {...input}
            {...custom}
            {...props}
        >
            {children}
        </TextField>
    );

class SelectWorkflow extends Component {

    render() {
        const { availableWorkflows } = this.props
        return (

            <Grid item style={{width: 'calc(50% - 24px', marginRight: '24px'}} className='create-schedule-field'>
                <Typography color='secondary' variant='subheading' className='create-schedule-field-title'>
                    Select a workflow
                </Typography>
                <Field name="workflowId"
                    component={field({
                        select: true,
                        margin: "normal",
                        style: { width: '100%' }
                    },
                        availableWorkflows.map(workflow => (
                            <MenuItem key={workflow.name} value={workflow.id}>
                                {workflow.name}
                            </MenuItem>
                        ))
                    )}
                />
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        availableWorkflows: state.availableWorkflows.data
    }
}

export default connect(mapStateToProps)(reduxForm({
    form: 'createSchedule',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SelectWorkflow));