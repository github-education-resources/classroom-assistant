import {assignmentReset} from "../../assignment/actions/assignment-reset"
import {submissionReset} from "../../submissions/actions/submission-reset"
import {paginationReset} from "../../pagination/actions/pagination-reset"
import { settingsSetUsername } from "./settings-set-username"

const {session} = require("electron").remote
const keytar = require("keytar")

/**
 * PUBLIC: Logs out user from app by clearing session
 * and resets application state
 *
 * @return async thunk action which resolves once app has been reset
 */
export const settingsLogoutUser = () => {
  return dispatch => {
    return new Promise(async (resolve) => {
      await keytar.deletePassword("Classroom-Desktop", "x-access-token")

      session.fromPartition("auth:session").clearStorageData()
      dispatch(settingsSetUsername(null))
      dispatch(assignmentReset())
      dispatch(submissionReset())
      dispatch(paginationReset())
      resolve()
    })
  }
}
