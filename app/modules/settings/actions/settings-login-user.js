import { settingsUpdateUserState } from "./settings-update-user-state"

const ipcRenderer = require("electron").ipcRenderer

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
