import {ipcRenderer} from "electron"
import { settingsUpdateUserState } from "./settings-update-user-state"

/**
 * PUBLIC: Sends IPC message to open Login window with assignment url
 * Once user has logged in, updates username and resolves
 *
 * @return An async thunk action whcih resolves once user has logged in
 */
export const settingsLoginUser = (assignmentURL) => {
  return dispatch => {
    return new Promise((resolve) => {
      ipcRenderer.send("requestAuthorization", assignmentURL)

      // TODO: Handle authorization failure so app doesn't hang
      ipcRenderer.on("receivedAuthorization", () => {
        dispatch(settingsUpdateUserState())
        resolve()
      })
    })
  }
}
