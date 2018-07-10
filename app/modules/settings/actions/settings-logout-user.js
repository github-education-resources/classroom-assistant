import {settingsSetAuthorize} from "./settings-set-authorize"
const {session} = require("electron").remote

export const settingsLogoutUser = () => {
  return dispatch => {
    return new Promise((resolve) => {
      session.defaultSession.clearStorageData()
      dispatch(settingsSetAuthorize(false))
      resolve()
    })
  }
}
