import {settingsSetUsername} from "./settings-set-username"
import {assignmentReset} from "../../assignment/actions/assignment-reset"

const {session} = require("electron").remote

export const settingsLogoutUser = () => {
  return dispatch => {
    return new Promise((resolve) => {
      session.defaultSession.clearStorageData()
      dispatch(settingsSetUsername(null))
      dispatch(assignmentReset())
      resolve()
    })
  }
}
