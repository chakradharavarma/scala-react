import React from 'react';
import TextField from './index';
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/shell/shell';

export const tasksPerNode = TextField({
  label: "Tasks per nodes",
  type: "number",
  margin: "normal",
  style: { width: '100%' }
})

export const numberOfNodes = TextField({
  label: "Number of nodes",
  type: "number",
  margin: "normal",
  style: { width: '100%' }
})

export const cpusPerNode = TextField({
  label: "CPU's per node",
  type: "number",
  margin: "normal",
  style: { width: '100%' }
})

export const nameField = TextField({
  placeholder: 'ex: test-water-300',
  margin: "normal",
  className: 'center-field',
  style: { width: 300 },
  autoComplete: 'off'
})

export const renameField = TextField({
  margin: "normal",
  style: { width: 300},
  className: 'center-field',
  autoComplete: 'off'
})

export const emailField = TextField({
  label: "Emails",
  margin: "normal",
  style: { width: '100%' }
})

export const cronField = TextField({
  margin: "normal",
  style: { width: 300 }
})
 
export const searchField = TextField({
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