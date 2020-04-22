import { ipcRenderer } from "electron"
import { push } from "react-router-redux"

import { settingsResetState } from "./settings-reset-state"
import { settingsSetUsername } from "./settings-set-username"

const { session } = require("electron").remote

/**
 * PUBLIC: Logs out user from app by clearing session
 * and resets application state
 *
 * @return async thunk action which resolves once app has been reset
 */
export const settingsLogoutUser = () => {
  return async dispatch => {
    ipcRenderer.send("deleteToken")

    session.fromPartition("auth:session").clearStorageData()
    await dispatch(settingsSetUsername(null))
    await dispatch(settingsResetState())
    dispatch(push("/"))
  }
}
