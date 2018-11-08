import React, { Fragment } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { lighten } from '@material-ui/core/styles/colorManipulator';

let files = []
let counter = 0;
function createData(name, dateModified, type, size) {
  counter += 1;
  return { id: counter, name, dateModified, type, size };
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => b[orderBy] - a[orderBy] : (a, b) => a[orderBy] - b[orderBy];
}

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'dateModified', numeric: true, disablePadding: false, label: 'Modified Date' },
  { id: 'type', numeric: true, disablePadding: false, label: 'Type' },
  { id: 'size', numeric: true, disablePadding: false, label: 'Size' },
];


const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let FileExplorerToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
            <Fragment>
              <span> PATH: </span>
              <input onChange={props.onChange} value={'/usr/bin/bash'} className='file-path' />
            </Fragment>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
            <TextField
              defaultValue=""
              label="Search"
              className={classes.textField}
              type="text"
              margin="normal"
            />
          )}
      </div>
    </Toolbar>
  );
};

FileExplorerToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

export default withStyles(toolbarStyles)(FileExplorerToolbar);
