import {
  IMPERSONATE_USER,
  IMPERSONATE_USER_FAILED,
  IMPERSONATE_USER_SUCCESS,
  IMPERSONATE_USER_CLEAR,
} from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  username: null,
  on: false,
}

export default function (state=initialState, action) {
  switch(action.type){
    case IMPERSONATE_USER:
      state = { ...state, fetching: true, fetched: false };
      break;
    case IMPERSONATE_USER_SUCCESS:
      state = { ...state, fetching: false, fetched: true, on: true, username: action.payload.username};
      break;
    case IMPERSONATE_USER_FAILED:
      state = initialState;
      break;
    case IMPERSONATE_USER_CLEAR:
      state = initialState;
      break;
    default:
      break;
  }
  return state
}