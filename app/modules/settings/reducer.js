import * as actionTypes from "./actionTypes"

const initialState = {
  cloneDestination: "/tmp"
}

const settings = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.CHANGE_CLONE_DESTINATION:
    return Object.assign({}, state, {cloneDestination: action.destination})
  default:
    return state
  }
}

export default settings
