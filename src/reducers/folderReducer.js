import {
  INIT_APP,
  FETCH_FOLDER,
  FETCHED_FOLDER_FAILED,
  FETCHED_FOLDER_SUCCESS,
  LOG_OUT,
} from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  path: '/'
}

export default function (state=initialState, action) {
  switch(action.type) {
    case INIT_APP:
      state = { ...state, fetching: true, fetched: false};
      break;
    case FETCH_FOLDER:
      state = { ...state, fetching: true }
      break;
    case FETCHED_FOLDER_SUCCESS:
      const path = decodeURI(action.payload.path);
      state = { ...state, fetching: false, fetched: true, path, data: action.payload.data};
      break;
    case FETCHED_FOLDER_FAILED:
      state = { ...state, fetching: false, fetched: false, error: action.payload};
      break;
    case LOG_OUT:
      state = initialState;
      break;
    default:
      break;
  }
  return state
}