import {
  INIT_APP,
  FETCHED_CONNECTIONS_SUCCESS,
  FETCHED_CONNECTIONS_FAILED,
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
      state = { ...state, fetching: false, fetched: false};
      break;
    case FETCHED_CONNECTIONS_SUCCESS:
      state = { ...state, fetching: false, fetched: true, data: action.payload.data};
      break;
    default:
      break;
  }
  return state
}