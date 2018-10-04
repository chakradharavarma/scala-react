import {
  INIT_APP,
  FETCHED_FILE_FAILED,
  FETCHED_FILE_SUCCESS,
  CLEAR_FILE,
  UPDATE_CODE,
} from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  path: undefined,
  content: undefined,
}

export default function (state=initialState, action) {
  switch(action.type){
    case INIT_APP:
      state = { ...state, fetching: true, fetched: false};
      break;
    case FETCHED_FILE_SUCCESS:
      state = { ...state, fetching: false, fetched: false, path: action.payload.data.path, content: action.payload.data.content};
      break;
    case CLEAR_FILE:
      state = { ...state, fetched: false, path: undefined, content: undefined};
      break;
    case FETCHED_FILE_FAILED:
      state = { ...state, fetching: false, error: action.payload};
      break;
    case UPDATE_CODE:
      state = { ...state, fetching: false, content: action.payload.content};
      break;
    default:
      break;
  }
  return state
}