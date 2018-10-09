import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REGISTER_FAILED,
  REGISTER_SUCCESS
} from '../actions/types';

const initialState = {
  data: null,
  error: null
}

export default function (state=initialState, action) {
  switch(action.type){
    case LOGIN_SUCCESS:
      state = { ...state, data: action.payload}
      break;
    case LOGIN_FAILED:
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