import {settingsSetAuthorize} from "./settings-set-authorize"
import {ipcRenderer} from "electron"

export const settingsLoginUser = (assignmentURL) => {
  return dispatch => {
    return new Promise((resolve) => {
      ipcRenderer.send("requestAuthorization", assignmentURL)
      ipcRenderer.on("receivedAuthorization", () => {
        dispatch(settingsSetAuthorize(true))
        resolve()
      })
    })
  }
}
