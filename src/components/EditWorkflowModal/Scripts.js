import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Card from '@material-ui/core/Card'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';

import CodeMirror from 'react-codemirror';
import SwipeableViews from 'react-swipeable-views';

import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/shell/shell';

function getModalStyle() {
    return {
        backgroundColor: '#f7f7f7',
        width: 'inherit',
    };
}



const field = (props) => ({
    input,
    label,
    meta: { touched, error },
    ...custom
}) => (
        <CodeMirror
            mode={'shell'}
            value={''}
            autoFocus
            options={{ lineNumbers: true }}
            helperText={touched && error}
            {...input}
            {...custom}
            {...props}
        />
    );


function TabContainer({ children, dir }) {
    return (
        <Grid container direction='column' alignItems='center' >
            {children}
        </Grid>
    );
}


class Scripts extends Component {

    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };


    render() {
        const { value } = this.state;

        return (
            <div style={{ width: '100%' }}>
                <Tabs
                    value={value}
                    onChange={this.handleChange}
                    indicatorColor='primary'
                    textColor="primary"
                    className='edit-workflow-script-tab-container'
                >
                    <Tab disableRipple className='edit-workflow-script-tab' label="Pre" />
                    <Tab disableRipple className='edit-workflow-script-tab' label="Run" />
                    <Tab disableRipple className='edit-workflow-script-tab' label="Post" />
                </Tabs>
                <SwipeableViews
                    index={value}
                >
                    <TabContainer>
                        <Card style={getModalStyle()}>
                            <Field name="scripts_prep" component={field()} />
                        </Card>
                    </TabContainer>
                    <TabContainer>
                        <Card style={getModalStyle()}>
                            <Field name="scripts_run" component={field()} />
                        </Card>
                    </TabContainer>
                    <TabContainer>
                        <Card style={getModalStyle()}>
                            <Field name="scripts_post" component={field()} />
                        </Card>
                    </TabContainer>
                </SwipeableViews>
            </div>

        );
    }
}

Scripts.defaultProps = {
    open: false,
    contents: '',
};

export default reduxForm({
    form: 'editWorkflow',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: false,
})(Scripts);