import {
  INIT_APP,
  FETCHED_DESKTOPS_FAILED,
  FETCHED_DESKTOPS_SUCCESS,
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
    case FETCHED_DESKTOPS_SUCCESS:
      state = { ...state, fetching: false, fetched: false, data: action.payload.data};
      break;
    case FETCHED_DESKTOPS_FAILED:
      state = { ...state, fetching: false};
      break;
    default:
      break;
  }
  return state
}