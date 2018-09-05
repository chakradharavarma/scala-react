import React, { Component } from 'react';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { reduxForm, Field } from 'redux-form';
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
            <Grid item style={{width: 'calc(70% - 24px', marginRight: '24px'}} className='create-schedule-field'>
                <Typography color='secondary' variant='subheading' className='create-schedule-field-title'>
                    Select a workflow
                </Typography>
                <Field name="workflowId"
                    component={TextField({
                    select: true,
                    margin: "normal",
                    style: { width: 300 }
                    },
                    items
                )} />
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