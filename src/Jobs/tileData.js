
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NewJobModal from './NewJobModal';

export const topSection = (
  <div>
    <ListItem button>
      <NewJobModal />
      <ListItemText primary="Create a New Job" />
    </ListItem>
  </div>
);

export const bottomSection = (
  <div>

  </div>
);
