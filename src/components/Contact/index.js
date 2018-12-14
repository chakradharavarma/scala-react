import React, { Component } from 'react';
import { reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

class Contact extends Component {

  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    dispatch(initialize('contact', {
      username: "hi",
    }));
  }


  render() {
    return (
      <Card>
        <Grid container className='contact-us-container'>
          <Typography className='contact-us-title' color='secondary' variant='headline'>
            Contact Us
          </Typography>
        </Grid>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  return (
    {

    }
  )
};

const mapDispatchToProps = dispatch => {
  return (
    {

    }
  )
}

const validate = ({ name }) => {
  const errors = {};
  if(!name || name.trim() === '') {
    errors.name = 'Workflow must have a name'
  }else if(name.length > 35 ) {
    errors.name = 'Name must be less than 35 characters'
  }
  else if(name.length < 4 ) {
    errors.name = 'Name must be more than than 4 characters'
  }
  return errors;
}

export default reduxForm({
  form: 'contact',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validate,
})(connect(mapStateToProps, mapDispatchToProps)(Contact));