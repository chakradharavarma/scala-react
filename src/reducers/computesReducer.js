import {
  INIT_APP,
  FETCHED_COMPUTES_SUCCESS,
  FETCHED_COMPUTES_FAILED,
} from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  error: null,
}

export default function (state=initialState, action) {
  switch(action.type){
    case INIT_APP:
      state = { ...state, fetching: true};
      break;
    case FETCHED_COMPUTES_SUCCESS:
      state = { ...state, fetching: false, fetched: true, data: action.payload.data};
      break;
    case FETCHED_COMPUTES_FAILED:
      state = { ...state, fetching: false, fetched: false, error: action.payload};
      break;
    default:
      break;
  }
  return state
}