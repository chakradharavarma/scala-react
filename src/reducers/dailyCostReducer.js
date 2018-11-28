import {
  INIT_APP,
  FETCH_DAILY_COSTS,
  FETCHED_DAILY_COSTS_SUCCESS,
  FETCHED_DAILY_COSTS_FAILED,
  LOG_OUT
} from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  data: {},
  error: null,
}

export default function (state=initialState, action) {
  switch(action.type){
    case INIT_APP:
      state = { ...state, fetching: true};
      break;
    case FETCH_DAILY_COSTS:
      state = { ...state, fetching: false, fetched: true, data: action.payload.data};
      break;
    case FETCHED_DAILY_COSTS_SUCCESS:
      state = { ...state, fetching: false, fetched: true, data: action.payload.data};
      break;
    case FETCHED_DAILY_COSTS_FAILED:
      state = { ...state, fetching: false, fetched: false, error: action.payload };
      break;
    case LOG_OUT:
      state = initialState
      break;
    default:
      break;
  }
  return state
}