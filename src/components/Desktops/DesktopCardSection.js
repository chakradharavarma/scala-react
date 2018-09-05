import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AvailableDesktopCard from './AvailableDesktopCard';
import RunningDesktopCard from './RunningDesktopCard';
import ScalaLoader from '../ScalaLoader';

export default class DesktopCardSection extends Component {

  render() {
    const { desktops, title, runningCard, fetching } = this.props;

    return (
      <Card className='desktop-section-container'>
        <Typography color='secondary' variant='headline' className='desktop-section-title'>
          {title}
        </Typography>
        <Divider />
        <Grid
          container
          className='desktop-cards-root sibling-fade'
          spacing={24}
          direction="row"
          alignItems="center"
        >
          {
            fetching ? (
              <ScalaLoader centered active />
            ) :
            
            runningCard ? 
                desktops
                  .filter(desktop => desktop.Instances[0].State.Name !== 'terminated')
                  .map((desktop, i) => <RunningDesktopCard key={`running-desktop-card-${i}`} desktop={desktop} />)
                : (
                desktops.map((desktop, i) => <AvailableDesktopCard key={`available-desktop-card-${i}`} desktop={desktop} />)
              )
          }
        </Grid>
      </Card>

    );
  }
}

DesktopCardSection.defaultProps = {
  desktops: [],
  title: 'Desktops'
};


DesktopCardSection.propTypes = {
  desktops: PropTypes.array,
  title: PropTypes.string,
};
