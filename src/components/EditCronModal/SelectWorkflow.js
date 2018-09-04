import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import TextField from '../TextField';


class SelectWorkflow extends Component {

    render() {
        const { availableWorkflows } = this.props
        
        const items = availableWorkflows.map(workflow => (
            <MenuItem key={workflow.name} value={workflow.id}>
                {workflow.name}
            </MenuItem>
        ))


        return (

            <Grid item className='create-schedule-field'>
                <Typography color='secondary' variant='subheading' className='create-schedule-field-title'>
                    Select a workflow
                </Typography>
                <Field name="workflowId"
                    component={TextField({
                        select: true,
                        margin: "normal",
                        style: { width: '100%' }
                    }, items
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
    form: 'editSchedule',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(SelectWorkflow));