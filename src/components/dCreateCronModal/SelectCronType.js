import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { reduxForm, Field } from 'redux-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Divider from '@material-ui/core/Divider';

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
)

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin: 20,
  },
  formControl: {
    margin: theme.spacing.unit * 3,
    marginLeft: 0
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class RadioButtonsGroup extends React.Component {
  state = {
    value: 'female',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Field name="frequency" component={renderRadioGroup}>
          <Typography variant='title' color='secondary'>
            Choose an expression type
          </Typography>
          <Grid alignItems='center' justify='center' style={{margin: '20px 0'}} container>
            <Grid item xs={4} zeroMinWidth>
              <FormControlLabel
                value="minutes"
                control={<Radio color="secondary" />}
                label="Minutes"
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={4} zeroMinWidth>
              <FormControlLabel
                value="hourly"
                control={<Radio color="secondary" />}
                label="Hourly"
                labelPlacement="start"
                disabled
              />
            </Grid>
            <Grid item xs={4} zeroMinWidth>
              <FormControlLabel
                value="daily"
                control={<Radio color="secondary" />}
                label="Daily"
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={4} zeroMinWidth>
              <FormControlLabel
                value="weekly"
                control={<Radio color="secondary" />}
                label="Weekly"
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={4} zeroMinWidth>
              <FormControlLabel
                value="monthly"
                control={<Radio color="secondary" />}
                label="Monthly"
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={4} zeroMinWidth>
              <FormControlLabel
                value="yearly"
                control={<Radio color="secondary" />}
                label="Yearly"
                labelPlacement="start"
              />
            </Grid>
            <Grid item xs={12} zeroMinWidth>
              <Divider style={{ margin: '4px 0 8px'}} />
              <FormControlLabel
                value="cron"
                control={<Radio color="secondary" />}
                label="Build your own expression"
                labelPlacement="start"
              />
            </Grid>
          </Grid>
        </Field>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'createSchedule',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(withStyles(styles)(RadioButtonsGroup));