import {
  INIT_APP,
  FETCHED_FOLDER_FAILED,
  FETCHED_FOLDER_SUCCESS,
} from '../actions/types';

const initialState = {
  fetching: false,
  fetched: false,
  data: [],
  path: '/'
}

export default function (state=initialState, action) {
  switch(action.type){
    case INIT_APP:
      state = { ...state, fetching: true, fetched: false};
      break;
      case FETCHED_FOLDER_SUCCESS:
      const path = action.payload.path;
      state = { ...state, fetching: false, fetched: false, path: path, data: action.payload.data};
      break;
    case FETCHED_FOLDER_FAILED:
      state = { ...state, fetching: false, error: action.payload};
      break;
    default:
      break;
  }
  return state
}