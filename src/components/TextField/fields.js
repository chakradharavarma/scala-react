import React from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Field from './index';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/shell/shell';

export const tasksPerNode = Field({
  label: "Tasks per nodes",
  type: "number",
  margin: "normal",
  inputProps: {
    min: 1,
  },
  style: { width: '100%' }
})

export const numberOfNodes = Field({
  label: "Number of nodes",
  type: "number",
  margin: "normal",
  inputProps: {
    min: 1,
  },
  style: { width: '100%' }
})

export const cpusPerNode = Field({
  label: "CPU's per node",
  type: "number",
  margin: "normal",
  inputProps: {
    min: 1
  },
  style: { width: '100%' }
})

export const nameField = Field({
  placeholder: 'ex: test-water-300',
  margin: "normal",
  className: 'center-field',
  style: { width: 300 },
  autoComplete: 'off'
})

export const renameField = Field({
  margin: "normal",
  style: { width: 300},
  className: 'center-field',
  autoComplete: 'off'
})

export const emailField = Field({
  label: "Emails",
  margin: "normal",
  style: { width: '100%' }
})

export const cronField = Field({
  margin: "normal",
  style: { width: 300 }
})
 
export const searchField = Field({
  label: 'Search'
});

export const codeField = (props) => ({
    input,
    label,
    meta: { touched, error },
    ...custom
}) => (
    <CodeMirror
        mode={'shell'}
        autoFocus
        options={{ lineNumbers: true }}
        helperText={touched && error}
        {...input}
        {...custom}
        {...props}
    />
);


const mapStateToProps = (state) => {
  return {
    computes: state.computes
  }
}

export const clusterType = connect(mapStateToProps)((props) => (
  <TextField
    {...props.input}
    select
    margin="normal"
    style={{ width: '100%' }}
  >
  {
    props.computes.fetched &&
    props.computes.data.map(machine => (
      <MenuItem key={machine.id} value={machine.id}>
        { machine.name }
      </MenuItem>
    ))
  }
  </TextField>
))
