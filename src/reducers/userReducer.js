import {
  LOG_IN_FAILED,
  LOG_IN_SUCCESS,
  LOG_OUT_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  FETCH_LOCAL_COGNITO_USER_SUCCESS
} from '../actions/types';

const initialState = {
  data: null,
  fetched: false,
  error: null
}

export default function (state=initialState, action) {
  switch(action.type){
    case LOG_IN_SUCCESS:
      state = { ...state, fetched: true, data: action.payload}
      break;
    case FETCH_LOCAL_COGNITO_USER_SUCCESS:
      state = { ...state, fetched: true, data: action.payload}
      break;
    case LOG_OUT_SUCCESS:
      state = { ...state, fetched: true, data: null}
      break;
    case LOG_IN_FAILED:
      state = { ...state, error: action.payload}
      break;
    case REGISTER_SUCCESS:
      state = { ...state, data: action.payload.user}
      break;
    case REGISTER_FAILED:
      state = { ...state, error: action.payload}
      break;
    default:
      break;
  }
  return state
}