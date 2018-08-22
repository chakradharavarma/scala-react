import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router'
import { spring, AnimatedSwitch } from 'react-router-transition';
import store from '../../store';
import AccountMenu from './AccountMenu';
import Files from '../Files';
import Jobs from '../Jobs';
import Usage from '../Usage';
import Connections from '../Connections';
import Desktops from '../Desktops';
import Workflows from '../Workflows';
import ScheduleTasks from '../ScheduleTasks';
import { clearMessages } from '../../actions/generalActions';

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
      store.dispatch(clearMessages())
    }
  }

  render() {
    return (
      <div id='dash-right' className='dash-right'>
        <AccountMenu username={this.props.username} />
        <AnimatedSwitch
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          mapStyles={mapStyles}
          className="route-wrapper"
        >
          <Route exact path='/v2/' component={Jobs} />
          <Route exact path='/v2/jobs' component={Jobs} />
          <Route exact path='/v2/files' component={Files} />
          <Route exact path='/v2/workflows' component={Workflows} />
          <Route exact path='/v2/schedule' component={ScheduleTasks} />
          <Route exact path='/v2/usage' component={Usage} />
          <Route exact path='/v2/desktops' component={Desktops} />
          <Route exact path='/v2/connections' component={Connections} />
        </AnimatedSwitch>
      </div>
    );
  }
}

export default withRouter(DashRight);