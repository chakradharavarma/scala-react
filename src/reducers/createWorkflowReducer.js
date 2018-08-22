const initialState = {
  complete: false,
  valid: false,
  workflow: {

  },
  error: null,
}

export default function (state=initialState, action) {
  switch(action.type){
    case "RESET_CREATE_WORKFLOW":
      state = initialState;
      break;
    case "SET_CREATE_WORKFLOW_FORM":
      state = { ...state, workflow: payload.workflow };
      break;
    default:
      break;
  }
  return state
}