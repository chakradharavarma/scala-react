import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import { spring, AnimatedSwitch } from 'react-router-transition';
import Files from '../Files';
import Jobs from '../Jobs';
import Usage from '../Usage';
import Connections from '../Connections';
import Desktops from '../Desktops';
import Workflows from '../Workflows';
import ScheduleTasks from '../ScheduleTasks';
import Snackbar from '../Snackbar';
import PrivateRoute from '../PrivateRoute';
import Login from '../Login';
import Register from '../Register';
import Verify from '../Verify';
import ChangeUser from '../ChangeUser';
import Contact from '../Contact';
import PageNotFound from '../PageNotFound';

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 200,
    damping: 24,
  });
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 0.9,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    scale: bounce(1),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    scale: bounce(1),
  },
};

class DashRight extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      document.getElementById('dash-right').scrollTo(0,0);
    }
  }

  render() {
    const { notification } = this.props;
    return (
      <div id='dash-right' className='dash-right'>
        <AnimatedSwitch
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          mapStyles={mapStyles}
          className="route-wrapper"
        >
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/verify' component={Verify} />
          <PrivateRoute exact path='/' component={Jobs} />
          <PrivateRoute exact path='/jobs' component={Jobs} />
          <PrivateRoute exact path='/files' component={Files} />
          <PrivateRoute exact path='/workflows' component={Workflows} />
          <PrivateRoute exact path='/schedule' component={ScheduleTasks} />
          <PrivateRoute exact path='/usage' component={Usage} />
          <PrivateRoute exact path='/desktops' component={Desktops} />
          <PrivateRoute exact path='/connections' component={Connections} />
          <PrivateRoute exact path='/tomato' component={ChangeUser} />
          <PrivateRoute exact path='/contact' component={Contact} />
          <PrivateRoute  path='*' component={PageNotFound} />
        </AnimatedSwitch>
        <Snackbar
          variant={notification ? notification.type : 'default'}
          message={notification ? notification.message : ''}
          open={notification !== undefined}
        />
      </div>
    );
  }
}

export default withRouter(DashRight);