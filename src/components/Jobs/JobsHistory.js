import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import moment from 'moment';
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
import JobInfoDrawer from './JobInfoDrawer'
import JobsCardHeader from './JobsCardHeader'
import ScalaLoader from '../ScalaLoader';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import RepeatIcon from '@material-ui/icons/Loop';
import ArchiveIcon from '@material-ui/icons/Archive';
import { createDesktopJob } from '../../actions/desktopActions';
import { restartJob } from '../../actions/jobActions';
import { ACTIVE_STATUS } from '../../common/consts';
import { getDuration } from '../../common/helpers';

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
  { id: 'name', numeric: false, disablePadding: true, label: 'Job Name', sortable: true },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status', sortable: true },
  { id: 'created', numeric: false, disablePadding: false, label: 'Started', sortable: true },
  { id: 'running_time', numeric: false, disablePadding: false, label: 'Duration', sortable: true },
  { id: 'results', numeric: false, disablePadding: false, label: 'Results', sortable: false },
  { id: 'restart', numeric: false, disablePadding: false, label: 'Restart', sortable: false },
];

class JobsCardHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead className='flex'>
        <TableRow className='flex'>
          {
            false && (
              <TableCell padding="checkbox" />
            )
          }
          {columnData.map(column => {
            return (
              <TableCell
                className='flex'
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id && column.sortable ? order : false}
              >
                {
                  column.sortable ? (
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
                  ) : column.label
                }
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
    fontFamily: '\'Roboto Mono\', monospace',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    maxWidth: 'stetch',
    marginTop: 12,
    overflowX: 'auto',
  },
});

class JobsCard extends Component {

  state = {
    filter: '',
    order: 'asc',
    orderBy: 'created',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    drawerOpen: false,
    job: {},
  };

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
      this.setState(state => ({ selected: state.data.map(job => job.id) }));
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

  handleChangePage = (_, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  setJobDrawer = (job) => (e) => {
    if (['TH', 'TD'].includes(e.target.tagName)) {
      this.setState({
        drawerOpen: true,
        job
      })
    }
  }

  closeJobDrawer = () => {
    this.setState({
      drawerOpen: false
    })
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, filterForm, jobs, onClickRestartJob, history } = this.props;
    const { fetching } = jobs;
    const { order, orderBy, selected, rowsPerPage, page, drawerOpen, job } = this.state;
    let data;
    if (filterForm) {
      data = jobs.data
        .filter(job => (job.name.toLowerCase().includes((filterForm.values && filterForm.values.filter.toLowerCase()) || '')) ||
          (job.job_id.toLowerCase().includes((filterForm.values && filterForm.values.filter.toLowerCase()) || '')))
    } else {
      data = jobs.data
    }
    data = data.filter(job => !ACTIVE_STATUS.includes(job.status))

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    // TODO change hardcoded vnc here
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

                  <Table className={`${classes.table} flex`} aria-labelledby="tableTitle">
                    <JobsCardHead
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={this.handleSelectAllClick}
                      onRequestSort={this.handleRequestSort}
                      rowCount={data.length}
                    />
                    <TableBody className='flex'>
                      {
                        data
                          .sort(getSorting(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map(job => {
                            // todo move to a fxn in consts
                            const isSelected = this.isSelected(job.id);
                            const duration = getDuration(job.created, job.modified)
                            return (
                              <TableRow
                                hover
                                className='flex'
                                role="checkbox"
                                aria-checked={isSelected}
                                key={job.id}
                                onClick={this.setJobDrawer(job)}
                                selected={isSelected}
                              >
                                <TableCell className='flex' component="th" scope="row" padding="none">
                                  {job.name}
                                </TableCell>
                                <TableCell className={classnames(
                                  'flex',
                                  `status-${job.status.toLowerCase()}`
                                )}>{job.status}</TableCell>
                                <TableCell className='flex'>{job.created.toLocaleString()}</TableCell>
                                <TableCell className='flex'>{duration}</TableCell>
                                <TableCell className='flex'>
                                  <Tooltip
                                    title='View results'
                                    placement='bottom'
                                    enterDelay={200}
                                  >
                                    <IconButton
                                      onClick={() => history.push(`/files#/jobs/${job.job_id}`)}
                                    >
                                      <ArchiveIcon />
                                    </IconButton>
                                  </Tooltip>
                                </TableCell>
                                <TableCell className='flex'>
                                  <IconButton
                                    aria-label="Desktop"
                                    onClick={onClickRestartJob(job.job_id)}
                                  >
                                    <RepeatIcon />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            );
                          })
                      }
                      {emptyRows > 0 && (
                        <TableRow className='flex' style={{ height: 49 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                    <JobInfoDrawer open={drawerOpen} onClose={this.closeJobDrawer} job={job} />
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

// TODO wire this back in
const mapDispatchToProps = (dispatch) => {
  return {
    onClickDesktop: (jobID, desktopType) => () => dispatch(createDesktopJob(jobID, desktopType)),
    onClickRestartJob: (jobID) => () => dispatch(restartJob(jobID))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(JobsCard)));