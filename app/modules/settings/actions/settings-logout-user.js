import { settingsResetState } from "./settings-reset-state"
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
  return async dispatch => {
    await keytar.deletePassword("Classroom-Desktop", "x-access-token")
    session.fromPartition("auth:session").clearStorageData()
    await dispatch(settingsSetUsername(null))
    await dispatch(settingsResetState())
  }
}
