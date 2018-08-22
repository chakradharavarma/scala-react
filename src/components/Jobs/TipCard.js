import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import JobsDrawer from './JobsDrawer';

const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
};

function SimpleCard(props) {

  return (
    <div className='tip-section'>
      <Divider />
      <CardContent>
        <Typography variant="headline" component="h2">
          {props.title}
        </Typography>
        <Typography>
          {props.subtitle}
        </Typography>
      </CardContent>
      <CardActions>
        {
          props.drawer &&
            <JobsDrawer title='Run a workflow now' />
        }
      </CardActions>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
