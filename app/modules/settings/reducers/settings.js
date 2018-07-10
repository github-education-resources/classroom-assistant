import { SETTINGS_CHANGE_CLONE_DESTINATION } from "../constants"

const initialState = {
  cloneDestination: "/tmp",
}

const settings = (state = initialState, action) => {
  switch (action.type) {
  case SETTINGS_CHANGE_CLONE_DESTINATION:
    return Object.assign({}, state, {cloneDestination: action.destination})
  default:
    return state
  }
}

export default settings
