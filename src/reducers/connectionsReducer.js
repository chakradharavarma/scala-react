import {
  INIT_APP,
  FETCHED_CONNECTIONS_SUCCESS,
  FETCHED_CONNECTIONS_FAILED,
  LOG_OUT,
} from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  data: {},
}

export default function (state=initialState, action) {
  switch(action.type){
    case INIT_APP:
      state = { ...state, fetching: true, fetched: false};
      break;
    case FETCHED_CONNECTIONS_FAILED:
      state = { ...state, fetching: false, fetched: false, data: []};
      break;
    case FETCHED_CONNECTIONS_SUCCESS:
      debugger;
      state = { ...state, fetching: false, fetched: true, data: action.payload.data};
      break;
    case LOG_OUT:
      state = initialState;
      break;
    default:
      break;
  }
  return state
}