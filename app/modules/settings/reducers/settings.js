import { SETTINGS_CHANGE_CLONE_DESTINATION, SETTINGS_AUTHORIZE_USER } from "../constants"

const initialState = {
  cloneDestination: "/tmp",
  userAuthorized: false,
}

const settings = (state = initialState, action) => {
  switch (action.type) {
  case SETTINGS_CHANGE_CLONE_DESTINATION:
    return Object.assign({}, state, {cloneDestination: action.destination})
  case SETTINGS_AUTHORIZE_USER:
    return Object.assign({}, state, {userAuthorized: action.payload})
  default:
    return state
  }
}

export default settings
