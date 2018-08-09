import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

let counter = 0;
function createData(name, status, update_date, duration, desktop) {
  counter += 1;
  return { id: counter, name, status, update_date, duration, desktop, result: desktop };
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => b[orderBy] >= a[orderBy] : (a, b) => a[orderBy] <= b[orderBy];
}

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Job Name' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'update_date', numeric: false, disablePadding: false, label: 'Started' },
  { id: 'duration', numeric: false, disablePadding: false, label: 'Duration' },
  { id: 'desktop', numeric: false, disablePadding: false, label: 'Desktop' },
  { id: 'results', numeric: false, disablePadding: false, label: 'Results' },
  { id: 'options', numeric: true, disablePadding: false, label: '' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150,
  },  
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.primary.main,
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
let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classnames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant='headline' color='secondary' className={classnames('tips-title')}>
              Job History
          </Typography>
          )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Restart">
            <IconButton aria-label="Restart">
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


EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: '',
      order: 'asc',
      orderBy: 'name',
      selected: [],
      data: [
        createData('Workflow: SUNY WRF Workflow', 'Terminated', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: SUNY WRF Workflow', 'Completed', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: Multi-Step NCAR', 'Failed', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: Multi-Step NCAR', 'Running', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: SUNY WRF Workflow', 'Terminated', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: SUNY WRF Workflow', 'Completed', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: Multi-Step NCAR', 'Failed', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: Multi-Step NCAR', 'Running', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: SUNY WRF Workflow', 'Terminated', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: SUNY WRF Workflow', 'Completed', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: Multi-Step NCAR', 'Failed', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: Multi-Step NCAR', 'Running', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: SUNY WRF Workflow', 'Terminated', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: SUNY WRF Workflow', 'Completed', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: Multi-Step NCAR', 'Failed', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: Multi-Step NCAR', 'Running', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: SUNY WRF Workflow', 'Terminated', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: SUNY WRF Workflow', 'Terminated', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: SUNY WRF Workflow', 'Completed', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: Multi-Step NCAR', 'Failed', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: Multi-Step NCAR', 'Running', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: SUNY WRF Workflow', 'Terminated', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: SUNY WRF Workflow', 'Completed', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: Multi-Step NCAR', 'Failed', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
        createData('Workflow: Multi-Step NCAR', 'Running', (new Date()).toLocaleDateString() + ' ' + (new Date()).toLocaleTimeString(), '00:24:51', 128421),
      ],
      page: 0,
      rowsPerPage: 5,
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    debugger;
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      role='checkbox'
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} color='default' />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.name}
                      </TableCell>
                      <TableCell className={classnames(
                        `status-${n.status.toLowerCase()}`
                      )}>{n.status}</TableCell>
                      <TableCell>{n.update_date}</TableCell>
                      <TableCell>{n.duration}</TableCell>
                      <TableCell>{n.desktop}</TableCell>
                      <TableCell >{n.result}</TableCell>
                      <TableCell >{n.options}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
