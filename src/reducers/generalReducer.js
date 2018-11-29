
const initialState = {
  
}

export default function (state=initialState, action) {
  switch(action.type){
    case "@@router/LOCATION_CHANGE":
      window.location.hash = "";
    default:
      break;
  }
  return state
}