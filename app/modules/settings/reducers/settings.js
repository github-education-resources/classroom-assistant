import { SETTINGS_CHANGE_CLONE_DESTINATION, SETTINGS_SET_USERNAME } from "../constants"

const initialState = {
  // TODO: change this to use os.tmpdir()
  cloneDestination: "/tmp",
  username: null,
}

const settings = (state = initialState, action) => {
  switch (action.type) {
  case SETTINGS_CHANGE_CLONE_DESTINATION:
    return Object.assign({}, state, { cloneDestination: action.destination })
  case SETTINGS_SET_USERNAME:
    return Object.assign({}, state, { username: action.payload })
  default:
    return state
  }
}

export default settings
