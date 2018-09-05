import React, { Component } from 'react';
import { connect } from 'react-redux';
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
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from "@material-ui/core/Divider";
import JobsCardHeader from './JobsCardHeader'
import ScalaLoader from '../ScalaLoader';
import Fade from '@material-ui/core/Fade';

let counter = 0;
function createData({ name, status, updated, duration, desktop }) {
  counter += 1;
  return { id: counter, name, status, updated, duration, desktop, result: desktop };
}

function getSorting(order, orderBy) {
  return (a, b) => {
    let _a = a[orderBy];
    let _b = b[orderBy];

    if (_a === _b) {
      return 0;
    }
    else if (typeof _a === 'string') {
      return order === 'desc' ? _a.localeCompare(_b) : _b.localeCompare(_a);
    } else {
      return order === 'desc' ? (_a > _b ? 1 : -1) : (_b > _a ? 1 : -1);
    }
  }
}


const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Job Name' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'updated', numeric: false, disablePadding: false, label: 'Started' },
  { id: 'duration', numeric: false, disablePadding: false, label: 'Duration' },
  { id: 'desktop', numeric: false, disablePadding: false, label: 'Desktop' },
  { id: 'results', numeric: false, disablePadding: false, label: 'Results' },
  { id: 'options', numeric: true, disablePadding: false, label: '' },
];

class JobsCardHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" />
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

JobsCardHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const styles = theme => ({
  root: {
    width: '100%',
    fontFamily: '\'Roboto Mono\', monospace',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    marginTop: 12,
    overflowX: 'auto',
  },
});

class JobsCard extends Component {
  constructor(props) {
    super(props);
    const { jobs } = this.props;
    if (jobs.initialState) {
      // todo
    }
    if (!jobs.data) {
      // todo
    }
    const data = []
    this.state = {
      filter: '',
      order: 'asc',
      orderBy: 'name',
      selected: [],
      data: data,
      page: 0,
      rowsPerPage: Math.min(data.length || 5),
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
    const { classes, filterForm, jobs } = this.props;
    const { fetching } = jobs;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    let data;
    if (filterForm) {
      data = jobs.data
        .filter(job => job.name.toLowerCase().includes((filterForm.values && filterForm.values.filter.toLowerCase()) || ''))
        .map(job => createData(job));
    } else {
      data = jobs.data
        .map(job => createData(job));
    }
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <Paper className={classes.root}>
        <JobsCardHeader numSelected={selected.length} />
        <Divider />
        <div className={classes.tableWrapper}>
          {
            fetching ?
              (
                <ScalaLoader centered active={fetching} />
              ) :
              (
                <Fade in={!fetching} timeout={400} >

                  <Table className={classes.table} aria-labelledby="tableTitle">
                    <JobsCardHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={this.handleSelectAllClick}
                      onRequestSort={this.handleRequestSort}
                      rowCount={data.length}
                    />
                    <TableBody>
                      {
                        data
                          .sort(getSorting(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map(n => {
                            const isSelected = this.isSelected(n.id);
                            return (
                              <TableRow
                                hover
                                onClick={event => null} // TODO
                                role="checkbox"
                                aria-checked={isSelected}
                                tabIndex={-1}
                                key={n.id}
                                selected={isSelected}
                              >
                                <TableCell padding="checkbox" />
                                <TableCell component="th" scope="row" padding="none">
                                  {n.name}
                                </TableCell>
                                <TableCell className={classnames(
                                  `status-${n.status.toLowerCase()}`
                                )}>{n.status}</TableCell>
                                <TableCell>{n.updated}</TableCell>
                                <TableCell>{n.duration}</TableCell>
                                <TableCell>{n.desktop}</TableCell>
                                <TableCell >{n.result}</TableCell>
                                <TableCell >{n.options}</TableCell>
                              </TableRow>
                            );
                          })
                      }
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </Fade>
              )
          }

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

JobsCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

JobsCard.defaultProps = {
  jobs: {
    data: [],
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs,
    filterForm: state.form.filterJobsHistory,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(JobsCard));