import {ipcRenderer} from "electron"
import { settingsUpdateUserState } from "./settings-update-user-state"

export const settingsLoginUser = (assignmentURL) => {
  return dispatch => {
    return new Promise((resolve) => {
      ipcRenderer.send("requestAuthorization", assignmentURL)
      ipcRenderer.on("receivedAuthorization", () => {
        dispatch(settingsUpdateUserState())
        resolve()
      })
    })
  }
}
