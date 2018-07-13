import {settingsUpdateUserState} from "./settings-update-user-state"
import {assignmentReset} from "../../assignment/actions/assignment-reset"
import {submissionReset} from "../../submissions/actions/submission-reset"
import {paginationReset} from "../../pagination/actions/pagination-reset"

const keytar = require("keytar")
const {session} = require("electron").remote

/**
 * PUBLIC: Logs out user from app by clearing session
 * and resets application state
 *
 * @return async thunk action which resolves once app has been reset
 */
export const settingsLogoutUser = () => {
  return dispatch => {
    return new Promise(async (resolve) => {
      await keytar.deletePassword("Classroom-Desktop", "token")
      session.defaultSession.clearStorageData()
      dispatch(settingsUpdateUserState())
      dispatch(assignmentReset())
      dispatch(submissionReset())
      dispatch(paginationReset())
      resolve()
    })
  }
}
