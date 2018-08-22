import {
  PROCESS_MESSAGE,
  PUSH_MESSAGE,
  CLOSE_SNACKBAR
} from '../actions/types';

import {
  ERROR,
  INFO,
  SUCCESS,
} from '../common/consts';

import { createNotification } from '../common/helpers';

const initialState = {
  open: false,
  notifications: [],
}

export default function (state=initialState, action) {
  switch(action.type){
    /*
    case SET_NOTIFICATIONS:
      state = { ...state, notifications: action.payload};
      break;
    */
    case PROCESS_MESSAGE:
      state = { ...state, notifications: state.notifications.splice(1)};
      break;
    case PUSH_MESSAGE:    
      state = { ...state, notifications: state.notifications.push(action.payload)};
      break;
    case CLOSE_SNACKBAR:    
      state = { ...state, open: true};
      break;
    default:
      break;
  }
  return state
}